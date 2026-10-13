// src/app/terms/page.tsx
import type { Metadata } from "next";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "The terms that apply when you use the StackPlus Studio website and services.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="bg-background py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-ink">
        <h1 className="mb-2 text-4xl font-bold text-ink-dark">Terms of Service</h1>
        <p className="mb-10 text-sm text-ink/60">Last updated: October 2026</p>
        <div className="space-y-8 leading-relaxed">
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Services</h2>
            <p>{SITE.name} provides web, mobile, AI chatbot, UI/UX and branding services. Scope, timeline and price are agreed in a written proposal before work starts.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Payments</h2>
            <p>Payment milestones are defined in each proposal. Work may pause if an invoice is overdue.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Intellectual property</h2>
            <p>Upon full payment, ownership of the agreed deliverables transfers to the client. We may showcase non-confidential work in our portfolio unless agreed otherwise.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Website content</h2>
            <p>Content on this site is provided for information and may change without notice.</p></div>
          <div><h2 className="mb-2 text-xl font-bold text-ink-dark">Contact</h2>
            <p>Email <a className="font-semibold text-primary hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a> for any question about these terms.</p></div>
        </div>
      </div>
    </section>
  );
}