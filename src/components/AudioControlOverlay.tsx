import React from "react";

// ===========================================================================
// FLOATING AUDIO & SPEED CONTROLLER OVERLAY (REMOTION STUDIO PLAYER BAR)
// Displays an elegant, glassmorphic audio control bar directly on top of the
// Remotion player screen for instant ON/OFF, volume & speed status inspection.
// ===========================================================================

interface AudioControlOverlayProps {
  bgmEnabled?: boolean;
  bgmTrack?: string;
  bgmVolume?: number;
  playbackSpeed?: number;
}

export const AudioControlOverlay: React.FC<AudioControlOverlayProps> = ({
  bgmEnabled = true,
  bgmTrack = "custom_bgm.mp3",
  bgmVolume = 0.08,
  playbackSpeed = 1.0,
}) => {
  const volPercent = Math.round(bgmVolume * 100);

  return (
    <div
      style={{
        position: "absolute",
        top: "24px",
        right: "24px",
        display: "flex",
        alignItems: "center",
        gap: "16px",
        padding: "12px 24px",
        borderRadius: "40px",
        background: "rgba(15, 23, 42, 0.85)",
        backdropFilter: "blur(16px)",
        border: "1.5px solid rgba(56, 189, 248, 0.4)",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.6)",
        zIndex: 999,
        pointerEvents: "none",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
      }}
    >
      {/* Track & Status Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <span style={{ fontSize: "20px" }}>🎵</span>
        <span style={{ fontSize: "16px", fontWeight: 800, color: bgmEnabled ? "#38bdf8" : "#94a3b8" }}>
          {bgmTrack === "custom_bgm.mp3" ? "df.mp3" : bgmTrack}
        </span>
      </div>

      {/* ON/OFF Pill */}
      <div
        style={{
          padding: "4px 12px",
          borderRadius: "20px",
          fontSize: "13px",
          fontWeight: 900,
          background: bgmEnabled ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)",
          color: bgmEnabled ? "#10b981" : "#ef4444",
          border: `1px solid ${bgmEnabled ? "#10b981" : "#ef4444"}`,
        }}
      >
        {bgmEnabled ? "● BẬT" : "○ TẮT"}
      </div>

      {/* Volume Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#f59e0b", fontSize: "15px", fontWeight: 800 }}>
        <span>🔊</span>
        <span>{volPercent}%</span>
      </div>

      {/* Speed Badge */}
      <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "#c084fc", fontSize: "15px", fontWeight: 800 }}>
        <span>⚡</span>
        <span>{playbackSpeed}x</span>
      </div>
    </div>
  );
};
