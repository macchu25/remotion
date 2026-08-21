import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface KaTeXLabelProps {
  latex: string;
  x?: number;
  y?: number;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  delay?: number;
  scaleIn?: boolean;
}

export const KaTeXLabel: React.FC<KaTeXLabelProps> = ({
  latex,
  x = 0,
  y = 0,
  fontSize = 48,
  color = "#F8FAFC",
  glowColor = "rgba(248, 250, 252, 0.4)",
  delay = 0,
  scaleIn = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = scaleIn
    ? spring({
        frame: frame - delay,
        fps,
        config: { damping: 14, mass: 0.6, stiffness: 160 },
      })
    : 1;

  const clampedScale = Math.max(0, anim);

  return (
    <div
      style={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        transform: `translate(-50%, -50%) scale(${clampedScale})`,
        fontSize: `${fontSize}px`,
        fontFamily: "'Inter', 'KaTeX_Main', 'Courier New', monospace",
        fontWeight: 700,
        color: color,
        textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        letterSpacing: "0.05em",
        opacity: clampedScale,
        pointerEvents: "none",
        whiteSpace: "nowrap",
      }}
    >
      {latex}
    </div>
  );
};
