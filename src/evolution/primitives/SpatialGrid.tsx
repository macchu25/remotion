import React from "react";
import { useCurrentFrame } from "remotion";

interface SpatialGridProps {
  opacity?: number;
  gridSize?: number;
  color?: string;
}

export const SpatialGrid: React.FC<SpatialGridProps> = ({
  opacity = 0.15,
  gridSize = 80,
  color = "rgba(148, 163, 184, 0.4)",
}) => {
  const frame = useCurrentFrame();
  const drift = (frame * 0.3) % gridSize;

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity,
        backgroundImage: `
          linear-gradient(to right, ${color} 1px, transparent 1px),
          linear-gradient(to bottom, ${color} 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        backgroundPosition: `${drift}px ${drift}px`,
        pointerEvents: "none",
      }}
    />
  );
};
