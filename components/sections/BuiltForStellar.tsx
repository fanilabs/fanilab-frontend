import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { STELLAR_LINKS } from '@/lib/links';

const REASONS = [
  {
    title: 'Programmable settlement',
    body: 'Soroban gives FaniLab a platform for programmable applications on Stellar — escrow logic runs as verifiable on-chain state, not application-layer promises.',
  },
  {
    title: 'Fast, predictable finality',
    body: 'A marketplace built on many small, frequent payments needs settlement that is fast and fee-predictable rather than occasionally cheap.',
  },
  {
    title: 'Event-driven by design',
    body: 'Contract events are the backbone of the architecture — every state change is emitted on-chain and consumed by the backend indexer, not polled for or guessed at.',
  },
  {
    title: 'Wallet-native identity',
    body: 'Users are identified by their Stellar wallet address. The backend links roles and reputation to that address instead of managing its own credentials for value transfer.',
  },
];

export default function BuiltForStellar() {
  return (
    <section id="stellar" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Built for Stellar"
            title="Why Soroban, specifically"
            align="center"
            description="Soroban is Stellar's smart contract platform for building programmable applications on the network. FaniLab uses it as the settlement and state-of-record layer beneath the logistics workflow — not as a buzzword."
          />
        </Reveal>

        <div className="mx-auto mt-14 grid max-w-4xl gap-4 sm:grid-cols-2">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.06}>
              <div className="panel h-full p-6">
                <h3 className="text-base font-semibold text-paper">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{r.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-sm text-paper-faint">
            Learn more at{' '}
            <a
              href={STELLAR_LINKS.developers}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:underline"
            >
              developers.stellar.org
            </a>{' '}
            or{' '}
            <a
              href={STELLAR_LINKS.soroban}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-light hover:underline"
            >
              soroban.stellar.org
            </a>
            .
          </p>
        </Reveal>
      </div>
    </section>
  );
}
