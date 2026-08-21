import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter05_CountingBeyondHand: React.FC = () => {
  const frame = useCurrentFrame();

  // Phase 1: Dissolving bodily limits into pure notation (0 - 150 frames)
  const handDissolve = interpolate(frame, [20, 100], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Exponential Scale Expansion (150 - 300 frames)
  const powerScale = Math.floor(interpolate(frame, [120, 300], [1, 9], { extrapolateRight: "clamp" }));

  // Phase 3: Bridge into Geometry (300 - 360 frames)
  const bridgeProgress = interpolate(frame, [300, 360], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
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
