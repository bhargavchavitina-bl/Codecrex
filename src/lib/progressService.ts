import { supabase } from "./supabase";
import { formatDateInTimeZone } from "./streakUtils";

export type GuestData = {
  solved: string[];
  bookmarks: string[];
  revisit: string[];
  notes: Record<string, string>;
  activeDays: string[];
  attempts: AttemptRecord[];
  profile?: {
    name?: string;
    college?: string;
    target?: string;
  };
};

export type AttemptRecord = {
  id: string;
  topic: string;
  score: number;
  total: number;
  accuracy: number;
  duration: number;
  date: string;
  answers?: Record<string, unknown>;
};

const GUEST_STORAGE_KEY = "codecrest_guest_progress";

export function getLocalDateString(date = new Date()): string {
  return formatDateInTimeZone(date);
}

// ---------------------------------------------------------------------------
// GUEST LOCAL STORAGE HELPERS
// ---------------------------------------------------------------------------
export function getGuestData(): GuestData {
  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) {
      // Check legacy zustand storage if available
      const legacyRaw = localStorage.getItem("codecrest-guest");
      if (legacyRaw) {
        const parsed = JSON.parse(legacyRaw);
        const state = parsed?.state;
        if (state && (state.solved?.length || state.bookmarks?.length || state.attempts?.length)) {
          return {
            solved: state.solved || [],
            bookmarks: state.bookmarks || [],
            revisit: state.revisit || [],
            notes: state.notes || {},
            activeDays: state.activeDays || [],
            attempts: state.attempts || [],
            profile: {
              name: state.user?.name,
              college: state.user?.college,
              target: state.user?.target,
            },
          };
        }
      }
      return { solved: [], bookmarks: [], revisit: [], notes: {}, activeDays: [], attempts: [] };
    }
    return JSON.parse(raw);
  } catch {
    return { solved: [], bookmarks: [], revisit: [], notes: {}, activeDays: [], attempts: [] };
  }
}

export function saveGuestData(data: GuestData) {
  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save guest data to localStorage:", err);
  }
}

export function clearGuestData() {
  try {
    localStorage.removeItem(GUEST_STORAGE_KEY);
    localStorage.removeItem("codecrest-guest");
  } catch (err) {
    console.error("Failed to clear guest data:", err);
  }
}

export function hasPendingGuestData(): boolean {
  const data = getGuestData();
  return Boolean(
    data.solved.length > 0 ||
      data.bookmarks.length > 0 ||
      data.revisit.length > 0 ||
      Object.keys(data.notes).length > 0 ||
      data.attempts.length > 0,
  );
}

// ---------------------------------------------------------------------------
// CLOUD SUPABASE PROGRESS HELPERS
// ---------------------------------------------------------------------------
export async function fetchCloudProfile(userId: string) {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from("profiles")
    .select("id, display_name, college, target_role, created_at")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    console.error("Error fetching profile from Supabase:", error);
    throw error;
  }
  return data;
}

export async function saveCloudProfile(
  userId: string,
  profile: { name?: string; college?: string; target?: string },
) {
  if (!supabase) return;
  const updates: Record<string, unknown> = { id: userId };
  if (profile.name !== undefined) updates.display_name = profile.name;
  if (profile.college !== undefined) updates.college = profile.college;
  if (profile.target !== undefined) updates.target_role = profile.target;

  const { error } = await supabase.from("profiles").upsert(updates, { onConflict: "id" });
  if (error) {
    console.error("Error saving profile:", error);
    throw error;
  }
}

export async function fetchCloudProgress(userId: string) {
  if (!supabase) return null;

  const [profileRes, progressRes, attemptsRes, activityRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", userId).maybeSingle(),
    supabase.from("problem_progress").select("*").eq("user_id", userId),
    supabase
      .from("test_attempts")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100),
    supabase.from("activity_log").select("activity_date, count").eq("user_id", userId),
  ]);

  if (progressRes.error) {
    console.error("Error fetching problem_progress:", progressRes.error);
    throw progressRes.error;
  }

  const solved: string[] = [];
  const bookmarks: string[] = [];
  const revisit: string[] = [];
  const notes: Record<string, string> = {};

  if (progressRes.data) {
    for (const row of progressRes.data) {
      if (row.solved) solved.push(row.problem_id);
      if (row.bookmarked) bookmarks.push(row.problem_id);
      if (row.revisit) revisit.push(row.problem_id);
      if (row.note) notes[row.problem_id] = row.note;
    }
  }

  const attempts: AttemptRecord[] = (attemptsRes.data || []).map((row) => ({
    id: row.id,
    topic: row.topic_id,
    score: row.score,
    total: row.total,
    accuracy: Number(row.accuracy),
    duration: row.duration_seconds,
    date: row.created_at ? getLocalDateString(new Date(row.created_at)) : getLocalDateString(),
    answers: row.answers,
  }));

  const activeDays = (activityRes.data || []).map((row) => row.activity_date);

  return {
    profile: profileRes.data,
    solved,
    bookmarks,
    revisit,
    notes,
    attempts,
    activeDays,
  };
}

