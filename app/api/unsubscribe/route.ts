import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type");
  if (!contentType?.includes("application/json")) {
    return Response.json(
      { success: false, error: "Invalid content type" },
      { status: 415 },
    );
  }

  try {
    const body = await request.json();

    if (!body || typeof body.email !== "string") {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const email = body.email.trim();
    if (email.length === 0 || email.length > 254) {
      return Response.json(
        { success: false, error: "A valid email address is required." },
        { status: 400 },
      );
    }

    const result = await convex.mutation(api.subscribers.unsubscribe, { email });
    return Response.json(result);
  } catch {
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
