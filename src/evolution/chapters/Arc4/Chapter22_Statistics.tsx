import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter22_Statistics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 & 2: Mean line & Bell Curve overlay (2 - 290 frames)
  const meanDraw = interpolate(frame, [150, 200], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Logic (290 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [290, 305], [0, 1], { extrapolateRight: "clamp" });
  const logicScale = spring({
    frame: frame - 290,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 520;

  // Deterministic scatter points
  const points = [
    { x: -180, y: 30 }, { x: -140, y: -40 }, { x: -100, y: -80 }, { x: -60, y: 20 },
    { x: -30, y: -120 }, { x: 0, y: -140 }, { x: 25, y: -110 }, { x: 60, y: 40 },
    { x: 90, y: -70 }, { x: 130, y: -30 }, { x: 170, y: 50 }, { x: -20, y: 80 },
    { x: 40, y: -20 }, { x: -80, y: -10 }, { x: 110, y: 15 }
  ];

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
      <AtmosphericBackground glowColor="#38BDF8" particleCount={20} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 702], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch18_calculus_newton_leibniz.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.92) 80%)",
          }}
        />
      </div>

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Carl Friedrich Gauss"
          years="1777 – 1855"
          contribution="Phân phối Chuẩn & Định lý Giới hạn"
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
            Chương 22 · Thống Kê
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Định Lý Giới Hạn Trung Tâm & Trật Tự Trong Dữ Liệu
          </div>
        </div>

        {/* Phase 1 & 2: Scatter plot & Mean overlay */}
        {p3Opacity < 0.9 && (
          <div style={{ position: "absolute", inset: 0, opacity: 1 - p3Opacity }}>
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
              <line x1={ox - 450} y1={oy + 140} x2={ox + 450} y2={oy + 140} stroke="#475569" strokeWidth={3} />

              {/* Data points */}
              {points.map((pt, i) => (
                <circle
                  key={i}
                  cx={ox + pt.x}
                  cy={oy + pt.y}
                  r={7}
                  fill="#38BDF8"
                  opacity={0.8}
                />
              ))}

              {/* Mean Line (Vertical Amber Dash) */}
              {meanDraw > 0 && (
                <g opacity={meanDraw}>
                  <line
                    x1={ox}
                    y1={oy + 140}
                    x2={ox}
                    y2={oy - 180}
                    stroke="#F59E0B"
                    strokeWidth={3}
                    strokeDasharray="6,4"
                  />
                  <text x={ox} y={oy - 195} fill="#F59E0B" fontSize={20} fontWeight={700} textAnchor="middle">
                    Giá trị trung bình μ
                  </text>
                </g>
              )}
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
                ĐỊNH LÝ GIỚI HẠN TRUNG TÂM:
              </span>
              <KaTeXLabel
                latex="\bar{X}_n \xrightarrow{d} \mathcal{N}(\mu, \sigma^2 / n)"
                isInline={true}
                fontSize={28}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Logic */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${logicScale})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: LOGIC HỌC HÌNH THỨC
              </div>
              <KaTeXLabel
                latex="P \land Q \implies R \quad (\text{Chân trị Đúng / Sai})"
                isInline={true}
                fontSize={46}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu một điều thường xảy ra không có nghĩa nó luôn đúng, làm sao cơ giới hóa tư duy thành các chân lý tuyệt đối?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
