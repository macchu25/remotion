import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter04_PlaceValueZero: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 220 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 160, 215], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 220], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Spatial Columns (10 - 215 frames, Sub 1)
  const columnsOpacity = interpolate(frame, [10, 50], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Emptiness pulse in Tens slot (221 - 465 frames, Sub 2)
  const zeroPulse = Math.sin(frame / 10) * 0.15 + 1;

  // Phase 3: Crystallization of Zero on Impact (Impact frame: 471, Sub 3)
  const zeroReveal = spring({
    frame: frame - 471,
    fps,
    config: { damping: 16, mass: 0.6, stiffness: 130 },
  });

  // Phase 4: Expansion Sequence 5 -> 50 -> 500 -> 5000 (500 - 620 frames)
  const expansionStep = Math.floor(interpolate(frame, [500, 610], [0, 4], { extrapolateRight: "clamp" }));

  const numbers = ["5", "50", "500", "5000", "50000"];

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      {/* Ancient Zero Manuscript Atmosphere */}
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
            src={staticFile("images/ch04_ancient_zero_manuscript.jpg")}
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
        {/* Phase 1 & 2 & 3: Place Value Columns */}
        {expansionStep === 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: columnsOpacity }}>
            {/* Column Dividers */}
            <div style={{ position: "absolute", left: 640, top: 200, width: 2, height: 600, backgroundColor: "rgba(148, 163, 184, 0.3)" }} />
            <div style={{ position: "absolute", left: 1280, top: 200, width: 2, height: 600, backgroundColor: "rgba(148, 163, 184, 0.3)" }} />

            {/* Column Labels */}
            <div style={{ position: "absolute", left: 420, top: 240, color: "#94A3B8", fontSize: 28, fontFamily: "monospace" }}>HUNDREDS</div>
            <div style={{ position: "absolute", left: 910, top: 240, color: "#F59E0B", fontSize: 28, fontFamily: "monospace" }}>TENS</div>
            <div style={{ position: "absolute", left: 1420, top: 240, color: "#94A3B8", fontSize: 28, fontFamily: "monospace" }}>ONES</div>

            {/* Hundreds Digit */}
            <KaTeXLabel latex="2" x={460} y={540} fontSize={140} color="#38BDF8" delay={40} />

            {/* Tens Slot Emptiness / Zero Crystallization */}
            {zeroReveal <= 0.05 ? (
              <div
                style={{
                  position: "absolute",
                  left: 960,
                  top: 540,
                  transform: `translate(-50%, -50%) scale(${zeroPulse})`,
                  width: 100,
                  height: 100,
                  borderRadius: "50%",
                  border: "2px dashed rgba(245, 158, 11, 0.5)",
                }}
              />
            ) : (
              <KaTeXLabel latex="0" x={960} y={540} fontSize={160} color="#F59E0B" glowColor="rgba(245, 158, 11, 0.8)" delay={150} />
            )}

            {/* Ones Digit */}
            <KaTeXLabel latex="5" x={1460} y={540} fontSize={140} color="#38BDF8" delay={40} />
          </div>
        )}

        {/* Phase 4: Exponential Scale Expansion */}
        {expansionStep > 0 && (
          <div style={{ position: "absolute", inset: 0 }}>
            <KaTeXLabel latex={numbers[expansionStep]} x={960} y={540} fontSize={160 + expansionStep * 20} color="#38BDF8" delay={0} />
            <div style={{ position: "absolute", left: 960, top: 720, transform: "translateX(-50%)", color: "#F59E0B", fontSize: 36, fontWeight: 700 }}>
              Structure of Absence = Infinite Scale
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
