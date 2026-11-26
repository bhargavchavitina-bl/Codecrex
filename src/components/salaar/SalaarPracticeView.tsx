import React, { useEffect, useState } from "react";
import {
  CheckCircle2,
  ExternalLink,
  Eye,
  Lightbulb,
  MessageSquare,
  RotateCcw,
  Target,
  XCircle,
} from "lucide-react";
import {
  APTITUDE_PRACTICE_TOPICS,
  DSA_PRACTICE_TOPICS,
} from "../../../api/salaar/_lib/practiceBank";
import type {
  LearningMode,
  PracticeQuestionClientView,
  SalaarDashboardProgress,
} from "../../lib/salaarService";
import {
  fetchPracticeCatalog,
  submitPracticeAction,
} from "../../lib/salaarService";
import { useStore } from "../../store";
import { useCelebrations } from "../celebrations/CelebrationContext";
import { MarkdownText } from "./MarkdownText";

interface Props {
  progress: SalaarDashboardProgress;
  isGuest: boolean;
  initialMode?: LearningMode;
  initialTopicId?: string;
  onRefreshProgress: () => Promise<void>;
  onAskTutor: (opts: { mode: LearningMode; topicId: string; prompt: string }) => void;
}

export const SalaarPracticeView: React.FC<Props> = ({
  progress,
  isGuest,
  initialMode = "dsa",
  initialTopicId = "all",
  onRefreshProgress,
  onAskTutor,
}) => {
  const { markSession, markSolvedSynced, showToast, solved } = useStore();
  const { triggerSolve } = useCelebrations();

  const [category, setCategory] = useState<LearningMode>(initialMode);
  const [topicId, setTopicId] = useState<string>(initialTopicId || "all");
  const [difficulty, setDifficulty] = useState<"All" | "Easy" | "Medium" | "Hard">("All");
  const [questions, setQuestions] = useState<PracticeQuestionClientView[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<string>("");
  const [loading, setLoading] = useState(false);

  // Per-question interactive state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hintsShown, setHintsShown] = useState<string[]>([]);
  const [checkResult, setCheckResult] = useState<{
    correct: boolean;
    message?: string;
    explanation?: string;
    correctIndex?: number;
  } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setCategory(initialMode);
  }, [initialMode]);

  useEffect(() => {
    setTopicId(initialTopicId || "all");
  }, [initialTopicId]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchPracticeCatalog({ category, topicId, difficulty, limit: 35 })
      .then((res) => {
        if (cancelled) return;
        setQuestions(res.questions);
        if (res.questions.length > 0) {
          setSelectedQuestionId(res.questions[0].id);
        } else {
          setSelectedQuestionId("");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category, topicId, difficulty]);

  // Reset per-question interactive answers whenever user picks another question
  useEffect(() => {
    setSelectedOption(null);
    setHintsShown([]);
    setCheckResult(null);
  }, [selectedQuestionId]);

  const activeQuestion = questions.find((q) => q.id === selectedQuestionId) || null;
  const completedIds = new Set(progress.memory.completedQuestions.map((c) => c.questionId));
  const isAlreadyCompleted = Boolean(
    activeQuestion &&
      (completedIds.has(activeQuestion.id) ||
        (activeQuestion.id.startsWith("dsa:") && solved.includes(activeQuestion.id.slice(4)))),
  );

  const handleRequestHint = async () => {
    if (!activeQuestion || submitting) return;
    setSubmitting(true);
    try {
      const res = await submitPracticeAction({
        action: "hint",
        question: activeQuestion,
        hintIndex: hintsShown.length,
        isGuest,
      });
      if (res.hint) {
        setHintsShown((prev) => (prev.includes(res.hint!) ? prev : [...prev, res.hint!]));
      }
    } catch (err) {
      showToast((err as Error).message || "Could not load hint", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCheckAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!activeQuestion || selectedOption === null || submitting) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setSubmitting(true);
    try {
      const res = await submitPracticeAction({
        action: "check",
        question: activeQuestion,
        selectedIndex: selectedOption,
        hintsUsed: hintsShown.length,
        isGuest,
      });

      if (res.correct) {
        setCheckResult({
          correct: true,
          correctIndex: res.correctIndex,
          explanation: res.explanation,
          message: "Correct! Verified and logged to your progress.",
        });
        if (activeQuestion.category === "dsa" && activeQuestion.id.startsWith("dsa:")) {
          markSolvedSynced(activeQuestion.id.slice(4));
        } else {
          markSession();
        }
        triggerSolve({
          x: rect.left + rect.width / 2,
          y: rect.top,
          totalSolved: progress.dsaSummary.solvedCount + 1,
          isFirstToday: res.streakUpdated,
        });
      } else {
        setCheckResult({
          correct: false,
          message:
            res.message ||
            "Not quite right. Review the hint and try another choice, or reveal the full solution.",
        });
        if (res.hint && !hintsShown.includes(res.hint)) {
          setHintsShown((prev) => [...prev, res.hint!]);
        }
      }

      void onRefreshProgress();
    } catch (err) {
      showToast((err as Error).message || "Check failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRevealSolution = async () => {
    if (!activeQuestion || submitting) return;
    setSubmitting(true);
    try {
      const res = await submitPracticeAction({
        action: "reveal_solution",
        question: activeQuestion,
        hintsUsed: hintsShown.length,
        isGuest,
      });
      setCheckResult({
        correct: false,
        correctIndex: res.correctIndex,
        explanation: res.explanation,
        message: "Full solution revealed. Review the reasoning carefully.",
      });
      if (typeof res.correctIndex === "number") {
        setSelectedOption(res.correctIndex);
      }
      void onRefreshProgress();
    } catch (err) {
      showToast((err as Error).message || "Could not reveal solution", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const topicList = category === "dsa" ? DSA_PRACTICE_TOPICS : APTITUDE_PRACTICE_TOPICS;

  return (
    <div className="flex flex-col gap-4">
      {/* Practice Controls Bar */}
      <div className="card p-4 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-border p-0.5 bg-surface-2">
          <button
            type="button"
            onClick={() => {
              setCategory("dsa");
              setTopicId("all");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              category === "dsa" ? "surface-inverse" : "text-ink hover:bg-surface"
            }`}
          >
            DSA Practice
          </button>
          <button
            type="button"
            onClick={() => {
              setCategory("aptitude");
              setTopicId("all");
            }}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              category === "aptitude" ? "surface-inverse" : "text-ink hover:bg-surface"
            }`}
          >
            Aptitude Practice
          </button>
        </div>

        <select
          aria-label="Practice topic"
          value={topicId}
          onChange={(e) => setTopicId(e.target.value)}
          className="h-9 px-3 rounded-xl border border-border bg-surface text-ink text-xs font-medium min-w-[180px]"
        >
          <option value="all">All {category === "dsa" ? "DSA" : "Aptitude"} Topics</option>
          {topicList.map((t) => (
            <option key={t.id} value={t.id}>
              {t.name}
            </option>
          ))}
        </select>

        <div className="flex items-center gap-1.5 flex-wrap">
          {(["All", "Easy", "Medium", "Hard"] as const).map((diff) => (
            <button
              key={diff}
              type="button"
              onClick={() => setDifficulty(diff)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                difficulty === diff
                  ? "surface-inverse border-borderStrong"
                  : "bg-surface border-border text-ink hover:bg-surface-2"
              }`}
            >
              {diff}
            </button>
          ))}
        </div>

        <span className="ml-auto text-xs text-muted font-mono">
          {questions.length} questions loaded
        </span>
      </div>

      {/* Practice Workspace Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Queue */}
        <aside className="card p-3 lg:col-span-4 flex flex-col gap-2 max-h-[600px] overflow-y-auto">
          <div className="px-2 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            QUESTION BANK
          </div>
          {loading ? (
            <div className="p-4 text-xs text-muted">Loading questions...</div>
          ) : questions.length === 0 ? (
            <div className="p-4 text-xs text-muted">
              No questions match these filters. Try setting difficulty to All.
            </div>
          ) : (
            questions.map((q, idx) => {
              const active = q.id === selectedQuestionId;
              const isDone =
                completedIds.has(q.id) ||
                (q.id.startsWith("dsa:") && solved.includes(q.id.slice(4)));
              return (
                <button
                  key={q.id}
                  type="button"
                  onClick={() => setSelectedQuestionId(q.id)}
                  className={`text-left p-3 rounded-xl border transition-colors flex items-start justify-between gap-2 ${
                    active
                      ? "surface-inverse border-borderStrong"
                      : "bg-surface border-border hover:bg-surface-2 text-ink"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">
                      {String(idx + 1).padStart(2, "0")}. {q.title}
                    </div>
                    <div
                      className={`text-[11px] mt-1 flex items-center gap-2 ${
                        active ? "text-inverse-muted" : "text-muted"
                      }`}
                    >
                      <span>{q.topicName}</span>
                      <span>·</span>
                      <span>{q.difficulty}</span>
                    </div>
                  </div>
                  {isDone && <CheckCircle2 size={15} className="shrink-0 mt-0.5" />}
                </button>
              );
            })
          )}
        </aside>

        {/* Right Interactive Practice Card */}
        <section className="card p-5 md:p-6 lg:col-span-8 flex flex-col gap-5">
          {!activeQuestion ? (
            <div className="my-auto text-center py-12 text-sm text-muted">
              Select a question from the bank to start practicing.
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold uppercase border border-border bg-surface text-ink">
                    {activeQuestion.topicName}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-border bg-surface text-ink">
                    {activeQuestion.difficulty}
                  </span>
                  {isAlreadyCompleted && (
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold surface-inverse inline-flex items-center gap-1">
                      <CheckCircle2 size={12} /> Completed
                    </span>
                  )}
                </div>

                {activeQuestion.leetcodeSlug && (
                  <a
                    href={`https://leetcode.com/problems/${activeQuestion.leetcodeSlug}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-ink underline"
                  >
                    Open on LeetCode <ExternalLink size={12} />
                  </a>
                )}
              </div>

              <div>
                <h2 className="font-heading text-lg md:text-xl font-bold text-ink m-0">
                  {activeQuestion.title}
                </h2>
                <p className="text-sm text-ink-2 mt-2 leading-relaxed">{activeQuestion.prompt}</p>
              </div>

              {/* Options */}
              <div className="flex flex-col gap-2.5">
                {activeQuestion.options.map((opt, idx) => {
                  const isPicked = selectedOption === idx;
                  const isRevealedCorrect =
                    checkResult && typeof checkResult.correctIndex === "number" && checkResult.correctIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedOption(idx)}
                      className={`text-left p-3.5 rounded-xl border flex items-center justify-between gap-3 transition-colors ${
                        isPicked
                          ? "surface-inverse border-borderStrong"
                          : isRevealedCorrect
                            ? "bg-surface-2 border-borderStrong text-ink"
                            : "bg-surface border-border hover:bg-surface-2 text-ink"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 border ${
                            isPicked
                              ? "border-inverse-ink text-inverse-ink"
                              : "border-border bg-surface-2 text-ink"
                          }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span className="text-sm font-medium break-words">{opt}</span>
                      </div>
                      {isRevealedCorrect && <CheckCircle2 size={16} className="shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Hint-first & Check Actions */}
              <div className="flex flex-wrap items-center gap-2.5 pt-2">
                <button
                  type="button"
                  disabled={submitting || selectedOption === null}
                  onClick={(e) => void handleCheckAnswer(e)}
                  className="btn btn-primary btn-sm surface-inverse disabled:opacity-50"
                >
                  <Target size={14} /> Check Answer
                </button>

                <button
                  type="button"
                  disabled={submitting || hintsShown.length >= activeQuestion.hintCountAvailable}
                  onClick={() => void handleRequestHint()}
                  className="btn btn-quiet btn-sm border border-border disabled:opacity-50"
                >
                  <Lightbulb size={14} />
                  {hintsShown.length === 0
                    ? "Request Hint"
                    : hintsShown.length < activeQuestion.hintCountAvailable
                      ? `Next Hint (${hintsShown.length}/${activeQuestion.hintCountAvailable})`
                      : "All Hints Shown"}
                </button>

                <button
                  type="button"
                  disabled={submitting}
                  onClick={() => void handleRevealSolution()}
                  className="btn btn-quiet btn-sm border border-border"
                >
                  <Eye size={14} /> Reveal Full Solution
                </button>

                <button
                  type="button"
                  onClick={() =>
                    onAskTutor({
                      mode: activeQuestion.category,
                      topicId: activeQuestion.topicId,
                      prompt: `Help me understand "${activeQuestion.title}": ${activeQuestion.prompt}. Give me intuition and a dry run first (without spoiling code).`,
                    })
                  }
                  className="ml-auto btn btn-quiet btn-sm border border-border"
                >
                  <MessageSquare size={14} /> Ask SALAAR Tutor
                </button>
              </div>

              {/* Progressive Hints Display */}
              {hintsShown.length > 0 && (
                <div className="flex flex-col gap-2">
                  {hintsShown.map((h, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-surface-2 border border-border text-xs text-ink leading-relaxed"
                    >
                      <div className="font-semibold flex items-center gap-1.5 mb-1">
                        <Lightbulb size={13} /> Hint {i + 1}
                      </div>
                      <MarkdownText content={h} />
                    </div>
                  ))}
                </div>
              )}

              {/* Check Feedback & Optional Explanation */}
              {checkResult && (
                <div
                  className={`p-4 rounded-xl border ${
                    checkResult.correct
                      ? "bg-surface-2 border-borderStrong"
                      : "bg-surface-2 border-border"
                  } flex flex-col gap-2`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-heading font-bold text-sm text-ink inline-flex items-center gap-1.5">
                      {checkResult.correct ? (
                        <CheckCircle2 size={16} />
                      ) : (
                        <XCircle size={16} />
                      )}
                      {checkResult.message}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedOption(null);
                        setCheckResult(null);
                      }}
                      className="text-xs font-semibold text-muted hover:text-ink inline-flex items-center gap-1"
                    >
                      <RotateCcw size={12} /> Try again
                    </button>
                  </div>

                  {checkResult.explanation && (
                    <div className="pt-2 border-t border-border">
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-muted mb-1">
                        STEP-BY-STEP EXPLANATION
                      </div>
                      <MarkdownText content={checkResult.explanation} />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
};
