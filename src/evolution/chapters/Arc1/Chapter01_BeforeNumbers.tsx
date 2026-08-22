import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathDot } from "../../primitives/MathDot";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter01_BeforeNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 220 frames)
  const imgOpacity = interpolate(frame, [0, 15, 170, 220], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 220], [1.0, 1.08], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Primordial Entities / Dots (10 - 179 frames, Sub 1)
  const dot1Opacity = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" });
  const dot2Opacity = interpolate(frame, [55, 95], [0, 1], { extrapolateRight: "clamp" });
  const dot3Opacity = interpolate(frame, [100, 140], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Morphing to Tally Marks (185 - 339 frames, Sub 2)
  const tallyTransform = interpolate(frame, [180, 215], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: Grouping & Compression into "10" (345 - 565 frames, Sub 3)
  const groupCompress = interpolate(frame, [340, 390], [0, 1], { extrapolateRight: "clamp" });

  // Phase 4: Final Reveal of "10" on impact (Impact frame: 431)
  const reveal10 = spring({
    frame: frame - 431,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 140 },
  });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      {/* Prehistoric Establishing Image Atmosphere */}
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
            src={staticFile("images/ch01_prehistoric_bone.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          {/* Subtle gradient vignette to blend with dark math void */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 60% 50%, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

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
