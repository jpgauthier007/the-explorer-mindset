import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Admin: list all resources with both resolved URLs
export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("resources").collect();
    items.sort((a, b) => a.order - b.order);
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        urlEn: item.fileIdEn ? await ctx.storage.getUrl(item.fileIdEn) : null,
        urlFr: item.fileIdFr ? await ctx.storage.getUrl(item.fileIdFr) : null,
      }))
    );
  },
});

// Public pages: list by section, return both URLs (only when published)
export const listBySection = query({
  args: {
    section: v.union(v.literal("worksheets"), v.literal("extras")),
  },
  handler: async (ctx, { section }) => {
    const items = await ctx.db
      .query("resources")
      .withIndex("by_section", (q) => q.eq("section", section))
      .collect();
    items.sort((a, b) => a.order - b.order);
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        urlEn: item.published && item.fileIdEn ? await ctx.storage.getUrl(item.fileIdEn) : null,
        urlFr: item.published && item.fileIdFr ? await ctx.storage.getUrl(item.fileIdFr) : null,
      }))
    );
  },
});

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const create = mutation({
  args: {
    section: v.union(v.literal("worksheets"), v.literal("extras")),
    titleEn: v.string(),
    titleFr: v.string(),
    descriptionEn: v.string(),
    descriptionFr: v.string(),
    fileIdEn: v.optional(v.id("_storage")),
    fileNameEn: v.optional(v.string()),
    fileIdFr: v.optional(v.id("_storage")),
    fileNameFr: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("resources")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
    return await ctx.db.insert("resources", {
      ...args,
      published: false,
      order: existing.length,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("resources"),
    titleEn: v.string(),
    titleFr: v.string(),
    descriptionEn: v.string(),
    descriptionFr: v.string(),
    // Optional PDF replacements — if provided, old file is deleted
    fileIdEn: v.optional(v.id("_storage")),
    fileNameEn: v.optional(v.string()),
    fileIdFr: v.optional(v.id("_storage")),
    fileNameFr: v.optional(v.string()),
  },
  handler: async (ctx, { id, fileIdEn, fileNameEn, fileIdFr, fileNameFr, ...fields }) => {
    const resource = await ctx.db.get(id);
    if (!resource) throw new Error("Resource not found");

    const patch: Record<string, unknown> = { ...fields, updatedAt: Date.now() };

    if (fileIdEn && fileNameEn) {
      if (resource.fileIdEn) await ctx.storage.delete(resource.fileIdEn);
      patch.fileIdEn = fileIdEn;
      patch.fileNameEn = fileNameEn;
    }
    if (fileIdFr && fileNameFr) {
      if (resource.fileIdFr) await ctx.storage.delete(resource.fileIdFr);
      patch.fileIdFr = fileIdFr;
      patch.fileNameFr = fileNameFr;
    }

    await ctx.db.patch(id, patch);
  },
});

export const togglePublished = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, { id }) => {
    const resource = await ctx.db.get(id);
    if (!resource) throw new Error("Resource not found");
    await ctx.db.patch(id, { published: !resource.published, updatedAt: Date.now() });
  },
});

export const remove = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, { id }) => {
    const resource = await ctx.db.get(id);
    if (!resource) throw new Error("Resource not found");
    if (resource.fileIdEn) await ctx.storage.delete(resource.fileIdEn);
    if (resource.fileIdFr) await ctx.storage.delete(resource.fileIdFr);
    await ctx.db.delete(id);
  },
});
