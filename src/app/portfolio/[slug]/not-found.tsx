import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";

export default function ProjectNotFound() {
  return (
    <section className="bg-background py-24 text-center">
      <div className="mx-auto max-w-xl px-4">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-ink/50">404</p>
        <h1 className="mb-4 text-4xl font-bold text-ink-dark">Project not found</h1>
        <p className="mb-8 text-ink/70">This project may have been moved or is no longer published.</p>
        <Link href="/portfolio" className={buttonStyles("primary", "md")}>Back to all projects</Link>
      </div>
    </section>
  );
}