import React, { useMemo } from "react";
import { spring, useCurrentFrame, useVideoConfig } from "remotion";
import katex from "katex";

interface KaTeXLabelProps {
  latex: string;
  x?: number;
  y?: number;
  isInline?: boolean;
  fontSize?: number;
  color?: string;
  glowColor?: string;
  delay?: number;
  scaleIn?: boolean;
}

export const KaTeXLabel: React.FC<KaTeXLabelProps> = ({
  latex,
  x,
  y,
  isInline = false,
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

  // Render LaTeX using genuine KaTeX engine with resilient sanitization
  const html = useMemo(() => {
    let clean = latex;
    // Replace unescaped & with \& unless inside multi-column matrix/cases
    if (!clean.includes("\\begin{cases}") && !clean.includes("\\begin{matrix}") && !clean.includes("\\begin{aligned}")) {
      clean = clean.replace(/(?<!\\)&/g, "\\&");
    }
    try {
      return katex.renderToString(clean, {
        throwOnError: false,
        displayMode: true,
        strict: false,
        trust: true,
      });
    } catch {
      return `<span style="font-family: inherit; font-weight: 700;">${clean}</span>`;
    }
  }, [latex]);

  const hasAbsoluteCoords = x !== undefined && y !== undefined && !isInline;

  return (
    <div
      style={{
        position: hasAbsoluteCoords ? "absolute" : "relative",
        left: hasAbsoluteCoords ? `${x}px` : undefined,
        top: hasAbsoluteCoords ? `${y}px` : undefined,
        transform: hasAbsoluteCoords
          ? `translate(-50%, -50%) scale(${clampedScale})`
          : `scale(${clampedScale})`,
        fontSize: `${fontSize}px`,
        color: color,
        textShadow: `0 0 20px ${glowColor}, 0 0 40px ${glowColor}`,
        opacity: clampedScale,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};
