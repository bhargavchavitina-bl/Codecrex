import { getQueryParams, readJsonBody, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.js";
import { getSalaarDashboardProgress } from "./_lib/memoryService.js";
import { authenticateRequest } from "./_lib/supabaseAuth.js";
import { resolveClientLocalDate } from "../../src/lib/streakUtils.js";

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  if (req.method !== "GET" && req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  try {
    const { auth, error, statusCode } = await authenticateRequest(req);
    if (!auth) {
      sendJson(res, statusCode || 401, { error: error || "Unauthorized" });
      return;
    }

    const params = getQueryParams(req);
    const body = req.method === "POST" ? await readJsonBody<{ localDate?: string; timezone?: string }>(req) : {};
    const localDate = resolveClientLocalDate(
      body.localDate || params.get("localDate") || undefined,
      body.timezone || params.get("timezone") || undefined,
    );

    const progress = await getSalaarDashboardProgress(auth.supabase, auth.userId, localDate);
    sendJson(res, 200, {
      streak: progress.streak,
      recentSessions: progress.recentSessions,
      localDate,
      schemaPending: progress.schemaPending,
    });
  } catch (err) {
    const detail = err instanceof Error ? err.message : String(err);
    console.error("[/api/salaar/streak] error:", err);
    sendJson(res, 500, {
      error: detail
        ? `Failed to calculate streak metrics: ${detail.slice(0, 180)}`
        : "Failed to calculate streak metrics.",
    });
  }
}
