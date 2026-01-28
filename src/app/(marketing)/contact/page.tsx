import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ContactFormWithQuote } from "@/components/features/contact/ContactFormWithQuote";
import { ContactSidebar } from "./ContactSidebar";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Vantura Digital. Free technical audit, project inquiries, and partnership opportunities.",
};

export default function ContactPage() {
  return (
    <div className="bg-carbon">
      <PageHero
        label="Start the Conversation"
        title="Let's Talk Systems."
        subtitle="Tell us about your project. We'll respond within 24 hours with an honest assessment of whether we can help — and if we can, how."
      />

      <section className="mx-auto w-full max-w-7xl px-6 py-24 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-5 lg:gap-24">
          {/* Contact Form with Quote */}
          <div className="lg:col-span-3">
            <ContactFormWithQuote />
          </div>

          {/* Contact Info Sidebar */}
          <div className="lg:col-span-2">
            <ContactSidebar />
          </div>
        </div>
      </section>
    </div>
  );
}
