import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const STEPS = [
  {
    title: 'Delivery is created',
    body: 'A sender posts a delivery request with pickup and drop-off details.',
  },
  {
    title: 'Payment is locked in escrow',
    body: 'The escrow contract holds the payment on-chain. Neither party can touch it unilaterally.',
  },
  {
    title: 'A driver accepts the delivery',
    body: 'A driver or courier is assigned to the job and the delivery contract records the assignment.',
  },
  {
    title: 'The delivery progresses',
    body: 'Status updates move the delivery through its lifecycle as the driver transports the goods.',
  },
  {
    title: 'Events are indexed off-chain',
    body: 'Every contract event is picked up by the backend indexer and written into a fast, queryable read model.',
  },
  {
    title: 'Recipient confirms delivery',
    body: 'The recipient verifies the goods arrived, triggering confirmation on-chain.',
  },
  {
    title: 'Settlement & reputation update',
    body: 'The escrow contract releases payment to the driver, and delivery/reputation records are updated.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From request to settlement"
            description="A conceptual walkthrough of the delivery lifecycle as designed in the FaniLab protocol — not a live demo."
          />
        </Reveal>

        <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-y-0">
          <ol className="relative lg:mx-auto lg:max-w-2xl">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="relative flex gap-5 pb-10 last:pb-0">
                  {i !== STEPS.length - 1 && (
                    <span
                      className="absolute left-[19px] top-10 bottom-0 w-px bg-line-strong"
                      aria-hidden="true"
                    />
                  )}
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-ink-850 font-mono text-sm text-accent-light">
                    {i + 1}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="text-base font-semibold text-paper">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-paper-muted">{step.body}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
