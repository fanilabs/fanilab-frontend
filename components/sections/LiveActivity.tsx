import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import { getDeliveries, type Delivery } from '@/lib/backend';

function DeliveryRow({ delivery }: { delivery: Delivery }) {
  return (
    <div className="grid gap-2 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6">
      <div>
        <p className="font-mono text-xs text-paper-faint">{delivery.chainDeliveryId}</p>
        <p className="mt-1 text-sm text-paper-muted">
          {delivery.origin} <span className="text-paper-faint">→</span> {delivery.destination}
        </p>
        <p className="mt-1 text-xs text-paper-faint">{delivery.createdAtChain}</p>
      </div>
      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide text-paper-muted">
        <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
        {delivery.status}
      </span>
    </div>
  );
}

export default async function LiveActivity() {
  const result = await getDeliveries();

  return (
    <section id="live-activity" className="border-b border-line py-20 sm:py-28">
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Live Backend Data"
            title="Network activity, read from the live backend"
            description="This panel calls the FaniLab backend's public deliveries endpoint directly — no mock data. It reflects whatever the indexer currently has, not a curated demo."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mx-auto mt-10 max-w-2xl panel p-6">
            {result.status === 'unconfigured' && (
              <p className="text-sm leading-relaxed text-paper-muted">
                No backend is configured for this environment (
                <code className="font-mono text-xs text-paper-faint">BACKEND_API_URL</code> is
                unset), so live data isn&apos;t shown here.
              </p>
            )}

            {result.status === 'error' && (
              <p className="text-sm leading-relaxed text-paper-muted">
                The live backend is unreachable right now ({result.message}). This section will
                populate once it responds.
              </p>
            )}

            {result.status === 'ok' && result.deliveries.length === 0 && (
              <p className="text-sm leading-relaxed text-paper-muted">
                The backend is reachable and returned no deliveries yet — nothing has been
                indexed on this environment.
              </p>
            )}

            {result.status === 'ok' && result.deliveries.length > 0 && (
              <div className="divide-y divide-line">
                {result.deliveries.slice(0, 10).map((delivery) => (
                  <DeliveryRow key={delivery.id} delivery={delivery} />
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
