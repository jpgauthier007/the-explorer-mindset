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
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lastName: v.optional(v.string()),
    preferredLang: v.optional(v.string()),
  },
  handler: async (ctx, { email, firstName, lastName, preferredLang }) => {
    const normalizedEmail = validateEmail(email);
    const profileFields = {
      ...(firstName !== undefined && { firstName: firstName.trim() }),
      ...(lastName !== undefined && { lastName: lastName.trim() }),
      ...(preferredLang !== undefined && { preferredLang }),
    };

    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", normalizedEmail))
      .first();

    if (existing) {
      if (existing.unsubscribedAt) {
        // Re-subscribe: update profile and clear unsubscribe
        await ctx.db.patch(existing._id, {
          ...profileFields,
          unsubscribedAt: undefined,
        });
        return { success: true, alreadySubscribed: false };
      }
      // Already active: update profile fields if provided
      if (Object.keys(profileFields).length > 0) {
        await ctx.db.patch(existing._id, profileFields);
      }
      return { success: true, alreadySubscribed: true };
    }

    await ctx.db.insert("subscribers", {
      email: normalizedEmail,
      ...profileFields,
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
