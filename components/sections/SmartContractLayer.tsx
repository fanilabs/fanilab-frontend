import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import StatusBadge from '@/components/ui/StatusBadge';
import { REPO_LINKS } from '@/lib/links';

const CONTRACTS: Array<{ name: string; body: string; status: 'built' | 'planned' }> = [
  {
    name: 'escrow_contract',
    body: 'Locks sender payment on delivery creation and releases it on confirmation.',
    status: 'built',
  },
  {
    name: 'delivery_contract',
    body: 'Tracks delivery state — creation, driver assignment, progress, confirmation.',
    status: 'built',
  },
  {
    name: 'dispute_resolution_contract',
    body: 'Lets escrow be paused and resolved when a delivery is contested.',
    status: 'built',
  },
  {
    name: 'fleet_management_contract',
    body: 'On-chain tracking for fleet operators managing multiple drivers.',
    status: 'built',
  },
  {
    name: 'identity_reputation_contract',
    body: 'Reputation scoring tied to a driver or sender’s wallet address.',
    status: 'built',
  },
  {
    name: 'settlement_contract',
    body: 'Reserved for cross-contract settlement logic beyond direct escrow release.',
    status: 'planned',
  },
];

export default function SmartContractLayer() {
  return (
    <section id="smart-contracts" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="The Smart Contract Layer"
            title="Soroban is the trust layer"
            description="Soroban is Stellar’s smart contract platform — it gives FaniLab programmable, verifiable on-chain state instead of a database someone has to be trusted to run honestly. Escrow, delivery status, and dispute state all live here, not in a backend table."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CONTRACTS.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.05}>
              <div className="panel flex h-full flex-col p-5">
                <div className="flex items-start justify-between gap-3">
                  <code className="font-mono text-sm text-paper">{c.name}</code>
                </div>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-paper-muted">{c.body}</p>
                <div className="mt-4">
                  <StatusBadge status={c.status} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 text-sm text-paper-faint">
            A <code className="font-mono text-paper-muted">shared_types</code> crate holds common
            types and utilities used across every contract. Contracts emit events on state
            changes (delivery created, escrow funded, driver assigned, delivery confirmed,
            escrow released) that the backend indexer consumes to build its read model —
            see{' '}
            <a href="#ecosystem" className="text-accent-light hover:underline">
              the ecosystem section
            </a>
            .
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <a
            href={REPO_LINKS.smartContract}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-8 inline-flex"
          >
            View the Smart Contract Repository
          </a>
        </Reveal>
      </div>
    </section>
  );
}
