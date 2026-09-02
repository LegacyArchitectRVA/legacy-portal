/**
 * Viktor Tools - Call any Viktor SDK function from your Convex app.
 *
 * Available tools include:
 * - quick_ai_search: AI-powered web search with summarized results
 * - text2im: Generate images from text prompts
 * - file_to_markdown: Convert PDF/DOCX/XLSX files to markdown
 * - And all MCP integration tools configured for your user
 *
 * To add a new tool, first test it to see the response shape.
 */
import { ConvexError, v } from "convex/values";
import { action } from "./_generated/server";
import { requireAdminInAction } from "./admin";

declare const process: { env: Record<string, string | undefined> };

const VIKTOR_API_URL = process.env.VIKTOR_SPACES_API_URL!;
const PROJECT_NAME = process.env.VIKTOR_SPACES_PROJECT_NAME!;
const PROJECT_SECRET = process.env.VIKTOR_SPACES_PROJECT_SECRET!;

async function callTool<T>(
  role: string,
  args: Record<string, unknown> = {},
): Promise<T> {
  const response = await fetch(
    `${VIKTOR_API_URL}/api/viktor-spaces/tools/call`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        project_name: PROJECT_NAME,
        project_secret: PROJECT_SECRET,
        role,
        arguments: args,
      }),
    },
  );

  if (!response.ok) {
    throw new ConvexError(`HTTP ${response.status}: ${await response.text()}`);
  }

  const json = await response.json();
  if (!json.success) {
    throw new ConvexError(json.error ?? "Tool call failed");
  }
  return json.result as T;
}

// Both actions below call out to real, metered, paid Viktor Spaces APIs
// using this project's own secret. They were public actions with no auth
// check at all (ctx was unused), reachable by anyone who could speak the
// Convex protocol to this deployment, not just from AdminVisualEditorPage,
// the only place either is actually called from. That's unauthenticated
// cost abuse at minimum, and for generateImage, unauthenticated arbitrary
// image generation tied to this business's paid account. Gated behind
// requireAdminInAction, same as every other admin-only action in this app.

export const quickAiSearch = action({
  args: { query: v.string() },
  returns: v.string(),
  handler: async (ctx, { query }) => {
    await requireAdminInAction(ctx);
    const result = await callTool<{ search_response: string }>(
      "quick_ai_search",
      {
        search_question: query,
      },
    );
    return result.search_response;
  },
});

export const generateImage = action({
  args: {
    prompt: v.string(),
    aspectRatio: v.optional(
      v.union(
        v.literal("1:1"),
        v.literal("16:9"),
        v.literal("9:16"),
        v.literal("4:3"),
        v.literal("3:2"),
      ),
    ),
  },
  returns: v.string(),
  handler: async (ctx, { prompt, aspectRatio }) => {
    await requireAdminInAction(ctx);
    const result = await callTool<{ response_text: string }>("text2im", {
      prompt,
      aspect_ratio: aspectRatio ?? "1:1",
    });
    return result.response_text;
  },
});
