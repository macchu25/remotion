import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { SpatialGrid } from "../../primitives/SpatialGrid";

export const Chapter07_MultiplicationArea: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 200 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 150, 204], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 200], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Discrete 1D line to 2D 3x4 dot grid (10 - 204 frames, Sub 1)
  const gridRows = 3;
  const gridCols = 4;
  const dotProgress = interpolate(frame, [10, 110], [0, 12], {
    extrapolateRight: "clamp",
  });
  const discreteToArea = interpolate(frame, [130, 195], [0, 1], {
    extrapolateRight: "clamp",
  });

  // Phase 2: Solid Area Expansion a x b (210 - 429 frames, Sub 2)
  const solidRectSpring = spring({
    frame: frame - 210,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  // Phase 3: Binomial Square (a + b)^2 = a^2 + 2ab + b^2 (435 - 589 frames, Sub 3)
  const binomialSpring = spring({
    frame: frame - 435,
    fps,
    config: { damping: 15, mass: 0.9, stiffness: 100 },
  });

  // Explosion gap for sub-rectangles
  const explodeGap = interpolate(
    frame,
    [450, 510, 570],
    [0, 24, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Dimensions for Binomial Square
  const centerX = 960;
  const centerY = 540;
  const sizeA = 220;
  const sizeB = 140;

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
      {/* Greek Architect Blueprint Area Atmosphere */}
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
            src={staticFile("images/ch07_greek_architect_area.jpg")}
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
              color: "#818CF8",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Chương 07 • Cấu Trúc
          </div>
          <div
            style={{
              color: "#F8FAFC",
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            Phép Nhân Trở Thành Diện Tích
          </div>
        </div>

        {/* Phase 1: Discrete Dots Array (3 x 4) */}
        {binomialSpring < 0.1 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 1 - discreteToArea * 0.95,
            }}
          >
            <div
              style={{
                position: "absolute",
                left: centerX - 180,
                top: centerY - 130,
                display: "grid",
                gridTemplateColumns: `repeat(${gridCols}, 90px)`,
                gridGap: "30px",
              }}
            >
              {Array.from({ length: gridRows * gridCols }).map((_, idx) => {
                const isVisible = dotProgress >= idx + 1;
                return (
                  <div
                    key={idx}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: "50%",
                      backgroundColor: "#38BDF8",
                      boxShadow: "0 0 16px rgba(56, 189, 248, 0.8)",
                      opacity: isVisible ? 1 : 0,
                      transform: `scale(${isVisible ? 1 : 0})`,
                      transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  />
                );
              })}
            </div>
            {dotProgress >= 12 && (
              <KaTeXLabel
                latex="3 \times 4 = 12"
                x={centerX}
                y={centerY + 180}
                fontSize={48}
                color="#38BDF8"
                delay={65}
              />
            )}
          </div>
        )}

        {/* Phase 2: Solid Rectangle a x b */}
        {discreteToArea > 0.1 && binomialSpring < 0.3 && (
          <div
            style={{
              position: "absolute",
              left: centerX - 200,
              top: centerY - 150,
              width: 400 * solidRectSpring,
              height: 260 * solidRectSpring,
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              border: "4px solid #38BDF8",
              boxShadow: "0 0 30px rgba(56, 189, 248, 0.4)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KaTeXLabel
              latex="\text{Diện tích} = a \times b"
              x={centerX}
              y={centerY}
              fontSize={42}
              color="#F8FAFC"
              glowColor="rgba(56, 189, 248, 0.8)"
              delay={140}
            />
          </div>
        )}

        {/* Phase 3: Binomial Square (a + b)^2 */}
        {binomialSpring > 0.1 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: binomialSpring,
            }}
          >
            {/* 4 Quadrants Container */}
            <div
              style={{
                position: "absolute",
                left: centerX - (sizeA + sizeB) / 2,
                top: centerY - (sizeA + sizeB) / 2 - 20,
              }}
            >
              {/* Region a^2 (Top-Left) */}
              <div
                style={{
                  position: "absolute",
                  left: -explodeGap,
                  top: -explodeGap,
                  width: sizeA,
                  height: sizeA,
                  backgroundColor: "rgba(56, 189, 248, 0.25)",
                  border: "3px solid #38BDF8",
                  boxShadow: "0 0 20px rgba(56, 189, 248, 0.4)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KaTeXLabel latex="a^2" x={sizeA / 2} y={sizeA / 2} fontSize={38} color="#38BDF8" />
              </div>

              {/* Region ab (Top-Right) */}
              <div
                style={{
                  position: "absolute",
                  left: sizeA + explodeGap,
                  top: -explodeGap,
                  width: sizeB,
                  height: sizeA,
                  backgroundColor: "rgba(129, 140, 248, 0.25)",
                  border: "3px solid #818CF8",
                  boxShadow: "0 0 20px rgba(129, 140, 248, 0.4)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KaTeXLabel latex="ab" x={sizeB / 2} y={sizeA / 2} fontSize={32} color="#818CF8" />
              </div>

              {/* Region ab (Bottom-Left) */}
              <div
                style={{
                  position: "absolute",
                  left: -explodeGap,
                  top: sizeA + explodeGap,
                  width: sizeA,
                  height: sizeB,
                  backgroundColor: "rgba(245, 158, 11, 0.25)",
                  border: "3px solid #F59E0B",
                  boxShadow: "0 0 20px rgba(245, 158, 11, 0.4)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KaTeXLabel latex="ab" x={sizeA / 2} y={sizeB / 2} fontSize={32} color="#F59E0B" />
              </div>

              {/* Region b^2 (Bottom-Right) */}
              <div
                style={{
                  position: "absolute",
                  left: sizeA + explodeGap,
                  top: sizeA + explodeGap,
                  width: sizeB,
                  height: sizeB,
                  backgroundColor: "rgba(16, 185, 129, 0.25)",
                  border: "3px solid #10B981",
                  boxShadow: "0 0 20px rgba(16, 185, 129, 0.4)",
                  borderRadius: 6,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <KaTeXLabel latex="b^2" x={sizeB / 2} y={sizeB / 2} fontSize={34} color="#10B981" />
              </div>
            </div>

            {/* Formula Header & Payoff */}
            <KaTeXLabel
              latex="(a + b)^2 = a^2 + 2ab + b^2"
              x={centerX}
              y={210}
              fontSize={48}
              color="#F8FAFC"
              glowColor="rgba(129, 140, 248, 0.8)"
              delay={280}
            />
          </div>
        )}
      </CameraRig>
    </div>
  );
};
