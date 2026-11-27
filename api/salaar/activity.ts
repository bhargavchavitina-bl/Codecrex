import { getQueryParams, readJsonBody, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.js";
import {
  getSalaarDashboardProgress,
  recordQualifyingActivity,
  recordStudiedTopic,
} from "./_lib/memoryService.js";
import { authenticateRequest } from "./_lib/supabaseAuth.js";
import type { LearningMode } from "./_lib/types.js";
import { resolveClientLocalDate, resolveValidTimeZone } from "../../src/lib/streakUtils.js";

const ALLOWED_EVENTS = new Set([
  "dsa_problem_solved",
  "aptitude_question_completed",
  "practice_session_completed",
  "meaningful_tutor_session",
]);

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  if (req.method !== "GET" && req.method !== "POST") {
    sendJson(res, 405, { error: "Method not allowed" });
    return;
  }

  let auth: Awaited<ReturnType<typeof authenticateRequest>>["auth"] = null;
  try {
    const authRes = await authenticateRequest(req);
    if (!authRes.auth) {
      sendJson(res, authRes.statusCode || 401, { error: authRes.error || "Unauthorized" });
      return;
    }
    auth = authRes.auth;
  } catch (authErr) {
    const detail = authErr instanceof Error ? authErr.message : String(authErr);
    sendJson(res, 500, { error: `Authentication error: ${detail.slice(0, 140)}` });
    return;
  }

  if (req.method === "GET") {
    try {
      const params = getQueryParams(req);
      const localDate = resolveClientLocalDate(
        params.get("localDate") || undefined,
        params.get("timezone") || undefined,
      );
      const dashboard = await getSalaarDashboardProgress(auth.supabase, auth.userId, localDate);
      sendJson(res, 200, {
        activities: dashboard.recentSessions,
        streak: dashboard.streak,
      });
    } catch (err) {
      console.error("[/api/salaar/activity GET] error:", err);
      sendJson(res, 500, { error: "Failed to load activity history." });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const body = await readJsonBody<{
        eventType?: string;
        category?: LearningMode | "general";
        topicId?: string;
        questionId?: string;
        title?: string;
        dedupeKey?: string;
        localDate?: string;
        timezone?: string;
        durationSeconds?: number;
        metadata?: Record<string, unknown>;
      }>(req);

      if (!body.eventType || !ALLOWED_EVENTS.has(body.eventType)) {
        sendJson(res, 400, {
          error:
            "Invalid eventType. Only qualifying learning activities count toward streaks.",
        });
        return;
      }

      const timezone = resolveValidTimeZone(body.timezone);
      const activityDate = resolveClientLocalDate(body.localDate, timezone);
      const category: LearningMode | "general" =
        body.category === "dsa" || body.category === "aptitude" ? body.category : "general";
      const title = (body.title || "Learning activity").trim().slice(0, 140);
      const dedupeKey = (
        body.dedupeKey ||
        `${body.eventType}:${body.questionId || body.topicId || title}:${activityDate}`
      ).slice(0, 180);

      const outcome = await recordQualifyingActivity(auth.supabase, auth.userId, {
        eventType: body.eventType as
          | "dsa_problem_solved"
          | "aptitude_question_completed"
          | "practice_session_completed"
          | "meaningful_tutor_session",
        category,
        topicId: body.topicId || null,
        questionId: body.questionId || null,
        title,
        dedupeKey,
        activityDate,
        timezone,
        durationSeconds: Math.max(0, Math.min(Number(body.durationSeconds || 0), 86400)),
        metadata: body.metadata,
      });

      if (body.topicId && (category === "dsa" || category === "aptitude")) {
        await recordStudiedTopic(auth.supabase, auth.userId, category, body.topicId);
      }

      const dashboard = await getSalaarDashboardProgress(auth.supabase, auth.userId, activityDate);

      sendJson(res, 200, {
        recorded: outcome.recorded,
        duplicate: outcome.duplicate,
        schemaPending: outcome.schemaPending,
        streak: dashboard.streak,
        recentSessions: dashboard.recentSessions,
      });
    } catch (err) {
      console.error("[/api/salaar/activity POST] error:", err);
      sendJson(res, 500, { error: "Failed to log learning activity." });
    }
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}
