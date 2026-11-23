import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  supabase,
  isSupabaseConfigured,
  missingSupabaseKeys,
} from "./lib/supabase";
import { mapAuthError } from "./lib/authErrors";
import {
  type AttemptRecord,
  getLocalDateString,
  getGuestData,
  saveGuestData,
  clearGuestData,
  hasPendingGuestData,
  fetchCloudProgress,
  upsertProblemProgress,
  insertTestAttempt,
  logCloudActivity,
  saveCloudProfile,
  mergeGuestDataToCloud,
} from "./lib/progressService";

export { isSupabaseConfigured, missingSupabaseKeys };
export const supabaseEnabled = isSupabaseConfigured;

export type UserInfo = {
  uid: string;
  name: string;
  email: string;
  college: string;
  target: string;
  guest?: boolean;
};

export type Attempt = AttemptRecord;

type ProgressKey = "solved" | "bookmarks" | "revisit";

export type ToastInfo = {
  id: string;
  message: string;
  type: "success" | "error" | "info";
};

type State = {
  user: UserInfo | null;
  authReady: boolean;
  toast: ToastInfo | null;
  hasGuestDataToMigrate: boolean;
  solved: string[];
  bookmarks: string[];
  revisit: string[];
  notes: Record<string, string>;
  activeDays: string[];
  attempts: Attempt[];
  dark: boolean;
  celebrationsEnabled: boolean;

  // Actions
  setUser: (user: UserInfo | null) => void;
  setAuthReady: (ready: boolean) => void;
  setToast: (toast: ToastInfo | null) => void;
  showToast: (message: string, type?: "success" | "error" | "info") => void;
  setHasGuestDataToMigrate: (value: boolean) => void;
  clearProgress: () => void;
  toggle: (key: ProgressKey, id: string) => void;
  note: (id: string, value: string) => void;
  theme: () => void;
  setCelebrationsEnabled: (enabled: boolean) => void;
  toggleCelebrations: () => void;
  markSession: () => void;
  recordAttempt: (attempt: Omit<Attempt, "id" | "date">) => void;
  updateProfile: (updates: { name?: string; college?: string; target?: string }) => void;
  hydrate: (uid: string) => Promise<void>;
  mergeGuestProgress: () => Promise<void>;
  dismissGuestMigration: () => void;
  continueAsGuest: () => void;
};

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      user: null,
      authReady: false,
      toast: null,
      hasGuestDataToMigrate: false,
      solved: [],
      bookmarks: [],
      revisit: [],
      notes: {},
      activeDays: [],
      attempts: [],
      dark:
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-color-scheme: dark)").matches,
      celebrationsEnabled: true,

      setUser: (user) => set({ user, authReady: true }),
      setAuthReady: (authReady) => set({ authReady }),
      setToast: (toast) => set({ toast }),
      showToast: (message, type = "info") => {
        set({ toast: { id: crypto.randomUUID(), message, type } });
      },
      setHasGuestDataToMigrate: (hasGuestDataToMigrate) => set({ hasGuestDataToMigrate }),

      clearProgress: () =>
        set({
          solved: [],
          bookmarks: [],
          revisit: [],
          notes: {},
          activeDays: [],
          attempts: [],
          hasGuestDataToMigrate: false,
        }),

      toggle: (key, id) => {
        const list = get()[key];
        const isPresent = list.includes(id);
        const nextList = isPresent ? list.filter((x) => x !== id) : [...list, id];
        const { user } = get();

        // 1. Optimistic UI update
        set({ [key]: nextList } as Pick<State, typeof key>);

        // If newly solved, mark session activity
        if (key === "solved" && !isPresent) {
          get().markSession();
        }

        // 2. Persist to cloud or guest
        if (user && !user.guest && supabase) {
          upsertProblemProgress(user.uid, id, { [key]: !isPresent }).catch((err) => {
            console.error(`Failed to sync ${key} status:`, err);
            get().showToast("Could not sync progress with cloud. Please check your connection.", "error");
          });
        } else {
          // Guest mode
          const currentGuest = getGuestData();
          currentGuest[key] = nextList;
          saveGuestData(currentGuest);
        }
      },

      note: (id, value) => {
        const nextNotes = { ...get().notes, [id]: value };
        const { user } = get();

        // Optimistic UI update
        set({ notes: nextNotes });

        if (user && !user.guest && supabase) {
          upsertProblemProgress(user.uid, id, { note: value }).catch((err) => {
            console.error("Failed to sync note to cloud:", err);
            get().showToast("Could not save note to cloud.", "error");
          });
        } else {
          const currentGuest = getGuestData();
          currentGuest.notes = nextNotes;
          saveGuestData(currentGuest);
        }
      },

      theme: () => set({ dark: !get().dark }),

      setCelebrationsEnabled: (celebrationsEnabled: boolean) =>
        set({ celebrationsEnabled }),

      toggleCelebrations: () =>
        set((s) => ({
          celebrationsEnabled: s.celebrationsEnabled === false ? true : false,
        })),

      markSession: () => {
        const today = getLocalDateString();
        const activeDays = get().activeDays;
        if (!activeDays.includes(today)) {
          const nextActiveDays = [...activeDays, today];
          set({ activeDays: nextActiveDays });

          const { user } = get();
          if (user && !user.guest && supabase) {
            logCloudActivity(user.uid, today).catch((err) => {
              console.error("Failed to log activity:", err);
            });
          } else {
            const currentGuest = getGuestData();
            currentGuest.activeDays = nextActiveDays;
            saveGuestData(currentGuest);
          }
        }
      },

      recordAttempt: (attempt) => {
        const entry: Attempt = {
          ...attempt,
          id: crypto.randomUUID(),
          date: getLocalDateString(),
        };
        const nextAttempts = [entry, ...get().attempts].slice(0, 100);
        set({ attempts: nextAttempts });
        get().markSession();

        const { user } = get();
        if (user && !user.guest && supabase) {
          insertTestAttempt(user.uid, entry).catch((err) => {
            console.error("Failed to record test attempt:", err);
            get().showToast("Could not save test attempt to cloud.", "error");
          });
        } else {
          const currentGuest = getGuestData();
          currentGuest.attempts = nextAttempts;
          saveGuestData(currentGuest);
        }
      },

      updateProfile: (updates) => {
        const currentUser = get().user;
        if (!currentUser) return;

        const updatedUser: UserInfo = {
          ...currentUser,
          name: updates.name ?? currentUser.name,
          college: updates.college ?? currentUser.college,
          target: updates.target ?? currentUser.target,
        };
        set({ user: updatedUser });

        if (!updatedUser.guest && supabase) {
          saveCloudProfile(updatedUser.uid, updates).catch((err) => {
            console.error("Failed to update profile:", err);
            get().showToast("Could not update profile in cloud.", "error");
          });
        } else {
          const currentGuest = getGuestData();
          currentGuest.profile = {
            name: updatedUser.name,
            college: updatedUser.college,
            target: updatedUser.target,
          };
          saveGuestData(currentGuest);
        }
      },

      hydrate: async (uid: string) => {
        if (!supabase) return;
        try {
          const data = await fetchCloudProgress(uid);
          if (data) {
            const currentUser = get().user;
            if (currentUser && data.profile) {
              set({
                user: {
                  ...currentUser,
                  name: data.profile.display_name || currentUser.name,
                  college: data.profile.college || currentUser.college,
                  target: data.profile.target_role || currentUser.target,
                },
              });
            }
            set({
              solved: data.solved,
              bookmarks: data.bookmarks,
              revisit: data.revisit,
              notes: data.notes,
              attempts: data.attempts,
              activeDays: data.activeDays,
            });
          }

          // Check if user has guest data that could be merged
          if (hasPendingGuestData()) {
            set({ hasGuestDataToMigrate: true });
          }
        } catch (error) {
          console.error("Error hydrating user progress:", error);
          get().showToast("Could not sync data. Check Supabase RLS policies.", "error");
        }
      },

      mergeGuestProgress: async () => {
        const { user } = get();
        if (!user || user.guest || !supabase) return;

        try {
          const { mergedCount } = await mergeGuestDataToCloud(user.uid);
          await get().hydrate(user.uid);
          set({ hasGuestDataToMigrate: false });
          get().showToast(`Successfully merged ${mergedCount} items from your guest session!`, "success");
        } catch (err) {
          console.error("Failed to merge guest data:", err);
          get().showToast("Failed to merge guest progress.", "error");
        }
      },

      dismissGuestMigration: () => {
        clearGuestData();
        set({ hasGuestDataToMigrate: false });
      },

      continueAsGuest: () => {
        const guestData = getGuestData();
        const guestUser: UserInfo = {
          uid: "guest",
          name: guestData.profile?.name || "Guest learner",
          email: "",
          college: guestData.profile?.college || "",
          target: guestData.profile?.target || "Software Engineer",
          guest: true,
        };
        set({
          user: guestUser,
          authReady: true,
          solved: guestData.solved,
          bookmarks: guestData.bookmarks,
          revisit: guestData.revisit,
          notes: guestData.notes,
          attempts: guestData.attempts,
          activeDays: guestData.activeDays,
          hasGuestDataToMigrate: false,
        });
      },
    }),
    {
      name: "codecrest-preferences",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.celebrationsEnabled === undefined || state.celebrationsEnabled === null) {
            state.celebrationsEnabled = true;
          }
        }
      },
      partialize: (s) => ({
        dark: s.dark,
        celebrationsEnabled: s.celebrationsEnabled !== false,
        // Only persist user if explicitly guest; authenticated users rely on Supabase session token
        user: s.user?.guest ? s.user : null,
      }),
    },
  ),
);

