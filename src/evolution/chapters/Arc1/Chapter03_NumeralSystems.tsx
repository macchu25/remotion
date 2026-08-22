import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter03_NumeralSystems: React.FC = () => {
  const frame = useCurrentFrame();

  // Establishing Image Slow Zoom & Fade (0 - 200 frames)
  const imgOpacity = interpolate(frame, [0, 15, 150, 195], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 200], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Evolution Stages: Tallies -> Roman -> Hindu-Arabic
  const stage1 = interpolate(frame, [20, 90], [0, 1], { extrapolateRight: "clamp" });
  const stage2 = interpolate(frame, [165, 230], [0, 1], { extrapolateRight: "clamp" });

  // Roman Multiplication Clutter vs Arabic Simplicity (Sub 3: 381 - 553)
  const clutterProgress = interpolate(frame, [380, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      {/* Ancient Numeral Artifacts Atmosphere */}
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
            src={staticFile("images/ch03_ancient_numerals.jpg")}
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

      <SpatialGrid opacity={0.15} />

      <CameraRig panBehavior="slow_push">
        {/* Stage 1: Tally to Roman VIII */}
        {stage2 < 0.9 && (
          <div style={{ position: "absolute", inset: 0 }}>
            {stage1 < 0.8 ? (
              <KaTeXLabel latex="||||||||" x={960} y={450} fontSize={90} color="#38BDF8" delay={10} />
            ) : (
              <KaTeXLabel latex="\text{VIII}" x={960} y={450} fontSize={120} color="#E2E8F0" delay={100} />
            )}
          </div>
        )}

        {/* Stage 2: Roman VIII -> Modern 8 */}
        {stage2 > 0.1 && clutterProgress < 0.9 && (
          <div style={{ position: "absolute", inset: 0, opacity: stage2 }}>
            <KaTeXLabel latex="8" x={960} y={450} fontSize={160} color="#38BDF8" delay={150} />
          </div>
        )}

        {/* Stage 3: Multiplication Proof (VIII x XII vs 8 x 12 = 96) */}
        {clutterProgress > 0.1 && (
          <div style={{ position: "absolute", inset: 0 }}>
            <div style={{ opacity: 1 - clutterProgress * 0.7 }}>
              <KaTeXLabel latex="\text{VIII} \times \text{XII}" x={960} y={350} fontSize={80} color="#EF4444" delay={210} />
              <div style={{ position: "absolute", left: 960, top: 440, transform: "translateX(-50%)", color: "#94A3B8", fontSize: 24 }}>
                (Cumbersome symbolic clutter)
              </div>
            </div>

            <div style={{ opacity: clutterProgress }}>
              <KaTeXLabel latex="8 \times 12 = 96" x={960} y={650} fontSize={110} color="#10B981" delay={260} />
              <div style={{ position: "absolute", left: 960, top: 760, transform: "translateX(-50%)", color: "#10B981", fontSize: 28, fontWeight: 600 }}>
                Spatial Positional Elegance
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
