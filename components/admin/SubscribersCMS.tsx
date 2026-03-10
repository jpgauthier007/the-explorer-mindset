"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`bg-white/[0.02] border rounded-2xl px-6 py-5 ${highlight ? "border-accent/20" : "border-white/[0.06]"}`}>
      <p className="font-display text-[10px] uppercase tracking-[0.14em] text-gray-secondary mb-2">{label}</p>
      <p className={`font-display font-bold text-3xl ${highlight ? "text-accent" : "text-offwhite"}`}>{value}</p>
    </div>
  );
}

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function SubscribersCMS() {
  const data = useQuery(api.subscribers.listSubscribers, {});

  if (data === undefined) {
    return (
      <div className="flex items-center justify-center py-24">
        <svg className="animate-spin w-6 h-6 text-accent/50" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total subscribers" value={data.total} />
        <StatCard label="Last 24 hours" value={data.last24h} highlight={data.last24h > 0} />
        <StatCard label="Last 7 days" value={data.last7d} highlight={data.last7d > 0} />
      </div>

      {/* Table */}
      <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/[0.06]">
          <h2 className="font-display font-bold text-base text-offwhite">
            Subscribers
            <span className="ml-2 font-normal text-gray-secondary text-sm">({data.total})</span>
          </h2>
        </div>

        {data.subscribers.length === 0 ? (
          <div className="py-12 text-center font-body text-sm text-gray-secondary/50">
            No subscribers yet.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06]">
                  {["First name", "Last name", "Email", "Signed up"].map((h) => (
                    <th key={h} className="px-5 py-3 text-left font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary/60">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((s, i) => (
                  <tr
                    key={s._id}
                    className={`border-b border-white/[0.04] last:border-0 transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}
                  >
                    <td className="px-5 py-3 font-body text-sm text-offwhite/90">
                      {s.firstName ?? <span className="text-gray-secondary/40">—</span>}
                    </td>
                    <td className="px-5 py-3 font-body text-sm text-offwhite/90">
                      {s.lastName ?? <span className="text-gray-secondary/40">—</span>}
                    </td>
                    <td className="px-5 py-3 font-body text-sm text-gray-muted">
                      {s.email}
                    </td>
                    <td className="px-5 py-3 font-body text-sm text-gray-secondary/70 whitespace-nowrap">
                      {formatDate(s.subscribedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
