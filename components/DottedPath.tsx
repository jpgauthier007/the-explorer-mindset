export function DottedPathHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 500"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 50 0 Q 200 100 150 250 Q 100 400 300 500"
        stroke="#CB4A33"
        strokeWidth="3"
        strokeDasharray="8 12"
        strokeLinecap="round"
        opacity="0.15"
      />
      <circle cx="50" cy="0" r="6" fill="#CB4A33" opacity="0.3" />
      <circle cx="300" cy="500" r="6" fill="#CB4A33" opacity="0.3" />
    </svg>
  );
}

export function DottedPathDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 4"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="2"
        x2="200"
        y2="2"
        stroke="#CB4A33"
        strokeWidth="2"
        strokeDasharray="6 10"
        strokeLinecap="round"
        opacity="0.3"
      />
    </svg>
  );
}

export function DottedPathConnector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 0 150 Q 100 50 200 150 Q 300 250 400 150"
        stroke="#CB4A33"
        strokeWidth="2.5"
        strokeDasharray="8 12"
        strokeLinecap="round"
        opacity="0.15"
      />
    </svg>
  );
}
