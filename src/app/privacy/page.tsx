// src/app/privacy/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How StackPlus Studio collects, uses and protects your personal information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-ink">
        <h1 className="mb-2 text-4xl font-bold text-ink-dark">Privacy Policy</h1>
        <p className="mb-10 text-sm text-ink/60">Last updated: October 2026</p>
        <div className="space-y-8 leading-relaxed">
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Information we collect</h2>
            <p>When you contact us through our forms, WhatsApp or email, we receive the details you share, such as your name, email address, phone number and project description.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">How we use it</h2>
            <p>We use this information only to reply to your enquiry, prepare proposals and deliver services you request. We do not sell your personal data.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Third-party services</h2>
            <p>This website may use hosting, analytics and form-delivery providers to operate. These providers process data only on our behalf.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Your rights</h2>
            <p>You may ask us to access, correct or delete your personal data at any time.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Contact</h2>
            <p>Questions about this policy? Email <a className="font-semibold text-primary hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>.</p></div>
        </div>
      </div>
    </section>
  );
}