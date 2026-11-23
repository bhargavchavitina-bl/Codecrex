import React, { useState, useRef } from "react";
import { Check } from "lucide-react";
import { useStore } from "../../store";

interface CoinCheckboxProps {
  id: string;
  isSolved: boolean;
  onToggle: (event: React.MouseEvent) => void;
  title?: string;
}

export const CoinCheckbox: React.FC<CoinCheckboxProps> = ({
  isSolved,
  onToggle,
  title,
}) => {
  const { celebrationsEnabled } = useStore();
  const [animating, setAnimating] = useState(false);
  const lockRef = useRef(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lockRef.current) return;

    if (!isSolved && celebrationsEnabled) {
      lockRef.current = true;
      setAnimating(true);
      setTimeout(() => {
        setAnimating(false);
        lockRef.current = false;
      }, 420);
    }

    onToggle(e);
  };

  return (
    <button
      type="button"
      className="coin-checkbox-wrapper"
      onClick={handleClick}
      role="checkbox"
      aria-checked={isSolved}
      aria-label={title ? `Mark "${title}" as ${isSolved ? "unsolved" : "solved"}` : "Toggle solved"}
      title={isSolved ? "Mark as unsolved" : "Mark as solved"}
    >
      <div
        className={`coin-checkbox-inner ${isSolved || animating ? "flipped" : ""}`}
      >
        {/* Front Face: Unsolved */}
        <div className="coin-checkbox-face coin-checkbox-front" />

        {/* Back Face: Solved */}
        <div className="coin-checkbox-face coin-checkbox-back">
          <Check size={12} strokeWidth={3} />
        </div>
      </div>
    </button>
  );
};
