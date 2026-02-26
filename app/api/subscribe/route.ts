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

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Skip verification if not configured

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token, remoteip: ip }),
  });

  const data = await res.json();
  return data.success === true;
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

    // Verify Turnstile CAPTCHA token
    const turnstileToken = typeof body.turnstileToken === "string" ? body.turnstileToken : "";
    if (process.env.TURNSTILE_SECRET_KEY && !turnstileToken) {
      return Response.json(
        { success: false, error: "Please complete the CAPTCHA." },
        { status: 400 },
      );
    }

    if (turnstileToken) {
      const verified = await verifyTurnstile(turnstileToken, ip);
      if (!verified) {
        return Response.json(
          { success: false, error: "CAPTCHA verification failed. Please try again." },
          { status: 403 },
        );
      }
    }

    const result = await convex.mutation(api.subscribers.subscribe, { email });
    return Response.json(result);
  } catch {
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
