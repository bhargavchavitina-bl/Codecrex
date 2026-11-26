import { supabase } from "./supabase";
import { problems, problemMatchesTopic } from "../data/problems";
import { topics } from "../data/topics";
import {
  addDaysIso,
  buildWeeklyCalendar,
  calculateCurrentStreak,
  calculateLongestStreak,
  formatDateInTimeZone,
  normalizeActiveDays,
  resolveValidTimeZone,
} from "./streakUtils";
import type {
  ActivityEventRecord,
  LearningMode,
  LearningPreferences,
  RecommendedTopicItem,
  SalaarConversationSummary,
  SalaarDashboardProgress,
  SalaarLearningMemory,
  SalaarMessage,
  WeakTopicRecord,
} from "../../api/salaar/_lib/types";
import type { PracticeQuestionClientView } from "../../api/salaar/_lib/practiceBank";

export type {
  ActivityEventRecord,
  LearningMode,
  LearningPreferences,
  PracticeQuestionClientView,
  RecommendedTopicItem,
  SalaarConversationSummary,
  SalaarDashboardProgress,
  SalaarLearningMemory,
  SalaarMessage,
  WeakTopicRecord,
};

const GUEST_SALAAR_KEY = "codecrex_salaar_guest_v1";

type GuestSalaarState = {
  memory: SalaarLearningMemory;
  conversations: SalaarConversationSummary[];
  messagesByConv: Record<string, SalaarMessage[]>;
  activityEvents: ActivityEventRecord[];
};

const DEFAULT_PREFS: LearningPreferences = {
  explanationStyle: "simple",
  skillLevel: "intermediate",
  hintFirst: true,
  dailyGoal: 2,
};

function readGuestSalaar(): GuestSalaarState {
  try {
    const raw = localStorage.getItem(GUEST_SALAAR_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<GuestSalaarState>;
      return {
        memory: {
          studiedTopics: parsed.memory?.studiedTopics || [],
          weakTopics: parsed.memory?.weakTopics || [],
          struggledQuestions: parsed.memory?.struggledQuestions || [],
          completedQuestions: parsed.memory?.completedQuestions || [],
          topicPerformance: parsed.memory?.topicPerformance || {},
          preferences: { ...DEFAULT_PREFS, ...(parsed.memory?.preferences || {}) },
          currentStreak: parsed.memory?.currentStreak || 0,
          longestStreak: parsed.memory?.longestStreak || 0,
          lastActiveDate: parsed.memory?.lastActiveDate || null,
        },
        conversations: parsed.conversations || [],
        messagesByConv: parsed.messagesByConv || {},
        activityEvents: parsed.activityEvents || [],
      };
    }
  } catch {
    // ignore corrupted localStorage cleanly
  }
  return {
    memory: {
      studiedTopics: [],
      weakTopics: [],
      struggledQuestions: [],
      completedQuestions: [],
      topicPerformance: {},
      preferences: { ...DEFAULT_PREFS },
      currentStreak: 0,
      longestStreak: 0,
      lastActiveDate: null,
    },
    conversations: [],
    messagesByConv: {},
    activityEvents: [],
  };
}

function writeGuestSalaar(state: GuestSalaarState): void {
  try {
    localStorage.setItem(GUEST_SALAAR_KEY, JSON.stringify(state));
  } catch (err) {
    console.error("Failed to persist SALAAR guest state:", err);
  }
}

export function getClientDateContext(): { localDate: string; timezone: string } {
  const timezone = resolveValidTimeZone();
  const localDate = formatDateInTimeZone(new Date(), timezone);
  return { localDate, timezone };
}

async function getAccessToken(isGuest?: boolean): Promise<string | null> {
  if (isGuest || !supabase) return null;
  try {
    const { data } = await supabase.auth.getSession();
    return data.session?.access_token || null;
  } catch {
    return null;
  }
}

async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null,
): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(path, { ...options, headers });
  const text = await res.text();
  let json: unknown = {};
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    throw new Error(`Unexpected response from server (${res.status})`);
  }

  if (!res.ok) {
    const errObj = json as { error?: string; code?: string };
    const error = new Error(errObj.error || `Request failed (${res.status})`) as Error & {
      code?: string;
      status?: number;
    };
    error.code = errObj.code;
    error.status = res.status;
    throw error;
  }
  return json as T;
}

