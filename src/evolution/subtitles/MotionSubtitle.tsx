import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { SubtitleCue, SubtitlePosition } from "../contracts/types";

interface MotionSubtitleProps {
  cues: SubtitleCue[];
  currentLocalFrame?: number;
  positionOverride?: SubtitlePosition;
}

export const MotionSubtitle: React.FC<MotionSubtitleProps> = ({
  cues,
  currentLocalFrame,
  positionOverride,
}) => {
  const frameFromHook = useCurrentFrame();
  const { fps } = useVideoConfig();
  const frame = currentLocalFrame !== undefined ? currentLocalFrame : frameFromHook;

  // Find active cue
  const activeCue = cues.find(
    (c) => frame >= c.startFrame && frame <= c.endFrame
  );

  if (!activeCue) return null;

  const {
    startFrame,
    endFrame,
    impactFrame = startFrame + Math.floor((endFrame - startFrame) * 0.4),
    text,
    emphasizedWords = [],
    motionPreset = "calmExplain",
    position = "bottom",
  } = activeCue;

  const effectivePosition = positionOverride || position;

  // Lifecycle frames
  const localElapsed = frame - startFrame;
  const exitFrames = 6;
  const isExiting = frame > endFrame - exitFrames;

  // Entrance Spring & Interpolations
  const enterSpring = spring({
    frame: localElapsed,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 120 },
  });

  // Exit interpolation
  const exitProgress = isExiting
    ? interpolate(frame, [endFrame - exitFrames, endFrame], [1, 0], {
        extrapolateLeft: "clamp",
        extrapolateRight: "clamp",
      })
    : 1;

  // Base transformations according to motion preset
  let opacity = enterSpring * exitProgress;
  let translateY = 0;
  let scale = 1;
  let borderGlow = "rgba(56, 189, 248, 0.2)";

  switch (motionPreset) {
    case "calmExplain":
      translateY = interpolate(enterSpring, [0, 1], [14, 0]);
      scale = 1;
      break;
    case "discovery":
      translateY = interpolate(enterSpring, [0, 1], [16, 0]);
      scale = interpolate(enterSpring, [0, 1], [0.95, 1.0]);
      borderGlow = "rgba(56, 189, 248, 0.4)";
      break;
    case "question":
      translateY = interpolate(enterSpring, [0, 1], [-8, 0]);
      scale = interpolate(enterSpring, [0, 1], [0.98, 1.0]);
      borderGlow = "rgba(251, 191, 36, 0.4)";
      break;
    case "definition":
      translateY = 0;
      scale = interpolate(enterSpring, [0, 1], [0.96, 1.0]);
      borderGlow = "rgba(129, 140, 248, 0.45)";
      break;
    case "majorReveal":
      translateY = interpolate(enterSpring, [0, 1], [18, 0]);
      scale = interpolate(enterSpring, [0, 1], [0.92, 1.0]);
      borderGlow = "rgba(56, 189, 248, 0.7)";
      break;
    case "technicalTerm":
      translateY = interpolate(enterSpring, [0, 1], [10, 0]);
      scale = 1;
      borderGlow = "rgba(16, 185, 129, 0.4)";
      break;
    case "transition":
      translateY = interpolate(exitProgress, [0, 1], [-12, 0]);
      scale = 1;
      break;
  }

  // Positioning style
  const positionStyles: React.CSSProperties = {
    position: "absolute",
    left: "50%",
    transform: `translateX(-50%) translateY(${translateY}px) scale(${scale})`,
    zIndex: 900,
  };

  if (effectivePosition === "bottom") {
    positionStyles.bottom = 44;
  } else if (effectivePosition === "top") {
    positionStyles.top = 44;
  } else if (effectivePosition === "bottom-right") {
    positionStyles.left = undefined;
    positionStyles.right = 60;
    positionStyles.bottom = 44;
    positionStyles.transform = `translateY(${translateY}px) scale(${scale})`;
  } else if (effectivePosition === "bottom-left") {
    positionStyles.left = 60;
    positionStyles.bottom = 44;
    positionStyles.transform = `translateY(${translateY}px) scale(${scale})`;
  } else if (effectivePosition === "top-right") {
    positionStyles.left = undefined;
    positionStyles.right = 60;
    positionStyles.top = 44;
    positionStyles.transform = `translateY(${translateY}px) scale(${scale})`;
  }

  // Keyword Emphasis Calculation
  const isNearImpact = Math.abs(frame - impactFrame) <= 12;
  const impactProgress = isNearImpact
    ? interpolate(
        frame,
        [impactFrame - 8, impactFrame, impactFrame + 8],
        [1.0, 1.08, 1.0],
        { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
      )
    : 1.0;

  // Render text with word emphasis
  const renderFormattedText = () => {
    if (emphasizedWords.length === 0) {
      return <span>{text}</span>;
    }

    // Split words with regex to isolate keywords
    const pattern = new RegExp(`(${emphasizedWords.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|")})`, "gi");
    const parts = text.split(pattern);

    return (
      <span>
        {parts.map((part, i) => {
          const isEmphasized = emphasizedWords.some(
            (w) => w.toLowerCase() === part.toLowerCase()
          );

          if (isEmphasized) {
            return (
              <span
                key={i}
                style={{
                  display: "inline-block",
                  color: "#38BDF8",
                  fontWeight: 700,
                  transform: `scale(${impactProgress})`,
                  textShadow: isNearImpact
                    ? "0 0 16px rgba(56, 189, 248, 0.9), 0 0 30px rgba(56, 189, 248, 0.5)"
                    : "0 0 8px rgba(56, 189, 248, 0.4)",
                  backgroundColor: isNearImpact
                    ? "rgba(56, 189, 248, 0.15)"
                    : "rgba(56, 189, 248, 0.06)",
                  padding: "2px 8px",
                  borderRadius: 6,
                  margin: "0 2px",
                  transition: "transform 0.1s ease-out",
                }}
              >
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </span>
    );
  };

  return (
    <div
      style={{
        ...positionStyles,
        opacity,
        maxWidth: 1400,
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(10, 15, 29, 0.88)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: `1px solid ${borderGlow}`,
          boxShadow: `0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px ${borderGlow}`,
          borderRadius: 14,
          padding: "14px 28px",
          textAlign: "center",
          color: "#F8FAFC",
          fontSize: 26,
          fontWeight: 500,
          letterSpacing: "0.02em",
          lineHeight: 1.45,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        }}
      >
        {renderFormattedText()}
      </div>
    </div>
  );
};
