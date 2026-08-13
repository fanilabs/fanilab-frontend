'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from './Logo';
import { REPO_LINKS } from '@/lib/links';

const NAV_LINKS = [
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#how-it-works', label: 'How It Works' },
  { href: '#smart-contracts', label: 'Smart Contracts' },
  { href: '#backend', label: 'Backend' },
  { href: '#status', label: 'Status' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink-950/80 backdrop-blur-md">
      <div className="section-shell flex h-16 items-center justify-between">
        <Link href="#top" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Logo />
          <span className="text-lg font-semibold tracking-tight text-paper">FaniLab</span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-paper-muted transition-colors hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href={REPO_LINKS.org}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary !px-4 !py-2 text-xs"
          >
            View on GitHub
          </a>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-md text-paper lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            {open ? (
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M4 7h16M4 12h16M4 17h16"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line bg-ink-950 px-6 pb-6 pt-2 lg:hidden"
        >
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md py-3 text-base text-paper-muted transition-colors hover:text-paper"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={REPO_LINKS.org}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary mt-3 w-full"
            onClick={() => setOpen(false)}
          >
            View on GitHub
          </a>
        </nav>
      )}
    </header>
  );
}