function buildGuestDashboard(storeState: {
  userName: string;
  targetRole: string;
  solved: string[];
  revisit: string[];
  activeDays: string[];
  attempts: Array<{ id: string; topic: string; score: number; total: number; accuracy: number; date: string }>;
}): {
  progress: Omit<SalaarDashboardProgress, "aiConfigured" | "aiProviderName">;
} {
  const { localDate } = getClientDateContext();
  const guest = readGuestSalaar();

  const validProblemMap = new Map(problems.map((p) => [p.id, p]));
  const solvedIds = storeState.solved.filter((id) => validProblemMap.has(id));
  const revisitIds = storeState.revisit.filter((id) => validProblemMap.has(id));
  const easySolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Easy").length;
  const mediumSolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Medium").length;
  const hardSolved = solvedIds.filter((id) => validProblemMap.get(id)?.difficulty === "Hard").length;

  const combinedDays = normalizeActiveDays(
    [
      ...storeState.activeDays,
      ...guest.activityEvents.map((e) => e.activityDate),
    ],
    localDate,
  );
  const currentStreak = calculateCurrentStreak(combinedDays, localDate);
  const longestStreak = Math.max(
    calculateLongestStreak(combinedDays),
    guest.memory.longestStreak,
    currentStreak,
  );

  const weeklyCounts: Record<string, number> = {};
  for (let i = -6; i <= 0; i++) {
    const d = addDaysIso(localDate, i);
    const evCount = guest.activityEvents.filter((e) => e.activityDate === d).length;
    const activeMark = combinedDays.includes(d) ? 1 : 0;
    weeklyCounts[d] = Math.max(evCount, activeMark);
  }
  const weeklyCalendar = buildWeeklyCalendar(localDate, weeklyCounts);

  const aptCorrectCount = guest.memory.completedQuestions.filter((q) => q.category === "aptitude").length;
  const avgAccuracy = storeState.attempts.length
    ? Math.round(
        storeState.attempts.reduce((s, a) => s + Number(a.accuracy || 0), 0) /
          storeState.attempts.length,
      )
    : 0;

  const weakMap = new Map<string, WeakTopicRecord>();
  for (const w of guest.memory.weakTopics) {
    weakMap.set(`${w.category}:${w.topicId}`, w);
  }
  for (const rId of revisitIds) {
    const p = validProblemMap.get(rId);
    if (!p) continue;
    const key = `dsa:${p.topicId}`;
    if (!weakMap.has(key)) {
      const tName = topics.find((t) => t.id === p.topicId)?.name || p.topicId;
      weakMap.set(key, {
        topicId: p.topicId,
        topicName: tName,
        category: "dsa",
        reason: `Marked "${p.title}" for revisit`,
        wrongCount: 1,
        lastFlaggedAt: new Date().toISOString(),
      });
    }
  }
  const weakTopics = Array.from(weakMap.values()).slice(0, 6);

  const recommendedTopics: RecommendedTopicItem[] = [];
  for (const w of weakTopics.slice(0, 2)) {
    recommendedTopics.push({
      topicId: w.topicId,
      topicName: w.topicName,
      category: w.category,
      reason: `Reinforce weak spot: ${w.reason}`,
      priority: "weak",
      route: w.category === "dsa" ? `/dsa/${w.topicId}` : `/aptitude/${w.topicId}`,
    });
  }
  for (const t of topics) {
    if (recommendedTopics.length >= 5) break;
    const topicPs = problems.filter((p) => problemMatchesTopic(p, t.id));
    const solvedInT = topicPs.filter((p) => solvedIds.includes(p.id)).length;
    if (solvedInT < topicPs.length && !recommendedTopics.some((r) => r.topicId === t.id)) {
      recommendedTopics.push({
        topicId: t.id,
        topicName: t.name,
        category: "dsa",
        reason:
          solvedInT > 0
            ? `${solvedInT}/${topicPs.length} completed — keep momentum`
            : `Core pattern path (${topicPs.length} problems)`,
        priority: solvedInT > 0 ? "in_progress" : "next",
        route: `/dsa/${t.id}`,
      });
    }
  }

  return {
    progress: {
      userName: storeState.userName || "Guest learner",
      targetRole: storeState.targetRole || "Software Engineer",
      streak: {
        currentStreak,
        longestStreak,
        totalLearningDays: combinedDays.length,
        todayCompletedCount: weeklyCounts[localDate] || 0,
        todayGoal: guest.memory.preferences.dailyGoal || 2,
        qualifiedToday: combinedDays.includes(localDate),
        activeDays: combinedDays,
        weeklyCalendar,
        problemsSolvedCount: solvedIds.length,
        aptitudeCompletedCount: storeState.attempts.length + aptCorrectCount,
        practiceSessionsCount: guest.activityEvents.filter(
          (e) => e.eventType === "practice_session_completed",
        ).length,
      },
      dsaSummary: {
        solvedCount: solvedIds.length,
        totalCount: problems.length,
        easySolved,
        mediumSolved,
        hardSolved,
        recentSolvedIds: solvedIds.slice(-5).reverse(),
      },
      aptitudeSummary: {
        testsCompleted: storeState.attempts.length,
        practiceSolvedCount: aptCorrectCount,
        avgAccuracy,
        recentTopics: Array.from(new Set(storeState.attempts.map((a) => a.topic))).slice(0, 4),
      },
      recentSessions: guest.activityEvents.slice(0, 8),
      weakTopics,
      recommendedTopics,
      memory: {
        ...guest.memory,
        currentStreak,
        longestStreak,
        lastActiveDate: combinedDays.length ? combinedDays[combinedDays.length - 1] : null,
      },
      recentConversations: guest.conversations.slice(0, 20),
    },
  };
}

