import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Safely access env vars across Vite browser runtime and Node scripts
interface GlobalWithProcess {
  process?: {
    env?: Record<string, string | undefined>;
  };
}

const nodeEnv = (globalThis as unknown as GlobalWithProcess).process?.env || {};
const isDev =
  Boolean(import.meta.env?.DEV) || nodeEnv.NODE_ENV === "development";

const supabaseUrl = (
  import.meta.env?.VITE_SUPABASE_URL || nodeEnv.VITE_SUPABASE_URL
)?.trim();

const supabaseAnonKey = (
  import.meta.env?.VITE_SUPABASE_ANON_KEY || nodeEnv.VITE_SUPABASE_ANON_KEY
)?.trim();

const missingEnvVars: string[] = [];
if (!supabaseUrl) missingEnvVars.push("VITE_SUPABASE_URL");
if (!supabaseAnonKey) missingEnvVars.push("VITE_SUPABASE_ANON_KEY");

export const isSupabaseConfigured = missingEnvVars.length === 0;
export const missingSupabaseKeys = missingEnvVars;

if (!isSupabaseConfigured && isDev) {
  console.warn(
    `[CodeCrest Dev Warning] Supabase is not configured. Missing environment variable(s): ${missingEnvVars.join(", ")}. Account authentication will be disabled, but guest mode is available.`,
  );
}

// Create a single Supabase client instance
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
