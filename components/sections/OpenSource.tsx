import Reveal from '@/components/ui/Reveal';
import { REPO_LINKS } from '@/lib/links';

const REPOS = [
  {
    name: 'Smart Contracts',
    lang: 'Rust · Soroban',
    body: 'The escrow, delivery, dispute, fleet, and reputation contracts that anchor the protocol on-chain.',
    href: REPO_LINKS.smartContract,
  },
  {
    name: 'Backend',
    lang: 'TypeScript · Fastify',
    body: 'The off-chain service layer: indexing, auth, notifications, analytics, fraud detection.',
    href: REPO_LINKS.backend,
  },
  {
    name: 'Frontend',
    lang: 'TypeScript · Next.js',
    body: 'This site’s source, and the base for the client application that will talk to the deployed contracts.',
    href: REPO_LINKS.frontend,
  },
];

export default function OpenSource() {
  return (
    <section id="open-source" className="py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Open Source</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-paper sm:text-4xl">
              Explore the infrastructure.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-paper-muted">
              Every repository is public and MIT licensed. Read the code, open an issue, or send
              a pull request.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {REPOS.map((repo, i) => (
            <Reveal key={repo.name} delay={i * 0.07}>
              <a
                href={repo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="panel group flex h-full flex-col p-6 transition-colors hover:border-accent-light/40"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-paper">{repo.name}</h3>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="text-paper-faint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-light"
                  >
                    <path
                      d="M4 12 12 4M12 4H5.5M12 4v6.5"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="mt-1 font-mono text-xs text-teal">{repo.lang}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-paper-muted">{repo.body}</p>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 text-center">
            <a
              href={REPO_LINKS.org}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Visit the FaniLab Organization
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
