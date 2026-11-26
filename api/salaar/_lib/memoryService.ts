import type { SupabaseClient } from "@supabase/supabase-js";
import { problems, problemMatchesTopic } from "../../../src/data/problems.ts";
import { topics } from "../../../src/data/topics.ts";
import {
  addDaysIso,
  buildWeeklyCalendar,
  calculateCurrentStreak,
  calculateLongestStreak,
  normalizeActiveDays,
} from "../../../src/lib/streakUtils.ts";
import { getAiProviderStatus } from "./aiProvider.ts";
import { isMissingTableError } from "./supabaseAuth.ts";
import type {
  ActivityEventRecord,
  CompletedQuestionRecord,
  LearningMode,
  LearningPreferences,
  RecommendedTopicItem,
  SalaarConversationSummary,
  SalaarDashboardProgress,
  SalaarLearningMemory,
  StreakSummary,
  StruggledQuestionRecord,
  StudiedTopicRecord,
  TopicPerformanceMetric,
  WeakTopicRecord,
} from "./types.ts";

export const DEFAULT_PREFERENCES: LearningPreferences = {
  explanationStyle: "simple",
  skillLevel: "intermediate",
  hintFirst: true,
  dailyGoal: 2,
};

export function createEmptyMemory(): SalaarLearningMemory {
  return {
    studiedTopics: [],
    weakTopics: [],
    struggledQuestions: [],
    completedQuestions: [],
    topicPerformance: {},
    preferences: { ...DEFAULT_PREFERENCES },
    currentStreak: 0,
    longestStreak: 0,
    lastActiveDate: null,
  };
}

function getTopicDisplayName(topicId: string, category: LearningMode): string {
  if (category === "dsa") {
    return topics.find((t) => t.id === topicId)?.name || topicId;
  }
  const map: Record<string, string> = {
    "number-system": "Number Systems",
    percentages: "Percentages",
    "profit-loss": "Profit & Loss",
    "ratio-proportion": "Ratio & Proportion",
    ratio: "Ratio & Proportion",
    averages: "Averages",
    "time-work": "Time & Work",
    "time-speed-distance": "Time, Speed & Distance",
    "permutation-combination": "Permutations & Combinations",
    probability: "Probability",
    "logical-reasoning": "Logical Reasoning",
    series: "Number & Letter Series",
    "blood-relations": "Blood Relations",
    "data-interpretation": "Data Interpretation",
  };
  return map[topicId] || topicId;
}

