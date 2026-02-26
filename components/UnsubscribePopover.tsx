"use client";

import { useState, useRef, useEffect } from "react";

export function UnsubscribePopover({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className={`relative inline-block ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="normal-case underline underline-offset-2 hover:text-offwhite transition-colors cursor-pointer"
      >
        Unsubscribe
      </button>

      {open && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-navy-800 border border-white/[0.08] rounded-xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.4)] z-50">
          {/* Arrow */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-white/[0.08]" />
          <p className="normal-case tracking-normal text-offwhite font-body text-sm leading-relaxed">
            To unsubscribe, use the link in any of our emails or contact us directly.
          </p>
        </div>
      )}
    </div>
  );
}
