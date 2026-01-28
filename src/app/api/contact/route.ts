import { NextRequest, NextResponse } from "next/server";

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const CONTACT_EMAIL = process.env.CONTACT_EMAIL;

// ═══════════════════════════════════════════════════════════════
// Rate Limiting — In-memory store (suitable for serverless/edge)
// ═══════════════════════════════════════════════════════════════
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

function getRateLimitKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
  return ip;
}

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(key);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 10000) {
    for (const [k, v] of rateLimitMap.entries()) {
      if (v.resetTime < now) rateLimitMap.delete(k);
    }
  }

  if (!record || record.resetTime < now) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
}

// ═══════════════════════════════════════════════════════════════
// Input Validation Constants
// ═══════════════════════════════════════════════════════════════
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_COMPANY_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;
const VALID_SERVICES = ["web-development", "seo-geo", "paid-advertising", "audit", ""];
const VALID_BUDGETS = ["pilot", "2k-5k", "5k-10k", "10k-15k", "15k+", ""];

interface QuoteAddOn {
  name: string;
  setup: number;
  monthly: number;
}

interface QuoteData {
  package: string;
  packageLabel: string;
  packageUpfront: number;
  packageMonthly: number;
  addOns: QuoteAddOn[];
  totalUpfront: number;
  totalMonthly: number;
}

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  quote?: QuoteData;
  _honeypot?: string;
}

