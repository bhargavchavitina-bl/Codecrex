import { getQueryParams, readJsonBody, sendJson, type NodeRequest, type NodeResponse } from "./_lib/http.js";
import {
  recordQualifyingActivity,
  recordStudiedTopic,
  updateMemoryAfterPractice,
} from "./_lib/memoryService.js";
import {
  APTITUDE_PRACTICE_TOPICS,
  DSA_PRACTICE_TOPICS,
  findPracticeQuestionById,
  getAllPracticeQuestions,
  sanitizePracticeQuestion,
} from "./_lib/practiceBank.js";
import { authenticateRequest, isMissingTableError } from "./_lib/supabaseAuth.js";
import type { LearningMode } from "./_lib/types.js";
import { resolveClientLocalDate, resolveValidTimeZone } from "../../src/lib/streakUtils.js";

export default async function handler(req: NodeRequest, res: NodeResponse): Promise<void> {
  if (req.method === "GET") {
    try {
      const params = getQueryParams(req);
      const category = params.get("category") as LearningMode | null;
      const topicId = params.get("topic") || "all";
      const difficultyParam = params.get("difficulty");
      const difficulty =
        difficultyParam === "Easy" || difficultyParam === "Medium" || difficultyParam === "Hard"
          ? difficultyParam
          : undefined;
      const limit = Math.min(Math.max(Number(params.get("limit")) || 20, 1), 60);

      const items = getAllPracticeQuestions({
        category: category === "dsa" || category === "aptitude" ? category : undefined,
        topicId,
        difficulty,
        limit,
      }).map(sanitizePracticeQuestion);

      sendJson(res, 200, {
        questions: items,
        topics: {
          dsa: DSA_PRACTICE_TOPICS,
          aptitude: APTITUDE_PRACTICE_TOPICS,
        },
      });
    } catch (err) {
      console.error("[/api/salaar/practice GET] error:", err);
      sendJson(res, 500, { error: "Failed to load practice questions." });
    }
    return;
  }

  if (req.method === "POST") {
    let body: {
      action?: "hint" | "check" | "reveal_solution";
      questionId?: string;
      hintIndex?: number;
      selectedIndex?: number;
      hintsUsed?: number;
      localDate?: string;
      timezone?: string;
    };
    try {
      body = await readJsonBody(req);
    } catch (parseErr) {
      sendJson(res, 400, {
        error: parseErr instanceof Error ? parseErr.message : "Invalid JSON request body.",
      });
      return;
    }

    try {

      if (!body.questionId || !body.action) {
        sendJson(res, 400, { error: "Missing questionId or action." });
        return;
      }

      const question = findPracticeQuestionById(body.questionId);
      if (!question) {
        sendJson(res, 404, { error: "Practice question not found." });
        return;
      }

      // 1. Progressive hint (never reveals the full final answer immediately)
      if (body.action === "hint") {
        const idx = Math.min(Math.max(Number(body.hintIndex || 0), 0), question.hints.length - 1);
        const isLastHint = idx >= question.hints.length - 1;
        sendJson(res, 200, {
          hintIndex: idx,
          hint: question.hints[idx],
          hasMoreHints: !isLastHint,
          totalHints: question.hints.length,
        });
        return;
      }

      // Optional auth check (authenticated users get Postgres persistence; guests still practice cleanly)
      let auth: Awaited<ReturnType<typeof authenticateRequest>>["auth"] = null;
      try {
        const authResult = await authenticateRequest(req);
        auth = authResult.auth;
      } catch (authErr) {
        console.warn("[/api/salaar/practice POST] auth check failed, using guest mode:", authErr);
      }

      const timezone = resolveValidTimeZone(body.timezone);
      const activityDate = resolveClientLocalDate(body.localDate, timezone);
      const hintsUsed = Math.max(0, Math.min(Number(body.hintsUsed || 0), 10));

      // 2. Explicitly reveal full solution ONLY when requested
      if (body.action === "reveal_solution") {
        if (auth) {
          try {
            const { error: pErr } = await auth.supabase.from("salaar_practice_attempts").insert({
              user_id: auth.userId,
              category: question.category,
              topic_id: question.topicId,
              difficulty: question.difficulty,
              question_id: question.id,
              question_title: question.title,
              user_answer: null,
              is_correct: false,
              hints_used: hintsUsed,
              solution_revealed: true,
              activity_date: activityDate,
            });
            if (pErr && !isMissingTableError(pErr)) {
              console.warn("Practice reveal insert warning:", pErr.message);
            }
            await updateMemoryAfterPractice(auth.supabase, auth.userId, {
              questionId: question.id,
              title: question.title,
              category: question.category,
              topicId: question.topicId,
              difficulty: question.difficulty,
              isCorrect: false,
              hintsUsed: Math.max(1, hintsUsed),
            });
          } catch (dbErr) {
            console.warn("[/api/salaar/practice reveal_solution] non-fatal persistence failure:", dbErr);
          }
        }

        sendJson(res, 200, {
          revealed: true,
          correctIndex: question.correctIndex,
          correctOption: question.options[question.correctIndex],
          explanation: question.fullSolution,
        });
        return;
      }

      // 3. Check user's submitted answer
      if (body.action === "check") {
        if (typeof body.selectedIndex !== "number" || body.selectedIndex < 0 || body.selectedIndex >= question.options.length) {
          sendJson(res, 400, { error: "Please select an option before checking your answer." });
          return;
        }

        const isCorrect = body.selectedIndex === question.correctIndex;
        let streakUpdated = false;
        let persisted = false;

        if (auth) {
          try {
            const { error: insertErr } = await auth.supabase.from("salaar_practice_attempts").insert({
              user_id: auth.userId,
              category: question.category,
              topic_id: question.topicId,
              difficulty: question.difficulty,
              question_id: question.id,
              question_title: question.title,
              user_answer: question.options[body.selectedIndex],
              is_correct: isCorrect,
              hints_used: hintsUsed,
              solution_revealed: false,
              activity_date: activityDate,
            });
            if (insertErr && !isMissingTableError(insertErr)) {
              console.warn("Practice attempt insert warning:", insertErr.message);
            } else if (!insertErr) {
              persisted = true;
            }

            await recordStudiedTopic(auth.supabase, auth.userId, question.category, question.topicId);
            await updateMemoryAfterPractice(auth.supabase, auth.userId, {
              questionId: question.id,
              title: question.title,
              category: question.category,
              topicId: question.topicId,
              difficulty: question.difficulty,
              isCorrect,
              hintsUsed,
            });

            if (isCorrect) {
              const evType =
                question.category === "dsa"
                  ? "dsa_problem_solved"
                  : "aptitude_question_completed";
              const outcome = await recordQualifyingActivity(auth.supabase, auth.userId, {
                eventType: evType,
                category: question.category,
                topicId: question.topicId,
                questionId: question.id,
                title: question.title,
                dedupeKey: `practice:${question.id}:${activityDate}`,
                activityDate,
                timezone,
              });
              streakUpdated = outcome.recorded;

              // Sync solved status to problem_progress when practicing a DSA problem
              if (question.category === "dsa" && question.id.startsWith("dsa:")) {
                const rawProblemId = question.id.slice(4);
                await auth.supabase.from("problem_progress").upsert(
                  {
                    user_id: auth.userId,
                    problem_id: rawProblemId,
                    solved: true,
                    solved_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                  },
                  { onConflict: "user_id,problem_id" },
                );
              }
            }
          } catch (dbErr) {
            console.warn("[/api/salaar/practice check] non-fatal persistence failure:", dbErr);
            persisted = false;
          }
        }

        if (isCorrect) {
          sendJson(res, 200, {
            correct: true,
            correctIndex: question.correctIndex,
            explanation: question.fullSolution,
            persisted,
            streakUpdated,
          });
        } else {
          // Do not immediately reveal the full answer — give a targeted hint first!
          const hintToShow = question.hints[Math.min(hintsUsed, question.hints.length - 1)];
          sendJson(res, 200, {
            correct: false,
            hint: hintToShow,
            message:
              "Not quite right. Review the hint below and try another option, or click 'Reveal solution' if you want the full walkthrough.",
            persisted,
            streakUpdated: false,
          });
        }
        return;
      }

      sendJson(res, 400, { error: "Unsupported practice action." });
    } catch (err) {
      const detail = err instanceof Error ? err.message : String(err);
      console.error("[/api/salaar/practice POST] error:", err);
      sendJson(res, 500, {
        error: detail
          ? `Failed to process practice request: ${detail.slice(0, 180)}`
          : "Failed to process practice request.",
      });
    }
    return;
  }

  sendJson(res, 405, { error: "Method not allowed" });
}
