import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Admin: list all resources with resolved URLs
export const list = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("resources").collect();
    items.sort((a, b) => a.order - b.order);
    return Promise.all(
      items.map(async (item) => ({
        ...item,
        url: await ctx.storage.getUrl(item.fileId),
      }))
    );
  },
});

// Public pages: list published resources by section, URL only for published
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
        url: item.published ? await ctx.storage.getUrl(item.fileId) : null,
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
    fileId: v.id("_storage"),
    fileName: v.string(),
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
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const togglePublished = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, { id }) => {
    const resource = await ctx.db.get(id);
    if (!resource) throw new Error("Resource not found");
    await ctx.db.patch(id, {
      published: !resource.published,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
  args: { id: v.id("resources") },
  handler: async (ctx, { id }) => {
    const resource = await ctx.db.get(id);
    if (!resource) throw new Error("Resource not found");
    await ctx.storage.delete(resource.fileId);
    await ctx.db.delete(id);
  },
});
