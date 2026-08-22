import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter37_InformationTheory: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const entScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const optScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#38BDF8" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 669], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
          contribution="Lý thuyết Thông tin & Giới hạn Kênh truyền"
          color="#38BDF8"
          delay={15}
        />

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
            CHƯƠNG 37 · LÝ THUYẾT THÔNG TIN & MÃ SỬA LỖI
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Entropy, Nén Dữ Liệu & Hồi Sinh Tín Hiệu
          </div>
        </div>

        {/* Phase 1: Shannon Entropy */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${entScale})`,
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
                ENTROPY THÔNG TIN SHANNON
              </div>
              <KaTeXLabel
                latex="H(X) = -\sum_{i=1}^n P(x_i) \log_2 P(x_i) \quad (\text{Lượng tin tối thiểu / Bit})"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Claude Shannon định nghĩa entropy để đo lường lượng tin và giới hạn nén tối đa của mọi kênh truyền
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Error Correcting Codes */}
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
                MÃ SỬA LỖI TỰ ĐỘNG (HAMMING / REED-SOLOMON)
              </div>
              <KaTeXLabel
                latex="\mathbf{H} \cdot \vec{y}^T = \vec{s} \implies \text{Hội chứng Syndrom định vị và đảo bit lỗi}"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mã sửa lỗi chèn thêm các cấu trúc dự phòng thông minh, giúp thông tin tự hồi sinh nguyên vẹn dù bị nhiễu loạn tấn công
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Optimization */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${optScale})`,
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
                HẠT GIỐNG TIẾN HÓA: TỐI ƯU HÓA & HỌC MÁY
              </div>
              <KaTeXLabel
                latex="\mathbf{w}^* = \arg\min_{\mathbf{w}} \mathcal{L}(\mathbf{w}) \implies \text{Đi tìm trạng thái hoàn hảo}"
                isInline={true}
                fontSize={36}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Khi đứng trước hàng triệu sự lựa chọn và trạng thái khác nhau, làm thế nào để thuật toán tìm ra trạng thái tốt nhất?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
