import { getQueryParams, readJsonBody, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.js";
import { createEmptyMemory, DEFAULT_PREFERENCES, getSalaarDashboardProgress } from "./_lib/memoryService.js";
import { authenticateRequest, isMissingTableError } from "./_lib/supabaseAuth.js";
import type { LearningPreferences, WeakTopicRecord } from "./_lib/types.js";
import { resolveClientLocalDate } from "../../src/lib/streakUtils.js";

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  const { auth, error, statusCode } = await authenticateRequest(req);
  if (!auth) {
    sendJson(res, statusCode || 401, { error: error || "Unauthorized" });
    return;
  }

  if (req.method === "GET") {
    try {
      const params = getQueryParams(req);
      const localDate = resolveClientLocalDate(
        params.get("localDate") || undefined,
        params.get("timezone") || undefined,
      );
      const progress = await getSalaarDashboardProgress(auth.supabase, auth.userId, localDate);
      sendJson(res, 200, {
        memory: progress.memory,
        weakTopics: progress.weakTopics,
        recommendedTopics: progress.recommendedTopics,
        schemaPending: progress.schemaPending,
      });
    } catch (err) {
      console.error("[/api/salaar/memory GET] error:", err);
      sendJson(res, 500, { error: "Failed to load learning memory." });
    }
    return;
  }

  if (req.method === "PATCH") {
    try {
      const body = await readJsonBody<{
        preferences?: Partial<LearningPreferences>;
        addWeakTopic?: WeakTopicRecord;
        removeWeakTopicKey?: { topicId: string; category: "dsa" | "aptitude" };
      }>(req);

      const { data: existing, error: fetchErr } = await auth.supabase
        .from("salaar_learning_memory")
        .select("*")
        .eq("user_id", auth.userId)
        .maybeSingle();

      if (fetchErr && isMissingTableError(fetchErr)) {
        sendJson(res, 200, {
          updated: false,
          schemaPending: true,
          memory: createEmptyMemory(),
        });
        return;
      }

      const nextPreferences: LearningPreferences = {
        ...DEFAULT_PREFERENCES,
        ...(existing?.preferences || {}),
        ...(body.preferences || {}),
      };

      let weakTopics: WeakTopicRecord[] = Array.isArray(existing?.weak_topics)
        ? [...existing.weak_topics]
        : [];

      if (body.addWeakTopic) {
        weakTopics = [
          body.addWeakTopic,
          ...weakTopics.filter(
            (w) =>
              !(
                w.topicId === body.addWeakTopic!.topicId &&
                w.category === body.addWeakTopic!.category
              ),
          ),
        ].slice(0, 12);
      }
      if (body.removeWeakTopicKey) {
        weakTopics = weakTopics.filter(
          (w) =>
            !(
              w.topicId === body.removeWeakTopicKey!.topicId &&
              w.category === body.removeWeakTopicKey!.category
            ),
        );
      }

      const { error: upsertErr } = await auth.supabase.from("salaar_learning_memory").upsert(
        {
          user_id: auth.userId,
          preferences: nextPreferences,
          weak_topics: weakTopics,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id" },
      );

      if (upsertErr) {
        throw upsertErr;
      }

      sendJson(res, 200, {
        updated: true,
        preferences: nextPreferences,
        weakTopics,
      });
    } catch (err) {
      console.error("[/api/salaar/memory PATCH] error:", err);
      sendJson(res, 500, { error: "Failed to update learning preferences." });
    }
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}
