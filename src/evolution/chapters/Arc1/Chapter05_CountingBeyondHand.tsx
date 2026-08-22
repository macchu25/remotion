import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter05_CountingBeyondHand: React.FC = () => {
  const frame = useCurrentFrame();

  // Establishing Image Slow Zoom & Fade (0 - 240 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 180, 236], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 240], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Dissolving bodily limits into pure notation (10 - 236 frames, Sub 1)
  const handDissolve = interpolate(frame, [20, 160], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Exponential Scale Expansion (242 - 461 frames, Sub 2)
  const powerScale = Math.floor(interpolate(frame, [242, 450], [1, 9], { extrapolateRight: "clamp" }));

  // Phase 3: Bridge into Geometry (467 - 597 frames, Sub 3)
  const bridgeProgress = interpolate(frame, [467, 580], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      {/* Cosmic Astronomical Observatory Atmosphere */}
      {imgOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            filter: "brightness(0.9) contrast(1.1)",
          }}
        >
          <Img
            src={staticFile("images/ch05_cosmic_observatory.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.35) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <SpatialGrid opacity={0.18} />

      <CameraRig panBehavior="pullback">
        {/* Dissolving Hand Silhouette to Pure Abstract Powers */}
        <div style={{ position: "absolute", inset: 0 }}>
          {handDissolve < 0.9 ? (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 1 - handDissolve,
                color: "#64748B",
                fontSize: 32,
                fontFamily: "monospace",
              }}
            >
              [ BODILY FINGER LIMITS: 10 ]
            </div>
          ) : (
            <div style={{ position: "absolute", inset: 0 }}>
              <KaTeXLabel latex={`10^{${powerScale}}`} x={960} y={500} fontSize={180} color="#38BDF8" delay={120} />

              <div
                style={{
                  position: "absolute",
                  left: 960,
                  top: 700,
                  transform: "translateX(-50%)",
                  color: "#94A3B8",
                  fontSize: 32,
                  letterSpacing: 2,
                }}
              >
                UNBOUNDED ABSTRACT NUMERICAL HORIZON
              </div>
            </div>
          )}
        </div>

        {/* Seamless Bridge Line into Arc 2 (Geometry) */}
        {bridgeProgress > 0 && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 540,
              width: "100%",
              height: 4 * bridgeProgress,
              backgroundColor: "#38BDF8",
              boxShadow: "0 0 20px #38BDF8",
            }}
          />
        )}
      </CameraRig>
    </div>
  );
};
