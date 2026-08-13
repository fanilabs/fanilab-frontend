import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const FLOW = ['Delivery', 'Escrow', 'Completion / Dispute', 'Resolution', 'Reputation & Records'];

export default function TrustEscrow() {
  return (
    <section id="trust" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Trust, Escrow & Disputes"
            title="What makes a stranger safe to transact with"
            description="Escrow removes the need to trust the other party. What's left is making sure the system itself stays honest when something goes wrong."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-3">
            {FLOW.map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                <div className="panel px-4 py-3 text-center">
                  <span className="text-sm font-medium text-paper">{step}</span>
                </div>
                {i !== FLOW.length - 1 && (
                  <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
                    <path
                      d="M1 6h16m0 0-5-5m5 5-5 5"
                      stroke="#8891a5"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mx-auto mt-14 max-w-2xl panel p-6">
            <h3 className="text-sm font-semibold text-paper">
              A real inconsistency, handled honestly
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-paper-muted">
              The current contracts track dispute state and reputation through two independent
              on-chain mechanisms each, rather than one. Instead of silently patching that on
              the frontend, the backend&apos;s domain analysis documented the discrepancy and
              reconciles both into one coherent read model — the kind of detail that matters
              more than a demo ever will.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