// ---------------------------------------------------------------------------
// AUTHENTICATION FUNCTIONS
// ---------------------------------------------------------------------------
export let lastAuthEvent = "INITIAL";

function logDevAuthError(action: string, error: unknown) {
  if (import.meta.env.DEV) {
    const err = error as { message?: string; status?: number; code?: string };
    console.error(`Auth call [${action}] failed:`, {
      message: err?.message,
      status: err?.status,
      code: err?.code,
      error,
    });
  }
}

function setSupabaseSessionUser(
  user: {
    id: string;
    email?: string;
    user_metadata?: { full_name?: string; name?: string };
  },
  explicitName?: string,
) {
  const name =
    explicitName ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    user.email?.split("@")[0] ||
    "Learner";

  useStore.getState().setUser({
    uid: user.id,
    name,
    email: user.email || "",
    college: "",
    target: "Software Engineer",
    guest: false,
  });

  void useStore.getState().hydrate(user.id);
}

export async function login(email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Guest mode is available to explore CodeCrex.");
  }
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim(),
    password,
  });

  if (error) {
    logDevAuthError("signInWithPassword", error);
    throw new Error(mapAuthError(error));
  }

  if (data.user) {
    // Ensure profile row exists
    try {
      const { data: existingProfile } = await supabase
        .from("profiles")
        .select("id, display_name")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!existingProfile) {
        const displayName =
          data.user.user_metadata?.full_name ||
          data.user.user_metadata?.name ||
          data.user.email?.split("@")[0] ||
          "Learner";
        await supabase.from("profiles").upsert(
          {
            id: data.user.id,
            email: data.user.email || "",
            display_name: displayName,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "id" },
        );
      }
    } catch (err) {
      console.warn("Could not check/upsert profile on login:", err);
    }

    setSupabaseSessionUser(data.user);
  }
}

