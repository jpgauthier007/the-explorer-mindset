import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const result = await convex.mutation(api.subscribers.subscribe, { email });
    return Response.json(result);
  } catch (error) {
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
