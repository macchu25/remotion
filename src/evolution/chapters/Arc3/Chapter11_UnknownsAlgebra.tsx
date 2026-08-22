import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter11_UnknownsAlgebra: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Background Image (0 - 180 frames)
  const imgOpacity = interpolate(frame, [0, 15, 140, 180], [0, 0.4, 0.4, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 180], [1.0, 1.06], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Box to X Transformation (2 - 126 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 115, 126], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const boxToX = spring({
    frame: frame - 40,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  // Phase 2: Equation Balance Scale (126 - 292 frames, Sub 2)
  const p2Opacity = interpolate(frame, [126, 140, 275, 292], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  const solveStep1 = spring({
    frame: frame - 180,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  const solveStep2 = spring({
    frame: frame - 230,
    fps,
    config: { damping: 12, mass: 0.6, stiffness: 140 },
  });

  // Phase 3: Variable X Continuously Changing (292 - 403 frames, Sub 3)
  const p3Opacity = interpolate(frame, [292, 305], [0, 1], { extrapolateRight: "clamp" });
  const xSweep = Math.sin(frame / 10) * 2.5;

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
            src={staticFile("images/ch11_islamic_algebra.jpg")}
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
        <MathematicianBadge
          name="Al-Khwarizmi"
          years="780 – 850"
          contribution="Nhà Trí Tuệ Baghdad · Cha đẻ Đại số"
          color="#F59E0B"
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
            Chương 11 · Ẩn Số & Đại Số
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Chiếc Cân Thăng Bằng Của Phương Trình
          </div>
        </div>

        {/* Phase 1: Box to Variable x */}
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
                CHIẾC HỘP ẨN SỐ ĐẠI SỐ
              </div>
              <KaTeXLabel
                latex={boxToX > 0.5 ? "x + 3 = 7 \\implies x = 4" : "\\square + 3 = 7"}
                isInline={true}
                fontSize={54}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Đại số cho phép ta làm việc với những giá trị chưa biết bằng các quy tắc logic chuẩn xác
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Equation Balance Scale (2x + 3 = 11) */}
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
              {/* Stand */}
              <polygon points="960,460 930,550 990,550" fill="#475569" />
              <circle cx={960} cy={460} r={10} fill="#F59E0B" />

              {/* Beam */}
              <line x1={620} y1={460} x2={1300} y2={460} stroke="#94A3B8" strokeWidth={6} />

              {/* Left Pan */}
              <line x1={620} y1={460} x2={580} y2={560} stroke="#64748B" strokeWidth={2} />
              <line x1={620} y1={460} x2={660} y2={560} stroke="#64748B" strokeWidth={2} />
              <rect x={540} y={560} width={160} height={14} rx={7} fill="#38BDF8" />

              {/* Right Pan */}
              <line x1={1300} y1={460} x2={1260} y2={560} stroke="#64748B" strokeWidth={2} />
              <line x1={1300} y1={460} x2={1340} y2={560} stroke="#64748B" strokeWidth={2} />
              <rect x={1220} y={560} width={160} height={14} rx={7} fill="#10B981" />
            </svg>

            {/* Left Pan Content */}
            <KaTeXLabel
              latex={solveStep1 > 0.5 ? "2x" : "2x + 3"}
              x={620}
              y={510}
              fontSize={38}
              color="#38BDF8"
              scaleIn={false}
            />

            {/* Right Pan Content */}
            <KaTeXLabel
              latex={solveStep1 > 0.5 ? "8" : "11"}
              x={1300}
              y={510}
              fontSize={38}
              color="#10B981"
              scaleIn={false}
            />

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
                QUY TẮC CÂN BẰNG:
              </span>
              <KaTeXLabel
                latex={
                  solveStep2 > 0.5
                    ? "\\mathbf{x = 4}"
                    : solveStep1 > 0.5
                    ? "2x = 8 \\quad (\\text{Trừ 3 ở cả hai vế})"
                    : "2x + 3 = 11"
                }
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Variable */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
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
              <div style={{ color: "#38BDF8", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: BIẾN SỐ LIÊN TỤC
              </div>
              <KaTeXLabel
                latex={`x = ${xSweep.toFixed(2)} \\implies y = x^2 = ${(xSweep * xSweep).toFixed(2)}`}
                isInline={true}
                fontSize={46}
                color="#38BDF8"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Điều gì xảy ra nếu giá trị của x không phải một ẩn số cố định, mà liên tục trôi chảy trong không gian?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
