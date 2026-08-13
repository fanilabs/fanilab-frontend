import Logo from './Logo';
import { REPO_LINKS, STELLAR_LINKS } from '@/lib/links';

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink-950">
      <div className="section-shell grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo />
            <span className="text-lg font-semibold text-paper">FaniLab</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-paper-muted">
            On-chain infrastructure for trusted logistics, built on Stellar and Soroban smart
            contracts.
          </p>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-paper-faint">
            Repositories
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={REPO_LINKS.frontend}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Frontend
              </a>
            </li>
            <li>
              <a
                href={REPO_LINKS.backend}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Backend
              </a>
            </li>
            <li>
              <a
                href={REPO_LINKS.smartContract}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Smart Contracts
              </a>
            </li>
            <li>
              <a
                href={REPO_LINKS.org}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Organization
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.15em] text-paper-faint">
            Stellar Resources
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li>
              <a
                href={STELLAR_LINKS.stellar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Stellar Network
              </a>
            </li>
            <li>
              <a
                href={STELLAR_LINKS.soroban}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Soroban Documentation
              </a>
            </li>
            <li>
              <a
                href={STELLAR_LINKS.freighter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper-muted hover:text-paper"
              >
                Freighter Wallet
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="section-shell flex flex-col gap-2 py-6 text-xs text-paper-faint sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} FaniLab. Open-source, MIT licensed.</p>
          <p>Built on Stellar &middot; Powered by Soroban</p>
        </div>
      </div>
    </footer>
  );
}