export async function getSalaarDashboardProgress(
  supabase: SupabaseClient,
  userId: string,
  todayIso: string,
  fallbackUserName = "Learner",
): Promise<SalaarDashboardProgress> {
  const aiStatus = getAiProviderStatus();
  let schemaPending = false;

  const [
    profileRes,
    problemRes,
    attemptsRes,
    activityLogRes,
    memoryRes,
    eventsRes,
    convsRes,
    practiceRes,
  ] = await Promise.all([
    supabase.from("profiles").select("display_name, target_role").eq("id", userId).maybeSingle(),
    supabase
      .from("problem_progress")
      .select("problem_id, solved, revisit, solved_at, updated_at")
      .eq("user_id", userId),
    supabase
      .from("test_attempts")
      .select("id, topic_id, score, total, accuracy, duration_seconds, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(50),
    supabase
      .from("activity_log")
      .select("activity_date, count")
      .eq("user_id", userId)
      .order("activity_date", { ascending: false }),
    supabase.from("salaar_learning_memory").select("*").eq("user_id", userId).maybeSingle(),
    supabase
      .from("salaar_activity_events")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(40),
    supabase
      .from("salaar_conversations")
      .select("*")
      .eq("user_id", userId)
      .order("updated_at", { ascending: false })
      .limit(20),
    supabase
      .from("salaar_practice_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(40),
  ]);

  if (
    isMissingTableError(memoryRes.error) ||
    isMissingTableError(eventsRes.error) ||
    isMissingTableError(convsRes.error)
  ) {
    schemaPending = true;
  }

  const userName = profileRes.data?.display_name || fallbackUserName || "Learner";
  const targetRole = profileRes.data?.target_role || "Software Engineer";

  // DSA summary from problem_progress
  const validProblemMap = new Map(problems.map((p) => [p.id, p]));
  const solvedIds: string[] = [];
  const revisitIds: string[] = [];
  for (const row of problemRes.data || []) {
    if (!validProblemMap.has(row.problem_id)) continue;
    if (row.solved) solvedIds.push(row.problem_id);
    if (row.revisit) revisitIds.push(row.problem_id);
  }
  const easySolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Easy").length;
  const mediumSolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Medium").length;
  const hardSolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Hard").length;

  // Aptitude summary from test_attempts + practice
  const attempts = attemptsRes.data || [];
  const practiceRows = (!practiceRes.error && practiceRes.data) || [];
  const aptCorrectPracticeIds = new Set<string>(
    practiceRows
      .filter((r) => r.category === "aptitude" && r.is_correct)
      .map((r) => String(r.question_id)),
  );
  const avgAccuracy = attempts.length
    ? Math.round(attempts.reduce((sum, a) => sum + Number(a.accuracy || 0), 0) / attempts.length)
    : 0;

  // Learning memory hydration
  const memory: SalaarLearningMemory = createEmptyMemory();
  if (!memoryRes.error && memoryRes.data) {
    const m = memoryRes.data;
    memory.studiedTopics = Array.isArray(m.studied_topics) ? m.studied_topics : [];
    memory.weakTopics = Array.isArray(m.weak_topics) ? m.weak_topics : [];
    memory.struggledQuestions = Array.isArray(m.struggled_questions) ? m.struggled_questions : [];
    memory.completedQuestions = Array.isArray(m.completed_questions) ? m.completed_questions : [];
    memory.topicPerformance =
      m.topic_performance && typeof m.topic_performance === "object" ? m.topic_performance : {};
    memory.preferences = {
      ...DEFAULT_PREFERENCES,
      ...(m.preferences && typeof m.preferences === "object" ? m.preferences : {}),
    };
    memory.currentStreak = Number(m.current_streak || 0);
    memory.longestStreak = Number(m.longest_streak || 0);
    memory.lastActiveDate = m.last_active_date || null;
  }

  // Activity events & Streak calculation across activity_log + salaar_activity_events
  const eventsData = (!eventsRes.error && eventsRes.data) || [];
  const recentSessions: ActivityEventRecord[] = eventsData.map((ev) => ({
    id: ev.id,
    eventType: ev.event_type,
    category: ev.category,
    topicId: ev.topic_id || null,
    questionId: ev.question_id || null,
    title: ev.title,
    dedupeKey: ev.dedupe_key,
    activityDate: ev.activity_date,
    durationSeconds: Number(ev.duration_seconds || 0),
    createdAt: ev.created_at,
  }));

  const dateCounts: Record<string, number> = {};
  for (const row of activityLogRes.data || []) {
    const dt = String(row.activity_date);
    dateCounts[dt] = Math.max(dateCounts[dt] || 0, Number(row.count || 1));
  }
  for (const ev of recentSessions) {
    const dt = ev.activityDate;
    dateCounts[dt] = (dateCounts[dt] || 0) + 1;
  }

  const allActiveDays = normalizeActiveDays(Object.keys(dateCounts), todayIso);
  const currentStreak = calculateCurrentStreak(allActiveDays, todayIso);
  const longestStreak = Math.max(
    calculateLongestStreak(allActiveDays),
    memory.longestStreak,
    currentStreak,
  );

  // Also build counts for weekly calendar specifically
  const weeklyCounts: Record<string, number> = {};
  for (let i = -6; i <= 0; i++) {
    const d = addDaysIso(todayIso, i);
    const eventsForDay = recentSessions.filter((e) => e.activityDate === d).length;
    const logCount = (activityLogRes.data || []).find((a) => String(a.activity_date) === d)?.count;
    weeklyCounts[d] = Math.max(eventsForDay, Number(logCount || 0));
  }
  const weeklyCalendar = buildWeeklyCalendar(todayIso, weeklyCounts);

  const todayCompletedCount = weeklyCounts[todayIso] || 0;
  const qualifiedToday = allActiveDays.includes(todayIso);

  const dsaPracticeSolved = new Set(
    practiceRows
      .filter((r) => r.category === "dsa" && r.is_correct)
      .map((r) => String(r.question_id)),
  );
  const totalProblemsSolved = Math.max(solvedIds.length, dsaPracticeSolved.size);

  const streak: StreakSummary = {
    currentStreak,
    longestStreak,
    totalLearningDays: allActiveDays.length,
    todayCompletedCount,
    todayGoal: memory.preferences.dailyGoal || 2,
    qualifiedToday,
    activeDays: allActiveDays,
    weeklyCalendar,
    problemsSolvedCount: totalProblemsSolved,
    aptitudeCompletedCount: attempts.length + aptCorrectPracticeIds.size,
    practiceSessionsCount: recentSessions.filter(
      (e) => e.eventType === "practice_session_completed",
    ).length,
  };

  // Keep memory snapshot aligned
  memory.currentStreak = currentStreak;
  memory.longestStreak = longestStreak;
  memory.lastActiveDate = allActiveDays.length ? allActiveDays[allActiveDays.length - 1] : null;

  // Compute Weak Topics dynamically from revisit flags, failed tests (<65%), and memory weak topics
  const weakMap = new Map<string, WeakTopicRecord>();
  for (const w of memory.weakTopics) {
    weakMap.set(`${w.category}:${w.topicId}`, w);
  }
  for (const [topicId, metric] of Object.entries(memory.topicPerformance)) {
    if (metric.attempts >= 2 && metric.avgAccuracy < 65) {
      const isDsa = topics.some((t) => t.id === topicId);
      const cat: LearningMode = isDsa ? "dsa" : "aptitude";
      weakMap.set(`${cat}:${topicId}`, {
        topicId,
        topicName: getTopicDisplayName(topicId, cat),
        category: cat,
        reason: `${metric.avgAccuracy}% accuracy across ${metric.attempts} practice attempts`,
        wrongCount: metric.attempts - metric.correct,
        accuracy: metric.avgAccuracy,
        lastFlaggedAt: metric.updatedAt,
      });
    }
  }
  for (const revId of revisitIds) {
    const p = validProblemMap.get(revId);
    if (!p) continue;
    const key = `dsa:${p.topicId}`;
    if (!weakMap.has(key)) {
      weakMap.set(key, {
        topicId: p.topicId,
        topicName: getTopicDisplayName(p.topicId, "dsa"),
        category: "dsa",
        reason: `Flagged problem "${p.title}" for revisit`,
        wrongCount: 1,
        lastFlaggedAt: new Date().toISOString(),
      });
    }
  }
  for (const att of attempts) {
    if (Number(att.accuracy) < 65) {
      const key = `aptitude:${att.topic_id}`;
      if (!weakMap.has(key)) {
        weakMap.set(key, {
          topicId: att.topic_id,
          topicName: getTopicDisplayName(att.topic_id, "aptitude"),
          category: "aptitude",
          reason: `Test accuracy ${att.accuracy}% (${att.score}/${att.total})`,
          wrongCount: Math.max(1, Number(att.total) - Number(att.score)),
          accuracy: Number(att.accuracy),
          lastFlaggedAt: att.created_at,
        });
      }
    }
  }

  const weakTopics = Array.from(weakMap.values()).slice(0, 6);

  // Recommended topics to study next
  const recommendedTopics: RecommendedTopicItem[] = [];
  for (const wt of weakTopics.slice(0, 2)) {
    recommendedTopics.push({
      topicId: wt.topicId,
      topicName: wt.topicName,
      category: wt.category,
      reason: `Reinforce weak spot: ${wt.reason}`,
      priority: "weak",
      route: wt.category === "dsa" ? `/dsa/${wt.topicId}` : `/aptitude/${wt.topicId}`,
    });
  }

  for (const t of topics) {
    if (recommendedTopics.length >= 4) break;
    const topicProblems = problems.filter((p) => problemMatchesTopic(p, t.id));
    const solvedInTopic = topicProblems.filter((p) => solvedIds.includes(p.id)).length;
    if (solvedInTopic > 0 && solvedInTopic < topicProblems.length) {
      if (!recommendedTopics.some((r) => r.topicId === t.id)) {
        recommendedTopics.push({
          topicId: t.id,
          topicName: t.name,
          category: "dsa",
          reason: `${solvedInTopic}/${topicProblems.length} problems completed — keep momentum going`,
          priority: "in_progress",
          route: `/dsa/${t.id}`,
        });
      }
    }
  }

  for (const t of topics) {
    if (recommendedTopics.length >= 5) break;
    if (!recommendedTopics.some((r) => r.topicId === t.id)) {
      const count = problems.filter((p) => problemMatchesTopic(p, t.id)).length;
      recommendedTopics.push({
        topicId: t.id,
        topicName: t.name,
        category: "dsa",
        reason: `Core pattern path (${count} problems across ${t.patterns.length} patterns)`,
        priority: "next",
        route: `/dsa/${t.id}`,
      });
    }
  }

  const recentConversations: SalaarConversationSummary[] = ((!convsRes.error && convsRes.data) || []).map(
    (c) => ({
      id: c.id,
      mode: c.mode,
      topicId: c.topic_id || null,
      title: c.title,
      summary: c.summary || "",
      createdAt: c.created_at,
      updatedAt: c.updated_at,
    }),
  );

  return {
    userName,
    targetRole,
    streak,
    dsaSummary: {
      solvedCount: solvedIds.length,
      totalCount: problems.length,
      easySolved,
      mediumSolved,
      hardSolved,
      recentSolvedIds: solvedIds.slice(-5).reverse(),
    },
    aptitudeSummary: {
      testsCompleted: attempts.length,
      practiceSolvedCount: aptCorrectPracticeIds.size,
      avgAccuracy,
      recentTopics: Array.from(new Set(attempts.map((a) => String(a.topic_id)))).slice(0, 4),
    },
    recentSessions: recentSessions.slice(0, 8),
    weakTopics,
    recommendedTopics,
    memory,
    recentConversations,
    schemaPending,
    aiConfigured: aiStatus.configured,
    aiProviderName: aiStatus.provider,
  };
}

export interface LogActivityParams {
  eventType:
    | "dsa_problem_solved"
    | "aptitude_question_completed"
    | "practice_session_completed"
    | "meaningful_tutor_session";
  category: LearningMode | "general";
  topicId?: string | null;
  questionId?: string | null;
  title: string;
  dedupeKey: string;
  activityDate: string;
  timezone: string;
  durationSeconds?: number;
  metadata?: Record<string, unknown>;
}

export async function recordQualifyingActivity(
  supabase: SupabaseClient,
  userId: string,
  params: LogActivityParams,
): Promise<{ recorded: boolean; duplicate: boolean; schemaPending?: boolean }> {
  let duplicate = false;
  let schemaPending = false;

  // 1. Insert deduplicated event into salaar_activity_events
  const { error: eventErr } = await supabase.from("salaar_activity_events").insert({
    user_id: userId,
    event_type: params.eventType,
    category: params.category,
    topic_id: params.topicId || null,
    question_id: params.questionId || null,
    title: params.title,
    dedupe_key: params.dedupeKey,
    activity_date: params.activityDate,
    timezone: params.timezone,
    duration_seconds: params.durationSeconds || 0,
    metadata: params.metadata || {},
  });

  if (eventErr) {
    if (isMissingTableError(eventErr)) {
      schemaPending = true;
    } else if (eventErr.code === "23505") {
      // Unique dedupe violation — prevent duplicate submission from inflating count/streak
      duplicate = true;
    } else {
      throw eventErr;
    }
  }

  // 2. Ensure today's date is marked in shared activity_log (count reflects unique events or >=1)
  if (!duplicate) {
    const { data: existingLog } = await supabase
      .from("activity_log")
      .select("count")
      .eq("user_id", userId)
      .eq("activity_date", params.activityDate)
      .maybeSingle();

    const nextCount = (existingLog?.count || 0) + 1;
    const { error: logErr } = await supabase.from("activity_log").upsert(
      {
        user_id: userId,
        activity_date: params.activityDate,
        count: nextCount,
      },
      { onConflict: "user_id,activity_date" },
    );
    if (logErr) {
      console.warn("activity_log upsert warning:", logErr.message);
    }
  }

  // 3. Recompute streaks and persist snapshot in salaar_learning_memory
  if (!schemaPending) {
    const { data: logs } = await supabase
      .from("activity_log")
      .select("activity_date")
      .eq("user_id", userId);
    const activeDays = normalizeActiveDays(
      (logs || []).map((l) => String(l.activity_date)),
      params.activityDate,
    );
    const currentStreak = calculateCurrentStreak(activeDays, params.activityDate);
    const longestStreak = calculateLongestStreak(activeDays);

    const { data: existingMem } = await supabase
      .from("salaar_learning_memory")
      .select("longest_streak")
      .eq("user_id", userId)
      .maybeSingle();

    const bestLongest = Math.max(longestStreak, Number(existingMem?.longest_streak || 0), currentStreak);

    await supabase.from("salaar_learning_memory").upsert(
      {
        user_id: userId,
        current_streak: currentStreak,
        longest_streak: bestLongest,
        last_active_date: params.activityDate,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    );
  }

  return { recorded: !duplicate, duplicate, schemaPending };
}

export async function recordStudiedTopic(
  supabase: SupabaseClient,
  userId: string,
  category: LearningMode,
  topicId: string,
): Promise<void> {
  if (!topicId) return;
  const { data: mem, error } = await supabase
    .from("salaar_learning_memory")
    .select("studied_topics")
    .eq("user_id", userId)
    .maybeSingle();

  if (error && isMissingTableError(error)) return;

  const list: StudiedTopicRecord[] = Array.isArray(mem?.studied_topics) ? mem.studied_topics : [];
  const existing = list.find((t) => t.topicId === topicId && t.category === category);
  const nowIso = new Date().toISOString();

  let updated: StudiedTopicRecord[];
  if (existing) {
    updated = [
      { ...existing, sessionsCount: existing.sessionsCount + 1, lastStudiedAt: nowIso },
      ...list.filter((t) => !(t.topicId === topicId && t.category === category)),
    ];
  } else {
    updated = [
      {
        topicId,
        topicName: getTopicDisplayName(topicId, category),
        category,
        sessionsCount: 1,
        lastStudiedAt: nowIso,
      },
      ...list,
    ];
  }

  await supabase.from("salaar_learning_memory").upsert(
    {
      user_id: userId,
      studied_topics: updated.slice(0, 40),
      updated_at: nowIso,
    },
    { onConflict: "user_id" },
  );
}

export async function updateMemoryAfterPractice(
  supabase: SupabaseClient,
  userId: string,
  params: {
    questionId: string;
    title: string;
    category: LearningMode;
    topicId: string;
    difficulty: "Easy" | "Medium" | "Hard";
    isCorrect: boolean;
    hintsUsed: number;
  },
): Promise<void> {
  const { data: mem, error } = await supabase
    .from("salaar_learning_memory")
    .select("studied_topics, weak_topics, struggled_questions, completed_questions, topic_performance")
    .eq("user_id", userId)
    .maybeSingle();

  if (error && isMissingTableError(error)) return;

  const nowIso = new Date().toISOString();
  const topicName = getTopicDisplayName(params.topicId, params.category);

  // 1. Update topic performance
  const perfMap: Record<string, TopicPerformanceMetric> =
    mem?.topic_performance && typeof mem.topic_performance === "object"
      ? { ...mem.topic_performance }
      : {};

  const prev = perfMap[params.topicId] || {
    attempts: 0,
    correct: 0,
    hintsUsed: 0,
    avgAccuracy: 0,
    updatedAt: nowIso,
  };
  const nextAttempts = prev.attempts + 1;
  const nextCorrect = prev.correct + (params.isCorrect ? 1 : 0);
  const nextHints = prev.hintsUsed + params.hintsUsed;
  const nextAcc = Math.round((nextCorrect / nextAttempts) * 100);
  perfMap[params.topicId] = {
    attempts: nextAttempts,
    correct: nextCorrect,
    hintsUsed: nextHints,
    avgAccuracy: nextAcc,
    updatedAt: nowIso,
  };

  // 2. Update struggled or completed questions
  let struggled: StruggledQuestionRecord[] = Array.isArray(mem?.struggled_questions)
    ? [...mem.struggled_questions]
    : [];
  let completed: CompletedQuestionRecord[] = Array.isArray(mem?.completed_questions)
    ? [...mem.completed_questions]
    : [];
  let weakTopics: WeakTopicRecord[] = Array.isArray(mem?.weak_topics) ? [...mem.weak_topics] : [];

  if (params.isCorrect) {
    // Add to completed if not present
    if (!completed.some((c) => c.questionId === params.questionId)) {
      completed = [
        {
          questionId: params.questionId,
          title: params.title,
          category: params.category,
          topicId: params.topicId,
          difficulty: params.difficulty,
          completedAt: nowIso,
        },
        ...completed,
      ].slice(0, 120);
    }
    // Clear from weakTopics if accuracy recovered >= 75% over >=2 attempts
    if (nextAcc >= 75 && nextAttempts >= 2) {
      weakTopics = weakTopics.filter(
        (w) => !(w.topicId === params.topicId && w.category === params.category),
      );
    }
  } else {
    // Track in struggled questions
    const existingIdx = struggled.findIndex((s) => s.questionId === params.questionId);
    if (existingIdx >= 0) {
      const existing = struggled[existingIdx];
      struggled[existingIdx] = {
        ...existing,
        attempts: existing.attempts + 1,
        hintCount: existing.hintCount + params.hintsUsed,
        lastAttemptAt: nowIso,
      };
    } else {
      struggled = [
        {
          questionId: params.questionId,
          title: params.title,
          category: params.category,
          topicId: params.topicId,
          attempts: 1,
          hintCount: params.hintsUsed,
          lastAttemptAt: nowIso,
        },
        ...struggled,
      ].slice(0, 50);
    }

    // Add/update weak topic when incorrect
    const wIdx = weakTopics.findIndex(
      (w) => w.topicId === params.topicId && w.category === params.category,
    );
    const weakEntry: WeakTopicRecord = {
      topicId: params.topicId,
      topicName,
      category: params.category,
      reason: `Missed practice question (${nextAcc}% accuracy)`,
      wrongCount: (wIdx >= 0 ? weakTopics[wIdx].wrongCount : 0) + 1,
      accuracy: nextAcc,
      lastFlaggedAt: nowIso,
    };
    if (wIdx >= 0) weakTopics[wIdx] = weakEntry;
    else weakTopics = [weakEntry, ...weakTopics].slice(0, 12);
  }

  await supabase.from("salaar_learning_memory").upsert(
    {
      user_id: userId,
      weak_topics: weakTopics,
      struggled_questions: struggled,
      completed_questions: completed,
      topic_performance: perfMap,
      updated_at: nowIso,
    },
    { onConflict: "user_id" },
  );
}
