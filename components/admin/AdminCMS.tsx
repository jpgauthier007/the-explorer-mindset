"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Id } from "@/convex/_generated/dataModel";
import { GratitudeCMS } from "./GratitudeCMS";

type Section = "worksheets" | "extras";

type Resource = {
  _id: Id<"resources">;
  section: Section;
  titleEn: string;
  titleFr: string;
  descriptionEn: string;
  descriptionFr: string;
  fileNameEn?: string;
  fileNameFr?: string;
  published: boolean;
  urlEn: string | null;
  urlFr: string | null;
  order: number;
};

const EMPTY_FORM = { titleEn: "", titleFr: "", descriptionEn: "", descriptionFr: "" };

// ─── Icons ────────────────────────────────────────────────────────────────────

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  );
}
function IconEdit() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-4 h-4">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}
function IconChevronUp() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
      <polyline points="18 15 12 9 6 15" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
      <polyline points="6 9 12 15 18 9" />
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
function IconUpload() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-6 h-6">
      <polyline points="16 16 12 12 8 16" />
      <line x1="12" y1="12" x2="12" y2="21" />
      <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
    </svg>
  );
}
function Spinner() {
  return (
    <svg className="animate-spin w-3 h-3" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ─── Shared styles ────────────────────────────────────────────────────────────

const inputCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body";
const textareaCls =
  "w-full bg-white/[0.04] border border-white/[0.08] rounded-lg px-3 py-2 text-sm text-offwhite placeholder:text-gray-secondary/40 focus:outline-none focus:border-accent/40 transition-colors font-body resize-none";
const labelCls = "block font-display text-[10px] uppercase tracking-[0.12em] text-gray-secondary mb-1.5";

// ─── PDF upload zone ──────────────────────────────────────────────────────────

function PdfUploadZone({
  lang,
  file,
  existingName,
  onFileChange,
}: {
  lang: "EN" | "FR";
  file: File | null;
  existingName?: string;
  onFileChange: (f: File | null) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const hasFile = file || existingName;
  const displayName = file ? file.name : existingName;

  return (
    <div>
      <label className={labelCls}>PDF ({lang})</label>
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className={`w-full flex flex-col items-center gap-2 py-5 rounded-lg border border-dashed transition-all duration-200 ${
          hasFile
            ? "border-accent/40 bg-accent/[0.04]"
            : "border-white/[0.10] bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
        }`}
      >
        <span className={hasFile ? "text-accent/70" : "text-gray-secondary/40"}>
          <IconUpload />
        </span>
        {displayName ? (
          <span className="font-body text-xs text-offwhite px-2 text-center break-all leading-relaxed">
            {displayName}
          </span>
        ) : (
          <span className="font-body text-xs text-gray-secondary/50">Click to select</span>
        )}
        {existingName && !file && (
          <span className="font-display text-[9px] uppercase tracking-[0.1em] text-gray-secondary/40">
            Click to replace
          </span>
        )}
      </button>
      <input
        ref={ref}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => onFileChange(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}

// ─── Text fields ──────────────────────────────────────────────────────────────

function ResourceForm({
  form,
  onChange,
}: {
  form: typeof EMPTY_FORM;
  onChange: (f: typeof EMPTY_FORM) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Title (EN)</label>
          <input className={inputCls} placeholder="90 Days Plan" value={form.titleEn}
            onChange={(e) => onChange({ ...form, titleEn: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Titre (FR)</label>
          <input className={inputCls} placeholder="Plan 90 jours" value={form.titleFr}
            onChange={(e) => onChange({ ...form, titleFr: e.target.value })} />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className={labelCls}>Description (EN)</label>
          <textarea className={textareaCls} rows={3}
            placeholder="A structured plan to build your Explorer Mindset habits."
            value={form.descriptionEn}
            onChange={(e) => onChange({ ...form, descriptionEn: e.target.value })} />
        </div>
        <div>
          <label className={labelCls}>Description (FR)</label>
          <textarea className={textareaCls} rows={3}
            placeholder="Un plan structuré pour ancrer vos habitudes."
            value={form.descriptionFr}
            onChange={(e) => onChange({ ...form, descriptionFr: e.target.value })} />
        </div>
      </div>
    </div>
  );
}

// ─── Resource row ─────────────────────────────────────────────────────────────

function ResourceRow({
  resource, isEditing, editForm, editFileEn, editFileFr,
  isConfirmingDelete, isFirst, isLast, onMoveUp, onMoveDown,
  onToggle, onEdit, onEditChange,
  onEditFileEnChange, onEditFileFrChange,
  onEditSave, onEditCancel, onDeleteRequest, onDeleteConfirm, onDeleteCancel,
}: {
  resource: Resource;
  isEditing: boolean;
  editForm: typeof EMPTY_FORM;
  editFileEn: File | null;
  editFileFr: File | null;
  isConfirmingDelete: boolean;
  isFirst: boolean;
  isLast: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onToggle: () => void;
  onEdit: () => void;
  onEditChange: (f: typeof EMPTY_FORM) => void;
  onEditFileEnChange: (f: File | null) => void;
  onEditFileFrChange: (f: File | null) => void;
  onEditSave: () => void;
  onEditCancel: () => void;
  onDeleteRequest: () => void;
  onDeleteConfirm: () => void;
  onDeleteCancel: () => void;
}) {
  return (
    <div className="border border-white/[0.06] rounded-xl overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 bg-white/[0.02]">
        <div className="text-gray-secondary/50"><IconFile /></div>
        <div className="flex-1 min-w-0">
          <p className="font-display text-sm font-semibold text-offwhite truncate">
            {resource.titleEn}
            {resource.titleFr && resource.titleFr !== resource.titleEn && (
              <span className="text-gray-secondary font-normal ml-2">/ {resource.titleFr}</span>
            )}
          </p>
          <div className="flex gap-3 mt-0.5">
            {resource.fileNameEn && (
              <span className="font-body text-[11px] text-gray-secondary/50">
                EN: {resource.fileNameEn}
              </span>
            )}
            {resource.fileNameFr && (
              <span className="font-body text-[11px] text-gray-secondary/50">
                FR: {resource.fileNameFr}
              </span>
            )}
            {!resource.fileNameEn && !resource.fileNameFr && (
              <span className="font-body text-[11px] text-amber-400/60">No PDFs uploaded</span>
            )}
          </div>
        </div>

        <button onClick={onToggle}
          className={`shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.08em] border transition-all duration-200 ${
            resource.published
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20"
              : "bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20"
          }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${resource.published ? "bg-emerald-400" : "bg-amber-400"}`} />
          {resource.published ? "Published" : "Draft"}
        </button>

        {/* Reorder */}
        <div className="shrink-0 flex flex-col gap-0.5">
          <button onClick={onMoveUp} disabled={isFirst}
            className="p-1 text-gray-secondary/40 hover:text-offwhite disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded hover:bg-white/[0.06]">
            <IconChevronUp />
          </button>
          <button onClick={onMoveDown} disabled={isLast}
            className="p-1 text-gray-secondary/40 hover:text-offwhite disabled:opacity-20 disabled:cursor-not-allowed transition-colors rounded hover:bg-white/[0.06]">
            <IconChevronDown />
          </button>
        </div>

        <button onClick={onEdit}
          className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-offwhite transition-colors rounded-md hover:bg-white/[0.06]">
          <IconEdit />
        </button>
        <button onClick={onDeleteRequest}
          className="shrink-0 p-1.5 text-gray-secondary/50 hover:text-red-400 transition-colors rounded-md hover:bg-red-500/10">
          <IconTrash />
        </button>
      </div>

      {isConfirmingDelete && (
        <div className="px-4 py-3 bg-red-500/[0.06] border-t border-red-500/10 flex items-center justify-between gap-3">
          <p className="font-body text-sm text-red-400">
            Delete <strong>{resource.titleEn}</strong> and all its PDFs permanently?
          </p>
          <div className="flex gap-2 shrink-0">
            <button onClick={onDeleteCancel}
              className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary hover:text-offwhite border border-white/[0.08] rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={onDeleteConfirm}
              className="px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] text-red-400 border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all">
              Delete
            </button>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="px-4 py-4 border-t border-white/[0.06] bg-white/[0.01] space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <PdfUploadZone lang="EN" file={editFileEn} existingName={resource.fileNameEn}
              onFileChange={onEditFileEnChange} />
            <PdfUploadZone lang="FR" file={editFileFr} existingName={resource.fileNameFr}
              onFileChange={onEditFileFrChange} />
          </div>
          <ResourceForm form={editForm} onChange={onEditChange} />
          <div className="flex gap-2 justify-end">
            <button onClick={onEditCancel}
              className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary hover:text-offwhite border border-white/[0.08] rounded-lg transition-colors">
              Cancel
            </button>
            <button onClick={onEditSave}
              className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover transition-colors">
              Save changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Add form ─────────────────────────────────────────────────────────────────

function AddForm({
  form, fileEn, fileFr, uploading, error,
  onChange, onFileEnChange, onFileFrChange, onSave, onCancel,
}: {
  form: typeof EMPTY_FORM;
  fileEn: File | null;
  fileFr: File | null;
  uploading: boolean;
  error: string | null;
  onChange: (f: typeof EMPTY_FORM) => void;
  onFileEnChange: (f: File | null) => void;
  onFileFrChange: (f: File | null) => void;
  onSave: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="border border-white/[0.08] border-dashed rounded-xl p-5 space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <PdfUploadZone lang="EN" file={fileEn} onFileChange={onFileEnChange} />
        <PdfUploadZone lang="FR" file={fileFr} onFileChange={onFileFrChange} />
      </div>

      <ResourceForm form={form} onChange={onChange} />

      {error && <p className="font-body text-sm text-red-400">{error}</p>}

      <div className="flex gap-2 justify-end">
        <button onClick={onCancel}
          className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] text-gray-secondary hover:text-offwhite border border-white/[0.08] rounded-lg transition-colors">
          Cancel
        </button>
        <button onClick={onSave} disabled={uploading}
          className="px-4 py-2 text-xs font-display uppercase tracking-[0.08em] bg-accent text-offwhite rounded-lg hover:bg-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
          {uploading && <Spinner />}
          {uploading ? "Uploading…" : "Save resource"}
        </button>
      </div>
    </div>
  );
}

// ─── Section panel ────────────────────────────────────────────────────────────

function SectionPanel({
  title, section, resources, isAdding, addForm, addFileEn, addFileFr,
  uploading, addError, editingId, editForm, editFileEn, editFileFr,
  deleteConfirmId, onAddOpen, onAddFormChange, onAddFileEnChange, onAddFileFrChange,
  onAddSave, onAddCancel, onToggle, onEditOpen, onEditFormChange,
  onEditFileEnChange, onEditFileFrChange, onEditSave, onEditCancel,
  onDeleteRequest, onDeleteConfirm, onDeleteCancel,
}: {
  title: string; section: Section; resources: Resource[];
  isAdding: boolean; addForm: typeof EMPTY_FORM; addFileEn: File | null; addFileFr: File | null;
  uploading: boolean; addError: string | null; editingId: Id<"resources"> | null;
  editForm: typeof EMPTY_FORM; editFileEn: File | null; editFileFr: File | null;
  deleteConfirmId: Id<"resources"> | null;
  onAddOpen: () => void; onAddFormChange: (f: typeof EMPTY_FORM) => void;
  onAddFileEnChange: (f: File | null) => void; onAddFileFrChange: (f: File | null) => void;
  onAddSave: () => void; onAddCancel: () => void;
  onToggle: (id: Id<"resources">) => void; onEditOpen: (r: Resource) => void;
  onEditFormChange: (f: typeof EMPTY_FORM) => void;
  onEditFileEnChange: (f: File | null) => void; onEditFileFrChange: (f: File | null) => void;
  onEditSave: () => void; onEditCancel: () => void;
  onMove: (id: Id<"resources">, direction: "up" | "down") => void;
  onDeleteRequest: (id: Id<"resources">) => void;
  onDeleteConfirm: () => void; onDeleteCancel: () => void;
}) {
  return (
    <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div>
          <p className="font-display text-xs uppercase tracking-[0.14em] text-gray-secondary">Section</p>
          <h2 className="font-display font-bold text-base text-offwhite mt-0.5">{title}</h2>
        </div>
        <button onClick={onAddOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display uppercase tracking-[0.08em] bg-accent/10 text-accent border border-accent/20 rounded-lg hover:bg-accent hover:text-offwhite transition-all duration-200">
          <IconPlus />Add
        </button>
      </div>

      <div className="p-4 space-y-3">
        {resources.length === 0 && !isAdding && (
          <div className="py-5 flex flex-col items-center gap-2 text-center">
            <span className="text-gray-secondary/30"><IconFile /></span>
            <p className="font-body text-sm text-gray-secondary/50">No resources yet.</p>
            <button onClick={onAddOpen}
              className="mt-1 font-display text-xs uppercase tracking-[0.1em] text-accent/70 hover:text-accent transition-colors">
              Add your first resource →
            </button>
          </div>
        )}

        {resources.map((r, i) => (
          <ResourceRow
            key={r._id} resource={r}
            isEditing={editingId === r._id} editForm={editForm}
            editFileEn={editFileEn} editFileFr={editFileFr}
            isConfirmingDelete={deleteConfirmId === r._id}
            isFirst={i === 0} isLast={i === resources.length - 1}
            onMoveUp={() => onMove(r._id, "up")} onMoveDown={() => onMove(r._id, "down")}
            onToggle={() => onToggle(r._id)} onEdit={() => onEditOpen(r)}
            onEditChange={onEditFormChange}
            onEditFileEnChange={onEditFileEnChange} onEditFileFrChange={onEditFileFrChange}
            onEditSave={onEditSave} onEditCancel={onEditCancel}
            onDeleteRequest={() => onDeleteRequest(r._id)}
            onDeleteConfirm={onDeleteConfirm} onDeleteCancel={onDeleteCancel}
          />
        ))}

        {isAdding && (
          <AddForm
            form={addForm} fileEn={addFileEn} fileFr={addFileFr}
            uploading={uploading} error={addError}
            onChange={onAddFormChange}
            onFileEnChange={onAddFileEnChange} onFileFrChange={onAddFileFrChange}
            onSave={onAddSave} onCancel={onAddCancel}
          />
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function AdminCMS() {
  const resources = useQuery(api.resources.list, {});
  const generateUploadUrl = useMutation(api.resources.generateUploadUrl);
  const createResource = useMutation(api.resources.create);
  const updateResource = useMutation(api.resources.update);
  const togglePublished = useMutation(api.resources.togglePublished);
  const moveResource = useMutation(api.resources.moveResource);
  const removeResource = useMutation(api.resources.remove);

  const [addingSection, setAddingSection] = useState<Section | null>(null);
  const [addForm, setAddForm] = useState(EMPTY_FORM);
  const [addFileEn, setAddFileEn] = useState<File | null>(null);
  const [addFileFr, setAddFileFr] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<Id<"resources"> | null>(null);
  const [editForm, setEditForm] = useState(EMPTY_FORM);
  const [editFileEn, setEditFileEn] = useState<File | null>(null);
  const [editFileFr, setEditFileFr] = useState<File | null>(null);

  const [deleteConfirmId, setDeleteConfirmId] = useState<Id<"resources"> | null>(null);

  const worksheets = resources?.filter((r) => r.section === "worksheets") ?? [];
  const extras = resources?.filter((r) => r.section === "extras") ?? [];

  async function uploadFile(file: File) {
    const url = await generateUploadUrl();
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": file.type }, body: file });
    const { storageId } = await res.json();
    return { storageId, fileName: file.name };
  }

  async function handleAdd(section: Section) {
    if (!addFileEn && !addFileFr) { setAddError("Upload at least one PDF (EN or FR)."); return; }
    if (!addForm.titleEn.trim()) { setAddError("English title is required."); return; }
    setUploading(true);
    setAddError(null);
    try {
      const [en, fr] = await Promise.all([
        addFileEn ? uploadFile(addFileEn) : null,
        addFileFr ? uploadFile(addFileFr) : null,
      ]);
      await createResource({
        section, ...addForm,
        fileIdEn: en?.storageId, fileNameEn: en?.fileName,
        fileIdFr: fr?.storageId, fileNameFr: fr?.fileName,
      });
      setAddForm(EMPTY_FORM);
      setAddFileEn(null);
      setAddFileFr(null);
      setAddingSection(null);
    } catch {
      setAddError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleAddOpen(section: Section) {
    setEditingId(null); setDeleteConfirmId(null);
    setAddForm(EMPTY_FORM); setAddFileEn(null); setAddFileFr(null);
    setAddError(null); setAddingSection(section);
  }

  function handleEditOpen(resource: Resource) {
    setAddingSection(null); setDeleteConfirmId(null);
    setEditingId(resource._id);
    setEditFileEn(null); setEditFileFr(null);
    setEditForm({
      titleEn: resource.titleEn, titleFr: resource.titleFr,
      descriptionEn: resource.descriptionEn, descriptionFr: resource.descriptionFr,
    });
  }

  async function handleEditSave() {
    if (!editingId) return;
    setUploading(true);
    try {
      const [en, fr] = await Promise.all([
        editFileEn ? uploadFile(editFileEn) : null,
        editFileFr ? uploadFile(editFileFr) : null,
      ]);
      await updateResource({
        id: editingId, ...editForm,
        fileIdEn: en?.storageId, fileNameEn: en?.fileName,
        fileIdFr: fr?.storageId, fileNameFr: fr?.fileName,
      });
      setEditingId(null); setEditFileEn(null); setEditFileFr(null);
    } finally {
      setUploading(false);
    }
  }

  const sharedPanelProps = {
    addForm, addFileEn, addFileFr, uploading, addError,
    editingId, editForm, editFileEn, editFileFr, deleteConfirmId,
    onAddFormChange: setAddForm,
    onAddFileEnChange: setAddFileEn, onAddFileFrChange: setAddFileFr,
    onToggle: (id: Id<"resources">) => togglePublished({ id }),
    onMove: (id: Id<"resources">, direction: "up" | "down") => moveResource({ id, direction }),
    onEditFormChange: setEditForm,
    onEditFileEnChange: setEditFileEn, onEditFileFrChange: setEditFileFr,
    onEditSave: handleEditSave, onEditCancel: () => { setEditingId(null); setEditFileEn(null); setEditFileFr(null); },
    onDeleteRequest: (id: Id<"resources">) => { setAddingSection(null); setEditingId(null); setDeleteConfirmId(id); },
    onDeleteConfirm: () => { if (deleteConfirmId) removeResource({ id: deleteConfirmId }); setDeleteConfirmId(null); },
    onDeleteCancel: () => setDeleteConfirmId(null),
  };

  const [activeTab, setActiveTab] = useState<"resources" | "gratitude">("resources");

  const tabs = [
    { id: "resources" as const, label: "Resources" },
    { id: "gratitude" as const, label: "Gratitude" },
  ];

  return (
    <div className="min-h-screen bg-navy-950">
      <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-navy-950/90 backdrop-blur-xl border-b border-white/[0.06] flex items-center px-6 gap-4">
        <a href="/" className="font-display text-sm font-bold uppercase tracking-[0.14em] text-offwhite/80 hover:text-offwhite transition-colors">
          T<span className="text-accent">E</span>M
        </a>
        <span className="w-px h-4 bg-white/[0.12]" />
        <span className="font-display text-xs uppercase tracking-[0.14em] text-gray-secondary">Admin</span>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span className="font-display text-[10px] uppercase tracking-[0.1em] text-gray-secondary">Convex live</span>
        </div>
      </header>

      <main className="pt-24 pb-16 px-6 max-w-5xl mx-auto">
        {/* Tab bar */}
        <div className="flex gap-1 mb-10 bg-white/[0.03] border border-white/[0.06] rounded-xl p-1 w-fit">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-lg font-display text-xs uppercase tracking-[0.1em] transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-accent text-offwhite shadow-sm"
                  : "text-gray-secondary hover:text-offwhite"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "resources" && (
          <>
            <div className="mb-8">
              <h1 className="font-display font-bold text-2xl text-offwhite tracking-tight">Resources CMS</h1>
              <p className="mt-1.5 font-body text-sm text-gray-secondary">
                Upload EN and FR PDFs separately, manage titles and descriptions, publish or unpublish.
              </p>
            </div>
            {resources === undefined ? (
              <div className="flex items-center justify-center py-24">
                <svg className="animate-spin w-6 h-6 text-accent/50" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SectionPanel title="Worksheets" section="worksheets" resources={worksheets}
                  isAdding={addingSection === "worksheets"}
                  onAddOpen={() => handleAddOpen("worksheets")}
                  onAddSave={() => handleAdd("worksheets")}
                  onAddCancel={() => setAddingSection(null)}
                  onEditOpen={handleEditOpen}
                  {...sharedPanelProps} />
                <SectionPanel title="Extras" section="extras" resources={extras}
                  isAdding={addingSection === "extras"}
                  onAddOpen={() => handleAddOpen("extras")}
                  onAddSave={() => handleAdd("extras")}
                  onAddCancel={() => setAddingSection(null)}
                  onEditOpen={handleEditOpen}
                  {...sharedPanelProps} />
              </div>
            )}
          </>
        )}

        {activeTab === "gratitude" && (
          <>
            <div className="mb-8">
              <h1 className="font-display font-bold text-2xl text-offwhite tracking-tight">Gratitude CMS</h1>
              <p className="mt-1.5 font-body text-sm text-gray-secondary">
                Manage featured people and name groups for the Gratitude page.
              </p>
            </div>
            <GratitudeCMS />
          </>
        )}
      </main>
    </div>
  );
}
