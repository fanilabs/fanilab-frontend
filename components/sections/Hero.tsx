import Link from 'next/link';
import { REPO_LINKS } from '@/lib/links';
import HeroDiagram from './HeroDiagram';

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden border-b border-line">
      <div
        className="pointer-events-none absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-accent/20 blur-[120px]"
        aria-hidden="true"
      />

      <div className="section-shell relative grid gap-14 py-20 sm:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div>
          <p className="eyebrow">Stellar &middot; Soroban &middot; Logistics Infrastructure</p>
          <h1 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-paper sm:text-5xl lg:text-[3.25rem]">
            On-chain infrastructure for trusted logistics.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-paper-muted">
            FaniLab is a blockchain-escrow logistics platform on Stellar. Senders lock payment
            in a Soroban smart contract, drivers deliver, and the contract settles the moment
            delivery is confirmed &mdash; no bank, no intermediary, no trust required between
            strangers.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#ecosystem" className="btn-primary">
              Explore the Ecosystem
            </a>
            <a
              href={REPO_LINKS.org}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Source on GitHub
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-paper-faint">
            <Link href={REPO_LINKS.smartContract} target="_blank" className="hover:text-paper-muted">
              Smart Contracts (Rust / Soroban)
            </Link>
            <Link href={REPO_LINKS.backend} target="_blank" className="hover:text-paper-muted">
              Backend (Node.js / Fastify)
            </Link>
            <Link href={REPO_LINKS.frontend} target="_blank" className="hover:text-paper-muted">
              Frontend (Next.js)
            </Link>
          </div>
        </div>

        <HeroDiagram />
      </div>
    </section>
  );
}