export function buildLocalDashboardFallback(
  storeFallback: Parameters<typeof buildGuestDashboard>[0],
): SalaarDashboardProgress {
  const { progress } = buildGuestDashboard(storeFallback);
  return {
    ...progress,
    aiConfigured: false,
    aiProviderName: "Backend check unavailable",
  };
}

export async function fetchSalaarDashboard(
  isGuest: boolean,
  storeFallback: Parameters<typeof buildGuestDashboard>[0],
): Promise<SalaarDashboardProgress> {
  const { localDate, timezone } = getClientDateContext();
  const token = await getAccessToken(isGuest);

  if (token) {
    return await apiFetch<SalaarDashboardProgress>(
      `/api/salaar/progress?localDate=${encodeURIComponent(localDate)}&timezone=${encodeURIComponent(timezone)}`,
      { method: "GET" },
      token,
    );
  }

  // Guest mode: query AI provider configuration safely without auth, hydrate progress from localStorage
  let aiStatus = { configured: false, provider: "Backend check unavailable" };
  try {
    const res = await apiFetch<{ configured: boolean; provider: string }>(
      "/api/salaar/progress?statusOnly=1",
      { method: "GET" },
    );
    aiStatus = res;
  } catch {
    // ignore offline error cleanly
  }

  const guest = buildGuestDashboard(storeFallback);
  return {
    ...guest.progress,
    aiConfigured: aiStatus.configured,
    aiProviderName: aiStatus.provider,
  };
}

export async function fetchConversationMessages(
  conversationId: string,
  isGuest?: boolean,
): Promise<SalaarMessage[]> {
  const token = await getAccessToken(isGuest);
  if (token) {
    const res = await apiFetch<{ messages: SalaarMessage[] }>(
      `/api/salaar/chat?conversationId=${encodeURIComponent(conversationId)}`,
      { method: "GET" },
      token,
    );
    return res.messages || [];
  }
  const guest = readGuestSalaar();
  return guest.messagesByConv[conversationId] || [];
}

export async function deleteConversationThread(
  conversationId: string,
  isGuest?: boolean,
): Promise<void> {
  const token = await getAccessToken(isGuest);
  if (token) {
    await apiFetch(
      `/api/salaar/chat?conversationId=${encodeURIComponent(conversationId)}`,
      { method: "DELETE" },
      token,
    );
    return;
  }
  const guest = readGuestSalaar();
  guest.conversations = guest.conversations.filter((c) => c.id !== conversationId);
  delete guest.messagesByConv[conversationId];
  writeGuestSalaar(guest);
}

