import React, { useEffect, useRef, useState } from "react";
import {
  AlertCircle,
  BookOpen,
  Code2,
  History,
  Lightbulb,
  MessageSquarePlus,
  RefreshCw,
  Send,
  Sparkles,
  Trash2,
} from "lucide-react";
import {
  APTITUDE_PRACTICE_TOPICS,
  DSA_PRACTICE_TOPICS,
} from "../../../api/salaar/_lib/practiceBank";
import type {
  LearningMode,
  SalaarDashboardProgress,
  SalaarMessage,
} from "../../lib/salaarService";
import {
  fetchConversationMessages,
  deleteConversationThread,
  sendSalaarChatMessage,
} from "../../lib/salaarService";
import { useStore } from "../../store";
import { MarkdownText } from "./MarkdownText";

interface Props {
  progress: SalaarDashboardProgress;
  isGuest: boolean;
  initialMode?: LearningMode;
  initialTopicId?: string;
  queuedPrompt?: string | null;
  activeConversationId?: string | null;
  onConsumeQueuedPrompt: () => void;
  onRefreshProgress: () => Promise<void>;
  onSelectConversationId: (id: string | null) => void;
}

const DSA_STARTER_PROMPTS = [
  "Teach me how Two Pointers eliminates nested loops with a simple dry run.",
  "I want to solve 'Longest Substring Without Repeating Characters' — walk me through intuition & hints first.",
  "When should I pick Binary Search on Answer over greedy?",
  "Break down 0/1 Knapsack Dynamic Programming in everyday words.",
];

const APTITUDE_STARTER_PROMPTS = [
  "Explain the LCM work-units trick for Time & Work problems step by step.",
  "Why does a +20% increase followed by -20% decrease result in a 4% loss?",
  "Walk me through Permutations vs Combinations with a placement example.",
  "Show me how to tackle Blood Relations & Direction sense quickly without mistakes.",
];

