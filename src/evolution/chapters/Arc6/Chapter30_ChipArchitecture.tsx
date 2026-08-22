import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter30_ChipArchitecture: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: CPU Architecture (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Clock Cycle (150 - 300 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 285, 300], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Data & Matrices (300 - 450 frames, Sub 3)
  const p3Opacity = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: "clamp" });
  const matScale = spring({
    frame: frame - 300,
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
      <AtmosphericBackground glowColor="#38BDF8" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 658], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
          name="John von Neumann"
          years="1903 – 1957"
          contribution="Kiến trúc Máy tính & Chu kỳ Lệnh"
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
            Chương 30 · Kiến Trúc Vi Xử Lý
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Hàng Tỷ Cổng Logic Hòa Tấu Nhịp Điệu Xung Nhịp
          </div>
        </div>

        {/* Phase 1: CPU Architecture */}
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
                CHU KỲ LỆNH VI XỬ LÝ VON NEUMANN
              </div>
              <KaTeXLabel
                latex="\text{Fetch (Nạp)} \to \text{Decode (Giải mã)} \to \text{Execute (Thực thi)} \to \text{Writeback (Ghi)}"
                isInline={true}
                fontSize={27}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Tổ chức hàng tỷ bóng bán dẫn thành các khối chức năng: Khối tính toán ALU, các thanh ghi và đường truyền bus
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Clock Frequency */}
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
                XUNG NHỊP ĐỒNG BỘ HÓA (CLOCK FREQUENCY)
              </div>
              <KaTeXLabel
                latex="f_{\text{clock}} = 3.5 \, \text{GHz} = 3.5 \times 10^9 \, \text{chu kỳ / giây}"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Bộ đếm xung nhịp dao động hàng tỷ lần mỗi giây, điều phối dòng chảy thông tin như một dàn nhạc giao hưởng điện tử
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
                transform: `translate(-50%, -50%) scale(${matScale})`,
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
                HẠT GIỐNG TIẾN HÓA: DỮ LIỆU & MA TRẬN
              </div>
              <KaTeXLabel
                latex="\mathbf{Y} = \mathbf{W} \mathbf{X} + \mathbf{b} \quad (\text{Ma trận và Đồ thị})"
                isInline={true}
                fontSize={38}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Khi năng lực tính toán bùng nổ, làm thế nào để máy tính nhìn thấy hình ảnh, âm thanh và không gian đa chiều?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