export interface SendChatPayload {
  message: string;
  mode: LearningMode;
  action?: "chat" | "hint" | "reexplain" | "reveal_code" | "example" | "practice_generate";
  topicId?: string;
  difficulty?: string;
  conversationId?: string;
  isGuest?: boolean;
  guestMessages?: Array<{ role: "user" | "assistant"; content: string }>;
  guestSummary?: {
    userName?: string;
    currentStreak?: number;
    longestStreak?: number;
    totalLearningDays?: number;
    solvedCount?: number;
    aptitudeTests?: number;
  };
}

export interface SendChatResponse {
  reply: string;
  provider: string;
  model: string;
  conversationId: string | null;
  mode: LearningMode;
  streakRecorded: boolean;
  schemaPending?: boolean;
}

export async function sendSalaarChatMessage(payload: SendChatPayload): Promise<SendChatResponse> {
  const { localDate, timezone } = getClientDateContext();
  const token = await getAccessToken(payload.isGuest);

  const response = await apiFetch<SendChatResponse>(
    "/api/salaar/chat",
    {
      method: "POST",
      body: JSON.stringify({
        message: payload.message,
        mode: payload.mode,
        action: payload.action || "chat",
        topicId: payload.topicId,
        difficulty: payload.difficulty,
        conversationId: token ? payload.conversationId : undefined,
        clientHistory: token ? undefined : payload.guestMessages,
        guestSummary: token ? undefined : payload.guestSummary,
        localDate,
        timezone,
      }),
    },
    token,
  );

  // If guest mode, persist conversation & meaningful session locally in browser storage
  if (!token) {
    const guest = readGuestSalaar();
    const convId = payload.conversationId || crypto.randomUUID();
    const nowIso = new Date().toISOString();
    const userMsg: SalaarMessage = {
      id: crypto.randomUUID(),
      conversationId: convId,
      role: "user",
      mode: payload.mode,
      content: payload.message,
      createdAt: nowIso,
    };
    const aiMsg: SalaarMessage = {
      id: crypto.randomUUID(),
      conversationId: convId,
      role: "assistant",
      mode: payload.mode,
      content: response.reply,
      metadata: { provider: response.provider, model: response.model, action: payload.action },
      createdAt: nowIso,
    };

    const existingMsgs = guest.messagesByConv[convId] || [];
    guest.messagesByConv[convId] = [...existingMsgs, userMsg, aiMsg];

    const existingConvIdx = guest.conversations.findIndex((c) => c.id === convId);
    const title = payload.message.slice(0, 56) + (payload.message.length > 56 ? "..." : "");
    const summary = response.reply.replace(/\s+/g, " ").slice(0, 140);
    if (existingConvIdx >= 0) {
      guest.conversations[existingConvIdx] = {
        ...guest.conversations[existingConvIdx],
        mode: payload.mode,
        topicId: payload.topicId || guest.conversations[existingConvIdx].topicId,
        summary,
        updatedAt: nowIso,
      };
    } else {
      guest.conversations.unshift({
        id: convId,
        mode: payload.mode,
        topicId: payload.topicId || null,
        title,
        summary,
        createdAt: nowIso,
        updatedAt: nowIso,
      });
    }

    if (payload.topicId) {
      const idx = guest.memory.studiedTopics.findIndex(
        (t) => t.topicId === payload.topicId && t.category === payload.mode,
      );
      if (idx >= 0) {
        guest.memory.studiedTopics[idx].sessionsCount += 1;
        guest.memory.studiedTopics[idx].lastStudiedAt = nowIso;
      } else {
        guest.memory.studiedTopics.unshift({
          topicId: payload.topicId,
          topicName: payload.topicId,
          category: payload.mode,
          sessionsCount: 1,
          lastStudiedAt: nowIso,
        });
      }
    }

    // Guest meaningful tutor session (at least 3 user turns in same conversation)
    const userTurns = guest.messagesByConv[convId].filter((m) => m.role === "user").length;
    let guestStreakRecorded = false;
    if (userTurns >= 3) {
      const dedupeKey = `tutor:${convId}:${localDate}`;
      if (!guest.activityEvents.some((e) => e.dedupeKey === dedupeKey)) {
        guest.activityEvents.unshift({
          id: crypto.randomUUID(),
          eventType: "meaningful_tutor_session",
          category: payload.mode,
          topicId: payload.topicId || null,
          questionId: null,
          title: `Studied ${payload.topicId || payload.mode.toUpperCase()} with SALAAR`,
          dedupeKey,
          activityDate: localDate,
          durationSeconds: 0,
          createdAt: nowIso,
        });
        guestStreakRecorded = true;
      }
    }

    writeGuestSalaar(guest);
    return {
      ...response,
      conversationId: convId,
      streakRecorded: guestStreakRecorded,
    };
  }

  return response;
}

