import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Vantura Digital terms of service — the terms governing our services and your use of our website.",
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24">
      <h1 className="mb-4 text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="mb-8 text-sm text-[var(--color-muted)]">
        Last updated: 28 January 2026
      </p>

      <div className="space-y-8 text-[var(--color-muted)] leading-relaxed">
        <div>
          <p>
            These Terms of Service (&quot;Terms&quot;) govern your use of the Vantura Digital
            website and services. By accessing our website or engaging our services, you agree to be
            bound by these Terms. If you do not agree, please do not use our website or services.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            1. Services
          </h2>
          <p>
            Vantura Digital provides web development, search engine optimisation (SEO), generative
            engine optimisation (GEO), and paid advertising services. The specific scope, deliverables,
            timeline, and fees for each engagement are defined in a separate project proposal or
            statement of work agreed upon by both parties prior to commencement.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            2. Acceptance of Terms
          </h2>
          <p>
            By engaging Vantura Digital for services, you confirm that you have the authority to
            enter into a binding agreement on behalf of yourself or the organisation you represent.
            These Terms apply in addition to any project-specific agreements.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            3. Client Responsibilities
          </h2>
          <p className="mb-3">As a client, you agree to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Provide timely access to content, assets, accounts, and information required to
              deliver the agreed services
            </li>
            <li>
              Review and provide feedback on deliverables within agreed timeframes
            </li>
            <li>
              Ensure that all materials provided to us do not infringe third-party intellectual
              property rights
            </li>
            <li>
              Maintain the confidentiality of any account credentials or access we provide
            </li>
            <li>
              Comply with all applicable laws and regulations related to your business and online
              presence
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            4. Payment Terms
          </h2>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Payment terms are specified in each project proposal or statement of work
            </li>
            <li>
              Unless otherwise agreed, invoices are due within 14 days of issue
            </li>
            <li>
              Late payments may incur interest at a rate of 1.5% per month on the outstanding
              balance
            </li>
            <li>
              We reserve the right to pause work on any project with overdue invoices until payment
              is received
            </li>
            <li>
              All prices are in New Zealand Dollars (NZD) and exclusive of GST unless stated
              otherwise
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            5. Intellectual Property
          </h2>
          <p className="mb-3">
            <strong>Client materials:</strong> You retain ownership of all content, branding, and
            assets you provide to us for use in the project.
          </p>
          <p className="mb-3">
            <strong>Deliverables:</strong> Upon full payment, ownership of custom-developed
            deliverables transfers to you, except for:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Third-party tools, libraries, and frameworks (which remain subject to their respective
              licences)
            </li>
            <li>
              Pre-existing code, templates, or components developed by Vantura Digital prior to or
              independently of the engagement, which are licensed to you for use in the project
            </li>
          </ul>
          <p className="mt-3">
            <strong>Portfolio rights:</strong> Unless otherwise agreed in writing, we reserve the
            right to display completed work in our portfolio and marketing materials.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            6. Confidentiality
          </h2>
          <p>
            Both parties agree to keep confidential any proprietary or sensitive information shared
            during the engagement. This obligation survives termination of the agreement and does not
            apply to information that is publicly available, independently developed, or required to
            be disclosed by law.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            7. Limitation of Liability
          </h2>
          <p className="mb-3">
            To the fullest extent permitted by New Zealand law:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Vantura Digital shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising from the use of our services or website
            </li>
            <li>
              Our total liability for any claim arising from an engagement shall not exceed the
              total fees paid by you for that specific engagement
            </li>
            <li>
              We do not guarantee specific results from SEO, advertising, or marketing services, as
              outcomes depend on factors beyond our control including search engine algorithms,
              market conditions, and competitor activity
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            8. Warranties and Disclaimers
          </h2>
          <p className="mb-3">
            We warrant that our services will be performed with reasonable care and skill. Beyond
            this:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              Our website and services are provided &quot;as is&quot; without warranties of any
              kind, express or implied
            </li>
            <li>
              We do not warrant that our website will be uninterrupted, error-free, or free of
              harmful components
            </li>
            <li>
              Nothing in these Terms excludes or limits any consumer guarantees under the New Zealand
              Consumer Guarantees Act 1993 that cannot be lawfully excluded
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            9. Termination
          </h2>
          <p className="mb-3">
            Either party may terminate an engagement by providing 14 days written notice. Upon
            termination:
          </p>
          <ul className="list-disc space-y-1 pl-6">
            <li>
              You are responsible for payment of all work completed up to the termination date
            </li>
            <li>
              We will provide all completed deliverables and any work-in-progress files
            </li>
            <li>
              Any deposits or prepaid amounts for uncompleted work will be refunded on a pro-rata
              basis, less reasonable costs incurred
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            10. Website Use
          </h2>
          <p className="mb-3">When using our website, you agree not to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Use the site for any unlawful purpose</li>
            <li>Attempt to gain unauthorised access to any part of the site or its systems</li>
            <li>Reproduce, distribute, or modify any content without our written permission</li>
            <li>
              Use automated tools to scrape, crawl, or extract data from the site without
              permission
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            11. Governing Law
          </h2>
          <p>
            These Terms are governed by and construed in accordance with the laws of New Zealand.
            Any disputes arising from these Terms or our services shall be subject to the exclusive
            jurisdiction of the courts of New Zealand.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            12. Changes to These Terms
          </h2>
          <p>
            We reserve the right to update these Terms at any time. Changes will be posted on this
            page with an updated &quot;Last updated&quot; date. Continued use of our website or
            services after changes are posted constitutes acceptance of the revised Terms.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-2xl font-semibold text-[var(--color-foreground)]">
            13. Contact Us
          </h2>
          <p className="mb-3">
            If you have any questions about these Terms, please contact us:
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
