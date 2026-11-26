import React, { useState } from "react";
import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Code2,
  Compass,
  Flame,
  MessageSquare,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import type {
  LearningMode,
  LearningPreferences,
  SalaarConversationSummary,
  SalaarDashboardProgress,
} from "../../lib/salaarService";

interface Props {
  progress: SalaarDashboardProgress;
  onStartChat: (opts: { mode: LearningMode; topicId?: string; prompt?: string }) => void;
  onResumeConversation: (conv: SalaarConversationSummary) => void;
  onStartPractice: (opts: { mode: LearningMode; topicId?: string }) => void;
  onUpdatePreferences: (prefs: Partial<LearningPreferences>) => Promise<void>;
}

export const SalaarDashboardView: React.FC<Props> = ({
  progress,
  onStartChat,
  onResumeConversation,
  onStartPractice,
  onUpdatePreferences,
}) => {
  const { streak, dsaSummary, aptitudeSummary, weakTopics, recommendedTopics, recentSessions, memory } =
    progress;
  const [savingPrefs, setSavingPrefs] = useState(false);

  const todayPct = Math.min(
    100,
    Math.round((streak.todayCompletedCount / Math.max(streak.todayGoal, 1)) * 100),
  );

  const handlePrefChange = async (updates: Partial<LearningPreferences>) => {
    setSavingPrefs(true);
    try {
      await onUpdatePreferences(updates);
    } finally {
      setSavingPrefs(false);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Row 1: Streak & Daily Progress KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Current Streak with visual flame indicator */}
        <div className="card p-5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                streak.qualifiedToday
                  ? "surface-inverse"
                  : "bg-surface-2 border border-border text-ink"
              }`}
            >
              <Flame size={20} fill={streak.qualifiedToday ? "currentColor" : "none"} />
            </span>
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                streak.qualifiedToday
                  ? "badge-inverse"
                  : "badge-outline bg-surface border border-border text-ink"
              }`}
            >
              {streak.qualifiedToday ? "Active today" : "Pending today"}
            </span>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-ink tabular-nums">
              {streak.currentStreak}{" "}
              <span className="text-sm font-sans font-medium text-muted">
                {streak.currentStreak === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="text-sm font-semibold text-ink mt-0.5">Current Streak</div>
            <p className="text-xs text-muted mt-1 m-0">
              {streak.qualifiedToday
                ? "Today is locked in. Keep building momentum."
                : "Solve a question or finish a study session to extend."}
            </p>
          </div>
        </div>

        {/* Longest Streak & Total Learning Days */}
        <div className="card p-5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-surface-2 border border-border text-ink flex items-center justify-center">
              <Trophy size={19} />
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-border bg-surface text-ink">
              {streak.totalLearningDays} total days
            </span>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-ink tabular-nums">
              {streak.longestStreak}{" "}
              <span className="text-sm font-sans font-medium text-muted">
                {streak.longestStreak === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="text-sm font-semibold text-ink mt-0.5">Longest Streak</div>
            <p className="text-xs text-muted mt-1 m-0">
              Tracked strictly on your local timezone calendar.
            </p>
          </div>
        </div>

        {/* Today's Study Progress */}
        <div className="card p-5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-surface-2 border border-border text-ink flex items-center justify-center">
              <Target size={19} />
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-border bg-surface text-ink tabular-nums">
              {streak.todayCompletedCount}/{streak.todayGoal} goal
            </span>
          </div>
          <div>
            <div className="text-3xl font-heading font-bold text-ink tabular-nums">
              {todayPct}%
            </div>
            <div className="text-sm font-semibold text-ink mt-0.5">Today’s Progress</div>
            <div className="w-full h-2 rounded-full bg-surface-3 overflow-hidden mt-2">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{
                  width: streak.todayCompletedCount > 0 ? `max(6px, ${todayPct}%)` : "0%",
                }}
              />
            </div>
          </div>
        </div>

        {/* DSA & Aptitude Totals */}
        <div className="card p-5 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <span className="w-10 h-10 rounded-xl bg-surface-2 border border-border text-ink flex items-center justify-center">
              <CheckCircle2 size={19} />
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold border border-border bg-surface text-ink">
              Combined
            </span>
          </div>
          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-2xl font-heading font-bold text-ink tabular-nums">
                {streak.problemsSolvedCount}
              </div>
              <div className="text-xs text-muted">DSA solved</div>
            </div>
            <div className="h-8 w-px bg-border" />
            <div>
              <div className="text-2xl font-heading font-bold text-ink tabular-nums">
                {streak.aptitudeCompletedCount}
              </div>
              <div className="text-xs text-muted">Aptitude done</div>
            </div>
          </div>
          <p className="text-xs text-muted m-0">
            Page visits never inflate stats — only completed work counts.
          </p>
        </div>
      </div>

      {/* Row 2: Weekly Activity Calendar & DSA / Aptitude Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Weekly Calendar */}
        <section className="card p-5 lg:col-span-5 flex flex-col justify-between gap-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                WEEKLY RHYTHM
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Last 7 Days Calendar
              </h2>
            </div>
            <span className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink">
              <Calendar size={17} />
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2">
            {streak.weeklyCalendar.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} qualifying activities`}
                className={`flex flex-col items-center justify-center py-3 px-1 rounded-xl border transition-colors ${
                  day.active
                    ? "surface-inverse border-borderStrong"
                    : day.isToday
                      ? "bg-surface-2 border-borderStrong text-ink"
                      : "bg-surface border-border text-ink"
                }`}
              >
                <span
                  className={`text-[10px] font-semibold uppercase ${
                    day.active ? "text-inverse-ink" : "text-muted"
                  }`}
                >
                  {day.label}
                </span>
                <span className="text-sm font-heading font-bold mt-1 tabular-nums">
                  {day.date.slice(8)}
                </span>
                <span
                  className={`text-[10px] mt-1 font-mono ${
                    day.active ? "text-inverse-muted" : "text-muted"
                  }`}
                >
                  {day.active ? `${day.count}×` : "—"}
                </span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between text-xs text-muted pt-2 border-t border-border">
            <span>Filled black = qualifying study day</span>
            <span className="font-mono text-ink">
              {streak.weeklyCalendar.filter((d) => d.active).length}/7 active
            </span>
          </div>
        </section>

        {/* DSA Activity Card */}
        <section className="card p-5 lg:col-span-4 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                DSA ACTIVITY
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Roadmap & Patterns
              </h2>
            </div>
            <span className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink">
              <Code2 size={17} />
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-heading font-bold text-ink tabular-nums">
              {dsaSummary.solvedCount}
            </span>
            <span className="text-sm text-muted tabular-nums">
              / {dsaSummary.totalCount} curated problems
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs text-ink">
            <span className="px-2.5 py-1 rounded-full border border-border bg-surface">
              ○ Easy {dsaSummary.easySolved}
            </span>
            <span className="px-2.5 py-1 rounded-full border border-border bg-surface">
              ◐ Medium {dsaSummary.mediumSolved}
            </span>
            <span className="px-2.5 py-1 rounded-full border border-border bg-surface">
              ● Hard {dsaSummary.hardSolved}
            </span>
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={() => onStartPractice({ mode: "dsa" })}
              className="btn btn-primary btn-sm flex-1 surface-inverse"
            >
              Practice DSA <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() =>
                onStartChat({
                  mode: "dsa",
                  prompt: "Help me pick a DSA pattern to master next based on my progress.",
                })
              }
              className="btn btn-quiet btn-sm border border-border"
            >
              Ask SALAAR
            </button>
          </div>
        </section>

        {/* Aptitude Activity Card */}
        <section className="card p-5 lg:col-span-3 flex flex-col justify-between gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                APTITUDE ACTIVITY
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Placement Readiness
              </h2>
            </div>
            <span className="w-9 h-9 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-ink">
              <BookOpen size={17} />
            </span>
          </div>

          <div className="flex items-baseline gap-4">
            <div>
              <div className="text-2xl font-heading font-bold text-ink tabular-nums">
                {aptitudeSummary.testsCompleted}
              </div>
              <div className="text-xs text-muted">Mock tests</div>
            </div>
            <div>
              <div className="text-2xl font-heading font-bold text-ink tabular-nums">
                {aptitudeSummary.avgAccuracy}%
              </div>
              <div className="text-xs text-muted">Avg accuracy</div>
            </div>
          </div>

          <div className="flex flex-col gap-2 pt-2">
            <button
              type="button"
              onClick={() => onStartPractice({ mode: "aptitude" })}
              className="btn btn-primary btn-sm w-full surface-inverse"
            >
              Practice Aptitude <ArrowRight size={14} />
            </button>
            <button
              type="button"
              onClick={() =>
                onStartChat({
                  mode: "aptitude",
                  prompt: "Teach me the fastest shortcut methods for placement aptitude tests.",
                })
              }
              className="btn btn-quiet btn-sm border border-border w-full"
            >
              Ask SALAAR
            </button>
          </div>
        </section>
      </div>

      {/* Row 3: Weak Topics, Recommended Topics Next & Learning Memory Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Topics the User Struggles With */}
        <section className="card p-5 lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                NEEDS FOCUS
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Topics You Struggle With
              </h2>
            </div>
            <AlertTriangle size={18} className="text-ink" />
          </div>

          {weakTopics.length === 0 ? (
            <div className="p-4 rounded-xl bg-surface-2 border border-border text-xs text-muted leading-relaxed">
              No weak topics flagged yet. Missed practice questions, low test scores (&lt;65%), or
              DSA problems flagged for revisit appear here automatically so SALAAR can reinforce them.
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {weakTopics.map((wt) => (
                <div
                  key={`${wt.category}-${wt.topicId}`}
                  className="p-3 rounded-xl border border-border bg-surface flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-semibold text-sm text-ink">{wt.topicName}</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border border-border bg-surface text-ink">
                      {wt.category}
                    </span>
                  </div>
                  <p className="text-xs text-muted m-0">{wt.reason}</p>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onStartChat({
                          mode: wt.category,
                          topicId: wt.topicId,
                          prompt: `I struggled with ${wt.topicName}. Can you break down the core intuition and walk me through an example step by step?`,
                        })
                      }
                      className="text-xs font-semibold text-ink underline hover:text-ink-2"
                    >
                      Tutor me on this
                    </button>
                    <span className="text-muted">·</span>
                    <button
                      type="button"
                      onClick={() => onStartPractice({ mode: wt.category, topicId: wt.topicId })}
                      className="text-xs font-semibold text-ink underline hover:text-ink-2"
                    >
                      Practice drills
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Recommended Topics to Study Next */}
        <section className="card p-5 lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                NEXT IN LINE
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Recommended to Study Next
              </h2>
            </div>
            <Compass size={18} className="text-ink" />
          </div>

          <div className="flex flex-col gap-2.5">
            {recommendedTopics.map((rec) => (
              <div
                key={`${rec.category}-${rec.topicId}`}
                className="p-3 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-ink truncate">
                      {rec.topicName}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                        rec.priority === "weak"
                          ? "surface-inverse"
                          : "border border-border bg-surface text-ink"
                      }`}
                    >
                      {rec.priority === "weak"
                        ? "Priority"
                        : rec.priority === "in_progress"
                          ? "In progress"
                          : "Next"}
                    </span>
                  </div>
                  <p className="text-xs text-muted m-0 mt-0.5 truncate">{rec.reason}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    onStartChat({
                      mode: rec.category,
                      topicId: rec.topicId,
                      prompt: `Teach me ${rec.topicName} from fundamentals up to key patterns.`,
                    })
                  }
                  className="shrink-0 w-8 h-8 rounded-lg surface-inverse flex items-center justify-center"
                  aria-label={`Study ${rec.topicName} with SALAAR`}
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* AI Learning Memory & Personalization Preferences */}
        <section className="card p-5 lg:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                LEARNING MEMORY
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                How SALAAR Teaches You
              </h2>
            </div>
            <SlidersHorizontal size={18} className="text-ink" />
          </div>

          <div className="flex flex-col gap-3 text-xs">
            <label className="flex flex-col gap-1">
              <span className="font-semibold text-ink">Skill level</span>
              <select
                disabled={savingPrefs}
                value={memory.preferences.skillLevel}
                onChange={(e) =>
                  void handlePrefChange({
                    skillLevel: e.target.value as LearningPreferences["skillLevel"],
                  })
                }
                className="h-9 px-3 rounded-lg border border-border bg-surface text-ink text-xs"
              >
                <option value="beginner">Beginner — gentle basics & analogies</option>
                <option value="intermediate">Intermediate — interview patterns & tradeoffs</option>
                <option value="advanced">Advanced — optimal bounds & edge cases</option>
              </select>
            </label>

            <label className="flex flex-col gap-1">
              <span className="font-semibold text-ink">Explanation style</span>
              <select
                disabled={savingPrefs}
                value={memory.preferences.explanationStyle}
                onChange={(e) =>
                  void handlePrefChange({
                    explanationStyle: e.target.value as LearningPreferences["explanationStyle"],
                  })
                }
                className="h-9 px-3 rounded-lg border border-border bg-surface text-ink text-xs"
              >
                <option value="simple">Simple & everyday intuition</option>
                <option value="visual">Visual dry-run tables step by step</option>
                <option value="rigorous">Rigorous proofs & complexity invariants</option>
              </select>
            </label>

            <label className="flex items-center justify-between pt-1 cursor-pointer">
              <span className="font-semibold text-ink">Daily qualifying activity goal</span>
              <select
                disabled={savingPrefs}
                value={memory.preferences.dailyGoal}
                onChange={(e) =>
                  void handlePrefChange({ dailyGoal: Number(e.target.value) || 2 })
                }
                className="h-8 px-2.5 rounded-lg border border-border bg-surface text-ink text-xs tabular-nums"
              >
                <option value={1}>1 / day</option>
                <option value={2}>2 / day</option>
                <option value={3}>3 / day</option>
                <option value={5}>5 / day</option>
              </select>
            </label>
          </div>

          <div className="mt-auto pt-3 border-t border-border flex items-center justify-between text-xs text-muted">
            <span>
              Studied topics:{" "}
              <strong className="text-ink">{memory.studiedTopics.length}</strong>
            </span>
            <span>
              Struggled items:{" "}
              <strong className="text-ink">{memory.struggledQuestions.length}</strong>
            </span>
          </div>
        </section>
      </div>

      {/* Row 4: Recent Learning Sessions & Recent Tutor Conversations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <section className="card p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                ACTIVITY LOG
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Recent Learning Sessions
              </h2>
            </div>
            <Activity size={18} className="text-ink" />
          </div>

          {recentSessions.length === 0 ? (
            <div className="p-4 rounded-xl bg-surface-2 border border-border text-xs text-muted">
              Complete a DSA problem, aptitude practice question, or multi-turn SALAAR tutoring
              session to log your first verified session here.
            </div>
          ) : (
            <div className="flex flex-col divide-y divide-border">
              {recentSessions.slice(0, 6).map((ev) => (
                <div key={ev.id} className="py-2.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink truncate">{ev.title}</div>
                    <div className="text-xs text-muted flex items-center gap-2 mt-0.5">
                      <span className="uppercase font-mono text-[10px]">{ev.category}</span>
                      <span>·</span>
                      <span>{ev.activityDate}</span>
                    </div>
                  </div>
                  <span className="shrink-0 px-2 py-0.5 rounded-full text-[10px] font-semibold border border-border bg-surface text-ink">
                    Verified
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="card p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                RESUME STUDYING
              </span>
              <h2 className="font-heading text-lg font-bold text-ink m-0 mt-0.5">
                Recent SALAAR Conversations
              </h2>
            </div>
            <MessageSquare size={18} className="text-ink" />
          </div>

          {progress.recentConversations.length === 0 ? (
            <div className="p-4 rounded-xl bg-surface-2 border border-border flex flex-col gap-3">
              <p className="text-xs text-muted m-0">
                No previous SALAAR conversations yet. Start asking DSA patterns or Aptitude shortcuts
                and your session history will stay saved here.
              </p>
              <button
                type="button"
                onClick={() => onStartChat({ mode: "dsa" })}
                className="btn btn-primary btn-sm self-start surface-inverse"
              >
                <Sparkles size={14} /> Open SALAAR Chat
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {progress.recentConversations.slice(0, 5).map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => onResumeConversation(conv)}
                  className="text-left p-3 rounded-xl border border-border bg-surface hover:bg-surface-2 transition-colors flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase border border-border bg-surface text-ink">
                        {conv.mode}
                      </span>
                      <span className="font-semibold text-sm text-ink truncate">{conv.title}</span>
                    </div>
                    {conv.summary && (
                      <p className="text-xs text-muted m-0 mt-1 truncate">{conv.summary}</p>
                    )}
                  </div>
                  <ArrowRight size={15} className="shrink-0 text-ink" />
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
