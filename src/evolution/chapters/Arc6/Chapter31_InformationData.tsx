import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter31_InformationData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const pixelScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const matrixScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#38BDF8" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 644], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
        {/* Chapter Header */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 50,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 31 · THÔNG TIN TRỞ THÀNH DỮ LIỆU
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Số Hóa Vạn Vật: Điểm Ảnh, Sóng Âm & Ký Tự
          </div>
        </div>

        {/* Phase 1: Pixels to RGB Matrix */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${pixelScale})`,
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
                MÃ HÓA HÌNH ẢNH: ĐIỂM ẢNH (PIXEL) SANG MA TRẬN RGB
              </div>
              <KaTeXLabel
                latex="\text{Pixel}(x, y) \implies [R, G, B] = [255, 107, 107] \in [0, 255]^3"
                isInline={true}
                fontSize={34}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mỗi bức tranh rực rỡ được chia thành hàng triệu ô vuông nhỏ, mỗi ô chứa bộ ba con số đo cường độ ánh sáng
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Audio Sampling */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
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
                border: "1.5px solid rgba(168, 85, 247, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#A855F7", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                LẤY MẪU RỜI RẠC SÓNG ÂM THANH (AUDIO SAMPLING)
              </div>
              <KaTeXLabel
                latex="x[n] = x(n \cdot T_s), \quad f_s = \frac{1}{T_s} = 44.1 \, \text{kHz} \; (44,100 \text{ mẫu / giây})"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Dao động âm thanh liên tục trong không khí được đo đạc và ghi lại thành chuỗi số hàng chục nghìn lần mỗi giây
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Matrices */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${matrixScale})`,
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
                HẠT GIỐNG TIẾN HÓA: ĐẠI SỐ TUYẾN TÍNH & MA TRẬN
              </div>
              <KaTeXLabel
                latex="\mathbf{A} \in \mathbb{R}^{M \times N} = \begin{pmatrix} a_{11} & a_{12} & \dots \\ a_{21} & a_{22} & \dots \end{pmatrix}"
                isInline={true}
                fontSize={38}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Khi hàng triệu con số cần được biến đổi đồng thời, làm thế nào để toán học tổ chức chúng trong một cấu trúc duy nhất?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
