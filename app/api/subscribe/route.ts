import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// Simple in-memory rate limiter: max 5 requests per IP per 60 seconds
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  entry.count++;
  return entry.count > RATE_LIMIT_MAX;
}

export async function POST(request: Request) {
  // Validate Content-Type
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return Response.json(
      { success: false, error: "Invalid content type" },
      { status: 415 },
    );
  }

  // Rate limiting by IP
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return Response.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  try {
    const body = await request.json();

    // Validate input structure and type
    if (!body || typeof body.email !== "string") {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const email = body.email.trim();

    // Length check (RFC 5321: max 254 chars)
    if (email.length === 0 || email.length > 254) {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    // Server-side email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    // Validate firstName (required, max 100 chars)
    const firstName = typeof body.firstName === "string" ? body.firstName.trim() : "";
    if (firstName.length === 0 || firstName.length > 100) {
      return Response.json(
        { success: false, error: "A first name is required." },
        { status: 400 },
      );
    }

    // Validate lastName (optional, max 100 chars)
    const lastName = typeof body.lastName === "string" ? body.lastName.trim() : "";
    if (lastName.length > 100) {
      return Response.json(
        { success: false, error: "Last name is too long." },
        { status: 400 },
      );
    }

    // Validate preferredLang
    const preferredLang = body.preferredLang === "fr" ? "fr" : "en";

    // Verify math challenge (server-side)
    const { mathChallenge, mathAnswer } = body;
    if (
      !mathChallenge ||
      typeof mathChallenge.a !== "number" ||
      typeof mathChallenge.b !== "number" ||
      typeof mathAnswer !== "number" ||
      mathChallenge.a + mathChallenge.b !== mathAnswer
    ) {
      return Response.json(
        { success: false, error: "Incorrect answer. Please try again." },
        { status: 400 },
      );
    }

    const result = await convex.mutation(api.subscribers.subscribe, {
      email,
      firstName,
      lastName: lastName || undefined,
      preferredLang,
    });
    return Response.json(result);
  } catch {
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
