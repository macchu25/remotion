import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter06_GeometryMeasurement: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 200 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 140, 185], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 200], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Rope with 12 Knots (10 - 173 frames, Sub 1)
  const knotProgress = interpolate(frame, [10, 85], [0, 12], {
    extrapolateRight: "clamp",
  });

  // Phase 2: Folding into 3-4-5 Right Triangle (179 - 397 frames, Sub 2)
  const foldTriangle = spring({
    frame: frame - 179,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  // Angle square reveal
  const angleSquareSpring = spring({
    frame: frame - 260,
    fps,
    config: { damping: 12, mass: 0.5, stiffness: 150 },
  });

  // Phase 3: Transition to Euclidean Coordinate Grid (403 - 595 frames, Sub 3)
  const gridExpand = spring({
    frame: frame - 403,
    fps,
    config: { damping: 16, mass: 1, stiffness: 90 },
  });

  // Triangle vertices: Base = 4 units (320px), Height = 3 units (240px), Hypotenuse = 5 units (400px)
  const originX = 800;
  const originY = 640;
  const sideA = 240; // 3 units
  const sideB = 320; // 4 units

  const vA = { x: originX, y: originY - sideA }; // Top vertex
  const vB = { x: originX, y: originY };         // Right-angle vertex
  const vC = { x: originX + sideB, y: originY }; // Right vertex

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#030712",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ancient Nile River Surveying Atmosphere */}
      {imgOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            filter: "brightness(0.88) contrast(1.1)",
          }}
        >
          <Img
            src={staticFile("images/ch06_ancient_nile_survey.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(3, 7, 18, 0.35) 0%, rgba(3, 7, 18, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <SpatialGrid opacity={0.06 + gridExpand * 0.1} />

      <CameraRig panBehavior="slow_push">
        {/* Chapter Title Badge */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 80,
            opacity: interpolate(frame, [5, 25], [0, 1], { extrapolateRight: "clamp" }),
          }}
        >
          <div
            style={{
              color: "#38BDF8",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Chương 06 • Cấu Trúc
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            Hình Học Từ Đo Đạc
          </div>
        </div>

        {/* Phase 1: Straight 12-Knot Rope */}
        {foldTriangle < 0.95 && (
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              opacity: 1 - foldTriangle * 0.9,
            }}
          >
            {/* Main rope line */}
            <line
              x1={400}
              y1={540}
              x2={400 + Math.min(knotProgress, 12) * 90}
              y2={540}
              stroke="#F59E0B"
              strokeWidth={5}
              strokeDasharray="8 4"
            />
            {/* 12 Knots */}
            {Array.from({ length: 12 }).map((_, i) => {
              const kx = 400 + i * 90;
              const kOpacity = interpolate(knotProgress, [i, i + 0.8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              });
              return (
                <g key={i} opacity={kOpacity}>
                  <circle
                    cx={kx}
                    cy={540}
                    r={9}
                    fill="#38BDF8"
                    stroke="#F8FAFC"
                    strokeWidth={2}
                  />
                  <text
                    x={kx}
                    y={515}
                    textAnchor="middle"
                    fill="#94A3B8"
                    fontSize={16}
                    fontFamily="monospace"
                  >
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>
        )}

        {/* Phase 2: 3-4-5 Right Triangle Assembly */}
        {foldTriangle > 0.05 && (
          <div style={{ position: "absolute", inset: 0, opacity: foldTriangle }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Triangle Path */}
              <polygon
                points={`${vA.x},${vA.y} ${vB.x},${vB.y} ${vC.x},${vC.y}`}
                fill="rgba(56, 189, 248, 0.08)"
                stroke="#38BDF8"
                strokeWidth={5}
                strokeLinejoin="round"
              />

              {/* Right Angle Square Marker */}
              {angleSquareSpring > 0.1 && (
                <rect
                  x={vB.x}
                  y={vB.y - 36 * angleSquareSpring}
                  width={36 * angleSquareSpring}
                  height={36 * angleSquareSpring}
                  fill="rgba(245, 158, 11, 0.25)"
                  stroke="#F59E0B"
                  strokeWidth={2}
                />
              )}

              {/* Hypotenuse Dash Animation */}
              <line
                x1={vA.x}
                y1={vA.y}
                x2={vC.x}
                y2={vC.y}
                stroke="#F59E0B"
                strokeWidth={4}
                strokeDasharray="6 6"
              />

              {/* Vertices Dots */}
              {[vA, vB, vC].map((v, idx) => (
                <circle
                  key={idx}
                  cx={v.x}
                  cy={v.y}
                  r={8}
                  fill="#F8FAFC"
                  stroke="#38BDF8"
                  strokeWidth={3}
                  filter="drop-shadow(0 0 10px rgba(56, 189, 248, 0.8))"
                />
              ))}
            </svg>

            {/* Dimension Labels */}
            <KaTeXLabel
              latex="3"
              x={vB.x - 40}
              y={(vA.y + vB.y) / 2}
              fontSize={44}
              color="#38BDF8"
              delay={150}
            />
            <KaTeXLabel
              latex="4"
              x={(vB.x + vC.x) / 2}
              y={vB.y + 40}
              fontSize={44}
              color="#38BDF8"
              delay={170}
            />
            <KaTeXLabel
              latex="5"
              x={(vA.x + vC.x) / 2 + 30}
              y={(vA.y + vC.y) / 2 - 25}
              fontSize={52}
              color="#F59E0B"
              glowColor="rgba(245, 158, 11, 0.8)"
              delay={190}
            />

            {/* Euclidean Proof Formula */}
            {gridExpand > 0.2 && (
              <KaTeXLabel
                latex="3^2 + 4^2 = 5^2 \quad (9 + 16 = 25)"
                x={960}
                y={220}
                fontSize={46}
                color="#F8FAFC"
                glowColor="rgba(56, 189, 248, 0.8)"
                delay={280}
              />
            )}
          </div>
        )}
      </CameraRig>
    </div>
  );
};
