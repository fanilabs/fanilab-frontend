export default function Logo({ className = 'h-7 w-7' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <rect x="1" y="1" width="30" height="30" rx="8" stroke="#4c7cff" strokeWidth="1.5" />
      <path
        d="M9 20.5 16 9l7 11.5"
        stroke="#7da0ff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="9" r="2" fill="#4c7cff" />
      <circle cx="9" cy="20.5" r="2" fill="#2dd4bf" />
      <circle cx="23" cy="20.5" r="2" fill="#2dd4bf" />
      <path d="M9 20.5h14" stroke="#2dd4bf" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