export async function POST(req: NextRequest) {
  // Rate limiting check
  const rateLimitKey = getRateLimitKey(req);
  if (isRateLimited(rateLimitKey)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  if (!BREVO_API_KEY || !CONTACT_EMAIL) {
    return NextResponse.json(
      { error: "Email service not configured" },
      { status: 500 }
    );
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Honeypot anti-spam check: if filled, it's a bot
  // Return success to not alert the bot, but don't send email
  if (body._honeypot) {
    console.log("Spam submission blocked via honeypot");
    return NextResponse.json({ success: true });
  }

  const { name, email, company, service, budget, message, quote } = body;

  // Server-side validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required" },
      { status: 400 }
    );
  }

  // Length validation to prevent abuse
  if (
    name.length > MAX_NAME_LENGTH ||
    email.length > MAX_EMAIL_LENGTH ||
    (company && company.length > MAX_COMPANY_LENGTH) ||
    message.length > MAX_MESSAGE_LENGTH
  ) {
    return NextResponse.json(
      { error: "Input exceeds maximum allowed length" },
      { status: 400 }
    );
  }

  // Basic email format check
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Format currency helper
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-NZ", {
      style: "currency",
      currency: "NZD",
      minimumFractionDigits: 0,
    }).format(amount);

  // Build quote section for email - wrapped in table row for proper email layout
  const quoteSection = quote ? `
              <tr>
                <td style="padding: 0 40px 32px;">
                <div style="padding: 20px; background: linear-gradient(135deg, #1A1A1B 0%, #2A2A2B 100%); border: 1px solid #FF4F00; border-radius: 6px;">
                    <h2 style="margin: 0 0 16px; font-size: 16px; color: #FF4F00; text-transform: uppercase; letter-spacing: 2px;">Quote Configuration</h2>
                    
                    <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #3A3A3B;">
                        <p style="margin: 0 0 4px; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Core Package</p>
                        <p style="margin: 0; font-size: 16px; font-weight: bold; color: #EEEEEE;">${escapeHtml(quote.package)} — ${escapeHtml(quote.packageLabel)}</p>
                        <p style="margin: 4px 0 0; font-size: 14px; color: #FF4F00;">${formatCurrency(quote.packageUpfront)} + ${formatCurrency(quote.packageMonthly)}/mo</p>
                    </div>
                    
                    ${quote.addOns.length > 0 ? `
                    <div style="margin-bottom: 16px; padding-bottom: 16px; border-bottom: 1px solid #3A3A3B;">
                        <p style="margin: 0 0 8px; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Add-on Services</p>
                        ${quote.addOns.map(addon => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                            <span style="font-size: 14px; color: #EEEEEE;">+ ${escapeHtml(addon.name)}</span>
                            <span style="font-size: 13px; color: #999;">${formatCurrency(addon.setup)} / ${formatCurrency(addon.monthly)}/mo</span>
                        </div>
                        `).join('')}
                    </div>
                    ` : ''}
                    
                    <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 8px;">
                        <div>
                            <p style="margin: 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Total Investment</p>
                            <p style="margin: 4px 0 0; font-size: 20px; font-weight: bold; color: #EEEEEE;">${formatCurrency(quote.totalUpfront)} <span style="font-size: 14px; color: #999;">one-time</span></p>
                        </div>
                        <div style="text-align: right;">
                            <p style="margin: 0; color: #999; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Monthly</p>
                            <p style="margin: 4px 0 0; font-size: 20px; font-weight: bold; color: #FF4F00;">${formatCurrency(quote.totalMonthly)}<span style="font-size: 14px; color: #999;">/mo</span></p>
                        </div>
                    </div>
                </div>
                </td>
              </tr>
  ` : '';

  // Build the HTML email body with professional design
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vanturadigital.co.nz";
  const logoUrl = `${siteUrl}/images/logo-with-text.png`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; background-color: #0A0A0B; font-family: 'Helvetica Neue', Arial, sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0A0A0B; padding: 40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #1A1A1B; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.3);">
              
              <!-- Header with Logo -->
              <tr>
                <td align="center" style="background: linear-gradient(135deg, #1A1A1B 0%, #252526 100%); padding: 32px 40px; border-bottom: 1px solid #2A2A2B;">
                  <img src="${logoUrl}" alt="Vantura Digital" width="180" style="display: block; height: auto; max-width: 180px;" />
                </td>
              </tr>
              
              <!-- Title Banner -->
              <tr>
                <td style="padding: 32px 40px; background: linear-gradient(90deg, rgba(255,79,0,0.1) 0%, rgba(255,79,0,0.02) 100%); border-bottom: 1px solid #2A2A2B;">
                  <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #EEEEEE; letter-spacing: -0.5px;">
                    ${quote ? '📊 New Quote Request' : '💬 New Project Inquiry'}
                  </h1>
                  <p style="margin: 8px 0 0; font-size: 13px; color: #888;">Received ${new Date().toLocaleDateString('en-NZ', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</p>
                </td>
              </tr>
              
              <!-- Contact Details Card -->
              <tr>
                <td style="padding: 32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #252526; border-radius: 6px; overflow: hidden;">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <p style="margin: 0 0 16px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF4F00; font-weight: 600;">Contact Details</p>
                        
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #3A3A3B;">
                              <span style="display: inline-block; width: 80px; color: #666; font-size: 12px; text-transform: uppercase;">Name</span>
                              <span style="color: #EEEEEE; font-size: 15px; font-weight: 500;">${escapeHtml(name)}</span>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding: 8px 0; border-bottom: 1px solid #3A3A3B;">
                              <span style="display: inline-block; width: 80px; color: #666; font-size: 12px; text-transform: uppercase;">Email</span>
                              <a href="mailto:${escapeHtml(email)}" style="color: #FF4F00; font-size: 15px; text-decoration: none; font-weight: 500;">${escapeHtml(email)}</a>
                            </td>
                          </tr>
                          ${company ? `
                          <tr>
                            <td style="padding: 8px 0;">
                              <span style="display: inline-block; width: 80px; color: #666; font-size: 12px; text-transform: uppercase;">Company</span>
                              <span style="color: #EEEEEE; font-size: 15px; font-weight: 500;">${escapeHtml(company)}</span>
                            </td>
                          </tr>
                          ` : ''}
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              ${quote ? `
              <!-- Quote Configuration Card -->
              <tr>
                <td style="padding: 0 40px 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background: linear-gradient(135deg, #252526 0%, #1E1E1F 100%); border-radius: 6px; border: 1px solid #FF4F00; overflow: hidden;">
                    <tr>
                      <td style="padding: 20px 24px; border-bottom: 1px solid #3A3A3B;">
                        <p style="margin: 0 0 4px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF4F00; font-weight: 600;">Quote Configuration</p>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding: 20px 24px;">
                        <p style="margin: 0 0 4px; color: #666; font-size: 11px; text-transform: uppercase;">Core Package</p>
                        <p style="margin: 0 0 4px; font-size: 18px; font-weight: 700; color: #EEEEEE;">${escapeHtml(quote.package)}</p>
                        <p style="margin: 0 0 8px; font-size: 13px; color: #888;">${escapeHtml(quote.packageLabel)}</p>
                        <p style="margin: 0; font-size: 16px; color: #FF4F00; font-weight: 600;">${formatCurrency(quote.packageUpfront)} + ${formatCurrency(quote.packageMonthly)}/mo</p>
                      </td>
                    </tr>
                    ${quote.addOns.length > 0 ? `
                    <tr>
                      <td style="padding: 0 24px 20px;">
                        <p style="margin: 0 0 12px; color: #666; font-size: 11px; text-transform: uppercase;">Add-on Services</p>
                        ${quote.addOns.map(addon => `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px; padding: 10px 12px; background: rgba(255,255,255,0.03); border-radius: 4px;">
                          <span style="font-size: 14px; color: #EEEEEE;">+ ${escapeHtml(addon.name)}</span>
                          <span style="font-size: 13px; color: #888;">${formatCurrency(addon.setup)} / ${formatCurrency(addon.monthly)}/mo</span>
                        </div>
                        `).join('')}
                      </td>
                    </tr>
                    ` : ''}
                    <tr>
                      <td style="padding: 16px 24px; background: rgba(255,79,0,0.1); border-top: 1px solid #3A3A3B;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="50%">
                              <p style="margin: 0 0 4px; color: #666; font-size: 11px; text-transform: uppercase;">Total One-Time</p>
                              <p style="margin: 0; font-size: 22px; font-weight: 700; color: #EEEEEE;">${formatCurrency(quote.totalUpfront)}</p>
                            </td>
                            <td width="50%" align="right">
                              <p style="margin: 0 0 4px; color: #666; font-size: 11px; text-transform: uppercase;">Monthly</p>
                              <p style="margin: 0; font-size: 22px; font-weight: 700; color: #FF4F00;">${formatCurrency(quote.totalMonthly)}</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              ` : ''}
              
              <!-- Message Card -->
              <tr>
                <td style="padding: 0 40px 32px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #252526; border-radius: 6px; border-left: 3px solid #FF4F00; overflow: hidden;">
                    <tr>
                      <td style="padding: 20px 24px;">
                        <p style="margin: 0 0 12px; font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #FF4F00; font-weight: 600;">Project Details</p>
                        <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #DDDDDD; white-space: pre-wrap;">${escapeHtml(message)}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 24px 40px; background-color: #0F0F10; border-top: 1px solid #2A2A2B;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td>
                        <p style="margin: 0 0 4px; font-size: 12px; color: #666;">Vantura Digital</p>
                        <p style="margin: 0; font-size: 11px; color: #555;">Web Development • SEO & GEO • Paid Advertising</p>
                      </td>
                      <td align="right">
                        <a href="mailto:${escapeHtml(email)}" style="display: inline-block; padding: 10px 20px; background-color: #FF4F00; color: #FFFFFF; font-size: 12px; font-weight: 600; text-decoration: none; border-radius: 4px;">Reply to ${escapeHtml(name.split(' ')[0])}</a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              
            </table>
            
            <!-- Sent From -->
            <p style="margin: 24px 0 0; font-size: 11px; color: #555; text-align: center;">
              Sent from vanturadigital.co.nz contact form
            </p>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Vantura Digital", email: CONTACT_EMAIL },
        to: [{ email: CONTACT_EMAIL, name: "Vantura Digital" }],
        replyTo: { email, name },
        subject: `New Inquiry: ${name}${company ? ` — ${company}` : ""}`,
        htmlContent,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Brevo API error:", response.status, errorData);
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
