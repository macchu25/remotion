import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter27_Binary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Powers of Two (2 - 130 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 120, 130], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Binary Decomposition (130 - 260 frames, Sub 2)
  const p2Opacity = interpolate(frame, [130, 145, 248, 260], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Boolean Gates (260 - 390 frames, Sub 3)
  const p3Opacity = interpolate(frame, [260, 275], [0, 1], { extrapolateRight: "clamp" });
  const gateScale = spring({
    frame: frame - 260,
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
      <AtmosphericBackground glowColor="#38BDF8" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 573], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
            Chương 27 · Hệ Nhị Phân
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Mọi Thông Tin Rút Gọn Về Hai Trạng Thái
          </div>
        </div>

        {/* Phase 1: Powers of Two */}
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
                LŨY THỪA CỦA HAI (POWERS OF TWO)
              </div>
              <KaTeXLabel
                latex="2^4 = 16, \quad 2^3 = 8, \quad 2^2 = 4, \quad 2^1 = 2, \quad 2^0 = 1"
                isInline={true}
                fontSize={38}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mọi con số, ký tự và hình ảnh phức tạp nhất đều có thể biểu diễn qua hai trạng thái: Không và Một
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Binary Decomposition */}
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
                MÃ HÓA SỐ TỰ NHIÊN BẰNG CÁC BIT
              </div>
              <KaTeXLabel
                latex="13_{10} = 1101_2 = (1 \times 8) + (1 \times 4) + (0 \times 2) + (1 \times 1)"
                isInline={true}
                fontSize={34}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Hệ nhị phân khai thác lũy thừa của hai, mã hóa cả thế giới thành các chuỗi bit thanh thoát
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Boolean Gates */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${gateScale})`,
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
                HẠT GIỐNG TIẾN HÓA: CÁC CỔNG LOGIC
              </div>
              <KaTeXLabel
                latex="\text{AND} \; (\land), \quad \text{OR} \; (\lor), \quad \text{XOR} \; (\oplus), \quad \text{NOT} \; (\neg)"
                isInline={true}
                fontSize={36}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Làm thế nào để hai con số 0 và 1 có thể tự mình thực hiện các phép tính số học phức tạp?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
