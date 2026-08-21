import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathDot } from "../../primitives/MathDot";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter01_BeforeNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Primordial Point (0 - 90 frames)
  const dot1Opacity = interpolate(frame, [10, 40], [0, 1], { extrapolateRight: "clamp" });
  const dot2Opacity = interpolate(frame, [45, 75], [0, 1], { extrapolateRight: "clamp" });
  const dot3Opacity = interpolate(frame, [80, 110], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Morphing to Tally Marks (110 - 200 frames)
  const tallyTransform = interpolate(frame, [120, 160], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: Crowding discomfort to 5-grouping (200 - 290 frames)
  const groupCompress = interpolate(frame, [220, 270], [0, 1], { extrapolateRight: "clamp" });

  // Phase 4: Final Reveal of "10" (290 - 360 frames)
  const reveal10 = spring({
    frame: frame - 290,
    fps,
    config: { damping: 12, mass: 0.8, stiffness: 140 },
  });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      <SpatialGrid opacity={0.08} />

      <CameraRig panBehavior="slow_push">
        {/* Phase 1 & 2: Emergence of Points / Morph to Marks */}
        {tallyTransform < 0.9 && (
          <div style={{ position: "absolute", inset: 0 }}>
            {/* Point 1 */}
            {dot1Opacity > 0 && <MathDot x={860} y={540} size={28} color="#38BDF8" delay={10} />}
            {/* Point 2 */}
            {dot2Opacity > 0 && <MathDot x={960} y={540} size={28} color="#38BDF8" delay={45} />}
            {/* Point 3 */}
            {dot3Opacity > 0 && <MathDot x={1060} y={540} size={28} color="#38BDF8" delay={80} />}
          </div>
        )}

        {/* Phase 2: Morph into Tally Marks */}
        {tallyTransform > 0.1 && groupCompress < 0.9 && (
          <div style={{ position: "absolute", inset: 0, opacity: tallyTransform }}>
            {[800, 840, 880, 920, 960, 1000, 1040, 1080, 1120].map((xPos, idx) => (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: xPos,
                  top: 500,
                  width: 6,
                  height: 80,
                  borderRadius: 3,
                  backgroundColor: "#38BDF8",
                  boxShadow: "0 0 15px rgba(56, 189, 248, 0.7)",
                }}
              />
            ))}
          </div>
        )}

        {/* Phase 3 & 4: Grouping & Compression into "10" */}
        {groupCompress > 0.1 && (
          <div style={{ position: "absolute", inset: 0 }}>
            {reveal10 <= 0.1 ? (
              <div
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: `translate(-50%, -50%) scale(${1 - groupCompress * 0.5})`,
                  display: "flex",
                  gap: "20px",
                }}
              >
                <div style={{ color: "#38BDF8", fontSize: 40, letterSpacing: 4 }}>|||||</div>
                <div style={{ color: "#38BDF8", fontSize: 40, letterSpacing: 4 }}>|||||</div>
              </div>
            ) : (
              <KaTeXLabel latex="10" x={960} y={540} fontSize={140} color="#F8FAFC" glowColor="rgba(56, 189, 248, 0.8)" />
            )}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
