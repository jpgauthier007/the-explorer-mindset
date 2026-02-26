import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Layered background */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-600 via-navy-800 to-navy-950" />

      {/* Wandering dotted path — the explorer who went off-trail */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 1200 800"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        {/* Main wandering path */}
        <path
          d="M -50 400 Q 100 100 300 350 Q 400 500 500 200 Q 600 -50 750 300 Q 900 650 1000 250 Q 1100 50 1300 400"
          stroke="#CB4A33"
          strokeWidth="2.5"
          strokeDasharray="8 16"
          strokeLinecap="round"
          opacity="0.2"
        />
        {/* Waypoint dots along the path */}
        <circle cx="300" cy="350" r="5" fill="#CB4A33" opacity="0.35" />
        <circle cx="500" cy="200" r="4" fill="#CB4A33" opacity="0.25" />
        <circle cx="750" cy="300" r="6" fill="#CB4A33" opacity="0.4" />
        <circle cx="1000" cy="250" r="4" fill="#CB4A33" opacity="0.25" />

        {/* Secondary faint trail */}
        <path
          d="M 200 800 Q 400 500 600 600 Q 800 700 1000 400 Q 1150 200 1250 350"
          stroke="#CB4A33"
          strokeWidth="1.5"
          strokeDasharray="4 20"
          strokeLinecap="round"
          opacity="0.08"
        />

        {/* Lost explorer dot — pulsing */}
        <circle cx="750" cy="300" r="8" fill="none" stroke="#CB4A33" strokeWidth="1.5" opacity="0.3">
          <animate attributeName="r" values="8;18;8" dur="3s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
      </svg>

      {/* Radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/[0.04] rounded-full blur-[120px] pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center px-5 max-w-lg">
        {/* Giant 404 */}
        <p className="font-display font-extrabold text-[8rem] sm:text-[10rem] leading-none tracking-tight text-offwhite/[0.04] select-none">
          404
        </p>

        {/* Overlaid message */}
        <div className="-mt-16 sm:-mt-20">
          <div className="inline-flex items-center gap-2 text-accent text-[11px] font-display font-semibold uppercase tracking-[0.16em]">
            <span className="w-8 h-px bg-accent/40" />
            Off the Map
            <span className="w-8 h-px bg-accent/40" />
          </div>

          <h1 className="mt-6 font-display font-bold text-2xl sm:text-3xl text-offwhite tracking-tight">
            This trail doesn&rsquo;t lead anywhere.
          </h1>

          <p className="mt-4 font-body text-base sm:text-lg text-gray-muted leading-relaxed">
            Even the best explorers take a wrong turn sometimes.
            <br className="hidden sm:block" />
            Let&rsquo;s get you back on the path.
          </p>

          <Link
            href="/"
            className="mt-10 inline-flex items-center gap-3 bg-accent text-offwhite font-display font-semibold text-sm uppercase tracking-[0.06em] rounded-full px-8 py-3.5 hover:bg-accent-hover hover:shadow-[0_0_30px_-4px_rgba(203,74,51,0.4)] transition-all duration-300"
          >
            {/* Compass icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor" opacity="0.3" />
              <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" />
            </svg>
            Back to Base Camp
          </Link>
        </div>
      </div>
    </div>
  );
}
