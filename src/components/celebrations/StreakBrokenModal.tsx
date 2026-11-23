import React, { useEffect } from "react";
import { Flame, X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StreakBrokenModalProps {
  isOpen: boolean;
  brokenStreak: number;
  potdTopicId?: string;
  onClose: () => void;
}

export const StreakBrokenModal: React.FC<StreakBrokenModalProps> = ({
  isOpen,
  brokenStreak,
  potdTopicId = "arrays",
  onClose,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSolveNow = () => {
    onClose();
    navigate(`/dsa/${potdTopicId}`);
  };

  return (
    <div
      className="milestone-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="broken-streak-title"
      onClick={onClose}
    >
      <div className="milestone-card" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="icon-button"
          onClick={onClose}
          aria-label="Close dialog"
          style={{ position: "absolute", top: 16, right: 16 }}
        >
          <X size={18} />
        </button>

        {/* 3D Flame Tilt and Crack Stage */}
        <div className="streak-broken-stage" aria-hidden="true">
          <div className="flame-break-box">
            <div className="flame-half-left">
              <Flame size={72} fill="#E8892B" color="#E8892B" />
            </div>
            <div className="flame-half-right">
              <div style={{ marginLeft: "-36px" }}>
                <Flame size={72} fill="#E8892B" color="#E8892B" />
              </div>
            </div>
          </div>
        </div>

        <span
          className="eyebrow"
          style={{
            color: "var(--muted)",
            marginBottom: 6,
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          STREAK RESTARTED
        </span>

        <h3
          id="broken-streak-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          Your {brokenStreak}-day streak ended
        </h3>

        <p
          style={{
            color: "var(--ink-2)",
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: 24,
          }}
        >
          Every climb restarts with one step. Reignite your flame today!
        </p>

        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "12px 24px",
            borderRadius: "14px",
            fontSize: "15px",
            fontWeight: 600,
            gap: 8,
          }}
          onClick={handleSolveNow}
        >
          <span>Solve one problem now</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
