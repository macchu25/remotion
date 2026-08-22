import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter28_BooleanLogic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Boolean Operations (2 - 140 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 130, 140], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Half Adder Circuit (140 - 280 frames, Sub 2)
  const p2Opacity = interpolate(frame, [140, 155, 268, 280], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Transistor (280 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [280, 295], [0, 1], { extrapolateRight: "clamp" });
  const transScale = spring({
    frame: frame - 280,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

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
      <AtmosphericBackground glowColor="#10B981" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 572], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch25_alan_turing.jpg")}
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
          name="Claude Shannon"
          years="1916 – 2001"
          contribution="Đại số Boole & Mạch Điện tử Số"
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
            Chương 28 · Đại Số Boole
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Mạch Logic Biến Tư Duy Thành Phép Cộng
          </div>
        </div>

        {/* Phase 1: Boolean Algebra */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                ĐẠI SỐ BOOLE & CÁC CỔNG LOGIC
              </div>
              <KaTeXLabel
                latex="A \cdot B \; (\text{AND}), \quad A + B \; (\text{OR}), \quad \bar{A} \; (\text{NOT})"
                isInline={true}
                fontSize={38}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Claude Shannon kết hợp chân trị logic với các mạch đóng ngắt điện để tạo ra cỗ máy suy luận
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Half Adder */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                MẠCH CỘNG BÁN PHẦN (HALF-ADDER)
              </div>
              <KaTeXLabel
                latex="\text{Tổng (Sum)} = A \oplus B, \quad \text{Nhớ (Carry)} = A \cdot B"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mạch ghép từ cổng XOR và AND chính thức biến chân lý suy luận thành phép cộng số học cơ khí
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Transistor */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${transScale})`,
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: BÓNG BÁN DẪN
              </div>
              <KaTeXLabel
                latex="\text{Gate (Cổng)} \xrightarrow{\text{Điện áp}} \text{Source} \to \text{Drain} \; (0 / 1)"
                isInline={true}
                fontSize={34}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Làm sao để tạo ra hàng triệu cổng logic này mà không cần những công tắc cơ học cồng kềnh?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
