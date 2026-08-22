import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter39_NeuralNetworks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const neuronScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const embedScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#8B5CF6" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 631], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
          <div style={{ color: "#8B5CF6", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 39 · MẠNG NƠ-RON NHÂN TẠO
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Hệ Thống Tham Số Học Hỏi Mẫu Hình Tri Thức
          </div>
        </div>

        {/* Phase 1: Artificial Neuron */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${neuronScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(139, 92, 246, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#8B5CF6", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                NƠ-RON NHÂN TẠO & HÀM KÍCH HOẠT (ACTIVATION)
              </div>
              <KaTeXLabel
                latex="a = \sigma\left( \sum_{i=1}^n w_i x_i + b \right) = \frac{1}{1 + e^{-(\mathbf{w}^T \mathbf{x} + b)}}"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mỗi nơ-ron nhân tạo nhận tín hiệu, nhân với trọng số, cộng lại và kích hoạt theo phi tuyến tính
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Backpropagation */}
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
                LAN TRUYỀN NGƯỢC SAI SỐ (BACKPROPAGATION)
              </div>
              <KaTeXLabel
                latex="\frac{\partial \mathcal{L}}{\partial \mathbf{W}^{(l)}} = \delta^{(l)} \left(\mathbf{a}^{(l-1)}\right)^T, \quad \delta^{(l)} = \left(\mathbf{W}^{(l+1)}\right)^T \delta^{(l+1)} \odot \sigma'(\mathbf{z}^{(l)})"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Thuật toán lan truyền ngược đưa sai số chảy ngược dòng mạng, tự động tinh chỉnh hàng tỷ trọng số để học hỏi tri thức
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Representation */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${embedScale})`,
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
                HẠT GIỐNG TIẾN HÓA: KHÔNG GIAN BIỂU DIỄN & VECTOR
              </div>
              <KaTeXLabel
                latex="\text{Token} \xrightarrow{\mathbf{E}} \vec{v} \in \mathbb{R}^d, \quad \text{Attention}(Q, K, V) = \text{softmax}\left(\frac{QK^T}{\sqrt{d_k}}\right)V"
                isInline={true}
                fontSize={28}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Để trí tuệ nhân tạo hiểu được ngôn ngữ và thế giới, làm thế nào để biến ý niệm thành không gian toán học?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
