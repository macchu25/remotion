import React from "react";

interface MathLineProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke?: string;
  strokeWidth?: number;
  progress?: number; // 0 to 1
  dashArray?: string;
  glow?: boolean;
}

export const MathLine: React.FC<MathLineProps> = ({
  x1,
  y1,
  x2,
  y2,
  stroke = "#38BDF8",
  strokeWidth = 3,
  progress = 1,
  dashArray,
  glow = true,
}) => {
  const currentX2 = x1 + (x2 - x1) * progress;
  const currentY2 = y1 + (y2 - y1) * progress;

  return (
    <svg
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <filter id="lineGlow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="4" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>

      <line
        x1={x1}
        y1={y1}
        x2={currentX2}
        y2={currentY2}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeDasharray={dashArray}
        strokeLinecap="round"
        filter={glow ? "url(#lineGlow)" : undefined}
      />
    </svg>
  );
};
