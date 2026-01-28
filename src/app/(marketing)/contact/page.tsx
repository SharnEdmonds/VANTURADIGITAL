import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactForm } from "@/components/features/contact/ContactForm";
import { RevealOnScroll, StaggerContainer } from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vantura Digital. Free technical audit, project inquiries, and partnership opportunities.",
};

const nextSteps = [
  "We review your inquiry and assess technical fit",
  "30-minute discovery call to understand your goals",
  "Free technical audit delivered within 48 hours",
  "Proposal with clear scope, timeline, and pricing",
];

export default function ContactPage() {
  return (
    <div className="bg-carbon">
      <PageHero
        label="Start the Conversation"
        title="Let's Talk Systems."
        subtitle="Tell us about your project. We'll respond within 24 hours with an honest assessment of whether we can help — and if we can, how."
      />

      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        <hr className="border-gallery/10" />
      </div>

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <RevealOnScroll>
              <ContactForm />
            </RevealOnScroll>
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <StaggerContainer className="space-y-12">
              <div className="space-y-2">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                  Email
                </h3>
                <a
                  href="mailto:hello@venturadigital.com"
                  className="block text-xl text-signal transition-colors hover:text-signal-light"
                >
                  hello@venturadigital.com
                </a>
              </div>

              <div className="space-y-4">
                <h3 className="font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                  What Happens Next
                </h3>
                <ul className="space-y-6">
                  {nextSteps.map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-signal font-mono text-xs text-signal">
                        {i + 1}
                      </span>
                      <span className="text-sm text-text-secondary">
                        {step}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border border-gallery/10 bg-carbon-light p-8">
                <h3 className="mb-3 font-heading text-sm font-bold uppercase tracking-wider text-gallery">
                  Free Audit Offer
                </h3>
                <p className="text-sm leading-relaxed text-text-secondary">
                  Every new inquiry receives a complimentary technical audit
                  covering your site performance, SEO health, and advertising
                  opportunities. No strings attached.
                </p>
              </div>
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
