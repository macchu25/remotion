import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter09_CircleRatioPi: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 180 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 130, 174], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 180], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Circle emergence (10 - 174 frames, Sub 1)
  const circleDraw = interpolate(frame, [10, 80], [0, 1], {
    extrapolateRight: "clamp",
  });
  const radiusDraw = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, mass: 0.6, stiffness: 130 },
  });

  // Phase 2: Circumference Unrolling into 2*pi*r line (180 - 417 frames, Sub 2)
  const unrollProgress = interpolate(frame, [185, 340], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Slicing into Sectors & Rectangle Rearrangement (423 - 566 frames, Sub 3)
  const sliceProgress = interpolate(frame, [425, 530], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const r = 130;
  const centerX = 960;
  const centerY = 500;
  const numSectors = 16;

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
      {/* Archimedes Circle in Sand Atmosphere */}
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
            src={staticFile("images/ch09_archimedes_circle.jpg")}
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
          name="Archimedes"
          years="287 – 212 TCN"
          contribution="Phương pháp Kiệt quệ & Hằng số π"
          color="#F59E0B"
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
              color: "#38BDF8",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Chương 09 • Cấu Trúc
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            Hình Tròn, Tỷ Lệ Và Số \pi
          </div>
        </div>

        {/* Phase 1: Perfect Circle & Radius */}
        {sliceProgress < 0.2 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 1 - unrollProgress * 0.85,
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
              {/* Circle outline with dasharray draw */}
              <circle
                cx={centerX}
                cy={centerY}
                r={r}
                fill="rgba(56, 189, 248, 0.08)"
                stroke="#38BDF8"
                strokeWidth={5}
                strokeDasharray={2 * Math.PI * r}
                strokeDashoffset={2 * Math.PI * r * (1 - circleDraw)}
                filter="drop-shadow(0 0 15px rgba(56, 189, 248, 0.6))"
              />

              {/* Radius Vector */}
              {radiusDraw > 0.05 && (
                <>
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={centerX + r * radiusDraw}
                    y2={centerY}
                    stroke="#F59E0B"
                    strokeWidth={4}
                  />
                  <circle cx={centerX} cy={centerY} r={6} fill="#F8FAFC" />
                  <circle cx={centerX + r * radiusDraw} cy={centerY} r={6} fill="#F59E0B" />
                </>
              )}
            </svg>

            {radiusDraw > 0.3 && (
              <KaTeXLabel
                latex="r"
                x={centerX + r / 2}
                y={centerY - 25}
                fontSize={36}
                color="#F59E0B"
              />
            )}
          </div>
        )}

        {/* Phase 2: Unrolling Circumference Line (C = 2*pi*r) */}
        {unrollProgress > 0.05 && sliceProgress < 0.3 && (
          <div style={{ position: "absolute", inset: 0, opacity: unrollProgress }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Straight unrolled line */}
              <line
                x1={centerX - 400}
                y1={centerY + 100}
                x2={centerX - 400 + 800 * unrollProgress}
                y2={centerY + 100}
                stroke="#38BDF8"
                strokeWidth={6}
                strokeDasharray="8 4"
                filter="drop-shadow(0 0 12px rgba(56, 189, 248, 0.8))"
              />
            </svg>

            <KaTeXLabel
              latex="C = 2\pi r \iff \frac{C}{d} = \pi \approx 3.14159..."
              x={centerX}
              y={centerY + 160}
              fontSize={44}
              color="#F8FAFC"
              glowColor="rgba(56, 189, 248, 0.8)"
              delay={180}
            />
          </div>
        )}

        {/* Phase 3: Sector Slices & Rectangle Formation (S = pi * r^2) */}
        {sliceProgress > 0.1 && (
          <div style={{ position: "absolute", inset: 0, opacity: sliceProgress }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {/* Interlocking wedge sectors */}
              {Array.from({ length: numSectors }).map((_, i) => {
                const isEven = i % 2 === 0;
                const wedgeWidth = (2 * Math.PI * r) / numSectors;
                const targetX = centerX - 360 + i * (wedgeWidth * 0.95);
                const targetY = isEven ? centerY - 50 : centerY + 50;

                return (
                  <polygon
                    key={i}
                    points={`
                      ${targetX},${targetY - (isEven ? -r / 2 : r / 2)}
                      ${targetX + wedgeWidth},${targetY - (isEven ? -r / 2 : r / 2)}
                      ${targetX + wedgeWidth / 2},${targetY + (isEven ? -r / 2 : r / 2)}
                    `}
                    fill={isEven ? "rgba(56, 189, 248, 0.35)" : "rgba(129, 140, 248, 0.35)"}
                    stroke={isEven ? "#38BDF8" : "#818CF8"}
                    strokeWidth={2}
                  />
                );
              })}
            </svg>

            {/* Dimensions for the rearranged rectangle */}
            <KaTeXLabel latex="\pi r" x={centerX} y={centerY + 120} fontSize={38} color="#38BDF8" delay={340} />
            <KaTeXLabel latex="r" x={centerX - 410} y={centerY} fontSize={38} color="#F59E0B" delay={350} />

            {/* Area Formula Payoff */}
            <KaTeXLabel
              latex="S = (\pi r) \times r = \pi r^2"
              x={centerX}
              y={210}
              fontSize={50}
              color="#F8FAFC"
              glowColor="rgba(56, 189, 248, 0.9)"
              delay={360}
            />
          </div>
        )}
      </CameraRig>
    </div>
  );
};
