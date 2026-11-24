import React, { createContext, useContext, useState, useCallback } from "react";
import { SolveBurst, type BurstPoint } from "./SolveBurst";
import { MilestoneModal } from "./MilestoneModal";
import { StreakBrokenModal } from "./StreakBrokenModal";
import { StreakFreezeModal } from "./StreakFreezeModal";
import { useStore } from "../../store";

interface SolveEventParams {
  x: number;
  y: number;
  totalSolved: number;
  topicCompleteName?: string;
  isFirstToday?: boolean;
}

interface CelebrationContextType {
  triggerSolve: (params: SolveEventParams) => void;
  triggerMilestone: (title: string, subtitle?: string) => void;
  triggerStreakBroken: (brokenStreak: number) => void;
  triggerFreezeSaved: () => void;
  flameFlareActive: boolean;
}

const CelebrationContext = createContext<CelebrationContextType | null>(null);

export const useCelebrations = () => {
  const ctx = useContext(CelebrationContext);
  if (!ctx) {
    throw new Error("useCelebrations must be used within a CelebrationProvider");
  }
  return ctx;
};

export const CelebrationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { celebrationsEnabled, showToast } = useStore();
  const [bursts, setBursts] = useState<BurstPoint[]>([]);
  const [flameFlareActive, setFlameFlareActive] = useState(false);

  // Milestone state
  const [milestone, setMilestone] = useState<{
    isOpen: boolean;
    title: string;
    subtitle?: string;
  }>({ isOpen: false, title: "" });

  // Broken streak state
  const [brokenStreak, setBrokenStreak] = useState<{
    isOpen: boolean;
    streak: number;
  }>({ isOpen: false, streak: 0 });

  // Freeze state
  const [freezeOpen, setFreezeOpen] = useState(false);

  const triggerMilestone = useCallback((title: string, subtitle?: string) => {
    setMilestone({ isOpen: true, title, subtitle });
  }, []);

  const triggerStreakBroken = useCallback((streak: number) => {
    setBrokenStreak({ isOpen: true, streak });
  }, []);

  const triggerFreezeSaved = useCallback(() => {
    setFreezeOpen(true);
  }, []);

  const triggerSolve = useCallback(
    ({ x, y, totalSolved, topicCompleteName, isFirstToday }: SolveEventParams) => {
      if (useStore.getState().celebrationsEnabled === false) return;

      // 1. Shards burst & floating +1 chip
      const burstId = `${Date.now()}-${Math.random()}`;
      setBursts((prev) => [...prev, { id: burstId, x, y }]);
      setTimeout(() => {
        setBursts((prev) => prev.filter((b) => b.id !== burstId));
      }, 1200);

      // 2. If first problem solved today extending streak: navbar flame card flips, flares, and shows toast
      if (isFirstToday) {
        setFlameFlareActive(true);
        showToast("Streak extended! Flame ignited for today.", "success");
        setTimeout(() => setFlameFlareActive(false), 900);
      }

      // 3. Milestones: Topic complete (100%) takes precedence, or every 10 problems solved
      if (topicCompleteName) {
        setTimeout(() => {
          triggerMilestone(
            `Topic Complete: ${topicCompleteName}`,
            `Mastered every pattern in ${topicCompleteName}. Outstanding consistency!`,
          );
        }, 500);
      } else if (totalSolved > 0 && totalSolved % 10 === 0) {
        setTimeout(() => {
          triggerMilestone(
            `${totalSolved} Problems Solved!`,
            `Another 10 questions conquered. You're building solid algorithmic muscle.`,
          );
        }, 500);
      }
    },
    [celebrationsEnabled, showToast, triggerMilestone],
  );

  return (
    <CelebrationContext.Provider
      value={{
        triggerSolve,
        triggerMilestone,
        triggerStreakBroken,
        triggerFreezeSaved,
        flameFlareActive,
      }}
    >
      {children}

      {/* Overlays */}
      <SolveBurst bursts={bursts} />

      <MilestoneModal
        isOpen={milestone.isOpen}
        title={milestone.title}
        subtitle={milestone.subtitle}
        onClose={() => setMilestone((m) => ({ ...m, isOpen: false }))}
      />

      <StreakBrokenModal
        isOpen={brokenStreak.isOpen}
        brokenStreak={brokenStreak.streak}
        onClose={() => setBrokenStreak((b) => ({ ...b, isOpen: false }))}
      />

      <StreakFreezeModal
        isOpen={freezeOpen}
        onClose={() => setFreezeOpen(false)}
      />
    </CelebrationContext.Provider>
  );
};
