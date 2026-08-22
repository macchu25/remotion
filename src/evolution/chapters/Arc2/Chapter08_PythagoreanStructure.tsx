import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter08_PythagoreanStructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 210 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 150, 207], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 210], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Right Triangle Emergence (10 - 207 frames, Sub 1)
  const triangleAppear = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, mass: 0.7, stiffness: 120 },
  });

  // Phase 2: Squares Construction on Sides (213 - 417 frames, Sub 2)
  const squaresBuild = spring({
    frame: frame - 213,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 110 },
  });

  // Phase 3: Dynamic Tile Flow from a^2 & b^2 into c^2 (423 - 521 frames, Sub 3)
  const flowProgress = interpolate(frame, [425, 490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const impactGlow = interpolate(
    frame,
    [485, 505, 530],
    [0, 1, 0.4],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Central Coordinates
  const ox = 900;
  const oy = 600;
  const unit = 50; // unit pixel size

  const sideA = 3 * unit; // 150px (vertical)
  const sideB = 4 * unit; // 200px (horizontal)

  // Vertices of right triangle
  const pA = { x: ox, y: oy - sideA };
  const pB = { x: ox, y: oy };
  const pC = { x: ox + sideB, y: oy };

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
      {/* Pythagorean Mosaic Courtyard Atmosphere */}
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
            src={staticFile("images/ch08_pythagorean_mosaic.jpg")}
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

      <SpatialGrid opacity={0.08} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Pythagoras"
          years="570 – 495 TCN"
          contribution="Định lý Tam giác vuông & Tỷ lệ"
          color="#38BDF8"
          delay={20}
        />

        {/* Chapter Header */}
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
              color: "#F59E0B",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Chương 08 • Cấu Trúc
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            Cấu Trúc Pythagoras
          </div>
        </div>

        {/* Central Geometry Stage */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: triangleAppear,
            transform: `scale(${0.9 + triangleAppear * 0.1})`,
          }}
        >
          <svg
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
            }}
          >
            {/* Right Triangle */}
            <polygon
              points={`${pA.x},${pA.y} ${pB.x},${pB.y} ${pC.x},${pC.y}`}
              fill="rgba(56, 189, 248, 0.12)"
              stroke="#38BDF8"
              strokeWidth={4}
            />

            {/* Right Angle Indicator */}
            <rect
              x={pB.x}
              y={pB.y - 24}
              width={24}
              height={24}
              fill="none"
              stroke="#38BDF8"
              strokeWidth={2}
            />

            {/* Square on side A (Left, size 3x3) */}
            {squaresBuild > 0.05 && (
              <g opacity={squaresBuild * (1 - flowProgress * 0.7)}>
                <rect
                  x={pB.x - sideA}
                  y={pA.y}
                  width={sideA}
                  height={sideA}
                  fill="rgba(56, 189, 248, 0.2)"
                  stroke="#38BDF8"
                  strokeWidth={2}
                />
                {/* 3x3 Internal grid lines */}
                {[1, 2].map((i) => (
                  <React.Fragment key={i}>
                    <line
                      x1={pB.x - sideA + i * unit}
                      y1={pA.y}
                      x2={pB.x - sideA + i * unit}
                      y2={pA.y + sideA}
                      stroke="rgba(56, 189, 248, 0.4)"
                      strokeWidth={1}
                    />
                    <line
                      x1={pB.x - sideA}
                      y1={pA.y + i * unit}
                      x2={pB.x}
                      y2={pA.y + i * unit}
                      stroke="rgba(56, 189, 248, 0.4)"
                      strokeWidth={1}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}

            {/* Square on side B (Bottom, size 4x4) */}
            {squaresBuild > 0.05 && (
              <g opacity={squaresBuild * (1 - flowProgress * 0.7)}>
                <rect
                  x={pB.x}
                  y={pB.y}
                  width={sideB}
                  height={sideB}
                  fill="rgba(129, 140, 248, 0.2)"
                  stroke="#818CF8"
                  strokeWidth={2}
                />
                {/* 4x4 Internal grid lines */}
                {[1, 2, 3].map((i) => (
                  <React.Fragment key={i}>
                    <line
                      x1={pB.x + i * unit}
                      y1={pB.y}
                      x2={pB.x + i * unit}
                      y2={pB.y + sideB}
                      stroke="rgba(129, 140, 248, 0.4)"
                      strokeWidth={1}
                    />
                    <line
                      x1={pB.x}
                      y1={pB.y + i * unit}
                      x2={pB.x + sideB}
                      y2={pB.y + i * unit}
                      stroke="rgba(129, 140, 248, 0.4)"
                      strokeWidth={1}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}

            {/* Square on Hypotenuse C (Rotated Square 5x5) */}
            {squaresBuild > 0.1 && (
              <g
                transform={`translate(${pA.x}, ${pA.y}) rotate(${
                  Math.atan2(pC.y - pA.y, pC.x - pA.x) * (180 / Math.PI) - 90
                })`}
                opacity={squaresBuild}
              >
                <rect
                  x={0}
                  y={0}
                  width={250}
                  height={250}
                  fill={`rgba(245, 158, 11, ${0.1 + flowProgress * 0.25})`}
                  stroke="#F59E0B"
                  strokeWidth={3}
                  filter={
                    impactGlow > 0.1
                      ? `drop-shadow(0 0 ${20 * impactGlow}px rgba(245, 158, 11, 0.9))`
                      : undefined
                  }
                />
                {/* 5x5 Grid on Hypotenuse */}
                {[1, 2, 3, 4].map((i) => (
                  <React.Fragment key={i}>
                    <line
                      x1={i * unit}
                      y1={0}
                      x2={i * unit}
                      y2={250}
                      stroke="rgba(245, 158, 11, 0.35)"
                      strokeWidth={1}
                    />
                    <line
                      x1={0}
                      y1={i * unit}
                      x2={250}
                      y2={i * unit}
                      stroke="rgba(245, 158, 11, 0.35)"
                      strokeWidth={1}
                    />
                  </React.Fragment>
                ))}
              </g>
            )}
          </svg>

          {/* Labels on sides */}
          <KaTeXLabel latex="a^2 = 9" x={pB.x - sideA / 2} y={pA.y + sideA / 2} fontSize={32} color="#38BDF8" delay={140} />
          <KaTeXLabel latex="b^2 = 16" x={pB.x + sideB / 2} y={pB.y + sideB / 2} fontSize={32} color="#818CF8" delay={160} />
          <KaTeXLabel latex="c^2 = 25" x={pA.x + 170} y={pA.y - 70} fontSize={40} color="#F59E0B" glowColor="rgba(245, 158, 11, 0.8)" delay={200} />
        </div>

        {/* Master Formula Reveal */}
        {flowProgress > 0.4 && (
          <KaTeXLabel
            latex="a^2 + b^2 = c^2"
            x={960}
            y={200}
            fontSize={54}
            color="#F8FAFC"
            glowColor="rgba(245, 158, 11, 0.9)"
            delay={310}
          />
        )}
      </CameraRig>
    </div>
  );
};
