import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Vantura Digital privacy policy — how we collect, use, and protect your information.",
};

export default function PrivacyPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Last updated: 28 January 2026
      </p>

      <div className="space-y-8 text-[var(--color-muted)] leading-relaxed">
        <div>
          <p>
            Vantura Digital (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website at vanturadigital.co.nz or engage
            our services.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            1. Information We Collect
          </h2>
          <h3 className="mb-2 text-lg font-medium text-[var(--color-foreground)]">
            Personal Information
          </h3>
          <p className="mb-3">
            When you contact us, request a quote, or engage our services, we may collect:
          </p>
          <ul className="mb-4 list-disc space-y-1 pl-6">
            <li>Name and contact details (email address, phone number)</li>
            <li>Business name and website URL</li>
            <li>Billing information (processed securely via third-party payment providers)</li>
            <li>Any information you voluntarily provide in correspondence</li>
          </ul>

          <h3 className="mb-2 text-lg font-medium text-[var(--color-foreground)]">
            Usage Data
          </h3>
          <p className="mb-3">
            We automatically collect certain information when you visit our website, including:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>IP address and approximate geographic location</li>
            <li>Browser type, device type, and operating system</li>
            <li>Pages visited, time spent on pages, and referring URLs</li>
            <li>Interaction data collected via analytics tools</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            2. How We Use Your Information
          </h2>
          <p className="mb-3">We use the information we collect to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Respond to your enquiries and provide our services</li>
            <li>Send project updates, invoices, and service-related communications</li>
            <li>Improve our website, services, and user experience</li>
            <li>Analyse website traffic and usage patterns</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            3. Data Sharing and Third Parties
          </h2>
          <p className="mb-3">
            We do not sell your personal information. We may share your data with:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Service providers</strong> — hosting, analytics, email, and payment processing
              partners who assist in delivering our services
            </li>
            <li>
              <strong>Legal requirements</strong> — when required by law, regulation, or legal
              process
            </li>
            <li>
              <strong>Business transfers</strong> — in connection with a merger, acquisition, or sale
              of assets
            </li>
          </ul>
          <p className="mt-3">
            All third-party providers are contractually obligated to protect your data and use it
            only for the purposes we specify.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            4. Cookies and Tracking Technologies
          </h2>
          <p className="mb-3">
            Our website uses cookies and similar technologies to enhance your browsing experience and
            collect usage data. These include:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              <strong>Essential cookies</strong> — required for the website to function correctly
            </li>
            <li>
              <strong>Analytics cookies</strong> — help us understand how visitors interact with our
              site (e.g. Google Analytics)
            </li>
            <li>
              <strong>Marketing cookies</strong> — used to measure advertising campaign effectiveness
              (only when you interact with our ads)
            </li>
          </ul>
          <p className="mt-3">
            You can control cookies through your browser settings. Disabling certain cookies may
            affect website functionality.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            5. Data Security
          </h2>
          <p>
            We implement appropriate technical and organisational measures to protect your personal
            information against unauthorised access, alteration, disclosure, or destruction. However,
            no method of transmission over the internet is 100% secure, and we cannot guarantee
            absolute security.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            6. Data Retention
          </h2>
          <p>
            We retain your personal information only for as long as necessary to fulfil the purposes
            outlined in this policy, or as required by law. When data is no longer needed, we
            securely delete or anonymise it.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            7. Your Rights
          </h2>
          <p className="mb-3">
            Under the New Zealand Privacy Act 2020, you have the right to:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your personal information (subject to legal obligations)</li>
            <li>Withdraw consent for marketing communications at any time</li>
            <li>Lodge a complaint with the Office of the Privacy Commissioner</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, please contact us using the details below.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            8. Third-Party Links
          </h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the
            privacy practices or content of those sites. We encourage you to review their privacy
            policies before providing any personal information.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            9. Changes to This Policy
          </h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page
            with an updated &quot;Last updated&quot; date. We encourage you to review this policy
            periodically.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            10. Contact Us
          </h2>
          <p className="mb-3">
            If you have any questions about this Privacy Policy or wish to exercise your rights,
            please contact us:
          </p>
          <ul className="list-none space-y-1 pl-0">
            <li>
              <strong>Vantura Digital</strong>
            </li>
            <li>Email: hello@vanturadigital.co.nz</li>
            <li>Website: vanturadigital.co.nz</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
