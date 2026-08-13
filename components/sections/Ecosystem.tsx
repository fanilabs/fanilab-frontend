import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { REPO_LINKS } from '@/lib/links';

const BACKEND_MODULES = [
  'Auth',
  'Users',
  'Deliveries',
  'Escrow',
  'Fleet',
  'Disputes',
  'Reputation',
  'Indexer',
  'Notifications',
  'Analytics',
  'Fraud Detection',
  'Admin',
];

const CONTRACTS = [
  'Escrow',
  'Delivery',
  'Dispute Resolution',
  'Fleet Management',
  'Identity & Reputation',
  'Settlement',
];

function Connector({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center py-2">
      <div className="h-8 w-px bg-line-strong" aria-hidden="true" />
      <span className="font-mono text-[11px] uppercase tracking-[0.15em] text-paper-faint">
        {label}
      </span>
      <div className="h-8 w-px bg-line-strong" aria-hidden="true" />
    </div>
  );
}

export default function Ecosystem() {
  return (
    <section id="ecosystem" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="The Ecosystem"
            title="Three repositories, one coherent platform"
            description="FaniLab is split across a frontend, a backend, and a smart contract repository — each with a distinct job, wired together into a single logistics protocol."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-14 max-w-2xl">
            <div className="panel p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-paper-faint">
                Layer 0
              </p>
              <p className="mt-2 text-base font-semibold text-paper">Users</p>
              <p className="mt-1 text-sm text-paper-muted">Senders, drivers, fleet operators</p>
            </div>

            <Connector label="HTTPS" />

            <div className="panel p-6 text-center">
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                Layer 1 &middot; Presentation
              </p>
              <p className="mt-2 text-base font-semibold text-paper">FaniLab Frontend</p>
              <p className="mt-1 text-sm text-paper-muted">Next.js application (this repository)</p>
            </div>

            <Connector label="REST API" />

            <div className="panel p-6">
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                  Layer 2 &middot; Application
                </p>
                <p className="mt-2 text-base font-semibold text-paper">FaniLab Backend</p>
                <p className="mt-1 text-sm text-paper-muted">
                  Off-chain service layer &middot; twelve bounded-context modules
                </p>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {BACKEND_MODULES.map((m) => (
                  <span
                    key={m}
                    className="rounded-full border border-line-strong px-3 py-1 font-mono text-[11px] text-paper-muted"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <Connector label="Soroban RPC" />

            <div className="panel p-6" style={{ borderColor: 'rgba(45,212,191,0.25)' }}>
              <div className="text-center">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-teal">
                  Layer 3 &middot; On-Chain
                </p>
                <p className="mt-2 text-base font-semibold text-paper">
                  Stellar &middot; Soroban Smart Contracts
                </p>
                <p className="mt-1 text-sm text-paper-muted">
                  Escrow, settlement, and state-of-record for every delivery
                </p>
              </div>
              <div className="mt-5 flex flex-wrap justify-center gap-2">
                {CONTRACTS.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-teal/25 bg-teal/5 px-3 py-1 font-mono text-[11px] text-paper-muted"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mx-auto mt-10 max-w-xl text-center text-sm text-paper-faint">
            The backend never custodies funds or duplicates on-chain business logic — it reads
            and writes <em>around</em> the chain, never in place of it. Full breakdown in{' '}
            <a
              href={REPO_LINKS.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:underline"
            >
              the backend repository
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
