import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  subscribers: defineTable({
    email: v.string(),
    subscribedAt: v.number(),
  }).index("by_email", ["email"]),
});
