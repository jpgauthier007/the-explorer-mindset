"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";

type FeaturedItem = {
  _id: Id<"gratitudeFeatured">;
  name: string;
  roleEn: string;
  roleFr: string;
  noteEn: string;
  noteFr: string;
  photoId?: Id<"_storage">;
  photoUrl: string | null;
  order: number;
};

type GroupItem = {
  _id: Id<"gratitudeGroups">;
  labelEn: string;
  labelFr: string;
  descriptionEn?: string;
  descriptionFr?: string;
  names: string[];
  order: number;
};

const EMPTY_FEATURED = { name: "", roleEn: "", roleFr: "", noteEn: "", noteFr: "" };
const EMPTY_GROUP = { labelEn: "", labelFr: "", descriptionEn: "", descriptionFr: "", namesRaw: "" };

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body";
const textareaCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body resize-none";
const labelCls = "block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5";

function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconTrash() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}
function IconPlus() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}
function IconPerson() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
function IconGroup() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
function IconCamera() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  );
}

// ─── Photo upload zone ────────────────────────────────────────────────────────

function PhotoUploadZone({
  file,
  existingUrl,
  onFileChange,
}: {
  file: File | null;
  existingUrl?: string | null;
  onFileChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const previewUrl = file ? URL.createObjectURL(file) : existingUrl;

  return (
    <div>
      <label className={labelCls}>Photo (optional)</label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`w-full flex flex-col items-center gap-2 py-4 rounded-lg border border-dashed transition-all duration-200 ${
          previewUrl
            ? "border-accent/40 bg-accent/[0.04]"
            : "border-white/[0.10] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
      >
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-16 h-16 rounded-full object-cover border-2 border-accent/30"
          />
        ) : (
          <span className="text-gray-secondary/40"><IconCamera /></span>
        )}
        <span className={`font-body text-xs ${previewUrl ? "text-accent/70" : "text-gray-secondary/50"}`}>
          {previewUrl ? (existingUrl && !file ? "Click to replace" : file?.name) : "Click to upload photo"}
        </span>
      </button>
      <input
        ref={ref}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

// ─── Featured panel ───────────────────────────────────────────────────────────

function FeaturedPanel() {
  const featured = useQuery(api.gratitude.listFeatured, {});
  const generateUploadUrl = useMutation(api.gratitude.generateUploadUrl);
  const createFeatured = useMutation(api.gratitude.createFeatured);
  const updateFeatured = useMutation(api.gratitude.updateFeatured);
  const removeFeatured = useMutation(api.gratitude.removeFeatured);

  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_FEATURED);
  const [addPhoto, setAddPhoto] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const [editingId, setEditingId] = useState<Id<"gratitudeFeatured"> | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FEATURED);
  const [editPhoto, setEditPhoto] = useState<File | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<Id<"gratitudeFeatured"> | null>(null);

  async function uploadPhoto(file: File) {
    const url = await generateUploadUrl();
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    return storageId as Id<"_storage">;
  }

  async function handleAdd() {
    if (!addForm.name.trim()) return;
    setUploading(true);
    try {
      const photoId = addPhoto ? await uploadPhoto(addPhoto) : undefined;
      await createFeatured({ ...addForm, photoId });
      setAddForm(EMPTY_FEATURED);
      setAddPhoto(null);
      setIsAdding(false);
    } finally {
      setUploading(false);
    }
  }

  async function handleUpdate() {
    if (!editingId) return;
    setUploading(true);
    try {
      const photoId = editPhoto ? await uploadPhoto(editPhoto) : undefined;
      await updateFeatured({ id: editingId, ...editForm, photoId });
      setEditingId(null);
      setEditPhoto(null);
    } finally {
      setUploading(false);
    }
  }

  function openEdit(item: FeaturedItem) {
    setIsAdding(false);
    setDeleteConfirmId(null);
    setEditPhoto(null);
    setEditingId(item._id);
    setEditForm({ name: item.name, roleEn: item.roleEn, roleFr: item.roleFr, noteEn: item.noteEn, noteFr: item.noteFr });
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-gray-secondary">Section</p>
          <h2 className="font-display font-bold text-base text-offwhite mt-0.5 flex items-center gap-2">
            <span className="text-accent/70"><IconPerson /></span>
            Featured People
          </h2>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); setDeleteConfirmId(null); setAddForm(EMPTY_FEATURED); setAddPhoto(null); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent hover:text-offwhite transition-all duration-200"
        >
          <IconPlus />Add
        </button>
      </div>

      <div className="p-4 space-y-3">
        {featured?.length === 0 && !isAdding && (
          <div className="py-5 flex flex-col items-center gap-2 text-center">
            <p className="font-body text-sm text-gray-secondary/50">No featured people yet.</p>
            <button onClick={() => setIsAdding(true)} className="font-display text-xs uppercase tracking-[0.1em] text-accent/70 hover:text-accent transition-colors">
              Add your first person →
            </button>
          </div>
        )}

        {featured?.map((item) => (
          <div key={item._id} className="border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02]">
              {/* Avatar thumbnail */}
              {item.photoUrl ? (
                <img src={item.photoUrl} alt={item.name} className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/[0.1]" />
              ) : (
                <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] shrink-0 flex items-center justify-center text-gray-secondary/40">
                  <IconPerson />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-offwhite truncate">{item.name}</p>
                <p className="font-body text-xs text-gray-secondary/60 truncate mt-0.5">{item.roleEn}</p>
              </div>
              <button onClick={() => openEdit(item)}
                className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]">
                <IconEdit />
              </button>
              <button onClick={() => { setEditingId(null); setIsAdding(false); setDeleteConfirmId(item._id); }}
                className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10">
                <IconTrash />
              </button>
            </div>

            {deleteConfirmId === item._id && (
              <div className="px-4 py-3 bg-red-500/[0.06] border-t border-red-500/10 flex items-center justify-between gap-3">
                <p className="font-body text-sm text-red-400">Delete <strong>{item.name}</strong>?</p>
                <div className="flex gap-2">
                  <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
                  <button onClick={() => { removeFeatured({ id: item._id }); setDeleteConfirmId(null); }} className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10">Delete</button>
                </div>
              </div>
            )}

            {editingId === item._id && (
              <div className="px-4 py-4 border-t border-white/[0.06] bg-white/[0.01] space-y-3">
                <PhotoUploadZone file={editPhoto} existingUrl={item.photoUrl} onFileChange={setEditPhoto} />
                <div>
                  <label className={labelCls}>Name</label>
                  <input className={inputCls} value={editForm.name} onChange={e => setEditForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Role (EN)</label><input className={inputCls} value={editForm.roleEn} onChange={e => setEditForm(f => ({ ...f, roleEn: e.target.value }))} /></div>
                  <div><label className={labelCls}>Rôle (FR)</label><input className={inputCls} value={editForm.roleFr} onChange={e => setEditForm(f => ({ ...f, roleFr: e.target.value }))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Note (EN)</label><textarea className={textareaCls} rows={3} value={editForm.noteEn} onChange={e => setEditForm(f => ({ ...f, noteEn: e.target.value }))} /></div>
                  <div><label className={labelCls}>Note (FR)</label><textarea className={textareaCls} rows={3} value={editForm.noteFr} onChange={e => setEditForm(f => ({ ...f, noteFr: e.target.value }))} /></div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
                  <button onClick={handleUpdate} disabled={uploading} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover disabled:opacity-50">
                    {uploading ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border border-white/[0.08] border-dashed rounded-xl p-4 space-y-3">
            <PhotoUploadZone file={addPhoto} onFileChange={setAddPhoto} />
            <div>
              <label className={labelCls}>Name</label>
              <input className={inputCls} placeholder="Sean Downey" value={addForm.name} onChange={e => setAddForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Role (EN)</label><input className={inputCls} placeholder="Foreword" value={addForm.roleEn} onChange={e => setAddForm(f => ({ ...f, roleEn: e.target.value }))} /></div>
              <div><label className={labelCls}>Rôle (FR)</label><input className={inputCls} placeholder="Préface" value={addForm.roleFr} onChange={e => setAddForm(f => ({ ...f, roleFr: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Note (EN)</label><textarea className={textareaCls} rows={3} placeholder="Your words opened the door..." value={addForm.noteEn} onChange={e => setAddForm(f => ({ ...f, noteEn: e.target.value }))} /></div>
              <div><label className={labelCls}>Note (FR)</label><textarea className={textareaCls} rows={3} placeholder="Vos mots ont ouvert la voie..." value={addForm.noteFr} onChange={e => setAddForm(f => ({ ...f, noteFr: e.target.value }))} /></div>
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
              <button onClick={handleAdd} disabled={uploading} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover disabled:opacity-50">
                {uploading ? "Saving…" : "Save person"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Groups panel ─────────────────────────────────────────────────────────────

function GroupsPanel() {
  const groups = useQuery(api.gratitude.listGroups, {});
  const createGroup = useMutation(api.gratitude.createGroup);
  const updateGroup = useMutation(api.gratitude.updateGroup);
  const removeGroup = useMutation(api.gratitude.removeGroup);

  const [isAdding, setIsAdding] = useState(false);
  const [addForm, setAddForm] = useState(EMPTY_GROUP);
  const [editingId, setEditingId] = useState<Id<"gratitudeGroups"> | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_GROUP);
  const [deleteConfirmId, setDeleteConfirmId] = useState<Id<"gratitudeGroups"> | null>(null);

  function parseNames(raw: string) {
    return raw.split("\n").map(n => n.trim()).filter(Boolean);
  }

  async function handleAdd() {
    if (!addForm.labelEn.trim()) return;
    await createGroup({
      labelEn: addForm.labelEn, labelFr: addForm.labelFr,
      descriptionEn: addForm.descriptionEn || undefined,
      descriptionFr: addForm.descriptionFr || undefined,
      names: parseNames(addForm.namesRaw),
    });
    setAddForm(EMPTY_GROUP);
    setIsAdding(false);
  }

  async function handleUpdate() {
    if (!editingId) return;
    await updateGroup({
      id: editingId,
      labelEn: editForm.labelEn, labelFr: editForm.labelFr,
      descriptionEn: editForm.descriptionEn || undefined,
      descriptionFr: editForm.descriptionFr || undefined,
      names: parseNames(editForm.namesRaw),
    });
    setEditingId(null);
  }

  function openEdit(item: GroupItem) {
    setIsAdding(false);
    setDeleteConfirmId(null);
    setEditingId(item._id);
    setEditForm({
      labelEn: item.labelEn, labelFr: item.labelFr,
      descriptionEn: item.descriptionEn ?? "",
      descriptionFr: item.descriptionFr ?? "",
      namesRaw: item.names.join("\n"),
    });
  }

  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-gray-secondary">Section</p>
          <h2 className="font-display font-bold text-base text-offwhite mt-0.5 flex items-center gap-2">
            <span className="text-accent/70"><IconGroup /></span>
            Name Groups
          </h2>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); setDeleteConfirmId(null); setAddForm(EMPTY_GROUP); }}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent hover:text-offwhite transition-all duration-200"
        >
          <IconPlus />Add
        </button>
      </div>

      <div className="p-4 space-y-3">
        {groups?.length === 0 && !isAdding && (
          <div className="py-5 flex flex-col items-center gap-2 text-center">
            <p className="font-body text-sm text-gray-secondary/50">No groups yet.</p>
            <button onClick={() => setIsAdding(true)} className="font-display text-xs uppercase tracking-[0.1em] text-accent/70 hover:text-accent transition-colors">
              Add your first group →
            </button>
          </div>
        )}

        {groups?.map((item) => (
          <div key={item._id} className="border border-white/[0.06] rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02]">
              <div className="flex-1 min-w-0">
                <p className="font-display text-sm font-semibold text-offwhite truncate">{item.labelEn} / {item.labelFr}</p>
                <p className="font-body text-xs text-gray-secondary/60 mt-0.5">{item.names.length} name{item.names.length !== 1 ? "s" : ""}</p>
              </div>
              <button onClick={() => openEdit(item)}
                className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]">
                <IconEdit />
              </button>
              <button onClick={() => { setEditingId(null); setIsAdding(false); setDeleteConfirmId(item._id); }}
                className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10">
                <IconTrash />
              </button>
            </div>

            {deleteConfirmId === item._id && (
              <div className="px-4 py-3 bg-red-500/[0.06] border-t border-red-500/10 flex items-center justify-between gap-3">
                <p className="font-body text-sm text-red-400">Delete <strong>{item.labelEn}</strong> and all its names?</p>
                <div className="flex gap-2">
                  <button onClick={() => setDeleteConfirmId(null)} className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
                  <button onClick={() => { removeGroup({ id: item._id }); setDeleteConfirmId(null); }} className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10">Delete</button>
                </div>
              </div>
            )}

            {editingId === item._id && (
              <div className="px-4 py-4 border-t border-white/[0.06] bg-white/[0.01] space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Label (EN)</label><input className={inputCls} value={editForm.labelEn} onChange={e => setEditForm(f => ({ ...f, labelEn: e.target.value }))} /></div>
                  <div><label className={labelCls}>Libellé (FR)</label><input className={inputCls} value={editForm.labelFr} onChange={e => setEditForm(f => ({ ...f, labelFr: e.target.value }))} /></div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className={labelCls}>Description (EN)</label><textarea className={textareaCls} rows={2} value={editForm.descriptionEn} onChange={e => setEditForm(f => ({ ...f, descriptionEn: e.target.value }))} /></div>
                  <div><label className={labelCls}>Description (FR)</label><textarea className={textareaCls} rows={2} value={editForm.descriptionFr} onChange={e => setEditForm(f => ({ ...f, descriptionFr: e.target.value }))} /></div>
                </div>
                <div>
                  <label className={labelCls}>Names — one per line</label>
                  <textarea className={textareaCls} rows={6} value={editForm.namesRaw} onChange={e => setEditForm(f => ({ ...f, namesRaw: e.target.value }))} />
                </div>
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
                  <button onClick={handleUpdate} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover">Save</button>
                </div>
              </div>
            )}
          </div>
        ))}

        {isAdding && (
          <div className="border border-white/[0.08] border-dashed rounded-xl p-4 space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Label (EN)</label><input className={inputCls} placeholder="Reviewers" value={addForm.labelEn} onChange={e => setAddForm(f => ({ ...f, labelEn: e.target.value }))} /></div>
              <div><label className={labelCls}>Libellé (FR)</label><input className={inputCls} placeholder="Réviseurs" value={addForm.labelFr} onChange={e => setAddForm(f => ({ ...f, labelFr: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className={labelCls}>Description (EN)</label><textarea className={textareaCls} rows={2} placeholder="A special thank you to all those who read the manuscript and provided feedback." value={addForm.descriptionEn} onChange={e => setAddForm(f => ({ ...f, descriptionEn: e.target.value }))} /></div>
              <div><label className={labelCls}>Description (FR)</label><textarea className={textareaCls} rows={2} placeholder="Un merci tout spécial à ceux qui ont lu le manuscrit et fourni leurs commentaires." value={addForm.descriptionFr} onChange={e => setAddForm(f => ({ ...f, descriptionFr: e.target.value }))} /></div>
            </div>
            <div>
              <label className={labelCls}>Names — one per line</label>
              <textarea className={textareaCls} rows={5} placeholder={"Anaïs\nLouis\nJules"} value={addForm.namesRaw} onChange={e => setAddForm(f => ({ ...f, namesRaw: e.target.value }))} />
            </div>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary border border-white/[0.08] rounded-lg">Cancel</button>
              <button onClick={handleAdd} className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover">Save group</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function GratitudeCMS() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <FeaturedPanel />
      <GroupsPanel />
    </div>
  );
}
