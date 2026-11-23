import React, { useEffect } from "react";
import { Trophy, X } from "lucide-react";

interface MilestoneModalProps {
  isOpen: boolean;
  title: string;
  subtitle?: string;
  onClose: () => void;
}

export const MilestoneModal: React.FC<MilestoneModalProps> = ({
  isOpen,
  title,
  subtitle,
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
      aria-labelledby="milestone-title"
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

        {/* 3D Rotating Hexagon Medal */}
        <div className="medal-stage" aria-hidden="true">
          <div className="medal-coin-3d">
            <div className="medal-hexagon">
              <div className="medal-shine-sweep" />
              <div className="medal-icon-wrap">
                <Trophy size={36} strokeWidth={2.4} />
              </div>
            </div>
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
          MILESTONE UNLOCKED
        </span>

        <h3
          id="milestone-title"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: 700,
            color: "var(--ink)",
            marginBottom: 8,
          }}
        >
          {title}
        </h3>

        {subtitle && (
          <p
            style={{
              color: "var(--ink-2)",
              fontSize: "14px",
              lineHeight: 1.5,
              marginBottom: 24,
            }}
          >
            {subtitle}
          </p>
        )}

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
          Continue climb
        </button>
      </div>
    </div>
  );
};
