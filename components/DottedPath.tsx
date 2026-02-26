export function DottedPathHero({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 500 800"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 60 -20 Q 250 120 180 300 Q 110 480 350 600 Q 450 660 400 800"
        stroke="#CB4A33"
        strokeWidth="2.5"
        strokeDasharray="6 14"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="60" cy="0" r="5" fill="#CB4A33" opacity="0.5" />
      <circle cx="180" cy="300" r="4" fill="#CB4A33" opacity="0.35" />
      <circle cx="350" cy="600" r="4" fill="#CB4A33" opacity="0.35" />
      <circle cx="400" cy="800" r="5" fill="#CB4A33" opacity="0.5" />
      <path
        d="M 400 0 Q 300 200 350 400 Q 400 550 250 750"
        stroke="#CB4A33"
        strokeWidth="1.5"
        strokeDasharray="4 18"
        strokeLinecap="round"
        opacity="0.1"
      />
    </svg>
  );
}

export function DottedPathDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 8"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="4" cy="4" r="3" fill="#CB4A33" opacity="0.4" />
      <line
        x1="16"
        y1="4"
        x2="224"
        y2="4"
        stroke="#CB4A33"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        strokeLinecap="round"
        opacity="0.25"
      />
      <circle cx="236" cy="4" r="3" fill="#CB4A33" opacity="0.4" />
    </svg>
  );
}

export function DottedPathConnector({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M -20 200 Q 100 40 300 200 Q 500 360 620 200"
        stroke="#CB4A33"
        strokeWidth="2"
        strokeDasharray="6 14"
        strokeLinecap="round"
        opacity="0.18"
      />
      <circle cx="300" cy="200" r="4" fill="#CB4A33" opacity="0.3" />
    </svg>
  );
}

export function DottedPathVertical({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 8 120"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <line
        x1="4"
        y1="0"
        x2="4"
        y2="120"
        stroke="#CB4A33"
        strokeWidth="1.5"
        strokeDasharray="4 10"
        strokeLinecap="round"
        opacity="0.2"
      />
    </svg>
  );
}
