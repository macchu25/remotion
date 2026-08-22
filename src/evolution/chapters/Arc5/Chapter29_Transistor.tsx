import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter29_Transistor: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Semiconductor Switch (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Nanoscale Density (150 - 300 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 285, 300], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to CPU Architecture (300 - 450 frames, Sub 3)
  const p3Opacity = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: "clamp" });
  const cpuScale = spring({
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
          transform: `scale(${interpolate(frame, [0, 655], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
            top: 50,
            left: 960,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
            Chương 29 · Bóng Bán Dẫn Transistor
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Công Tắc Vật Lý Thực Thi Tư Duy
          </div>
        </div>

        {/* Phase 1: Semiconductor Switch */}
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
                BÓNG BÁN DẪN SILICON (MOSFET)
              </div>
              <KaTeXLabel
                latex="V_{\text{Gate}} > V_{\text{th}} \implies \text{Dòng thông (1)}, \quad V_{\text{Gate}} = 0 \implies \text{Ngắt (0)}"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Điều khiển dòng điện chạy qua bằng điện áp, trở thành chiếc công tắc siêu nhỏ đóng mở trạng thái
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Nanoscale Density */}
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
                KÍCH THƯỚC NANOMET & ĐỊNH LUẬT MOORE
              </div>
              <KaTeXLabel
                latex="\text{Mật độ bóng bán dẫn} \approx 10^{11} \, \text{transistor} / \text{chip}"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Công nghệ nano thu nhỏ hàng tỷ bóng bán dẫn xuống kích thước phân tử, tạo nên bước nhảy vọt thần kỳ
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to CPU Architecture */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${cpuScale})`,
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
                HẠT GIỐNG TIẾN HÓA: KIẾN TRÚC VI XỬ LÝ
              </div>
              <KaTeXLabel
                latex="\text{CPU} = \text{Control Unit} + \text{ALU} + \text{Registers} + \text{Clock}"
                isInline={true}
                fontSize={36}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Làm thế nào để hàng tỷ công tắc nano này phối hợp nhịp nhàng thành một bộ não điện tử hoàn chỉnh?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
