"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body";
const labelCls = "block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5";

const SOURCE_OPTIONS = [
  { value: "", label: "—" },
  { value: "worksheets", label: "Worksheets" },
  { value: "extras", label: "Extras" },
  { value: "assessment", label: "Assessment" },
  { value: "newsletter", label: "Newsletter" },
];

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <div className={`bg-white/[0.02] border rounded-2xl px-6 py-5 ${highlight ? "border-accent/20" : "border-white/[0.06]"}`}>
      <p className="font-display text-[10px] uppercase tracking-[0.14em] text-gray-secondary mb-2">{label}</p>
      <p className={`font-display font-bold text-3xl ${highlight ? "text-accent" : "text-offwhite"}`}>{value}</p>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: number) {
  return new Date(ts).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

function SourceBadge({ source }: { source?: string }) {
  if (!source) return <span className="text-gray-secondary/30 text-xs">—</span>;
  const colors: Record<string, string> = {
    worksheets: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    extras: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    assessment: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    newsletter: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  };
  const cls = colors[source] ?? "bg-white/[0.06] text-gray-muted border-white/[0.08]";
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-display font-semibold uppercase tracking-[0.08em] border ${cls}`}>
      {source}
    </span>
  );
}

// ─── Subscriber row ───────────────────────────────────────────────────────────

type Sub = {
  _id: Id<"subscribers">;
  email: string;
  firstName?: string;
  lastName?: string;
  source?: string;
  resourceTitle?: string;
  subscribedAt: number;
  unsubscribedAt?: number;
};

function SubscriberRow({
  sub,
  i,
  editingId,
  onEditOpen,
  onEditSave,
  onEditCancel,
  onToggle,
}: {
  sub: Sub;
  i: number;
  editingId: Id<"subscribers"> | null;
  onEditOpen: (s: Sub) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onToggle: (id: Id<"subscribers">) => void;
}) {
  const isSubscribed = !sub.unsubscribedAt;
  const isEditing = editingId === sub._id;

  return (
    <tr className={`border-b border-white/[0.04] last:border-0 align-top ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
      <td className="px-5 py-3 font-body text-sm text-offwhite/90">
        {sub.firstName ?? <span className="text-gray-secondary/40">—</span>}
      </td>
      <td className="px-5 py-3 font-body text-sm text-offwhite/90">
        {sub.lastName ?? <span className="text-gray-secondary/40">—</span>}
      </td>
      <td className="px-5 py-3 font-body text-sm text-gray-muted">{sub.email}</td>
      <td className="px-5 py-3">
        <SourceBadge source={sub.source} />
      </td>
      <td className="px-5 py-3 font-body text-xs text-gray-secondary/60 max-w-[160px]">
        {sub.resourceTitle ? (
          <span className="truncate block" title={sub.resourceTitle}>{sub.resourceTitle}</span>
        ) : (
          <span className="text-gray-secondary/30">—</span>
        )}
      </td>
      <td className="px-5 py-3 font-body text-sm text-gray-secondary/70 whitespace-nowrap">
        {formatDate(sub.subscribedAt)}
      </td>
      {/* Subscribed toggle */}
      <td className="px-5 py-3">
        <button
          onClick={() => onToggle(sub._id)}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.08em] border transition-all duration-200 ${
            isSubscribed
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20 hover:bg-red-500/20"
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${isSubscribed ? "bg-emerald-400" : "bg-red-400"}`} />
          {isSubscribed ? "Yes" : "No"}
        </button>
      </td>
      {/* Edit */}
      <td className="px-3 py-3">
        {!isEditing && (
          <button
            onClick={() => onEditOpen(sub)}
            className="p-1.5 text-gray-secondary/50 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]"
          >
            <IconEdit />
          </button>
        )}
        {isEditing && (
          <button
            onClick={onEditCancel}
            className="p-1.5 text-gray-secondary/50 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function SubscribersCMS() {
  const data = useQuery(api.subscribers.listSubscribers, {});
  const updateSubscriber = useMutation(api.subscribers.updateSubscriber);
  const toggleSubscription = useMutation(api.subscribers.toggleSubscription);

  const [editingId, setEditingId] = useState<Id<"subscribers"> | null>(null);
  const [editFirst, setEditFirst] = useState("");
  const [editLast, setEditLast] = useState("");
  const [editSource, setEditSource] = useState("");
  const [editResource, setEditResource] = useState("");

  function openEdit(sub: Sub) {
    setEditingId(sub._id);
    setEditFirst(sub.firstName ?? "");
    setEditLast(sub.lastName ?? "");
    setEditSource(sub.source ?? "");
    setEditResource(sub.resourceTitle ?? "");
  }

  async function saveEdit() {
    if (!editingId) return;
    await updateSubscriber({
      id: editingId,
      firstName: editFirst,
      lastName: editLast,
      source: editSource,
      resourceTitle: editResource,
    });
    setEditingId(null);
  }

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
            All subscribers
            <span className="ml-2 font-normal text-gray-secondary text-sm">({data.subscribers.length})</span>
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
                  {["First name", "Last name", "Email", "Source", "Resource", "Signed up", "Subscribed", ""].map((h, i) => (
                    <th key={i} className="px-5 py-3 text-left font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary/60 last:px-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.subscribers.map((s, i) => (
                  <>
                    <SubscriberRow
                      key={s._id}
                      sub={s}
                      i={i}
                      editingId={editingId}
                      onEditOpen={openEdit}
                      onEditSave={saveEdit}
                      onEditCancel={() => setEditingId(null)}
                      onToggle={(id) => toggleSubscription({ id })}
                    />
                    {/* Inline edit row */}
                    {editingId === s._id && (
                      <tr key={`${s._id}-edit`} className="border-b border-white/[0.04] bg-white/[0.02]">
                        <td colSpan={8} className="px-5 py-4">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className={labelCls}>First name</label>
                              <input
                                className={inputCls}
                                value={editFirst}
                                onChange={(e) => setEditFirst(e.target.value)}
                                placeholder="First name"
                              />
                            </div>
                            <div>
                              <label className={labelCls}>Last name</label>
                              <input
                                className={inputCls}
                                value={editLast}
                                onChange={(e) => setEditLast(e.target.value)}
                                placeholder="Last name"
                              />
                            </div>
                            <div>
                              <label className={labelCls}>Source</label>
                              <select
                                className={inputCls}
                                value={editSource}
                                onChange={(e) => setEditSource(e.target.value)}
                              >
                                {SOURCE_OPTIONS.map((o) => (
                                  <option key={o.value} value={o.value}>{o.label}</option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className={labelCls}>Resource title</label>
                              <input
                                className={inputCls}
                                value={editResource}
                                onChange={(e) => setEditResource(e.target.value)}
                                placeholder="e.g. The Curiosity Map"
                              />
                            </div>
                          </div>
                          <div className="flex gap-2 mt-3 justify-end">
                            <button
                              onClick={() => setEditingId(null)}
                              className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg hover:text-offwhite transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={saveEdit}
                              className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover transition-colors"
                            >
                              Save
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
