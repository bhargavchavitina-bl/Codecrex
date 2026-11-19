import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
export const supabaseEnabled = Boolean(supabaseUrl && supabaseAnonKey);
const supabase = supabaseEnabled
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export type UserInfo = {
  uid: string;
  name: string;
  email: string;
  college: string;
  target: string;
  guest?: boolean;
};
export type Attempt = {
  id: string;
  topic: string;
  score: number;
  total: number;
  accuracy: number;
  duration: number;
  date: string;
};
type ProgressKey = "solved" | "bookmarks" | "revisit";
type State = {
  user: UserInfo | null;
  authReady: boolean;
  solved: string[];
  bookmarks: string[];
  revisit: string[];
  notes: Record<string, string>;
  activeDays: string[];
  attempts: Attempt[];
  dark: boolean;
  setUser: (user: UserInfo | null) => void;
  setAuthReady: (ready: boolean) => void;
  clearProgress: () => void;
  toggle: (key: ProgressKey, id: string) => void;
  note: (id: string, value: string) => void;
  theme: () => void;
  markSession: () => void;
  recordAttempt: (attempt: Omit<Attempt, "id" | "date">) => void;
  hydrate: (uid: string) => void;
};
function localDay() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
export const useStore = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      authReady: !supabaseEnabled,
      solved: [],
      bookmarks: [],
      revisit: [],
      notes: {},
      activeDays: [],
      attempts: [],
      dark: false,
      setUser: (user) => set({ user, authReady: true }),
      setAuthReady: (authReady) => set({ authReady }),
      clearProgress: () =>
        set({ solved: [], bookmarks: [], revisit: [], notes: {}, activeDays: [], attempts: [] }),
      toggle: (key, id) => {
        const list = get()[key];
        set({ [key]: list.includes(id) ? list.filter((x) => x !== id) : [...list, id] } as Pick<State, typeof key>);
      },
      note: (id, value) => set({ notes: { ...get().notes, [id]: value } }),
      theme: () => set({ dark: !get().dark }),
      markSession: () => {
        const activeDays = get().activeDays, day = localDay();
        if (!activeDays.includes(day)) set({ activeDays: [...activeDays, day] });
      },
      recordAttempt: (attempt) => {
        const entry: Attempt = { ...attempt, id: crypto.randomUUID(), date: localDay() };
        set({ attempts: [entry, ...get().attempts].slice(0, 100) });
        get().markSession();
      },
      hydrate: (uid) => {
        if (!supabase) return;
        void (async () => {
          try {
            const { data, error } = await supabase.from("user_progress").select("progress").eq("user_id", uid).maybeSingle();
            if (error) throw error;
            const d = data?.progress;
            if (d) {
              const profile = d.profile ?? {};
              set({
                user: get().user ? { ...get().user!, name: profile.name ?? get().user!.name, college: profile.college ?? "", target: profile.target ?? "Software Engineer" } : null,
                solved: d.solved ?? [], bookmarks: d.bookmarks ?? [], revisit: d.revisit ?? [], notes: d.notes ?? {}, activeDays: d.activeDays ?? [], attempts: d.attempts ?? [],
              });
            }
          } catch (error) { console.error(error); }
        })();
      },
    }),
    {
      name: "codecrest-guest",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => s.user?.guest
        ? { user: s.user, solved: s.solved, bookmarks: s.bookmarks, revisit: s.revisit, notes: s.notes, activeDays: s.activeDays, attempts: s.attempts, dark: s.dark }
        : { user: s.user, solved: [], bookmarks: [], revisit: [], notes: {}, activeDays: [], attempts: [], dark: s.dark },
    },
  ),
);

export async function saveProgress() {
  const { user, solved, bookmarks, revisit, notes, activeDays, attempts } = useStore.getState();
  if (!user || user.guest || !supabase) return;
  const { error } = await supabase.from("user_progress").upsert({
    user_id: user.uid,
    progress: { solved, bookmarks, revisit, notes, activeDays, attempts, profile: { name: user.name, email: user.email, college: user.college, target: user.target } },
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" });
  if (error) throw error;
}

function setSupabaseUser(user: { id: string; user_metadata: { full_name?: string; name?: string }; email?: string }) {
  useStore.getState().setUser({
    uid: user.id,
    name: user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "Learner",
    email: user.email || "", college: "", target: "Software Engineer",
  });
  useStore.getState().hydrate(user.id);
}

export async function login(email: string, password: string) {
  if (!supabase) throw Error("Supabase is not configured. Choose guest mode to explore CodeCrest.");
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
}
export async function signup(name: string, email: string, password: string) {
  if (!supabase) throw Error("Supabase is not configured. Choose guest mode to explore CodeCrest.");
  const { data, error } = await supabase.auth.signUp({ email, password, options: { data: { full_name: name }, emailRedirectTo: window.location.origin } });
  if (error) throw error;
  if (data.user && data.session) setSupabaseUser(data.user);
  return !data.session;
}
export async function googleLogin() {
  if (!supabase) throw Error("Supabase is not configured. Choose guest mode to explore CodeCrest.");
  const { error } = await supabase.auth.signInWithOAuth({ provider: "google", options: { redirectTo: window.location.origin } });
  if (error) throw error;
}
export async function resetPassword(email: string) {
  if (!supabase) throw Error("Supabase is not configured. Choose guest mode to explore CodeCrest.");
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/login` });
  if (error) throw error;
}
export async function logout() {
  if (supabase) {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }
  useStore.getState().clearProgress();
  useStore.getState().setUser(null);
}
export function subscribeAuth() {
  if (!supabase) return;
  const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      const current = useStore.getState().user;
      if (current?.guest || (current && current.uid !== session.user.id)) useStore.getState().clearProgress();
      setSupabaseUser(session.user);
    } else {
      if (!useStore.getState().user?.guest) useStore.getState().setUser(null);
      useStore.getState().setAuthReady(true);
    }
  });
  return () => subscription.unsubscribe();
}
