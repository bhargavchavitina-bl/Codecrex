import React from "react";
import { useCelebrations } from "./CelebrationContext";
import { Sparkles, Flame, Trophy, Snowflake, AlertTriangle } from "lucide-react";

export const DevAnimations: React.FC = () => {
  const {
    triggerSolve,
    triggerMilestone,
    triggerStreakBroken,
    triggerFreezeSaved,
  } = useCelebrations();

  return (
    <div className="content-wrap" style={{ maxWidth: 800, margin: "40px auto", padding: 24 }}>
      <div style={{ marginBottom: 32 }}>
        <span className="eyebrow" style={{ color: "var(--accent-text)" }}>DEVELOPER PREVIEW</span>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "var(--ink)", marginTop: 8 }}>
          3D Celebrations & Streak States
        </h1>
        <p style={{ color: "var(--ink-2)", fontSize: 14, marginTop: 4 }}>
          Test and preview all celebration animations, 3D medals, broken streak transitions, and status states.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
        {/* 1. Solve Burst */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent-text)", fontWeight: 600 }}>
            <Sparkles size={20} />
            <span>Solve Burst & +1 Chip</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            Tumbling 3D shards in sky blue/gold + rising floating "+1 Solved" chip.
          </p>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              triggerSolve({
                x: rect.left + rect.width / 2,
                y: rect.top,
                totalSolved: 7,
              });
            }}
          >
            Trigger Burst
          </button>
        </div>

        {/* 2. Streak Extended */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--ember)", fontWeight: 600 }}>
            <Flame size={20} />
            <span>Streak Extended</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            Flips and flares navbar flame in 3D + displays "Streak extended" toast.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              triggerSolve({
                x: rect.left + rect.width / 2,
                y: rect.top,
                totalSolved: 1,
                isFirstToday: true,
              });
            }}
          >
            Trigger Extend
          </button>
        </div>

        {/* 3. Milestone: 10 Problems */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#E8892B", fontWeight: 600 }}>
            <Trophy size={20} />
            <span>10 Problems Medal</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            3D rotating hexagon medal with sweep shine and beveled depth.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => {
              triggerMilestone(
                "10 Problems Solved!",
                "You just conquered your first milestone. The foundation is locked in.",
              );
            }}
          >
            Trigger 10 Solves
          </button>
        </div>

        {/* 4. Milestone: Topic Complete */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--success-text)", fontWeight: 600 }}>
            <Trophy size={20} />
            <span>Topic Complete (100%)</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            100% completion celebration for conquering an entire DSA topic.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => {
              triggerMilestone(
                "Topic Complete: Arrays",
                "All 41 problems across Two Pointers, Sliding Window, Kadane's, and Prefix Sum solved!",
              );
            }}
          >
            Trigger Topic 100%
          </button>
        </div>

        {/* 5. Streak Broken */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--danger-text)", fontWeight: 600 }}>
            <AlertTriangle size={20} />
            <span>Streak Broken</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            Flame tilts and cracks into two falling halves, counter resets to 0.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => {
              triggerStreakBroken(7);
            }}
          >
            Trigger Broken
          </button>
        </div>

        {/* 6. Streak Freeze */}
        <div className="card" style={{ padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--accent-text)", fontWeight: 600 }}>
            <Snowflake size={20} />
            <span>Streak Freeze Saved</span>
          </div>
          <p style={{ fontSize: 13, color: "var(--muted)", margin: 0, flex: 1 }}>
            Crystal 3D freeze animation showing weekly streak protection.
          </p>
          <button
            type="button"
            className="btn btn-secondary"
            style={{ width: "100%", justifyContent: "center" }}
            onClick={() => {
              triggerFreezeSaved();
            }}
          >
            Trigger Freeze
          </button>
        </div>
      </div>
    </div>
  );
};
export default DevAnimations;