export async function upsertProblemProgress(
  userId: string,
  problemId: string,
  updates: {
    solved?: boolean;
    bookmarked?: boolean;
    revisit?: boolean;
    note?: string;
  },
) {
  if (!supabase) return;

  const row: Record<string, unknown> = {
    user_id: userId,
    problem_id: problemId,
    updated_at: new Date().toISOString(),
  };

  if (updates.solved !== undefined) {
    row.solved = updates.solved;
    if (updates.solved) row.solved_at = new Date().toISOString();
  }
  if (updates.bookmarked !== undefined) row.bookmarked = updates.bookmarked;
  if (updates.revisit !== undefined) row.revisit = updates.revisit;
  if (updates.note !== undefined) row.note = updates.note;

  const { error } = await supabase.from("problem_progress").upsert(row, {
    onConflict: "user_id,problem_id",
  });

  if (error) {
    console.error("Failed to upsert problem progress:", error);
    throw error;
  }
}

export async function insertTestAttempt(userId: string, attempt: AttemptRecord) {
  if (!supabase) return;

  // Ensure UUID format or let database generate default
  const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    attempt.id,
  );

  const payload: Record<string, unknown> = {
    user_id: userId,
    topic_id: attempt.topic,
    score: attempt.score,
    total: attempt.total,
    accuracy: attempt.accuracy,
    duration_seconds: attempt.duration,
    answers: attempt.answers || {},
    created_at: new Date().toISOString(),
  };

  if (isUuid) {
    payload.id = attempt.id;
  }

  const { error } = await supabase.from("test_attempts").insert(payload);
  if (error) {
    console.error("Failed to insert test attempt:", error);
    throw error;
  }
}

export async function logCloudActivity(userId: string, dateStr = getLocalDateString()) {
  if (!supabase) return;

  const { error } = await supabase.from("activity_log").upsert(
    {
      user_id: userId,
      activity_date: dateStr,
      count: 1,
    },
    { onConflict: "user_id,activity_date" },
  );

  if (error) {
    console.error("Failed to log activity:", error);
    throw error;
  }
}

// ---------------------------------------------------------------------------
// GUEST TO ACCOUNT MIGRATION
// ---------------------------------------------------------------------------
export async function mergeGuestDataToCloud(userId: string): Promise<{ mergedCount: number }> {
  if (!supabase) return { mergedCount: 0 };

  const guest = getGuestData();
  const allProblemIds = Array.from(
    new Set([
      ...guest.solved,
      ...guest.bookmarks,
      ...guest.revisit,
      ...Object.keys(guest.notes),
    ]),
  );

  let mergedCount = 0;

  // 1. Merge problem progress
  if (allProblemIds.length > 0) {
    // Fetch existing cloud problem records for these IDs
    const { data: existingCloudRows } = await supabase
      .from("problem_progress")
      .select("*")
      .eq("user_id", userId)
      .in("problem_id", allProblemIds);

    const cloudMap = new Map((existingCloudRows || []).map((r) => [r.problem_id, r]));

    const upsertRows = allProblemIds.map((problemId) => {
      const cloud = cloudMap.get(problemId);
      const isSolved = Boolean(cloud?.solved || guest.solved.includes(problemId));
      const isBookmarked = Boolean(cloud?.bookmarked || guest.bookmarks.includes(problemId));
      const isRevisit = Boolean(cloud?.revisit || guest.revisit.includes(problemId));
      const note = cloud?.note || guest.notes[problemId] || "";

      return {
        user_id: userId,
        problem_id: problemId,
        solved: isSolved,
        bookmarked: isBookmarked,
        revisit: isRevisit,
        note,
        solved_at: cloud?.solved_at || (isSolved ? new Date().toISOString() : null),
        updated_at: new Date().toISOString(),
      };
    });

    const { error: problemErr } = await supabase
      .from("problem_progress")
      .upsert(upsertRows, { onConflict: "user_id,problem_id" });

    if (problemErr) console.error("Problem progress migration error:", problemErr);
    else mergedCount += upsertRows.length;
  }

  // 2. Merge test attempts
  if (guest.attempts.length > 0) {
    const attemptRows = guest.attempts.map((att) => ({
      user_id: userId,
      topic_id: att.topic,
      score: att.score,
      total: att.total,
      accuracy: att.accuracy,
      duration_seconds: att.duration,
      answers: att.answers || {},
      created_at: att.date ? new Date(att.date).toISOString() : new Date().toISOString(),
    }));

    const { error: attemptErr } = await supabase.from("test_attempts").insert(attemptRows);
    if (attemptErr) console.error("Test attempts migration error:", attemptErr);
    else mergedCount += attemptRows.length;
  }

  // 3. Merge active days / streaks into activity_log
  if (guest.activeDays.length > 0) {
    const activityRows = guest.activeDays.map((day) => ({
      user_id: userId,
      activity_date: day,
      count: 1,
    }));

    const { error: actErr } = await supabase
      .from("activity_log")
      .upsert(activityRows, { onConflict: "user_id,activity_date" });

    if (actErr) console.error("Activity log migration error:", actErr);
    else mergedCount += activityRows.length;
  }

  // 4. Merge profile if guest had custom settings
  if (guest.profile?.college || guest.profile?.target) {
    try {
      const { data: currentProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .maybeSingle();

      const newCollege = currentProfile?.college || guest.profile.college || "";
      const newTarget =
        currentProfile?.target_role && currentProfile.target_role !== "Software Engineer"
          ? currentProfile.target_role
          : guest.profile.target || currentProfile?.target_role || "Software Engineer";

      await supabase
        .from("profiles")
        .upsert({ id: userId, college: newCollege, target_role: newTarget }, { onConflict: "id" });
    } catch (err) {
      console.error("Profile merge error:", err);
    }
  }

  // Clear guest data on successful merge
  clearGuestData();

  return { mergedCount };
}
