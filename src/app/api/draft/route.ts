import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * Enable Sanity preview (draft mode).
 * GET /api/draft?secret=<token>&slug=/services/web-dev
 */
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const slug = request.nextUrl.searchParams.get("slug") ?? "/";

  if (secret !== process.env.SANITY_API_READ_TOKEN) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(slug);
}
