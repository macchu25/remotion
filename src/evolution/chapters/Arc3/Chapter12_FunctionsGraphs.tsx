import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter12_FunctionsGraphs: React.FC = () => {
  const frame = useCurrentFrame();

  // Establishing Image Slow Zoom & Fade (0 - 185 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 140, 185], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 185], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Mapping table (2 - 159 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 145, 159], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Parabola curve drawing & parameter dynamic change (159 - 330 frames, Sub 2)
  const p2Opacity = interpolate(frame, [159, 172, 315, 330], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const aParam = interpolate(frame, [170, 220, 260, 310], [1, 2, 0.4, -0.8], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Bridge to periodic cycle (330 - 446 frames, Sub 3)
  const p3Opacity = interpolate(frame, [330, 345], [0, 1], { extrapolateRight: "clamp" });
  const cycleAngle = interpolate(frame, [330, 446], [0, Math.PI * 4]);
  const cycleRadius = 90;

  const ox = 960;
  const oy = 480;
  const scale = 50;

  const points: string[] = [];
  for (let t = -4.5; t <= 4.5; t += 0.2) {
    const px = ox + t * scale;
    const py = oy - aParam * (t * t) * (scale * 0.35);
    points.push(`${px},${py}`);
  }
  const parabolaD = `M ${points.join(" L ")}`;

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
      {/* René Descartes Coordinate Study Background */}
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
            src={staticFile("images/ch12_descartes_coordinate.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.4) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <AtmosphericBackground glowColor="#38BDF8" particleCount={20} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="René Descartes"
          years="1596 – 1650"
          contribution="Hệ tọa độ Descartes & Hàm số"
          color="#38BDF8"
          delay={15}
        />

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
            Chương 12 · Hàm Số & Đồ Thị
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Đại Số Biến Hình Thành Không Gian
          </div>
        </div>

        {/* Phase 1: Mapping pairs */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: 1100,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 48px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                ÁNH XẠ TỪ ĐẦU VÀO ĐẾN ĐẦU RA
              </div>
              <KaTeXLabel
                latex="f(x) = x^2 \implies 1 \to 1, \; 2 \to 4, \; 3 \to 9, \; -2 \to 4"
                isInline={true}
                fontSize={44}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mỗi giá trị x được gửi vào cỗ máy và sinh ra một giá trị y duy nhất trong không gian
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Dynamic 2D Coordinate Grid & Parabola changing parameter a */}
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
              {/* Axes */}
              <line x1={420} y1={oy} x2={1500} y2={oy} stroke="#475569" strokeWidth={3} />
              <line x1={ox} y1={180} x2={ox} y2={700} stroke="#475569" strokeWidth={3} />
              <text x={1510} y={oy + 6} fill="#94A3B8" fontSize={22} fontFamily="'Fira Code', monospace">x</text>
              <text x={ox} y={160} fill="#94A3B8" fontSize={22} fontFamily="'Fira Code', monospace" textAnchor="middle">y</text>

              {/* Dynamic Parabola */}
              <path
                d={parabolaD}
                fill="none"
                stroke="#38BDF8"
                strokeWidth={5}
                filter="drop-shadow(0 0 15px rgba(56, 189, 248, 0.8))"
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
                ĐỒ THỊ HÀM BẬC HAI:
              </span>
              <KaTeXLabel
                latex={`y = ${aParam.toFixed(1)} x^2`}
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Periodic Orbit Cycle */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              <circle cx={ox} cy={440} r={cycleRadius} stroke="rgba(245, 158, 11, 0.4)" strokeWidth={3} fill="none" />
              <circle
                cx={ox + Math.cos(cycleAngle) * cycleRadius}
                cy={440 + Math.sin(cycleAngle) * cycleRadius}
                r={12}
                fill="#F59E0B"
                filter="drop-shadow(0 0 14px rgba(245, 158, 11, 0.9))"
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
                border: "1px solid rgba(245, 158, 11, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#F59E0B", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                HẠT GIỐNG TIẾN HÓA:
              </span>
              <KaTeXLabel
                latex="x(t) = R \cos(\omega t), \; y(t) = R \sin(\omega t)"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
