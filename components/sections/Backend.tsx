import Reveal from '@/components/ui/Reveal';
import { REPO_LINKS } from '@/lib/links';

const CAPABILITIES = [
  {
    title: 'Accounts & roles',
    body: 'Role-based off-chain accounts (customer, courier, fleet manager, admin) mapped to Stellar wallet addresses — no private keys ever touch the backend.',
  },
  {
    title: 'Event indexing',
    body: 'A checkpointed, idempotent indexer polls every FaniLab contract and writes a consistent, queryable Postgres read model of on-chain activity.',
  },
  {
    title: 'Unsigned transaction building',
    body: 'The API builds unsigned Soroban transactions for client-side signing, then tracks their submission and confirmation lifecycle.',
  },
  {
    title: 'Dispute evidence',
    body: 'Evidence uploads are stored off-chain and content-hash verified against the hash recorded on-chain.',
  },
  {
    title: 'Notifications & analytics',
    body: 'Delivery and dispute state changes drive notifications, analytics, and a first-pass fraud-detection heuristic layer.',
  },
  {
    title: 'Admin tooling',
    body: 'Operational functionality for reviewing disputes, managing accounts, and monitoring the indexed event stream.',
  },
];

export default function Backend() {
  return (
    <section id="backend" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="eyebrow">The Application Layer</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              The backend doesn&apos;t replace the blockchain
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper-muted">
              It makes it usable. Escrow, delivery state, and dispute outcomes are decided
              on-chain — the backend is the service layer that gets users, applications, and
              that on-chain system talking to each other: identity, indexing, notifications,
              and analytics, all read from and written{' '}
              <span className="italic text-paper">around</span> the chain.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-2 font-mono text-xs text-paper-faint">
              {['Node.js', 'TypeScript', 'Fastify', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ'].map(
                (t) => (
                  <span key={t} className="rounded-full border border-line px-3 py-1">
                    {t}
                  </span>
                )
              )}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <a
              href={REPO_LINKS.backend}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary mt-8 inline-flex"
            >
              View the Backend Repository
            </a>
          </Reveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {CAPABILITIES.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.05}>
              <div className="panel h-full p-5">
                <h3 className="text-sm font-semibold text-paper">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