export async function logQualifyingActivityClient(params: {
  eventType:
    | "dsa_problem_solved"
    | "aptitude_question_completed"
    | "practice_session_completed"
    | "meaningful_tutor_session";
  category: LearningMode | "general";
  topicId?: string;
  questionId?: string;
  title: string;
  dedupeKey?: string;
  durationSeconds?: number;
  isGuest?: boolean;
}): Promise<{ recorded: boolean; duplicate: boolean }> {
  const { localDate, timezone } = getClientDateContext();
  const dedupeKey =
    params.dedupeKey ||
    `${params.eventType}:${params.questionId || params.topicId || params.title}:${localDate}`;

  const token = await getAccessToken(params.isGuest);
  if (token) {
    return await apiFetch<{ recorded: boolean; duplicate: boolean }>(
      "/api/salaar/activity",
      {
        method: "POST",
        body: JSON.stringify({
          eventType: params.eventType,
          category: params.category,
          topicId: params.topicId,
          questionId: params.questionId,
          title: params.title,
          dedupeKey,
          localDate,
          timezone,
          durationSeconds: params.durationSeconds || 0,
        }),
      },
      token,
    );
  }

  const guest = readGuestSalaar();
  if (guest.activityEvents.some((e) => e.dedupeKey === dedupeKey)) {
    return { recorded: false, duplicate: true };
  }
  guest.activityEvents.unshift({
    id: crypto.randomUUID(),
    eventType: params.eventType,
    category: params.category,
    topicId: params.topicId || null,
    questionId: params.questionId || null,
    title: params.title,
    dedupeKey,
    activityDate: localDate,
    durationSeconds: params.durationSeconds || 0,
    createdAt: new Date().toISOString(),
  });
  writeGuestSalaar(guest);
  return { recorded: true, duplicate: false };
}

export async function updateSalaarPreferences(
  updates: Partial<LearningPreferences>,
  isGuest?: boolean,
): Promise<LearningPreferences> {
  const token = await getAccessToken(isGuest);
  if (token) {
    const res = await apiFetch<{ preferences: LearningPreferences }>(
      "/api/salaar/memory",
      {
        method: "PATCH",
        body: JSON.stringify({ preferences: updates }),
      },
      token,
    );
    return res.preferences;
  }

  const guest = readGuestSalaar();
  guest.memory.preferences = { ...guest.memory.preferences, ...updates };
  writeGuestSalaar(guest);
  return guest.memory.preferences;
}

export async function fetchPracticeCatalog(filters: {
  category: LearningMode;
  topicId?: string;
  difficulty?: "Easy" | "Medium" | "Hard" | "All";
  limit?: number;
}): Promise<{
  questions: PracticeQuestionClientView[];
  topics: {
    dsa: Array<{ id: string; name: string; category: string }>;
    aptitude: Array<{ id: string; name: string }>;
  };
}> {
  const q = new URLSearchParams();
  q.set("category", filters.category);
  if (filters.topicId && filters.topicId !== "all") q.set("topic", filters.topicId);
  if (filters.difficulty && filters.difficulty !== "All") q.set("difficulty", filters.difficulty);
  if (filters.limit) q.set("limit", String(filters.limit));

  return await apiFetch(`/api/salaar/practice?${q.toString()}`, { method: "GET" });
}

