import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';

const FLOW = [
  {
    label: 'Traditional Logistics',
    body: 'Senders and independent drivers have no shared source of trust. Payment happens on faith, settlement is delayed, fees are high, and small operators struggle to reach cross-border logistics economies at all.',
  },
  {
    label: 'FaniLab',
    body: 'A shared logistics economy where payment is locked in a Soroban escrow contract the moment a delivery is created, and every participant interacts through one protocol instead of one-off arrangements.',
  },
  {
    label: 'Result',
    body: 'Programmable, transparent settlement. Payment releases automatically when delivery is confirmed on-chain — not when someone decides to pay.',
  },
];

const AUDIENCE = [
  {
    title: 'Senders',
    body: 'Individuals and businesses who need goods moved and want payment protected until the job is actually done.',
  },
  {
    title: 'Drivers & Couriers',
    body: 'Motorcycle riders, van drivers, and independent transport owners who want fast, predictable settlement without chasing payment.',
  },
  {
    title: 'Small Logistics Operators',
    body: 'Courier startups, transport unions, and SME merchants who need infrastructure they don’t have to build themselves.',
  },
];

export default function WhatIsFaniLab() {
  return (
    <section id="what-is" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="What Is FaniLab?"
            title="Logistics runs on trust that doesn’t scale"
            description="FaniLab connects people who need goods transported with independent drivers and couriers, using blockchain escrow so payment is protected without a bank or a middleman."
          />
        </Reveal>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {FLOW.map((step, i) => (
            <Reveal key={step.label} delay={i * 0.08}>
              <div className="panel h-full p-6">
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-accent-light">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-paper">{step.label}</h3>
                <p className="mt-2 text-sm leading-relaxed text-paper-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-paper-faint">
              Who it&apos;s for
            </h3>
            <div className="mt-5 grid gap-6 sm:grid-cols-3">
              {AUDIENCE.map((a) => (
                <div key={a.title}>
                  <p className="text-sm font-semibold text-paper">{a.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-paper-muted">{a.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
