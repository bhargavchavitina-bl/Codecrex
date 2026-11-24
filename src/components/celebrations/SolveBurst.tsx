import React, { useMemo } from "react";

export interface BurstPoint {
  id: string;
  x: number;
  y: number;
}

const COLORS = [
  "#0A0A0A", // deep black
  "#262626", // charcoal
  "#737373", // neutral gray
  "#BDBDBD", // light gray
  "#FFFFFF", // crisp white
];

interface SolveBurstProps {
  bursts: BurstPoint[];
}

export const SolveBurst: React.FC<SolveBurstProps> = ({ bursts }) => {
  const particleCount = useMemo(() => {
    if (typeof navigator !== "undefined" && navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
      return 8;
    }
    return 16;
  }, []);

  if (bursts.length === 0) return null;

  return (
    <>
      {bursts.map((b) => (
        <React.Fragment key={b.id}>
          {/* Floating +1 Chip */}
          <div
            className="floating-plus-one"
            style={{
              left: `${b.x}px`,
              top: `${b.y}px`,
            }}
          >
            +1 Solved
          </div>

          {/* Tumbling 3D Shards Overlay */}
          <div className="celebration-particles-overlay" aria-hidden="true">
            {Array.from({ length: particleCount }).map((_, i) => {
              const color = COLORS[i % COLORS.length];
              const angle = (i / particleCount) * Math.PI * 2;
              const dist = 30 + (i % 5) * 15;
              const txMid = Math.cos(angle) * dist;
              const tyMid = -40 - Math.random() * 60;
              const txEnd = Math.cos(angle) * (dist + 40);
              const tyEnd = 80 + Math.random() * 120;
              const sizeW = 7 + (i % 4) * 2;
              const sizeH = 6 + (i % 3) * 3;
              const rotSpeed = 600 + (i % 4) * 100;

              return (
                <div
                  key={`${b.id}-p-${i}`}
                  className="tumbling-shard"
                  style={
                    {
                      left: `${b.x}px`,
                      top: `${b.y}px`,
                      width: `${sizeW}px`,
                      height: `${sizeH}px`,
                      backgroundColor: color,
                      borderRadius: i % 2 === 0 ? "2px" : "1px",
                      boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                      "--tx": `${txMid}px`,
                      "--ty-mid": `${tyMid}px`,
                      "--tx-end": `${txEnd}px`,
                      "--ty-end": `${tyEnd}px`,
                      animationDuration: `${rotSpeed}ms`,
                    } as React.CSSProperties
                  }
                />
              );
            })}
          </div>
        </React.Fragment>
      ))}
    </>
  );
};