export async function submitPracticeAction(params: {
  action: "hint" | "check" | "reveal_solution";
  question: PracticeQuestionClientView;
  hintIndex?: number;
  selectedIndex?: number;
  hintsUsed?: number;
  isGuest?: boolean;
}): Promise<{
  hint?: string;
  hasMoreHints?: boolean;
  totalHints?: number;
  correct?: boolean;
  correctIndex?: number;
  correctOption?: string;
  explanation?: string;
  message?: string;
  revealed?: boolean;
  streakUpdated?: boolean;
}> {
  const { localDate, timezone } = getClientDateContext();
  const token = await getAccessToken(params.isGuest);

  const result = await apiFetch<{
    hint?: string;
    hasMoreHints?: boolean;
    totalHints?: number;
    correct?: boolean;
    correctIndex?: number;
    correctOption?: string;
    explanation?: string;
    message?: string;
    revealed?: boolean;
    streakUpdated?: boolean;
  }>(
    "/api/salaar/practice",
    {
      method: "POST",
      body: JSON.stringify({
        action: params.action,
        questionId: params.question.id,
        hintIndex: params.hintIndex,
        selectedIndex: params.selectedIndex,
        hintsUsed: params.hintsUsed,
        localDate,
        timezone,
      }),
    },
    token,
  );

  // Update guest local memory & activity when in guest mode
  if (!token && (params.action === "check" || params.action === "reveal_solution")) {
    const guest = readGuestSalaar();
    const nowIso = new Date().toISOString();
    const isCorrect = Boolean(result.correct);
    const topicId = params.question.topicId;

    const prevPerf = guest.memory.topicPerformance[topicId] || {
      attempts: 0,
      correct: 0,
      hintsUsed: 0,
      avgAccuracy: 0,
      updatedAt: nowIso,
    };
    const nextAttempts = prevPerf.attempts + 1;
    const nextCorrect = prevPerf.correct + (isCorrect ? 1 : 0);
    const nextAcc = Math.round((nextCorrect / nextAttempts) * 100);
    guest.memory.topicPerformance[topicId] = {
      attempts: nextAttempts,
      correct: nextCorrect,
      hintsUsed: prevPerf.hintsUsed + (params.hintsUsed || 0),
      avgAccuracy: nextAcc,
      updatedAt: nowIso,
    };

    let guestStreakRecorded = false;
    if (isCorrect) {
      if (!guest.memory.completedQuestions.some((q) => q.questionId === params.question.id)) {
        guest.memory.completedQuestions.unshift({
          questionId: params.question.id,
          title: params.question.title,
          category: params.question.category,
          topicId,
          difficulty: params.question.difficulty,
          completedAt: nowIso,
        });
      }
      const dedupeKey = `practice:${params.question.id}:${localDate}`;
      if (!guest.activityEvents.some((e) => e.dedupeKey === dedupeKey)) {
        guest.activityEvents.unshift({
          id: crypto.randomUUID(),
          eventType:
            params.question.category === "dsa"
              ? "dsa_problem_solved"
              : "aptitude_question_completed",
          category: params.question.category,
          topicId,
          questionId: params.question.id,
          title: params.question.title,
          dedupeKey,
          activityDate: localDate,
          durationSeconds: 0,
          createdAt: nowIso,
        });
        guestStreakRecorded = true;
      }
    } else if (params.action === "check" || params.action === "reveal_solution") {
      if (!guest.memory.struggledQuestions.some((s) => s.questionId === params.question.id)) {
        guest.memory.struggledQuestions.unshift({
          questionId: params.question.id,
          title: params.question.title,
          category: params.question.category,
          topicId,
          attempts: 1,
          hintCount: params.hintsUsed || 0,
          lastAttemptAt: nowIso,
        });
      }
      if (
        !guest.memory.weakTopics.some(
          (w) => w.topicId === topicId && w.category === params.question.category,
        )
      ) {
        guest.memory.weakTopics.unshift({
          topicId,
          topicName: params.question.topicName,
          category: params.question.category,
          reason: `Needs review (${nextAcc}% practice accuracy)`,
          wrongCount: 1,
          accuracy: nextAcc,
          lastFlaggedAt: nowIso,
        });
      }
    }

    writeGuestSalaar(guest);
    return {
      ...result,
      streakUpdated: guestStreakRecorded,
    };
  }

  return result;
}