export const SalaarChatView: React.FC<Props> = ({
  progress,
  isGuest,
  initialMode = "dsa",
  initialTopicId = "",
  queuedPrompt,
  activeConversationId,
  onConsumeQueuedPrompt,
  onRefreshProgress,
  onSelectConversationId,
}) => {
  const { user, markSession, showToast } = useStore();
  const [mode, setMode] = useState<LearningMode>(initialMode);
  const [topicId, setTopicId] = useState<string>(initialTopicId);
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<SalaarMessage[]>([]);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [sending, setSending] = useState(false);
  const [chatError, setChatError] = useState<string | null>(null);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMode(initialMode);
  }, [initialMode]);

  useEffect(() => {
    if (initialTopicId !== undefined) setTopicId(initialTopicId);
  }, [initialTopicId]);

  // Load messages when activeConversationId changes
  useEffect(() => {
    if (!activeConversationId) {
      setMessages([]);
      return;
    }
    let cancelled = false;
    setLoadingMsgs(true);
    fetchConversationMessages(activeConversationId, isGuest)
      .then((rows) => {
        if (!cancelled) {
          setMessages(rows);
          if (rows.length > 0) setMode(rows[0].mode);
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (!cancelled) setLoadingMsgs(false);
      });
    return () => {
      cancelled = true;
    };
  }, [activeConversationId, isGuest]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  const sendMessage = async (
    text: string,
    action: "chat" | "hint" | "reexplain" | "reveal_code" | "example" | "practice_generate" = "chat",
  ) => {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    setChatError(null);
    setSending(true);
    if (action === "chat") setInput("");

    const optimisticUser: SalaarMessage = {
      id: `temp-${Date.now()}`,
      conversationId: activeConversationId || "new",
      role: "user",
      mode,
      content: trimmed,
      createdAt: new Date().toISOString(),
    };
    const priorHistory = messages.map((m) => ({ role: m.role, content: m.content }));
    setMessages((prev) => [...prev, optimisticUser]);

    try {
      const res = await sendSalaarChatMessage({
        message: trimmed,
        mode,
        action,
        topicId: topicId || undefined,
        difficulty,
        conversationId: activeConversationId || undefined,
        isGuest,
        guestMessages: priorHistory,
        guestSummary: {
          userName: user?.name || progress.userName,
          currentStreak: progress.streak.currentStreak,
          longestStreak: progress.streak.longestStreak,
          totalLearningDays: progress.streak.totalLearningDays,
          solvedCount: progress.dsaSummary.solvedCount,
          aptitudeTests: progress.aptitudeSummary.testsCompleted,
        },
      });

      const assistantMsg: SalaarMessage = {
        id: `ai-${Date.now()}`,
        conversationId: res.conversationId || "local",
        role: "assistant",
        mode: res.mode,
        content: res.reply,
        metadata: { provider: res.provider, model: res.model, action },
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
      if (res.conversationId && res.conversationId !== activeConversationId) {
        onSelectConversationId(res.conversationId);
      }

      if (res.streakRecorded) {
        markSession();
        showToast("Meaningful study session logged — daily streak updated!", "success");
      }

      void onRefreshProgress();
    } catch (err) {
      const e = err as Error & { code?: string };
      setChatError(e.message || "Could not reach SALAAR AI backend.");
      // Keep user message visible? Better restore input if chat failed on new prompt
      setMessages((prev) => prev.filter((m) => m.id !== optimisticUser.id));
      if (action === "chat") setInput(trimmed);
    } finally {
      setSending(false);
    }
  };

  const sendMessageRef = useRef(sendMessage);
  sendMessageRef.current = sendMessage;

  // Auto-send queued prompt if launched from Dashboard or Practice
  useEffect(() => {
    if (queuedPrompt && !sending) {
      const q = queuedPrompt;
      onConsumeQueuedPrompt();
      void sendMessageRef.current(q, "chat");
    }
  }, [queuedPrompt, sending, onConsumeQueuedPrompt]);

  const handleModeSwitch = (nextMode: LearningMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    setTopicId("");
    onSelectConversationId(null);
    setMessages([]);
    setChatError(null);
  };

  const handleDeleteConversation = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteConversationThread(id, isGuest);
      if (activeConversationId === id) {
        onSelectConversationId(null);
        setMessages([]);
      }
      await onRefreshProgress();
    } catch {
      showToast("Could not delete conversation.", "error");
    }
  };

  const starterPrompts = mode === "dsa" ? DSA_STARTER_PROMPTS : APTITUDE_STARTER_PROMPTS;
  const topicOptions = mode === "dsa" ? DSA_PRACTICE_TOPICS : APTITUDE_PRACTICE_TOPICS;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: Conversation History Sidebar */}
      <aside
        className={`card p-4 lg:col-span-3 flex flex-col gap-3 ${
          historyDrawerOpen ? "block" : "hidden lg:flex"
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
            SESSIONS ({progress.recentConversations.length})
          </span>
          <button
            type="button"
            onClick={() => {
              onSelectConversationId(null);
              setMessages([]);
              setChatError(null);
              setHistoryDrawerOpen(false);
            }}
            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold surface-inverse"
          >
            <MessageSquarePlus size={13} /> New Chat
          </button>
        </div>

        <div className="flex flex-col gap-1.5 max-h-[460px] overflow-y-auto pr-1">
          {progress.recentConversations.length === 0 ? (
            <p className="text-xs text-muted p-3 rounded-xl bg-surface-2 border border-border m-0">
              Your DSA & Aptitude tutoring conversations appear here so you can resume anytime.
            </p>
          ) : (
            progress.recentConversations.map((conv) => {
              const isSelected = conv.id === activeConversationId;
              return (
                <div
                  key={conv.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => {
                    onSelectConversationId(conv.id);
                    setHistoryDrawerOpen(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      onSelectConversationId(conv.id);
                      setHistoryDrawerOpen(false);
                    }
                  }}
                  className={`group flex items-start justify-between gap-2 p-2.5 rounded-xl border text-left cursor-pointer transition-colors ${
                    isSelected
                      ? "surface-inverse border-borderStrong"
                      : "bg-surface border-border hover:bg-surface-2 text-ink"
                  }`}
                >
                  <div className="min-w-0">
                    <div className="text-xs font-semibold truncate">{conv.title}</div>
                    <div
                      className={`text-[10px] uppercase font-mono mt-0.5 ${
                        isSelected ? "text-inverse-muted" : "text-muted"
                      }`}
                    >
                      {conv.mode} {conv.topicId ? `· ${conv.topicId}` : ""}
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Delete conversation"
                    onClick={(e) => void handleDeleteConversation(conv.id, e)}
                    className={`p-1 rounded opacity-70 hover:opacity-100 ${
                      isSelected ? "text-inverse-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </aside>

      {/* Main Chat Panel */}
      <section className="card lg:col-span-9 flex flex-col overflow-hidden min-h-[600px] max-h-[780px]">
        {/* Chat Top Toolbar */}
        <div className="p-4 border-b border-border bg-surface flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <img
              src="/salaar-avatar.jpg"
              alt="SALAAR AI Tutor"
              className="w-10 h-10 rounded-xl object-cover object-top border border-borderStrong shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-bold text-sm text-ink">SALAAR</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold border border-border bg-surface text-ink">
                  {mode === "dsa" ? "DSA Tutor" : "Aptitude Tutor"}
                </span>
              </div>
              <div className="text-xs text-muted">
                Hint-first · Step-by-step · Code on request only
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Mobile Sessions Toggle */}
            <button
              type="button"
              onClick={() => setHistoryDrawerOpen((v) => !v)}
              className="lg:hidden inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium border border-border bg-surface text-ink"
            >
              <History size={13} /> Sessions
            </button>

            {/* Separate DSA vs Aptitude Mode Switcher */}
            <div
              className="inline-flex rounded-xl border border-border p-0.5 bg-surface-2"
              role="group"
              aria-label="Learning mode"
            >
              <button
                type="button"
                onClick={() => handleModeSwitch("dsa")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mode === "dsa" ? "surface-inverse" : "text-ink hover:bg-surface"
                }`}
              >
                <Code2 size={13} /> DSA Mode
              </button>
              <button
                type="button"
                onClick={() => handleModeSwitch("aptitude")}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  mode === "aptitude" ? "surface-inverse" : "text-ink hover:bg-surface"
                }`}
              >
                <BookOpen size={13} /> Aptitude Mode
              </button>
            </div>
          </div>
        </div>

        {/* Sub-toolbar: Topic & Difficulty Context */}
        <div className="px-4 py-2.5 border-b border-border bg-surface-2 flex flex-wrap items-center gap-2.5 text-xs">
          <label className="inline-flex items-center gap-1.5 text-muted font-medium">
            <span>Focus topic:</span>
            <select
              value={topicId}
              onChange={(e) => setTopicId(e.target.value)}
              className="h-7 px-2 rounded-lg border border-border bg-surface text-ink text-xs"
            >
              <option value="">All {mode === "dsa" ? "DSA" : "Aptitude"} topics</option>
              {topicOptions.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name}
                </option>
              ))}
            </select>
          </label>

          <label className="inline-flex items-center gap-1.5 text-muted font-medium">
            <span>Target level:</span>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="h-7 px-2 rounded-lg border border-border bg-surface text-ink text-xs"
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </label>

          <button
            type="button"
            disabled={sending}
            onClick={() =>
              void sendMessage(
                `Give me a ${difficulty} ${mode.toUpperCase()} practice question${topicId ? ` on ${topicId}` : ""} without revealing the answer yet.`,
                "practice_generate",
              )
            }
            className="ml-auto inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-border bg-surface text-ink hover:bg-surface-3 font-semibold text-xs"
          >
            <Sparkles size={12} /> Generate Question
          </button>
        </div>

        {/* AI Setup Warning if backend lacks key */}
        {!progress.aiConfigured && (
          <div className="mx-4 mt-3 p-3 rounded-xl border border-borderStrong bg-surface-2 flex items-start gap-2.5 text-xs text-ink">
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <strong>Backend AI model key required for live replies:</strong> Add{" "}
              <code className="font-mono bg-surface px-1 py-0.5 rounded border border-border">
                GEMINI_API_KEY
              </code>{" "}
              (or <code className="font-mono">OPENAI_API_KEY</code> /{" "}
              <code className="font-mono">GROQ_API_KEY</code>) to your <code className="font-mono">.env</code>{" "}
              file or Vercel environment variables. Keys stay strictly on the server.
            </div>
          </div>
        )}

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-4 bg-surface">
          {loadingMsgs ? (
            <div className="text-xs text-muted p-4 text-center">Loading conversation history...</div>
          ) : messages.length === 0 ? (
            <div className="my-auto max-w-2xl mx-auto w-full flex flex-col items-center text-center gap-4 py-6">
              <img
                src="/salaar-avatar.jpg"
                alt="SALAAR Mentor"
                className="w-20 h-20 rounded-2xl object-cover object-top border-2 border-borderStrong shadow-sm"
              />
              <div>
                <h3 className="font-heading text-xl font-bold text-ink m-0">
                  {mode === "dsa"
                    ? "Master the Pattern Before the Code."
                    : "Break Every Problem Down to Clean Steps."}
                </h3>
                <p className="text-xs md:text-sm text-muted mt-1.5 max-w-lg mx-auto">
                  {mode === "dsa"
                    ? "Ask about any DSA concept, pattern, or problem. I will walk you through intuition, dry runs, time & space complexity, and hints first — code only when you ask."
                    : "Ask any placement Aptitude or Logical Reasoning question. I will identify the right method, show calculations step by step, share shortcuts, and generate drills."}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left mt-2">
                {starterPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    disabled={sending}
                    onClick={() => void sendMessage(prompt, "chat")}
                    className="p-3 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors text-xs text-ink font-medium leading-relaxed"
                  >
                    “{prompt}”
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((msg, idx) => {
              const isUser = msg.role === "user";
              const isLatestAssistant = !isUser && idx === messages.length - 1;
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isUser ? "justify-end" : "justify-start"}`}
                >
                  {!isUser && (
                    <img
                      src="/salaar-avatar.jpg"
                      alt="SALAAR"
                      className="w-8 h-8 rounded-lg object-cover object-top border border-border shrink-0 mt-1"
                    />
                  )}
                  <div
                    className={`max-w-[85%] md:max-w-[78%] rounded-2xl px-4 py-3 ${
                      isUser
                        ? "surface-inverse"
                        : "bg-surface-2 border border-border text-ink"
                    }`}
                  >
                    {isUser ? (
                      <div className="text-sm whitespace-pre-wrap break-words leading-relaxed">
                        {msg.content}
                      </div>
                    ) : (
                      <>
                        <MarkdownText content={msg.content} />
                        {isLatestAssistant && !sending && (
                          <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border">
                            <button
                              type="button"
                              onClick={() =>
                                void sendMessage("Give me the next progressive hint.", "hint")
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-surface text-ink hover:bg-surface-3 text-[11px] font-semibold"
                            >
                              <Lightbulb size={12} /> Next Hint
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void sendMessage(
                                  "I still don't understand. Please re-explain this in a completely different way with a simple analogy.",
                                  "reexplain",
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-surface text-ink hover:bg-surface-3 text-[11px] font-semibold"
                            >
                              <RefreshCw size={12} /> Explain Differently
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void sendMessage(
                                  "Walk through a step-by-step concrete dry run example.",
                                  "example",
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full border border-border bg-surface text-ink hover:bg-surface-3 text-[11px] font-semibold"
                            >
                              Dry Run Example
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void sendMessage(
                                  mode === "dsa"
                                    ? "Please show the complete clean code implementation now."
                                    : "Please reveal the full final answer and verification now.",
                                  "reveal_code",
                                )
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold surface-inverse"
                            >
                              {mode === "dsa" ? "Show Code" : "Reveal Solution"}
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })
          )}

          {sending && (
            <div className="flex items-start gap-3">
              <img
                src="/salaar-avatar.jpg"
                alt="SALAAR thinking"
                className="w-8 h-8 rounded-lg object-cover object-top border border-border shrink-0"
              />
              <div className="px-4 py-3 rounded-2xl bg-surface-2 border border-border text-xs text-muted flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-accent animate-pulse" />
                SALAAR is breaking this down step by step...
              </div>
            </div>
          )}

          {chatError && (
            <div className="p-3 rounded-xl border border-borderStrong bg-surface-2 text-xs text-ink flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{chatError}</span>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Message Composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendMessage(input, "chat");
          }}
          className="p-3 md:p-4 border-t border-border bg-surface flex items-end gap-2.5"
        >
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendMessage(input, "chat");
              }
            }}
            placeholder={
              mode === "dsa"
                ? "Ask a DSA doubt, problem approach, complexity question, or follow-up..."
                : "Ask an Aptitude question, shortcut, or request a similar drill..."
            }
            className="flex-1 resize-none rounded-xl border border-border bg-surface-2 px-3.5 py-2.5 text-sm text-ink placeholder:text-muted focus:outline-none focus:border-borderStrong min-h-[44px] max-h-[120px]"
          />
          <button
            type="submit"
            disabled={sending || !input.trim()}
            className="h-[44px] px-4 rounded-xl font-semibold text-sm inline-flex items-center gap-1.5 surface-inverse disabled:opacity-50"
          >
            <Send size={15} />
            <span className="hidden sm:inline">Send</span>
          </button>
        </form>
      </section>
    </div>
  );
};
