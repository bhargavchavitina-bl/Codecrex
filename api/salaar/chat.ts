import { generateSalaarReply, type ChatTurn } from "./_lib/aiProvider.js";
import { getQueryParams, readJsonBody, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.js";
import {
  createEmptyMemory,
  getSalaarDashboardProgress,
  recordQualifyingActivity,
  recordStudiedTopic,
} from "./_lib/memoryService.js";
import { buildSalaarSystemPrompt, detectExplicitCodeOrSolutionRequest } from "./_lib/prompts.js";
import { authenticateRequest, isMissingTableError } from "./_lib/supabaseAuth.js";
import type { LearningMode, SalaarMessage } from "./_lib/types.js";
import { problems } from "../../src/data/problems.js";
import { resolveClientLocalDate, resolveValidTimeZone } from "../../src/lib/streakUtils.js";

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  if (req.method === "GET") {
    const { auth, error, statusCode } = await authenticateRequest(req);
    if (!auth) {
      sendJson(res, statusCode || 401, { error: error || "Unauthorized" });
      return;
    }

    try {
      const params = getQueryParams(req);
      const conversationId = params.get("conversationId");

      if (conversationId) {
        const { data: messages, error: msgErr } = await auth.supabase
          .from("salaar_messages")
          .select("*")
          .eq("user_id", auth.userId)
          .eq("conversation_id", conversationId)
          .order("created_at", { ascending: true })
          .limit(100);

        if (msgErr) {
          if (isMissingTableError(msgErr)) {
            sendJson(res, 200, { messages: [], schemaPending: true });
            return;
          }
          throw msgErr;
        }

        const formatted: SalaarMessage[] = (messages || []).map((m) => ({
          id: m.id,
          conversationId: m.conversation_id,
          role: m.role,
          mode: m.mode,
          content: m.content,
          metadata: m.metadata || {},
          createdAt: m.created_at,
        }));

        sendJson(res, 200, { messages: formatted });
        return;
      }

      const { data: conversations, error: convErr } = await auth.supabase
        .from("salaar_conversations")
        .select("*")
        .eq("user_id", auth.userId)
        .order("updated_at", { ascending: false })
        .limit(25);

      if (convErr) {
        if (isMissingTableError(convErr)) {
          sendJson(res, 200, { conversations: [], schemaPending: true });
          return;
        }
        throw convErr;
      }

      sendJson(res, 200, {
        conversations: (conversations || []).map((c) => ({
          id: c.id,
          mode: c.mode,
          topicId: c.topic_id || null,
          title: c.title,
          summary: c.summary || "",
          createdAt: c.created_at,
          updatedAt: c.updated_at,
        })),
      });
    } catch (err) {
      console.error("[/api/salaar/chat GET] error:", err);
      sendJson(res, 500, { error: "Failed to load conversation history." });
    }
    return;
  }

  if (req.method === "DELETE") {
    const { auth, error, statusCode } = await authenticateRequest(req);
    if (!auth) {
      sendJson(res, statusCode || 401, { error: error || "Unauthorized" });
      return;
    }

    try {
      const params = getQueryParams(req);
      const conversationId = params.get("conversationId");
      if (!conversationId) {
        sendJson(res, 400, { error: "Missing conversationId." });
        return;
      }

      const { error: delErr } = await auth.supabase
        .from("salaar_conversations")
        .delete()
        .eq("user_id", auth.userId)
        .eq("id", conversationId);

      if (delErr && !isMissingTableError(delErr)) {
        throw delErr;
      }

      sendJson(res, 200, { deleted: true });
    } catch (err) {
      console.error("[/api/salaar/chat DELETE] error:", err);
      sendJson(res, 500, { error: "Failed to delete conversation." });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const body = await readJsonBody<{
        message?: string;
        mode?: LearningMode;
        action?: "chat" | "hint" | "reexplain" | "reveal_code" | "example" | "practice_generate";
        topicId?: string;
        difficulty?: string;
        conversationId?: string;
        clientHistory?: ChatTurn[];
        guestSummary?: {
          userName?: string;
          currentStreak?: number;
          longestStreak?: number;
          totalLearningDays?: number;
          solvedCount?: number;
          aptitudeTests?: number;
        };
        localDate?: string;
        timezone?: string;
      }>(req);

      const messageText = (body.message || "").trim();
      if (!messageText) {
        sendJson(res, 400, { error: "Message cannot be empty." });
        return;
      }

      const mode: LearningMode = body.mode === "aptitude" ? "aptitude" : "dsa";
      const action = body.action || "chat";
      const timezone = resolveValidTimeZone(body.timezone);
      const localDate = resolveClientLocalDate(body.localDate, timezone);
      const explicitCodeRequest = detectExplicitCodeOrSolutionRequest(messageText, action);

      const { auth } = await authenticateRequest(req);

      let conversationId = body.conversationId || "";
      let history: ChatTurn[] = [];
      let schemaPending = false;
      let userName = body.guestSummary?.userName || "Learner";

      // Load user context & conversation history securely from DB for authenticated users
      let dashboardContext: Parameters<typeof buildSalaarSystemPrompt>[0]["dashboardContext"];

      if (auth) {
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
        userName = progress.userName;
        schemaPending = Boolean(progress.schemaPending);
        dashboardContext = {
          streak: progress.streak,
          dsaSummary: progress.dsaSummary,
          aptitudeSummary: progress.aptitudeSummary,
          weakTopics: progress.weakTopics,
          memory: progress.memory,
        };

        // Ensure or fetch conversation row
        if (!schemaPending) {
          if (conversationId) {
            const { data: msgRows } = await auth.supabase
              .from("salaar_messages")
              .select("role, content")
              .eq("user_id", auth.userId)
              .eq("conversation_id", conversationId)
              .order("created_at", { ascending: true })
              .limit(18);
            history = (msgRows || []).map((r) => ({
              role: r.role as "user" | "assistant",
              content: r.content,
            }));
          } else {
            const cleanTitle = messageText.slice(0, 56) + (messageText.length > 56 ? "..." : "");
            const { data: createdConv, error: createConvErr } = await auth.supabase
              .from("salaar_conversations")
              .insert({
                user_id: auth.userId,
                mode,
                topic_id: body.topicId || null,
                title: cleanTitle,
              })
              .select("id")
              .single();

            if (createConvErr) {
              if (isMissingTableError(createConvErr)) schemaPending = true;
              else console.warn("Failed to create salaar_conversation:", createConvErr.message);
            } else if (createdConv?.id) {
              conversationId = createdConv.id;
            }
          }
        }
      } else {
        // Guest stateless context (never touches DB, accepts safe bounded summary & message window)
        history = Array.isArray(body.clientHistory)
          ? body.clientHistory
              .slice(-14)
              .filter(
                (t) =>
                  (t.role === "user" || t.role === "assistant") &&
                  typeof t.content === "string",
              )
          : [];
        const gs = body.guestSummary || {};
        dashboardContext = {
          streak: {
            currentStreak: Number(gs.currentStreak || 0),
            longestStreak: Number(gs.longestStreak || 0),
            totalLearningDays: Number(gs.totalLearningDays || 0),
            todayCompletedCount: 0,
            todayGoal: 2,
            qualifiedToday: false,
            activeDays: [],
            weeklyCalendar: [],
            problemsSolvedCount: Number(gs.solvedCount || 0),
            aptitudeCompletedCount: Number(gs.aptitudeTests || 0),
            practiceSessionsCount: 0,
          },
          dsaSummary: {
            solvedCount: Number(gs.solvedCount || 0),
            totalCount: problems.length,
            easySolved: 0,
            mediumSolved: 0,
            hardSolved: 0,
            recentSolvedIds: [],
          },
          aptitudeSummary: {
            testsCompleted: Number(gs.aptitudeTests || 0),
            practiceSolvedCount: 0,
            avgAccuracy: 0,
            recentTopics: [],
          },
          weakTopics: [],
          memory: createEmptyMemory(),
        };
      }

      const systemPrompt = buildSalaarSystemPrompt({
        mode,
        action,
        topic: body.topicId,
        difficulty: body.difficulty,
        userDisplayName: userName,
        dashboardContext,
        explicitCodeRequest,
      });

      const aiResult = await generateSalaarReply(systemPrompt, history, messageText);

      if (!aiResult.ok) {
        sendJson(res, aiResult.code === "AI_KEY_MISSING" ? 503 : 502, {
          error: aiResult.message,
          code: aiResult.code,
          conversationId: conversationId || null,
        });
        return;
      }

      let streakRecorded = false;

      // Persist conversation turns & studied topic memory for authenticated users
      if (auth && !schemaPending && conversationId) {
        await auth.supabase.from("salaar_messages").insert([
          {
            conversation_id: conversationId,
            user_id: auth.userId,
            role: "user",
            mode,
            content: messageText,
            metadata: { action, topicId: body.topicId || null },
          },
          {
            conversation_id: conversationId,
            user_id: auth.userId,
            role: "assistant",
            mode,
            content: aiResult.content,
            metadata: {
              action,
              topicId: body.topicId || null,
              provider: aiResult.provider,
              model: aiResult.model,
              codeRevealed: explicitCodeRequest,
            },
          },
        ]);

        await auth.supabase
          .from("salaar_conversations")
          .update({
            mode,
            topic_id: body.topicId || null,
            summary: aiResult.content.replace(/\s+/g, " ").slice(0, 140),
            updated_at: new Date().toISOString(),
          })
          .eq("id", conversationId)
          .eq("user_id", auth.userId);

        if (body.topicId) {
          await recordStudiedTopic(auth.supabase, auth.userId, mode, body.topicId);
        }

        // Meaningful tutor session qualifies for daily streak ONLY after >= 2 prior exchanges (i.e. >= 3 user messages total)
        const totalUserTurns = history.filter((h) => h.role === "user").length + 1;
        if (totalUserTurns >= 3) {
          const actOutcome = await recordQualifyingActivity(auth.supabase, auth.userId, {
            eventType: "meaningful_tutor_session",
            category: mode,
            topicId: body.topicId || null,
            questionId: null,
            title: `Studied ${body.topicId || mode.toUpperCase()} with SALAAR`,
            dedupeKey: `tutor:${conversationId}:${localDate}`,
            activityDate: localDate,
            timezone,
          });
          streakRecorded = actOutcome.recorded;
        }
      }

      sendJson(res, 200, {
        reply: aiResult.content,
        provider: aiResult.provider,
        model: aiResult.model,
        conversationId: conversationId || null,
        mode,
        streakRecorded,
        schemaPending,
      });
    } catch (err) {
      console.error("[/api/salaar/chat POST] error:", err);
      sendJson(res, 500, { error: "Unexpected error in SALAAR AI chat handler." });
    }
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}
