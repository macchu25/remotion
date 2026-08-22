import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter02_MarksGrouping: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 200 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 140, 185], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 200], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Unorganized Mark Clutter (10 - 194 frames, Sub 1)
  const clutterProgress = interpolate(frame, [10, 80], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Snap into Columns / 5-groups (200 - 398 frames, Sub 2)
  const snapProgress = spring({
    frame: frame - 200,
    fps,
    config: { damping: 18, mass: 0.6, stiffness: 120 },
  });

  // Phase 3: Emergent Order & Cognitive Labels (404 - 554 frames, Sub 3)
  const labelOpacity = interpolate(frame, [404, 450], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
      {/* Ancient Cave Tally Carving Atmosphere */}
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
            src={staticFile("images/ch02_cave_tally_carving.jpg")}
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

      <SpatialGrid opacity={0.12} />

      <CameraRig panBehavior="lateral_track">
        {/* Unorganized & Grouped Marks Container */}
        <div style={{ position: "absolute", inset: 0 }}>
          {Array.from({ length: 20 }).map((_, idx) => {
            const rawX = 400 + (idx % 10) * 110 + (idx > 9 ? 30 : 0);
            const rawY = 400 + Math.floor(idx / 10) * 180;
            const groupedX = 500 + Math.floor(idx / 5) * 240 + (idx % 5) * 25;
            const groupedY = 540;

            const currentX = interpolate(snapProgress, [0, 1], [rawX, groupedX]);
            const currentY = interpolate(snapProgress, [0, 1], [rawY, groupedY]);

            return (
              <div
                key={idx}
                style={{
                  position: "absolute",
                  left: currentX,
                  top: currentY,
                  width: 5,
                  height: 70,
                  borderRadius: 3,
                  backgroundColor: idx % 5 === 4 ? "#F59E0B" : "#38BDF8",
                  boxShadow: "0 0 12px rgba(56, 189, 248, 0.6)",
                  opacity: clutterProgress,
                  transform: `rotate(${snapProgress > 0.8 && idx % 5 === 4 ? -25 : 0}deg)`,
                  transformOrigin: "center center",
                }}
              />
            );
          })}
        </div>

        {/* Cognitive Labels */}
        {labelOpacity > 0 && (
          <>
            <KaTeXLabel latex="5" x={535} y={660} fontSize={42} color="#F59E0B" delay={250} />
            <KaTeXLabel latex="5" x={775} y={660} fontSize={42} color="#F59E0B" delay={260} />
            <KaTeXLabel latex="5" x={1015} y={660} fontSize={42} color="#F59E0B" delay={270} />
            <KaTeXLabel latex="5" x={1255} y={660} fontSize={42} color="#F59E0B" delay={280} />
            <KaTeXLabel latex="\text{Total} = 20" x={960} y={320} fontSize={64} color="#F8FAFC" delay={290} />
          </>
        )}
      </CameraRig>
    </div>
  );
};
