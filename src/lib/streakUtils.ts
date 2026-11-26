// Shared timezone-safe local calendar streak and date utilities.
// Pure functions safe for browser, Vite dev middleware, and Vercel serverless functions.

const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/**
 * Formats an instant into YYYY-MM-DD in the supplied IANA timezone (defaults to client timezone or Asia/Kolkata).
 */
export function formatDateInTimeZone(date: Date, timeZone?: string): string {
  const safeTz = resolveValidTimeZone(timeZone);
  try {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: safeTz,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "UTC",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  }
}

export function resolveValidTimeZone(timeZone?: string): string {
  if (timeZone && typeof timeZone === "string") {
    try {
      new Intl.DateTimeFormat("en-US", { timeZone });
      return timeZone;
    } catch {
      // fall through to default
    }
  }
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata";
  } catch {
    return "Asia/Kolkata";
  }
}

export function isValidIsoDate(value: unknown): value is string {
  if (typeof value !== "string" || !ISO_DATE_RE.test(value)) return false;
  const [y, m, d] = value.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d));
  return (
    dt.getUTCFullYear() === y &&
    dt.getUTCMonth() === m - 1 &&
    dt.getUTCDate() === d
  );
}

/**
 * Adds `deltaDays` to a strict YYYY-MM-DD date string using UTC calendar arithmetic
 * so DST transitions and server timezones never shift the day.
 */
export function addDaysIso(isoDate: string, deltaDays: number): string {
  if (!isValidIsoDate(isoDate)) return isoDate;
  const [y, m, d] = isoDate.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d + deltaDays));
  return dt.toISOString().slice(0, 10);
}

/**
 * Computes exact whole calendar days between two YYYY-MM-DD strings (b - a).
 */
export function diffDaysIso(a: string, b: string): number {
  if (!isValidIsoDate(a) || !isValidIsoDate(b)) return 0;
  const [ay, am, ad] = a.split("-").map(Number);
  const [by, bm, bd] = b.split("-").map(Number);
  const utcA = Date.UTC(ay, am - 1, ad);
  const utcB = Date.UTC(by, bm - 1, bd);
  return Math.round((utcB - utcA) / 86_400_000);
}

/**
 * Validates and resolves the client's localDate against global Earth timezone offsets (UTC-12 to UTC+14).
 * Prevents spoofed future/past dates while handling timezone travel & midnight boundaries accurately.
 */
export function resolveClientLocalDate(
  clientLocalDate?: string,
  timeZone?: string,
  now = new Date(),
): string {
  if (isValidIsoDate(clientLocalDate)) {
    const utcToday = now.toISOString().slice(0, 10);
    const delta = Math.abs(diffDaysIso(utcToday, clientLocalDate));
    if (delta <= 1) {
      return clientLocalDate;
    }
  }
  return formatDateInTimeZone(now, timeZone);
}

/**
 * Deduplicates and filters valid ISO date strings (ignoring any dates beyond today).
 */
export function normalizeActiveDays(days: string[], todayIso?: string): string[] {
  const unique = new Set<string>();
  for (const d of days) {
    if (!isValidIsoDate(d)) continue;
    if (todayIso && isValidIsoDate(todayIso) && d > todayIso) continue;
    unique.add(d);
  }
  return Array.from(unique).sort();
}

/**
 * Current consecutive streak anchored to today (if active today) or yesterday (grace before midnight).
 */
export function calculateCurrentStreak(days: string[], todayIso: string): number {
  const validSet = new Set(normalizeActiveDays(days, todayIso));
  if (validSet.size === 0 || !isValidIsoDate(todayIso)) return 0;

  let cursor = todayIso;
  if (!validSet.has(cursor)) {
    cursor = addDaysIso(todayIso, -1);
    if (!validSet.has(cursor)) return 0;
  }

  let streak = 0;
  while (validSet.has(cursor)) {
    streak++;
    cursor = addDaysIso(cursor, -1);
  }
  return streak;
}

/**
 * Longest ever consecutive run across sorted active days.
 */
export function calculateLongestStreak(days: string[]): number {
  const sorted = normalizeActiveDays(days);
  if (sorted.length === 0) return 0;

  let best = 1;
  let run = 1;
  for (let i = 1; i < sorted.length; i++) {
    if (diffDaysIso(sorted[i - 1], sorted[i]) === 1) {
      run++;
      if (run > best) best = run;
    } else {
      run = 1;
    }
  }
  return best;
}

export type WeeklyDaySummary = {
  date: string;
  label: string;
  active: boolean;
  count: number;
  isToday: boolean;
};

/**
 * Builds 7-day rolling calendar ending at `todayIso`.
 */
export function buildWeeklyCalendar(
  todayIso: string,
  countsByDate: Record<string, number>,
): WeeklyDaySummary[] {
  const result: WeeklyDaySummary[] = [];
  for (let offset = -6; offset <= 0; offset++) {
    const iso = addDaysIso(todayIso, offset);
    const [y, m, d] = iso.split("-").map(Number);
    const label = new Intl.DateTimeFormat("en", {
      weekday: "short",
      timeZone: "UTC",
    }).format(new Date(Date.UTC(y, m - 1, d)));
    const count = countsByDate[iso] || 0;
    result.push({
      date: iso,
      label,
      active: count > 0,
      count,
      isToday: offset === 0,
    });
  }
  return result;
}
