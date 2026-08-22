import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter24_LimitsOfFormalSystems: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 270 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 200, 270], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 270], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Godel Incompleteness (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Turing Halting Problem (150 - 290 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 275, 290], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Algorithms (290 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [290, 305], [0, 1], { extrapolateRight: "clamp" });
  const algoScale = spring({
    frame: frame - 290,
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
      {/* Kurt Gödel Incompleteness Labyrinth Background */}
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
            src={staticFile("images/ch24_kurt_godel.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.35) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <AtmosphericBackground glowColor="#EF4444" particleCount={24} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Kurt Gödel"
          years="1906 – 1978"
          contribution="Định lý Bất toàn của Hệ Tiên đề"
          color="#EF4444"
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
            Chương 24 · Giới Hạn Của Hệ Tiên Đề
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Định Lý Bất Toàn & Giới Hạn Của Sự Biết
          </div>
        </div>

        {/* Phase 1: Godel Incompleteness */}
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
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#EF4444", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                ĐỊNH LÝ BẤT TOÀN GÖDEL (1931)
              </div>
              <KaTeXLabel
                latex="\text{Hệ nhất quán } T \implies \exists G \text{ (Đúng nhưng không thể chứng minh)}"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Giấc mơ của Hilbert tan vỡ: Toán học không thể tự chứng minh toàn bộ chân lý của chính mình
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Turing Halting Problem */}
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
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                BÀI TOÁN DỪNG CỦA ALAN TURING (1936)
              </div>
              <KaTeXLabel
                latex="H(M, w) = \text{Bất khả quyết (Undecidable)}"
                isInline={true}
                fontSize={38}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Không tồn tại thuật toán tổng quát nào có thể phán quyết một chương trình bất kỳ có dừng lại hay không
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Algorithms */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${algoScale})`,
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
              <div style={{ color: "#10B981", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: THUẬT TOÁN HÓA TƯ DUY
              </div>
              <KaTeXLabel
                latex="\text{Input} \xrightarrow{\text{Các bước hữu hạn (Finite Steps)}} \text{Output}"
                isInline={true}
                fontSize={34}
                color="#10B981"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu không thể chứng minh tất cả, thì một cỗ máy hữu hạn có thể tính toán được những gì theo từng bước?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
