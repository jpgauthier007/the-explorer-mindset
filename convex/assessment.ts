import { mutation } from "./_generated/server";
import { v } from "convex/values";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const CURIOSITY_IDS = [1, 2, 3, 4, 5, 6];
const ADAPTABILITY_IDS = [7, 8, 9, 10, 11, 12];
const RESILIENCE_IDS = [13, 14, 15, 16, 17, 18];

function sumAnswers(answers: { questionId: number; answer: number }[], ids: number[]) {
  return ids.reduce((sum, id) => {
    const a = answers.find((a) => a.questionId === id);
    return sum + (a?.answer ?? 0);
  }, 0);
}

function getProfile(total: number): string {
  if (total <= 36) return "mapmaker";
  if (total <= 54) return "pathfinder";
  if (total <= 72) return "trailblazer";
  return "pioneer";
}

export const submitAssessment = mutation({
  args: {
    email: v.string(),
    firstName: v.optional(v.string()),
    lang: v.string(),
    answers: v.array(v.object({ questionId: v.number(), answer: v.number() })),
  },
  handler: async (ctx, args) => {
    const email = args.email.toLowerCase().trim();

    if (!EMAIL_REGEX.test(email)) {
      throw new Error("Invalid email address");
    }

    if (args.answers.length !== 18) {
      throw new Error("All 18 questions must be answered");
    }

    // Server-side scoring
    const curiosityScore = sumAnswers(args.answers, CURIOSITY_IDS);
    const adaptabilityScore = sumAnswers(args.answers, ADAPTABILITY_IDS);
    const resilienceScore = sumAnswers(args.answers, RESILIENCE_IDS);
    const totalScore = curiosityScore + adaptabilityScore + resilienceScore;
    const profile = getProfile(totalScore);

    // Store full session with all answers
    await ctx.db.insert("assessmentSessions", {
      email,
      firstName: args.firstName?.trim(),
      lang: args.lang,
      answers: args.answers,
      curiosityScore,
      adaptabilityScore,
      resilienceScore,
      totalScore,
      profile,
      createdAt: Date.now(),
    });

    // Upsert subscriber
    const existing = await ctx.db
      .query("subscribers")
      .withIndex("by_email", (q) => q.eq("email", email))
      .first();

    if (!existing) {
      await ctx.db.insert("subscribers", {
        email,
        firstName: args.firstName?.trim(),
        preferredLang: args.lang,
        subscribedAt: Date.now(),
      });
    } else if (!existing.unsubscribedAt) {
      await ctx.db.patch(existing._id, {
        ...(args.firstName && { firstName: args.firstName.trim() }),
        preferredLang: args.lang,
      });
    }

    return { curiosityScore, adaptabilityScore, resilienceScore, totalScore, profile };
  },
});
