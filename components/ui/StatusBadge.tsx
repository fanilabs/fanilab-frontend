const STYLES = {
  built: 'bg-status-built/10 text-status-built border-status-built/30',
  progress: 'bg-status-progress/10 text-status-progress border-status-progress/30',
  planned: 'bg-status-planned/10 text-status-planned border-status-planned/30',
} as const;

const LABELS = {
  built: 'Implemented',
  progress: 'In Development',
  planned: 'Not Yet Implemented',
} as const;

export default function StatusBadge({ status }: { status: keyof typeof STYLES }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[11px] uppercase tracking-wide ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />
      {LABELS[status]}
    </span>
  );
}
