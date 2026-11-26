import { getAiProviderStatus } from "./_lib/aiProvider.ts";
import { getQueryParams, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.ts";
import { getSalaarDashboardProgress } from "./_lib/memoryService.ts";
import { authenticateRequest } from "./_lib/supabaseAuth.ts";
import { resolveClientLocalDate } from "../../src/lib/streakUtils.ts";

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  if (req.method !== "GET") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  const { auth, error, statusCode } = await authenticateRequest(req);
  if (!auth) {
    // Allow frontend to query AI status on public/guest status checks if ?statusOnly=1, otherwise enforce 401
    const params = getQueryParams(req);
    if (params.get("statusOnly") === "1") {
      sendJson(res, 200, { authenticated: false, ...getAiProviderStatus() });
      return;
    }
    sendJson(res, statusCode || 401, { error: error || "Unauthorized" });
    return;
  }

  try {
    const params = getQueryParams(req);
    const localDate = resolveClientLocalDate(
      params.get("localDate") || undefined,
      params.get("timezone") || undefined,
    );
    const fallbackName =
      (auth.user.user_metadata?.full_name as string | undefined) ||
      (auth.user.user_metadata?.name as string | undefined) ||
      auth.user.email?.split("@")[0] ||
      "Learner";

    const progress = await getSalaarDashboardProgress(
      auth.supabase,
      auth.userId,
      localDate,
      fallbackName,
    );
    sendJson(res, 200, progress);
  } catch (err) {
    console.error("[/api/salaar/progress] error:", err);
    sendJson(res, 500, { error: "Failed to load SALAAR progress dashboard." });
  }
}
