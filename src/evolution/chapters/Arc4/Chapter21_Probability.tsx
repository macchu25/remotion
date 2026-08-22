import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter21_Probability: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Discrete Probability (2 - 140 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 130, 140], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Gaussian Bell Curve (140 - 290 frames, Sub 2)
  const p2Opacity = interpolate(frame, [140, 155, 275, 290], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const curveDraw = interpolate(frame, [145, 230], [0, 1], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Statistics (290 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [290, 305], [0, 1], { extrapolateRight: "clamp" });
  const statScale = spring({
    frame: frame - 290,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 600;
  const bellPts: string[] = [];
  const maxZ = 3.2 * curveDraw;
  for (let z = -maxZ; z <= maxZ; z += 0.1) {
    const yVal = Math.exp(-0.5 * z * z) * 220;
    bellPts.push(`${ox + z * 140},${oy - yVal}`);
  }
  const bellD = bellPts.length > 0 ? `M ${bellPts.join(" L ")}` : "";

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
      <AtmosphericBackground glowColor="#10B981" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 619], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch18_calculus_newton_leibniz.jpg")}
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
            Chương 21 · Xác Suất
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Hình Học Hóa Sự Bất Định Của Thế Giới
          </div>
        </div>

        {/* Phase 1: Probability Space */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                KHÔNG GIAN MẪU & XÁC SUẤT CỔ ĐIỂN
              </div>
              <KaTeXLabel
                latex="P(E) = \frac{|E|}{|\Omega|} = \frac{\text{Số kết quả thuận lợi}}{\text{Tổng số kết quả}} \in [0, 1]"
                isInline={true}
                fontSize={42}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Định lượng khả năng xảy ra của một biến cố trong một không gian các khả năng
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Unobstructed Normal Bell Curve */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              <line x1={ox - 500} y1={oy} x2={ox + 500} y2={oy} stroke="#475569" strokeWidth={3} />
              <line x1={ox} y1={oy} x2={ox} y2={oy - 260} stroke="#475569" strokeWidth={2} strokeDasharray="6,4" />

              {bellD && (
                <path
                  d={bellD}
                  fill="none"
                  stroke="#10B981"
                  strokeWidth={5}
                  filter="drop-shadow(0 0 16px rgba(16, 185, 129, 0.8))"
                />
              )}
            </svg>

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                PHÂN PHỐI CHUẨN GAUSS:
              </span>
              <KaTeXLabel
                latex="f(x) = \frac{1}{\sigma \sqrt{2\pi}} e^{-\frac{1}{2}\left(\frac{x-\mu}{\sigma}\right)^2}"
                isInline={true}
                fontSize={28}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Statistics */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${statScale})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: ĐẠI DƯƠNG DỮ LIỆU & THỐNG KÊ
              </div>
              <KaTeXLabel
                latex="\mu = \frac{1}{N}\sum_{i=1}^N x_i, \quad \sigma = \sqrt{\frac{1}{N}\sum_{i=1}^N (x_i - \mu)^2}"
                isInline={true}
                fontSize={42}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Làm thế nào từ những mẫu nhỏ lẻ ta có thể nhìn thấu bản chất của cả một quần thể rộng lớn?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
