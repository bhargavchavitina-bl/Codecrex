import { createClient, type SupabaseClient, type User } from "@supabase/supabase-js";
import type { IncomingMessage } from "node:http";
import fs from "node:fs";
import path from "node:path";

let envHydrated = false;

/**
 * Ensures backend environment variables (including non-VITE_ AI keys) are loaded from .env
 * in local Vite/tsx runtimes without exposing secrets to the browser.
 */
export function ensureBackendEnv(): void {
  if (envHydrated) return;
  envHydrated = true;

  for (const fileName of [".env.local", ".env"]) {
    const fullPath = path.resolve(process.cwd(), fileName);
    if (!fs.existsSync(fullPath)) continue;
    try {
      const content = fs.readFileSync(fullPath, "utf8");
      for (const rawLine of content.split(/\r?\n/)) {
        const line = rawLine.trim();
        if (!line || line.startsWith("#")) continue;
        const eqIdx = line.indexOf("=");
        if (eqIdx <= 0) continue;
        const key = line.slice(0, eqIdx).trim();
        let val = line.slice(eqIdx + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!(key in process.env) || !process.env[key]) {
          process.env[key] = val;
        }
      }
    } catch {
      // Ignore unreadable env files cleanly
    }
  }
}

function sanitizeEnvValue(raw?: string): string {
  return (raw || "")
    .replace(/[\r\n]/g, "")
    .trim()
    .replace(/^["']|["']$/g, "")
    .trim();
}

export function getSupabaseConfig(): { url: string; anonKey: string; serviceRoleKey?: string } {
  ensureBackendEnv();
  const rawUrl =
    sanitizeEnvValue(process.env.SUPABASE_URL) || sanitizeEnvValue(process.env.VITE_SUPABASE_URL);
  const url = rawUrl.replace(/\/+$/, "");
  const anonKey =
    sanitizeEnvValue(process.env.SUPABASE_ANON_KEY) ||
    sanitizeEnvValue(process.env.VITE_SUPABASE_ANON_KEY);
  const serviceRoleKey = sanitizeEnvValue(process.env.SUPABASE_SERVICE_ROLE_KEY) || undefined;
  return { url, anonKey, serviceRoleKey };
}

export interface AuthContext {
  userId: string;
  user: User;
  supabase: SupabaseClient;
  accessToken: string;
}

export function extractBearerToken(req: IncomingMessage): string | null {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (typeof authHeader !== "string") return null;
  const match = authHeader.match(/^Bearer\s+(.+)$/i);
  return match ? sanitizeEnvValue(match[1]) : null;
}

async function verifyJwtWithSupabaseRest(
  url: string,
  anonKey: string,
  token: string,
): Promise<{ user?: User; statusCode?: number; error?: string }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(`${url}/auth/v1/user`, {
      method: "GET",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    if (res.status === 401 || res.status === 403) {
      return {
        statusCode: 401,
        error: "Invalid or expired session token. Please sign in again.",
      };
    }

    if (!res.ok) {
      const bodyText = await res.text().catch(() => "");
      return {
        statusCode: 503,
        error: `Supabase auth check failed (${res.status}): ${bodyText.slice(0, 140)}`,
      };
    }

    const user = (await res.json()) as User;
    if (!user?.id) {
      return {
        statusCode: 401,
        error: "Invalid user session payload returned by Supabase.",
      };
    }

    return { user };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return {
      statusCode: 503,
      error: `Failed to reach Supabase Auth service: ${msg.slice(0, 140)}`,
    };
  } finally {
    clearTimeout(timer);
  }
}

interface PostgrestErrorLike {
  code?: string;
  message: string;
}

interface PostgrestResultLike {
  data: unknown;
  error: PostgrestErrorLike | null;
}

/**
 * Lightweight PostgREST REST fallback used only if @supabase/supabase-js createClient()
 * throws in an incompatible serverless runtime.
 */
export function createPostgrestFetchClient(
  url: string,
  anonKey: string,
  token: string,
): SupabaseClient {
  const from = (table: string) => {
    let method: "GET" | "POST" | "PATCH" | "DELETE" = "GET";
    let selectCols = "";
    let bodyPayload: unknown = undefined;
    let onConflictCol: string | undefined;
    let singleMode: "none" | "single" | "maybeSingle" = "none";
    const filters: Array<[string, string]> = [];
    let orderClause = "";
    let limitCount: number | null = null;
    let isUpsert = false;

    const execute = async (): Promise<PostgrestResultLike> => {
      try {
        const params = new URLSearchParams();
        if (selectCols) params.set("select", selectCols);
        for (const [col, val] of filters) {
          params.append(col, `eq.${val}`);
        }
        if (orderClause) params.set("order", orderClause);
        if (limitCount !== null) params.set("limit", String(limitCount));
        if (onConflictCol) params.set("on_conflict", onConflictCol);

        const qs = params.toString();
        const endpoint = `${url}/rest/v1/${encodeURIComponent(table)}${qs ? `?${qs}` : ""}`;
        const headers: Record<string, string> = {
          apikey: anonKey,
          Authorization: `Bearer ${token}`,
        };

        const prefers: string[] = [];
        if (isUpsert) {
          prefers.push("resolution=merge-duplicates");
        }
        if (method !== "GET") {
          headers["Content-Type"] = "application/json";
          prefers.push(selectCols ? "return=representation" : "return=minimal");
        }
        if (prefers.length > 0) {
          headers.Prefer = prefers.join(",");
        }

        const res = await fetch(endpoint, {
          method,
          headers,
          body: method === "GET" || method === "DELETE" ? undefined : JSON.stringify(bodyPayload),
        });

        const text = await res.text();
        let parsed: unknown = null;
        try {
          parsed = text ? JSON.parse(text) : null;
        } catch {
          parsed = null;
        }

        if (!res.ok) {
          const errObj = (parsed && typeof parsed === "object" ? parsed : {}) as {
            code?: string;
            message?: string;
          };
          return {
            data: null,
            error: {
              code: errObj.code,
              message: errObj.message || text.slice(0, 180) || `PostgREST error (${res.status})`,
            },
          };
        }

        if (singleMode === "single") {
          const row = Array.isArray(parsed) ? parsed[0] ?? null : parsed;
          if (!row) {
            return {
              data: null,
              error: { code: "PGRST116", message: "No rows returned for .single()" },
            };
          }
          return { data: row, error: null };
        }
        if (singleMode === "maybeSingle") {
          const row = Array.isArray(parsed) ? parsed[0] ?? null : parsed;
          return { data: row, error: null };
        }
        return { data: parsed ?? [], error: null };
      } catch (err) {
        return {
          data: null,
          error: {
            message: err instanceof Error ? err.message : String(err),
          },
        };
      }
    };

    const builder = {
      select(cols = "*") {
        selectCols = cols.replace(/\s+/g, "");
        return builder;
      },
      insert(payload: unknown) {
        method = "POST";
        isUpsert = false;
        bodyPayload = payload;
        return builder;
      },
      upsert(payload: unknown, opts?: { onConflict?: string }) {
        method = "POST";
        isUpsert = true;
        onConflictCol = opts?.onConflict;
        bodyPayload = payload;
        return builder;
      },
      update(payload: unknown) {
        method = "PATCH";
        bodyPayload = payload;
        return builder;
      },
      delete() {
        method = "DELETE";
        return builder;
      },
      eq(col: string, val: string) {
        filters.push([col, String(val)]);
        return builder;
      },
      order(col: string, opts?: { ascending?: boolean }) {
        orderClause = `${col}.${opts?.ascending === false ? "desc" : "asc"}`;
        return builder;
      },
      limit(n: number) {
        limitCount = n;
        return builder;
      },
      single() {
        singleMode = "single";
        return builder;
      },
      maybeSingle() {
        singleMode = "maybeSingle";
        return builder;
      },
      then<TResult1 = PostgrestResultLike, TResult2 = never>(
        onfulfilled?: ((value: PostgrestResultLike) => TResult1 | PromiseLike<TResult1>) | null,
        onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
      ) {
        return execute().then(onfulfilled, onrejected);
      },
    };
    return builder;
  };

  return { from } as unknown as SupabaseClient;
}

/**
 * Verifies the user's Supabase JWT and creates an authenticated Supabase client scoped to that user's RLS policies.
 * Never throws; always returns a structured AuthContext or error + statusCode.
 */
export async function authenticateRequest(req: IncomingMessage): Promise<{
  auth: AuthContext | null;
  error?: string;
  statusCode?: number;
}> {
  try {
    const { url, anonKey } = getSupabaseConfig();
    if (!url || !anonKey) {
      return {
        auth: null,
        error: "Supabase environment variables are not configured on the backend.",
        statusCode: 503,
      };
    }

    try {
      new URL(url);
    } catch {
      return {
        auth: null,
        error: "Supabase URL environment variable is invalid.",
        statusCode: 503,
      };
    }

    const token = extractBearerToken(req);
    if (!token) {
      return {
        auth: null,
        error: "Authentication required. Missing Bearer token.",
        statusCode: 401,
      };
    }

    const verified = await verifyJwtWithSupabaseRest(url, anonKey, token);
    if (!verified.user) {
      return {
        auth: null,
        error: verified.error || "Invalid or expired session token. Please sign in again.",
        statusCode: verified.statusCode || 401,
      };
    }

    let dbClient: SupabaseClient;
    try {
      dbClient = createClient(url, anonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false,
        },
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      });
    } catch (sdkErr) {
      console.warn(
        "[supabaseAuth] createClient failed, using lightweight PostgREST fetch client:",
        sdkErr instanceof Error ? sdkErr.message : String(sdkErr),
      );
      dbClient = createPostgrestFetchClient(url, anonKey, token);
    }

    return {
      auth: {
        userId: verified.user.id,
        user: verified.user,
        supabase: dbClient,
        accessToken: token,
      },
    };
  } catch (err) {
    console.error("[supabaseAuth] unexpected authenticateRequest error:", err);
    return {
      auth: null,
      error:
        err instanceof Error
          ? `Authentication service error: ${err.message.slice(0, 140)}`
          : "Authentication service error.",
      statusCode: 500,
    };
  }
}

/**
 * Detects whether a Supabase/PostgREST error indicates the SALAAR migration hasn't been executed yet.
 */
export function isMissingTableError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const err = error as { code?: string; message?: string };
  const msg = (err.message || "").toLowerCase();
  return (
    err.code === "42P01" ||
    err.code === "PGRST205" ||
    msg.includes("does not exist") ||
    msg.includes("could not find the table")
  );
}
