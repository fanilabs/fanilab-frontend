import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import StatusBadge from '@/components/ui/StatusBadge';

const ROWS: Array<{
  label: string;
  status: 'built' | 'progress' | 'planned';
  body: string;
}> = [
  {
    label: 'Smart Contracts',
    status: 'progress',
    body: 'Five of six contracts are implemented and tested in the repository — escrow, delivery, dispute resolution, fleet management, and identity/reputation. The settlement contract is intentionally not yet implemented.',
  },
  {
    label: 'Backend',
    status: 'built',
    body: 'All twelve modules (auth, users, deliveries, escrow, fleet, disputes, reputation, indexer, notifications, analytics, fraud detection, admin) are implemented, with the event indexer verified against a real Postgres database and the public Stellar testnet RPC.',
  },
  {
    label: 'Frontend',
    status: 'built',
    body: 'This showcase site. A separate transactional interface — wallet connection, delivery creation, job browsing, dashboard — was previously scaffolded in this repository and will be revisited once contracts are live on a network the public can use.',
  },
  {
    label: 'Testnet',
    status: 'planned',
    body: 'The project is configured to target Stellar Testnet, but no publicly deployed contract addresses are currently wired into this site.',
  },
  {
    label: 'Mainnet',
    status: 'planned',
    body: 'Not deployed. Mainnet deployment depends on completing the settlement contract and a security review.',
  },
];

export default function ProjectStatus() {
  return (
    <section id="status" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Project Status"
            title="What’s actually built, honestly"
            description="No live badges, no invented deployments. This is a snapshot of the repositories as they exist today."
          />
        </Reveal>

        <div className="mt-12 divide-y divide-line border-y border-line">
          {ROWS.map((row, i) => (
            <Reveal key={row.label} delay={i * 0.04}>
              <div className="grid gap-3 py-6 sm:grid-cols-[180px_140px_1fr] sm:items-start sm:gap-6">
                <p className="text-sm font-semibold text-paper">{row.label}</p>
                <div>
                  <StatusBadge status={row.status} />
                </div>
                <p className="text-sm leading-relaxed text-paper-muted">{row.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
