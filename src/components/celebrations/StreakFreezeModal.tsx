import React, { useEffect } from "react";
import { Snowflake, X } from "lucide-react";

interface StreakFreezeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StreakFreezeModal: React.FC<StreakFreezeModalProps> = ({
  isOpen,
  onClose,
}) => {
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

  return (
    <div
      className="milestone-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="freeze-title"
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

        {/* Ice Crystal 3D Icon */}
        <div className="medal-stage" aria-hidden="true">
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #D4EAF7, #4FB3E8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 24px rgba(79, 179, 232, 0.4)",
              color: "#08202F",
            }}
          >
            <Snowflake size={44} strokeWidth={2.2} />
          </div>
        </div>

        <span
          className="eyebrow"
          style={{
            color: "var(--accent-text)",
            marginBottom: 6,
            fontWeight: 700,
            letterSpacing: "0.15em",
          }}
        >
          STREAK PROTECTED
        </span>

        <h3
          id="freeze-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          Streak saved by your freeze!
        </h3>

        <p
          style={{
            color: "var(--ink-2)",
            fontSize: "14px",
            lineHeight: 1.5,
            marginBottom: 24,
          }}
        >
          Your weekly streak freeze activated to protect your climb. Keep the momentum going today!
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
          }}
          onClick={onClose}
        >
          Keep Climbing
        </button>
      </div>
    </div>
  );
};
