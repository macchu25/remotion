import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter20_DifferentialEquations: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Formulation (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Live Pendulum & Wave Tracing (150 - 300 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 285, 300], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const oscAngle = Math.sin((frame - 150) * 0.1) * 0.55;

  // Phase 3: Bridge to Probability (300 - 450 frames, Sub 3)
  const p3Opacity = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: "clamp" });
  const probScale = spring({
    frame: frame - 300,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 200;
  const len = 220;
  const bobX = ox + Math.sin(oscAngle) * len;
  const bobY = oy + Math.cos(oscAngle) * len;

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
      <AtmosphericBackground glowColor="#818CF8" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 586], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch05_cosmic_observatory.jpg")}
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
            Chương 20 · Phương Trình Vi Phân & Vật Lý
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Quy Luật Chuyển Động Của Tự Nhiên
          </div>
        </div>

        {/* Phase 1: Differential Equation */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                PHƯƠNG TRÌNH VI PHÂN BẬC HAI
              </div>
              <KaTeXLabel
                latex="m \frac{d^2 x}{dt^2} + \gamma \frac{dx}{dt} + kx = 0"
                isInline={true}
                fontSize={48}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Liên kết trực tiếp giữa Gia tốc (Đạo hàm bậc 2), Ma sát cản và Lực hồi phục
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: 100% Unobscured Pendulum with Sleek Bottom Formula */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            {/* SVG Pendulum swinging visibly in top-half (y = 200 to 450) */}
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              {/* Pivot */}
              <circle cx={ox} cy={oy} r={8} fill="#94A3B8" />
              <line x1={ox - 60} y1={oy} x2={ox + 60} y2={oy} stroke="#475569" strokeWidth={3} />

              {/* Arc track of motion */}
              <path
                d={`M ${ox - Math.sin(0.55) * len},${oy + Math.cos(0.55) * len} A ${len} ${len} 0 0 0 ${ox + Math.sin(0.55) * len},${oy + Math.cos(0.55) * len}`}
                stroke="rgba(245, 158, 11, 0.25)"
                strokeWidth={2}
                strokeDasharray="6,4"
                fill="none"
              />

              {/* Rod */}
              <line x1={ox} y1={oy} x2={bobX} y2={bobY} stroke="#CBD5E1" strokeWidth={3} />

              {/* Bob */}
              <circle cx={bobX} cy={bobY} r={22} fill="#F59E0B" filter="drop-shadow(0 0 16px rgba(245, 158, 11, 0.9))" />
            </svg>

            {/* Formula Pill at y = 640 - 100% CLEAR OF THE BOB! */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 640,
                transform: "translateX(-50%)",
                padding: "16px 40px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)",
                textAlign: "center",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2, marginBottom: 8 }}>
                NGHIỆM DAO ĐỘNG ĐIỀU HÒA
              </div>
              <KaTeXLabel
                latex="x(t) = A \cos(\omega t + \phi), \quad \omega = \sqrt{\frac{k}{m}}"
                isInline={true}
                fontSize={34}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Probability */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${probScale})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: XÁC SUẤT & NGẪU NHIÊN
              </div>
              <KaTeXLabel
                latex="P(A) = \frac{|A|}{|\Omega|} \quad (\text{Thế giới bất định})"
                isInline={true}
                fontSize={46}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Khi các yếu tố vượt tầm kiểm soát tất định, toán học phát minh ra ngôn ngữ của sự ngẫu nhiên
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
