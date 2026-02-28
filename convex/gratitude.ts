import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// ─── Featured people ──────────────────────────────────────────────────────────

export const listFeatured = query({
  args: {},
  handler: async (ctx) => {
    const items = await ctx.db.query("gratitudeFeatured").collect();
    return items.sort((a, b) => a.order - b.order);
  },
});

export const createFeatured = mutation({
  args: {
    name: v.string(),
    roleEn: v.string(),
    roleFr: v.string(),
    noteEn: v.string(),
    noteFr: v.string(),
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
  },
  handler: async (ctx, { id, ...fields }) => {
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const removeFeatured = mutation({
  args: { id: v.id("gratitudeFeatured") },
  handler: async (ctx, { id }) => {
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
