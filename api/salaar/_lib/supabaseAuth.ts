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

export function getSupabaseConfig(): { url: string; anonKey: string; serviceRoleKey?: string } {
  ensureBackendEnv();
  const url = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
  const anonKey = (
    process.env.SUPABASE_ANON_KEY ||
    process.env.VITE_SUPABASE_ANON_KEY ||
    ""
  ).trim();
  const serviceRoleKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || "").trim() || undefined;
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
  return match ? match[1].trim() : null;
}

/**
 * Verifies the user's Supabase JWT and creates an authenticated Supabase client scoped to that user's RLS policies.
 * Returns null if unauthenticated or if no valid token was provided.
 */
export async function authenticateRequest(req: IncomingMessage): Promise<{
  auth: AuthContext | null;
  error?: string;
  statusCode?: number;
}> {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    return {
      auth: null,
      error: "Supabase environment variables are not configured on the backend.",
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

  const authClient = createClient(url, anonKey, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const { data, error } = await authClient.auth.getUser(token);
  if (error || !data?.user) {
    return {
      auth: null,
      error: "Invalid or expired session token. Please sign in again.",
      statusCode: 401,
    };
  }

  return {
    auth: {
      userId: data.user.id,
      user: data.user,
      supabase: authClient,
      accessToken: token,
    },
  };
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
