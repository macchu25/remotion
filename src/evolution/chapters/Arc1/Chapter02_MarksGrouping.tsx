import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter02_MarksGrouping: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Unorganized Mark Clutter (0 - 120 frames)
  const clutterProgress = interpolate(frame, [0, 90], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Snap into Columns / 5-groups (120 - 240 frames)
  const snapProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 15, mass: 0.7, stiffness: 150 },
  });

  // Phase 3: Emergent Order (240 - 360 frames)
  const labelOpacity = interpolate(frame, [250, 300], [0, 1], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: 1920, height: 1080, backgroundColor: "#020617", position: "relative", overflow: "hidden" }}>
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
