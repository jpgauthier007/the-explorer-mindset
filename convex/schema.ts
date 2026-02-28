import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    preferredLang: v.optional(v.string()),
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
  }).index("by_email", ["email"]),

  gratitudeFeatured: defineTable({
    name: v.string(),
    roleEn: v.string(),
    roleFr: v.string(),
    noteEn: v.string(),
    noteFr: v.string(),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  gratitudeGroups: defineTable({
    labelEn: v.string(),
    labelFr: v.string(),
    names: v.array(v.string()),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }),

  resources: defineTable({
    section: v.union(v.literal("worksheets"), v.literal("extras")),
    titleEn: v.string(),
    titleFr: v.string(),
    descriptionEn: v.string(),
    descriptionFr: v.string(),
    fileIdEn: v.optional(v.id("_storage")),
    fileNameEn: v.optional(v.string()),
    fileIdFr: v.optional(v.id("_storage")),
    fileNameFr: v.optional(v.string()),
    published: v.boolean(),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_section", ["section"]),
});
