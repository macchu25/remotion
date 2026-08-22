import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter33_ComputerGraphics: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const wireScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const waveScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#06B6D4" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 654], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
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
          <div style={{ color: "#06B6D4", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 33 · ĐỒ HỌA MÁY TÍNH
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Toán Học Vẽ Nên Thế Giới Ảo
          </div>
        </div>

        {/* Phase 1: Polygon Mesh */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${wireScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(6, 182, 212, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#06B6D4", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                KHUNG LƯỚI ĐA GIÁC (3D POLYGON MESH)
              </div>
              <KaTeXLabel
                latex="\text{Mesh} = \{\mathbf{V}_i \in \mathbb{R}^3, \; \mathbf{F}_{ijk} \text{ (Mặt tam giác)}\}"
                isInline={true}
                fontSize={38}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Từ những vector tọa độ sơ khai, các hình tam giác liên kết lại tạo thành khung lưới ba chiều sống động
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Lighting & Shading */}
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
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                MÔ HÌNH PHẢN XẠ ÁNH SÁNG (PHONG REFLECTION)
              </div>
              <KaTeXLabel
                latex="I = I_{\text{ambient}} + I_{\text{diffuse}} (\vec{L} \cdot \vec{N}) + I_{\text{specular}} (\vec{R} \cdot \vec{V})^n"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Phép chiếu hình học và đổ bóng ánh sáng biến các phương trình trừu tượng thành những khung cảnh rực rỡ trên màn hình
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Fourier */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${waveScale})`,
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
                HẠT GIỐNG TIẾN HÓA: SÓNG & TÍN HIỆU TỰ NHIÊN
              </div>
              <KaTeXLabel
                latex="f(t) = \frac{a_0}{2} + \sum_{n=1}^\infty \left( a_n \cos(n\omega t) + b_n \sin(n\omega t) \right)"
                isInline={true}
                fontSize={34}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nhưng một âm thanh hay tín hiệu tự nhiên không phải là lưới tam giác, nó là một chuyển động phức tạp hơn rất nhiều
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
