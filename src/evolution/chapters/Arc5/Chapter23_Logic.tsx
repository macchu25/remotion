import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter23_Logic: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Formal Syllogism (2 - 140 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 130, 140], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: De Morgan's Laws (140 - 280 frames, Sub 2)
  const p2Opacity = interpolate(frame, [140, 155, 268, 280], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Incompleteness (280 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [280, 295], [0, 1], { extrapolateRight: "clamp" });
  const godelScale = spring({
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
      <AtmosphericBackground glowColor="#38BDF8" particleCount={20} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 577], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
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
            Chương 23 · Logic Học Hình Thức
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Luật Tư Duy & Cấu Trúc Chân Lý
          </div>
        </div>

        {/* Phase 1: Formal Syllogism */}
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
                TAM ĐOẠN LUẬN HÌNH THỨC
              </div>
              <KaTeXLabel
                latex="\forall x \, (H(x) \implies M(x)) \quad \land \quad H(\text{Socrates}) \implies M(\text{Socrates})"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Tách rời cảm tính — Chỉ giữ lại cấu trúc suy diễn chân lý tuyệt đối của các mệnh đề
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Propositional Logic Operations */}
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
                ĐẠI SỐ MỆNH ĐỀ & ĐỊNH LUẬT DE MORGAN
              </div>
              <KaTeXLabel
                latex="\neg(P \land Q) \iff \neg P \lor \neg Q, \quad \neg(P \lor Q) \iff \neg P \land \neg Q"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Các phép toán VÀ, HOẶC, PHỦ ĐỊNH xây dựng nên khung sườn suy luận cơ giới hóa
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Incompleteness */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${godelScale})`,
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#EF4444", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: NGHỊCH LÝ GÖDEL
              </div>
              <KaTeXLabel
                latex="G \iff \neg \text{Chứng minh được}(G)"
                isInline={true}
                fontSize={38}
                color="#EF4444"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Liệu một hệ tiên đề logic có thể chứng minh được tất cả mọi chân lý đúng đắn trong toán học?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
