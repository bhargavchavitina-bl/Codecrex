import React, { useCallback, useEffect, useState } from "react";
import {
  AlertCircle,
  Flame,
  LayoutDashboard,
  MessageSquare,
  RefreshCw,
  Target,
} from "lucide-react";
import {
  fetchSalaarDashboard,
  updateSalaarPreferences,
  type LearningMode,
  type LearningPreferences,
  type SalaarConversationSummary,
  type SalaarDashboardProgress,
} from "../../lib/salaarService";
import { useStore } from "../../store";
import { SalaarChatView } from "./SalaarChatView";
import { SalaarDashboardView } from "./SalaarDashboardView";
import { SalaarPracticeView } from "./SalaarPracticeView";

type SalaarTab = "dashboard" | "chat" | "practice";

export const SalaarPage: React.FC = () => {
  const { user, solved, revisit, activeDays, attempts, showToast } = useStore();
  const isGuest = Boolean(!user || user.guest);

  const [tab, setTab] = useState<SalaarTab>("dashboard");
  const [progress, setProgress] = useState<SalaarDashboardProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Shared cross-tab launch state
  const [chatMode, setChatMode] = useState<LearningMode>("dsa");
  const [chatTopicId, setChatTopicId] = useState<string>("");
  const [queuedPrompt, setQueuedPrompt] = useState<string | null>(null);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [practiceMode, setPracticeMode] = useState<LearningMode>("dsa");
  const [practiceTopicId, setPracticeTopicId] = useState<string>("all");

  const loadDashboard = useCallback(async () => {
    try {
      setError(null);
      const data = await fetchSalaarDashboard(isGuest, {
        userName: user?.name || "Learner",
        targetRole: user?.target || "Software Engineer",
        solved,
        revisit,
        activeDays,
        attempts,
      });
      setProgress(data);
    } catch (err) {
      setError((err as Error).message || "Could not load SALAAR workspace.");
    } finally {
      setLoading(false);
    }
  }, [isGuest, user?.name, user?.target, solved, revisit, activeDays, attempts]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  const handleStartChat = (opts: { mode: LearningMode; topicId?: string; prompt?: string }) => {
    setChatMode(opts.mode);
    setChatTopicId(opts.topicId || "");
    if (opts.prompt) {
      setActiveConversationId(null);
      setQueuedPrompt(opts.prompt);
    }
    setTab("chat");
  };

  const handleResumeConversation = (conv: SalaarConversationSummary) => {
    setChatMode(conv.mode);
    setChatTopicId(conv.topicId || "");
    setQueuedPrompt(null);
    setActiveConversationId(conv.id);
    setTab("chat");
  };

  const handleStartPractice = (opts: { mode: LearningMode; topicId?: string }) => {
    setPracticeMode(opts.mode);
    setPracticeTopicId(opts.topicId || "all");
    setTab("practice");
  };

  const handleUpdatePreferences = async (updates: Partial<LearningPreferences>) => {
    try {
      const nextPrefs = await updateSalaarPreferences(updates, isGuest);
      setProgress((prev) =>
        prev
          ? {
              ...prev,
              memory: { ...prev.memory, preferences: nextPrefs },
              streak: {
                ...prev.streak,
                todayGoal: nextPrefs.dailyGoal || prev.streak.todayGoal,
              },
            }
          : prev,
      );
      showToast("Learning preferences saved", "success");
    } catch {
      showToast("Could not save preferences", "error");
    }
  };

  return (
    <div className="content-wrap">
      {/* SALAAR Header Banner featuring Prabhas-inspired monochrome portrait */}
      <section className="card p-5 md:p-6 mb-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative shrink-0">
              <img
                src="/salaar-avatar.jpg"
                alt="SALAAR AI Learning Agent"
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl object-cover object-top border-2 border-borderStrong bg-surface"
              />
              <span
                className="absolute -bottom-1.5 -right-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold surface-inverse border border-surface"
                title="SALAAR AI Tutor"
              >
                AI
              </span>
            </div>

            <div>
              <div className="eyebrow">AI LEARNING AGENT</div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-ink m-0 mt-1">
                SALAAR — Your Study Mentor
                {progress ? `, ${progress.userName.split(" ")[0]}` : ""}
              </h1>
              <p className="text-xs md:text-sm text-muted mt-1 m-0 max-w-xl">
                Patient, step-by-step DSA & Placement Aptitude coaching tailored to your memory,
                weak spots, and daily streak.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-center">
            {progress && (
              <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl border border-border bg-surface-2 text-xs font-semibold text-ink tabular-nums">
                <Flame size={15} fill={progress.streak.qualifiedToday ? "currentColor" : "none"} />
                <span>{progress.streak.currentStreak} day streak</span>
              </div>
            )}
            <button
              type="button"
              onClick={() => void loadDashboard()}
              className="btn btn-quiet btn-sm border border-border"
              title="Refresh learning stats"
            >
              <RefreshCw size={14} /> Sync
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside /salaar */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-border">
          <button
            type="button"
            onClick={() => setTab("dashboard")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
              tab === "dashboard"
                ? "surface-inverse border-borderStrong"
                : "bg-surface border-border text-ink hover:bg-surface-2"
            }`}
          >
            <LayoutDashboard size={15} /> Learning Dashboard
          </button>

          <button
            type="button"
            onClick={() => setTab("chat")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
              tab === "chat"
                ? "surface-inverse border-borderStrong"
                : "bg-surface border-border text-ink hover:bg-surface-2"
            }`}
          >
            <MessageSquare size={15} /> AI Tutor Chat
          </button>

          <button
            type="button"
            onClick={() => setTab("practice")}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs md:text-sm font-semibold border transition-colors ${
              tab === "practice"
                ? "surface-inverse border-borderStrong"
                : "bg-surface border-border text-ink hover:bg-surface-2"
            }`}
          >
            <Target size={15} /> Practice System
          </button>
        </div>
      </section>

      {progress?.schemaPending && !isGuest && (
        <div className="mb-4 p-4 rounded-xl border border-borderStrong bg-surface-2 text-xs text-ink flex items-start gap-2.5">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <div>
            <strong>Database migration pending:</strong> Run{" "}
            <code className="font-mono bg-surface px-1 py-0.5 rounded border border-border">
              supabase/migrations/003_salaar.sql
            </code>{" "}
            in your Supabase SQL Editor so SALAAR chat history, learning memory, and practice
            analytics sync to Postgres across devices.
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 rounded-xl border border-borderStrong bg-surface-2 text-xs text-ink flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
          <button
            type="button"
            onClick={() => void loadDashboard()}
            className="btn btn-sm surface-inverse"
          >
            Retry
          </button>
        </div>
      )}

      {loading || !progress ? (
        <div className="card p-8 text-center text-sm text-muted">
          Initializing SALAAR workspace...
        </div>
      ) : tab === "dashboard" ? (
        <SalaarDashboardView
          progress={progress}
          onStartChat={handleStartChat}
          onResumeConversation={handleResumeConversation}
          onStartPractice={handleStartPractice}
          onUpdatePreferences={handleUpdatePreferences}
        />
      ) : tab === "chat" ? (
        <SalaarChatView
          progress={progress}
          isGuest={isGuest}
          initialMode={chatMode}
          initialTopicId={chatTopicId}
          queuedPrompt={queuedPrompt}
          activeConversationId={activeConversationId}
          onConsumeQueuedPrompt={() => setQueuedPrompt(null)}
          onRefreshProgress={loadDashboard}
          onSelectConversationId={setActiveConversationId}
        />
      ) : (
        <SalaarPracticeView
          progress={progress}
          isGuest={isGuest}
          initialMode={practiceMode}
          initialTopicId={practiceTopicId}
          onRefreshProgress={loadDashboard}
          onAskTutor={handleStartChat}
        />
      )}
    </div>
  );
};
