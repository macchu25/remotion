import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";

interface AtmosphericBackgroundProps {
  imageSrc?: string;
  glowColor?: string;
  particleCount?: number;
}

export const AtmosphericBackground: React.FC<AtmosphericBackgroundProps> = ({
  imageSrc,
  glowColor = "#38BDF8",
  particleCount = 18,
}) => {
  const frame = useCurrentFrame();

  // Slow subtle camera zoom on background plate
  const imageScale = interpolate(frame, [0, 600], [1.0, 1.08], { extrapolateRight: "clamp" });
  const imageOpacity = interpolate(frame, [0, 20], [0, 0.45], { extrapolateRight: "clamp" });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        backgroundColor: "#020617",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Background Image Plate if provided */}
      {imageSrc && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            transform: `scale(${imageScale})`,
            opacity: imageOpacity,
          }}
        >
          <Img
            src={staticFile(imageSrc)}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.55) contrast(1.1) saturate(1.15)",
            }}
          />
        </div>
      )}

      {/* Radial Gradient Vignette for Contrast */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at 50% 45%, rgba(15, 23, 42, 0.2) 0%, rgba(2, 6, 23, 0.85) 65%, #020617 100%)`,
        }}
      />

      {/* Ambient Pulsing Glow Orb */}
      <div
        style={{
          position: "absolute",
          top: "40%",
          left: "50%",
          width: 800,
          height: 500,
          transform: `translate(-50%, -50%) scale(${1 + Math.sin(frame * 0.04) * 0.08})`,
          background: `radial-gradient(ellipse at center, ${glowColor}18 0%, transparent 70%)`,
          filter: "blur(60px)",
        }}
      />

      {/* Floating Stardust Particles */}
      {Array.from({ length: particleCount }).map((_, idx) => {
        const seedX = ((idx * 137.5) % 1920);
        const speed = 0.4 + (idx % 5) * 0.2;
        const currentY = (1080 + (idx * 89) - (frame * speed)) % 1080;
        const size = 2 + (idx % 4);
        const pOpacity = 0.2 + (Math.sin((frame + idx * 30) * 0.05) * 0.5 + 0.5) * 0.5;

        return (
          <div
            key={idx}
            style={{
              position: "absolute",
              left: seedX,
              top: currentY,
              width: size,
              height: size,
              borderRadius: "50%",
              backgroundColor: glowColor,
              opacity: pOpacity,
              boxShadow: `0 0 10px ${glowColor}`,
            }}
          />
        );
      })}

      {/* Subtle Coordinate Grid */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          opacity: 0.07,
        }}
      >
        <defs>
          <pattern id="atmosGrid" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M 80 0 L 0 0 0 80" fill="none" stroke="#94A3B8" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#atmosGrid)" />
      </svg>
    </div>
  );
};
