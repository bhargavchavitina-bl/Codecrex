import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Safely access env vars in Vite or Node.js environments
const env =
  typeof import.meta !== "undefined" && import.meta.env
    ? import.meta.env
    : (typeof process !== "undefined" ? process.env : {});

const supabaseUrl = env.VITE_SUPABASE_URL?.trim();
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY?.trim();

const missingEnvVars: string[] = [];
if (!supabaseUrl) missingEnvVars.push("VITE_SUPABASE_URL");
if (!supabaseAnonKey) missingEnvVars.push("VITE_SUPABASE_ANON_KEY");

export const isSupabaseConfigured = missingEnvVars.length === 0;
export const missingSupabaseKeys = missingEnvVars;

if (!isSupabaseConfigured && (env.DEV || env.NODE_ENV === "development")) {
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
