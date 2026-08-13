'use client';

import { motion, useReducedMotion } from 'framer-motion';

const LAYERS = [
  { label: 'Users', detail: 'Senders & drivers', dot: 'bg-paper-muted' },
  { label: 'FaniLab Frontend', detail: 'Next.js application', dot: 'bg-accent' },
  { label: 'FaniLab Backend', detail: 'Indexing, auth, notifications', dot: 'bg-accent' },
  { label: 'Soroban Smart Contracts', detail: 'Escrow, delivery, disputes', dot: 'bg-teal' },
];

export default function HeroDiagram() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="panel relative overflow-hidden p-6 sm:p-8">
        <div className="absolute left-[38px] top-10 bottom-10 w-px bg-line-strong sm:left-[46px]" />
        {!shouldReduceMotion && (
          <motion.div
            className="absolute left-[38px] top-10 h-8 w-px bg-gradient-to-b from-transparent via-accent-light to-transparent sm:left-[46px]"
            animate={{ y: [0, 210, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}

        <ul className="relative flex flex-col gap-8">
          {LAYERS.map((layer) => (
            <li key={layer.label} className="flex items-center gap-4">
              <span
                className={`relative z-10 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${layer.dot}`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-ink-950" />
              </span>
              <div>
                <p className="text-sm font-semibold text-paper">{layer.label}</p>
                <p className="text-xs text-paper-faint">{layer.detail}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-3 text-center text-xs text-paper-faint">
        Simplified system overview &mdash; see the ecosystem section below for the full picture.
      </p>
    </div>
  );
}
