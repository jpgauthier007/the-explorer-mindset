import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

// ─── Featured people ──────────────────────────────────────────────────────────

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("gratitudeFeatured").collect();
    items.sort((a, b) => a.order - b.order);
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        photoUrl: item.photoId ? await ctx.storage.getUrl(item.photoId) : null,
      }))
    );
  },
});

export const createFeatured = mutation({
  args: {
    name: v.string(),
    roleEn: v.string(),
    roleFr: v.string(),
    noteEn: v.string(),
    noteFr: v.string(),
    photoId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("gratitudeFeatured").collect();
    return await ctx.db.insert("gratitudeFeatured", {
      ...args,
      order: existing.length,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateFeatured = mutation({
  args: {
    id: v.id("gratitudeFeatured"),
    name: v.string(),
    roleEn: v.string(),
    roleFr: v.string(),
    noteEn: v.string(),
    noteFr: v.string(),
    photoId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, { id, photoId, ...fields }) => {
    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Not found");

    const patch: Record<string, unknown> = { ...fields, updatedAt: Date.now() };

    if (photoId) {
      // Delete old photo if replacing
      if (existing.photoId) await ctx.storage.delete(existing.photoId);
      patch.photoId = photoId;
    }

    await ctx.db.patch(id, patch);
  },
});

export const removeFeatured = mutation({
  args: { id: v.id("gratitudeFeatured") },
  handler: async (ctx, { id }) => {
    const item = await ctx.db.get(id);
    if (item?.photoId) await ctx.storage.delete(item.photoId);
    await ctx.db.delete(id);
  },
});

// ─── Groups ───────────────────────────────────────────────────────────────────

export const listGroups = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("gratitudeGroups").collect();
    return items.sort((a, b) => a.order - b.order);
  },
});

export const createGroup = mutation({
  args: {
    labelEn: v.string(),
    labelFr: v.string(),
    descriptionEn: v.optional(v.string()),
    descriptionFr: v.optional(v.string()),
    names: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("gratitudeGroups").collect();
    return await ctx.db.insert("gratitudeGroups", {
      ...args,
      order: existing.length,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateGroup = mutation({
  args: {
    id: v.id("gratitudeGroups"),
    labelEn: v.string(),
    labelFr: v.string(),
    descriptionEn: v.optional(v.string()),
    descriptionFr: v.optional(v.string()),
    names: v.array(v.string()),
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const removeGroup = mutation({
  args: { id: v.id("gratitudeGroups") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});
