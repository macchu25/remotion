import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter38_Optimization: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const gradScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const nnScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#F59E0B" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 585], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
          <div style={{ color: "#F59E0B", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 38 · TỐI ƯU HÓA & HẠ GRADIENT
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Hành Trình Tìm Kiếm Trạng Thái Hoàn Hảo Trong Không Gian Đa Chiều
          </div>
        </div>

        {/* Phase 1: Gradient Descent Update */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${gradScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                PHƯƠNG PHÁP HẠ GRADIENT (GRADIENT DESCENT)
              </div>
              <KaTeXLabel
                latex="\theta_{t+1} = \theta_t - \eta \, \nabla_\theta \mathcal{L}(\theta_t), \quad \nabla \mathcal{L} = \left( \frac{\partial \mathcal{L}}{\partial \theta_1}, \dots, \frac{\partial \mathcal{L}}{\partial \theta_n} \right)"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Thuật toán tối ưu hóa biến mọi bài toán thành một địa hình đồi núi của hàm mất mát
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Loss Landscape Descent */}
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
                LẦN THEO ĐỘ DỐC XUỐNG ĐÁY THUNG LŨNG MẤT MÁT
              </div>
              <KaTeXLabel
                latex="\min_{\theta} \mathcal{L}(\theta) \implies \nabla_\theta \mathcal{L}(\theta^*) \approx \mathbf{0} \quad (\text{Hội tụ tối ưu})"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Phương pháp hạ gradient lần theo độ dốc âm của đạo hàm, kiên nhẫn dẫn lối tham số xuống đáy thung lũng sâu nhất
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Neural Networks */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${nnScale})`,
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(168, 85, 247, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#A855F7", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: MẠNG NƠ-RON NHÂN TẠO
              </div>
              <KaTeXLabel
                latex="\mathbf{a}^{(l)} = \sigma\left( \mathbf{W}^{(l)} \mathbf{a}^{(l-1)} + \mathbf{b}^{(l)} \right) \quad (\text{Hàng tỷ trọng số})"
                isInline={true}
                fontSize={34}
                color="#A855F7"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu những tham số đó thuộc về một hệ thống có hàng tỷ kết nối chéo nhau, điều kỳ diệu gì sẽ xảy ra?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
