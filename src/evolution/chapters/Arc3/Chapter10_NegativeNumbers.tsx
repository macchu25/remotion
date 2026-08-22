import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter10_NegativeNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Background Image (0 - 180 frames)
  const imgOpacity = interpolate(frame, [0, 15, 140, 180], [0, 0.4, 0.4, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 180], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Number line extension past zero leftward (2 - 152 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 140, 152], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const lineDraw = interpolate(frame, [5, 50], [0, 1], { extrapolateRight: "clamp" });
  const hopVal = interpolate(frame, [50, 130], [3, -2], { extrapolateRight: "clamp" });

  // Phase 2: Directional vector 180-deg flip (-1) * (-1) = 1 (152 - 300 frames, Sub 2)
  const p2Opacity = interpolate(frame, [152, 165, 285, 300], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const flipAngle = interpolate(frame, [170, 260], [0, 180], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Bridge to Unknowns (300 - 434 frames, Sub 3)
  const p3Opacity = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: "clamp" });
  const boxMorph = spring({
    frame: frame - 300,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 480;
  const unitSpacing = 85;

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#020617",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Historical Establishing Background Image */}
      {imgOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            filter: "brightness(0.85) contrast(1.1)",
          }}
        >
          <Img
            src={staticFile("images/ch10_negative_rods.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 0.92) 100%)",
            }}
          />
        </div>
      )}

      <AtmosphericBackground glowColor="#38BDF8" particleCount={20} />

      <CameraRig panBehavior="slow_push">
        {/* Chapter Header */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 960,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
            Chương 10 · Khái niệm Số Âm
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Sự Đổi Hướng Trên Trục Số
          </div>
        </div>

        {/* Phase 1: Number Line Stepping past 0 to -2 */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              {/* Main Axis Line */}
              <line
                x1={ox - 480 * lineDraw}
                y1={oy}
                x2={ox + 480 * lineDraw}
                y2={oy}
                stroke="#64748B"
                strokeWidth={4}
              />

              {/* Zero origin marker */}
              {lineDraw > 0.3 && <circle cx={ox} cy={oy} r={8} fill="#F59E0B" />}

              {/* Ticks */}
              {[-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5].map((val) => {
                const xPos = ox + val * unitSpacing;
                const isNegative = val < 0;
                const isZero = val === 0;

                return (
                  <g key={val} opacity={lineDraw}>
                    <line
                      x1={xPos}
                      y1={oy - 12}
                      x2={xPos}
                      y2={oy + 12}
                      stroke={isNegative ? "#38BDF8" : isZero ? "#F59E0B" : "#94A3B8"}
                      strokeWidth={isZero ? 4 : 2}
                    />
                    <text
                      x={xPos}
                      y={oy + 38}
                      fill={isNegative ? "#38BDF8" : isZero ? "#F59E0B" : "#E2E8F0"}
                      fontSize={22}
                      fontWeight={isZero ? 700 : 500}
                      fontFamily="'Fira Code', monospace"
                      textAnchor="middle"
                    >
                      {val}
                    </text>
                  </g>
                );
              })}

              {/* Hopping particle moving from +3 to -2 */}
              <circle
                cx={ox + hopVal * unitSpacing}
                cy={oy - Math.abs(Math.sin(hopVal * Math.PI)) * 35}
                r={12}
                fill="#EF4444"
                filter="drop-shadow(0 0 12px rgba(239, 68, 68, 0.9))"
              />
            </svg>

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#38BDF8", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                BƯỚC LÙI QUA MỐC KHÔNG:
              </span>
              <KaTeXLabel latex="3 - 5 = -2" isInline={true} fontSize={30} color="#F8FAFC" scaleIn={false} />
            </div>
          </div>
        )}

        {/* Phase 2: Directional vector 180-deg flip */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              {/* Center point */}
              <circle cx={ox} cy={oy} r={6} fill="#94A3B8" />

              {/* Rotating Arrow */}
              <g transform={`translate(${ox}, ${oy}) rotate(${flipAngle})`}>
                <line x1={0} y1={0} x2={220} y2={0} stroke="#10B981" strokeWidth={5} />
                <polygon points="220,0 195,-10 195,10" fill="#10B981" />
              </g>
            </svg>

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                PHÉP QUAY 180°:
              </span>
              <KaTeXLabel latex="(-1) \times (-1) = +1" isInline={true} fontSize={30} color="#F8FAFC" scaleIn={false} />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Unknowns */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${boxMorph})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: ẨN SỐ ĐẠI SỐ
              </div>
              <KaTeXLabel
                latex="x + 5 = 2 \implies x = -3 \quad (\text{Chiếc hộp bí ẩn } x)"
                isInline={true}
                fontSize={46}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu ta chưa biết một con số là bao nhiêu, làm sao ta vẫn có thể thao tác và tính toán với nó?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
