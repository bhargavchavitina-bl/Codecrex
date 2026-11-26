// Shared types for SALAAR AI Learning Agent backend & API contracts

export type LearningMode = "dsa" | "aptitude";

export type SkillLevel = "beginner" | "intermediate" | "advanced";

export type ExplanationStyle = "simple" | "visual" | "rigorous";

export interface LearningPreferences {
  explanationStyle: ExplanationStyle;
  skillLevel: SkillLevel;
  hintFirst: boolean;
  dailyGoal: number;
}

export interface StudiedTopicRecord {
  topicId: string;
  topicName: string;
  category: LearningMode;
  sessionsCount: number;
  lastStudiedAt: string;
}

export interface WeakTopicRecord {
  topicId: string;
  topicName: string;
  category: LearningMode;
  reason: string;
  wrongCount: number;
  accuracy?: number;
  lastFlaggedAt: string;
}

export interface StruggledQuestionRecord {
  questionId: string;
  title: string;
  category: LearningMode;
  topicId: string;
  attempts: number;
  hintCount: number;
  lastAttemptAt: string;
}

export interface CompletedQuestionRecord {
  questionId: string;
  title: string;
  category: LearningMode;
  topicId: string;
  difficulty: "Easy" | "Medium" | "Hard";
  completedAt: string;
}

export interface TopicPerformanceMetric {
  attempts: number;
  correct: number;
  hintsUsed: number;
  avgAccuracy: number;
  updatedAt: string;
}

export interface SalaarLearningMemory {
  studiedTopics: StudiedTopicRecord[];
  weakTopics: WeakTopicRecord[];
  struggledQuestions: StruggledQuestionRecord[];
  completedQuestions: CompletedQuestionRecord[];
  topicPerformance: Record<string, TopicPerformanceMetric>;
  preferences: LearningPreferences;
  currentStreak: number;
  longestStreak: number;
  lastActiveDate: string | null;
}

export interface SalaarConversationSummary {
  id: string;
  mode: LearningMode;
  topicId: string | null;
  title: string;
  summary: string;
  createdAt: string;
  updatedAt: string;
}

export interface SalaarMessage {
  id: string;
  conversationId: string;
  role: "user" | "assistant";
  mode: LearningMode;
  content: string;
  metadata?: Record<string, unknown>;
  createdAt: string;
}

export interface ActivityEventRecord {
  id: string;
  eventType:
    | "dsa_problem_solved"
    | "aptitude_question_completed"
    | "practice_session_completed"
    | "meaningful_tutor_session";
  category: LearningMode | "general";
  topicId: string | null;
  questionId: string | null;
  title: string;
  dedupeKey: string;
  activityDate: string;
  durationSeconds: number;
  createdAt: string;
}

export interface WeeklyDayItem {
  date: string;
  label: string;
  active: boolean;
  count: number;
  isToday: boolean;
}

export interface StreakSummary {
  currentStreak: number;
  longestStreak: number;
  totalLearningDays: number;
  todayCompletedCount: number;
  todayGoal: number;
  qualifiedToday: boolean;
  activeDays: string[];
  weeklyCalendar: WeeklyDayItem[];
  problemsSolvedCount: number;
  aptitudeCompletedCount: number;
  practiceSessionsCount: number;
}

export interface RecommendedTopicItem {
  topicId: string;
  topicName: string;
  category: LearningMode;
  reason: string;
  priority: "weak" | "in_progress" | "next";
  route: string;
}

export interface SalaarDashboardProgress {
  userName: string;
  targetRole: string;
  streak: StreakSummary;
  dsaSummary: {
    solvedCount: number;
    totalCount: number;
    easySolved: number;
    mediumSolved: number;
    hardSolved: number;
    recentSolvedIds: string[];
  };
  aptitudeSummary: {
    testsCompleted: number;
    practiceSolvedCount: number;
    avgAccuracy: number;
    recentTopics: string[];
  };
  recentSessions: ActivityEventRecord[];
  weakTopics: WeakTopicRecord[];
  recommendedTopics: RecommendedTopicItem[];
  memory: SalaarLearningMemory;
  recentConversations: SalaarConversationSummary[];
  schemaPending?: boolean;
  aiConfigured: boolean;
  aiProviderName: string;
}
