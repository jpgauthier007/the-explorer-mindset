import { mutation } from "./_generated/server";
import { v } from "convex/values";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validateEmail(email: string): string {
  const normalized = email.toLowerCase().trim();

  if (normalized.length === 0 || normalized.length > 254) {
    throw new Error("Invalid email address");
  }
  if (!EMAIL_REGEX.test(normalized)) {
    throw new Error("Invalid email address");
  }

  return normalized;
}

export const subscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalizedEmail = validateEmail(email);

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      // Re-subscribe if previously unsubscribed
      if (existing.unsubscribedAt) {
        await ctx.db.patch(existing._id, { unsubscribedAt: undefined });
        return { success: true, alreadySubscribed: false };
      }
      return { success: true, alreadySubscribed: true };
    }

    await ctx.db.insert("subscribers", {
      email: normalizedEmail,
      subscribedAt: Date.now(),
    });

    return { success: true, alreadySubscribed: false };
  },
});

export const unsubscribe = mutation({
  args: { email: v.string() },
  handler: async (ctx, { email }) => {
    const normalizedEmail = validateEmail(email);

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (!existing) {
      return { success: true };
    }

    if (existing.unsubscribedAt) {
      return { success: true };
    }

    await ctx.db.patch(existing._id, { unsubscribedAt: Date.now() });
    return { success: true };
  },
});
