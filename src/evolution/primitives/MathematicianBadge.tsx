import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";

interface MathematicianBadgeProps {
  name: string;
  years: string;
  contribution: string;
  avatarIcon?: string;
  color?: string;
  x?: number;
  y?: number;
  delay?: number;
}

export const MathematicianBadge: React.FC<MathematicianBadgeProps> = ({
  name,
  years,
  contribution,
  color = "#38BDF8",
  x = 1860,
  y = 48,
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 140 },
  });

  const opacity = interpolate(frame, [delay, delay + 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: "absolute",
        right: 1920 - x,
        top: y,
        transform: `scale(${scale})`,
        transformOrigin: "top right",
        opacity,
        zIndex: 30,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "10px 22px 10px 14px",
          borderRadius: 40,
          backgroundColor: "rgba(15, 23, 42, 0.88)",
          border: `1.5px solid ${color}66`,
          boxShadow: `0 0 25px ${color}26, 0 8px 32px rgba(0, 0, 0, 0.6)`,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Avatar Ring */}
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            backgroundColor: `${color}20`,
            border: `2px solid ${color}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 12px ${color}66`,
          }}
        >
          <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={2}>
            <circle cx="12" cy="8" r="4" />
            <path d="M6 20v-2a6 6 0 0 1 12 0v2" />
          </svg>
        </div>

        {/* Info Column */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ color: "#F8FAFC", fontSize: 17, fontWeight: 700, letterSpacing: 0.5 }}>
              {name}
            </span>
            <span style={{ color: `${color}ee`, fontSize: 13, fontFamily: "'Fira Code', monospace", fontWeight: 500 }}>
              ({years})
            </span>
          </div>
          <span style={{ color: "#94A3B8", fontSize: 13, fontWeight: 500 }}>
            {contribution}
          </span>
        </div>
      </div>
    </div>
  );
};