export async function signup(name: string, email: string, password: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Guest mode is available to explore CodeCrex.");
  }

  const trimmedEmail = email.trim();
  const trimmedName = name.trim();

  const { data, error } = await supabase.auth.signUp({
    email: trimmedEmail,
    password,
    options: {
      data: {
        full_name: trimmedName,
        name: trimmedName,
      },
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    logDevAuthError("signUp", error);
    throw new Error(mapAuthError(error));
  }

  // Duplicate email detection: Supabase returns user with empty identities when email already exists
  if (data.user && (!data.user.identities || data.user.identities.length === 0)) {
    throw new Error("This email is already registered. Try logging in.");
  }

  // If email confirmation is disabled, session is returned immediately
  if (data.session && data.user) {
    // 3a. Ensure profile row exists
    try {
      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          email: trimmedEmail,
          display_name: trimmedName || "Learner",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
      // 3b. Verify row was written
      const { error: verifyErr } = await supabase
        .from("profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();
      if (verifyErr) {
        console.warn("Could not verify profile row write:", verifyErr);
      }
    } catch (err) {
      console.warn("Profile upsert error:", err);
    }

    // 3c. Merge guest progress if any
    if (hasPendingGuestData()) {
      try {
        await mergeGuestDataToCloud(data.user.id);
        clearGuestData();
      } catch (err) {
        console.warn("Error merging guest data during signup:", err);
      }
    }

    setSupabaseSessionUser(data.user, trimmedName);
    // 3d. Show welcome toast
    useStore.getState().showToast(`Welcome to CodeCrex, ${trimmedName || "Learner"}!`, "success");

    return { needsConfirmation: false };
  }

  // 4. If email confirmation is enabled, session is null
  return { needsConfirmation: true, email: trimmedEmail };
}

export async function resendConfirmationEmail(email: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabase.auth.resend({
    type: "signup",
    email: email.trim(),
    options: {
      emailRedirectTo: `${window.location.origin}/dashboard`,
    },
  });

  if (error) {
    logDevAuthError("resend", error);
    throw new Error(mapAuthError(error));
  }
}

export async function resetPassword(email: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured. Guest mode is available to explore CodeCrex.");
  }
  const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${window.location.origin}/reset-password`,
  });

  if (error) {
    logDevAuthError("resetPasswordForEmail", error);
    throw new Error(mapAuthError(error));
  }
}

export async function updatePassword(newPassword: string) {
  if (!supabase) {
    throw new Error("Supabase is not configured.");
  }
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    logDevAuthError("updateUser", error);
    throw new Error(mapAuthError(error));
  }
}

export async function logout() {
  if (supabase) {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        logDevAuthError("signOut", error);
      }
    } catch (err) {
      logDevAuthError("signOut_exception", err);
    }
  }
  useStore.getState().clearProgress();
  useStore.getState().setUser(null);
}

export async function saveProgress() {
  // Maintained for backward compatibility; state updates in store now sync immediately via progressService
}

// ---------------------------------------------------------------------------
// INITIALIZE AUTH & SESSION SUBSCRIPTION
// ---------------------------------------------------------------------------
export function subscribeAuth() {
  if (!supabase) {
    // If Supabase is not configured, mark auth as ready immediately
    // If user was guest, load their guest data
    const currentUser = useStore.getState().user;
    if (currentUser?.guest) {
      useStore.getState().continueAsGuest();
    } else {
      useStore.getState().setAuthReady(true);
    }
    return () => {};
  }

  let isSubscribed = true;

  // 1. Initial session check on startup
  supabase.auth
    .getSession()
    .then(({ data: { session }, error }) => {
      if (!isSubscribed) return;
      if (error) {
        logDevAuthError("getSession", error);
      }

      if (session?.user) {
        setSupabaseSessionUser(session.user);
      } else {
        // No session: if user was previously an explicit guest, restore guest progress
        const currentUser = useStore.getState().user;
        if (currentUser?.guest) {
          useStore.getState().continueAsGuest();
        } else {
          useStore.getState().setUser(null);
        }
      }
      useStore.getState().setAuthReady(true);
    })
    .catch((err) => {
      if (!isSubscribed) return;
      logDevAuthError("getSession_catch", err);
      useStore.getState().setAuthReady(true);
    });

  // 2. Auth state change listener
  const {
    data: { subscription },
  } = supabase.auth.onAuthStateChange((event, session) => {
    if (!isSubscribed) return;
    lastAuthEvent = event;

    if (session?.user) {
      const currentUser = useStore.getState().user;
      if (currentUser?.guest || (currentUser && currentUser.uid !== session.user.id)) {
        useStore.getState().clearProgress();
      }
      setSupabaseSessionUser(session.user);
    } else if (event === "SIGNED_OUT") {
      useStore.getState().clearProgress();
      useStore.getState().setUser(null);
      useStore.getState().setAuthReady(true);
    }
  });

  return () => {
    isSubscribed = false;
    subscription.unsubscribe();
  };
}
