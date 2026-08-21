import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";

interface MathDotProps {
  x: number;
  y: number;
  size?: number;
  color?: string;
  glowColor?: string;
  delay?: number;
  pulse?: boolean;
}

export const MathDot: React.FC<MathDotProps> = ({
  x,
  y,
  size = 16,
  color = "#60A5FA",
  glowColor = "rgba(96, 165, 250, 0.6)",
  delay = 0,
  pulse = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 180 },
  });

  const clampedScale = Math.max(0, scale);
  const pulseFactor = pulse ? 1 + Math.sin((frame + delay * 10) / 15) * 0.08 : 1;
  const currentSize = size * clampedScale * pulseFactor;

  return (
    <div
      style={{
        position: "absolute",
        left: x - currentSize / 2,
        top: y - currentSize / 2,
        width: currentSize,
        height: currentSize,
        borderRadius: "50%",
        backgroundColor: color,
        boxShadow: `0 0 ${currentSize * 1.5}px ${glowColor}, 0 0 ${currentSize * 3}px ${glowColor}`,
        opacity: clampedScale,
        pointerEvents: "none",
      }}
    />
  );
};
