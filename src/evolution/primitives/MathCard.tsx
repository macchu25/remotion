import React from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import { KaTeXLabel } from "./KaTeXLabel";

interface MathCardProps {
  title?: string;
  latex: string;
  explanation?: string;
  accentColor?: string;
  delay?: number;
  y?: number;
  fontSize?: number;
  maxWidth?: number;
}

export const MathCard: React.FC<MathCardProps> = ({
  title,
  latex,
  explanation,
  accentColor = "#38BDF8",
  delay = 0,
  y = 520,
  fontSize = 46,
  maxWidth = 1200,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const anim = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  if (frame < delay) return null;

  return (
    <div
      style={{
        position: "absolute",
        left: 960,
        top: y,
        transform: `translate(-50%, -50%) scale(${anim})`,
        opacity: anim,
        width: maxWidth,
        maxWidth: "92vw",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(15, 23, 42, 0.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: `1.5px solid ${accentColor}55`,
        borderRadius: 24,
        padding: "28px 44px",
        boxShadow: `0 20px 50px rgba(0, 0, 0, 0.7), 0 0 35px ${accentColor}25`,
        textAlign: "center",
        zIndex: 10,
      }}
    >
      {/* Category Pill */}
      {title && (
        <div
          style={{
            fontSize: 20,
            letterSpacing: 3,
            fontWeight: 800,
            textTransform: "uppercase",
            color: accentColor,
            marginBottom: 16,
            padding: "4px 18px",
            borderRadius: 20,
            backgroundColor: `${accentColor}18`,
            border: `1px solid ${accentColor}33`,
            display: "inline-block",
            whiteSpace: "nowrap",
          }}
        >
          {title}
        </div>
      )}

      {/* KaTeX Formula - Rendered Inline with Natural Flow */}
      <div
        style={{
          margin: "10px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          overflow: "visible",
        }}
      >
        <KaTeXLabel
          latex={latex}
          isInline={true}
          fontSize={fontSize}
          color="#F8FAFC"
          glowColor={`${accentColor}55`}
          scaleIn={false}
        />
      </div>

      {/* Vietnamese Explanation Text */}
      {explanation && (
        <div
          style={{
            marginTop: 14,
            fontSize: 24,
            fontWeight: 500,
            color: "#CBD5E1",
            lineHeight: 1.45,
            letterSpacing: 0.5,
            wordBreak: "break-word",
            whiteSpace: "normal",
            width: "100%",
          }}
        >
          {explanation}
        </div>
      )}
    </div>
  );
};
