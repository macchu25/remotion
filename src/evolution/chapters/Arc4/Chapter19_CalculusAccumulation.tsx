import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter19_CalculusAccumulation: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Riemann Rectangles Subdivision (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const numRects = Math.floor(interpolate(frame, [10, 120], [4, 36], { extrapolateRight: "clamp" }));

  // Phase 2: Fundamental Theorem of Calculus (150 - 320 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 305, 320], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Differential Equations (320 - 480 frames, Sub 3)
  const p3Opacity = interpolate(frame, [320, 335], [0, 1], { extrapolateRight: "clamp" });
  const deScale = spring({
    frame: frame - 320,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 580;
  const oy = 640;
  const graphW = 760;
  const graphH = 320;

  // Generate Riemann Rectangles
  const rects: { x: number; y: number; w: number; h: number }[] = [];
  const dx = graphW / numRects;
  for (let i = 0; i < numRects; i++) {
    const xNorm = (i + 0.5) / numRects;
    const yNorm = Math.sin(xNorm * Math.PI * 0.8) * 0.8 + 0.15;
    rects.push({
      x: ox + i * dx,
      y: oy - yNorm * graphH,
      w: dx - 1.5,
      h: yNorm * graphH,
    });
  }

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
      <AtmosphericBackground glowColor="#10B981" particleCount={20} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 666], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
        <MathematicianBadge
          name="Gottfried Leibniz"
          years="1646 – 1716"
          contribution="Phép tính Tích phân & Ký hiệu ∫"
          color="#10B981"
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
            Chương 19 · Tích Phân & Tích Lũy
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Diện Tích Dưới Đường Cong & Định Lý Cơ Bản
          </div>
        </div>

        {/* Phase 1: Riemann Integration Grid */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              <line x1={ox - 40} y1={oy} x2={ox + graphW + 60} y2={oy} stroke="#475569" strokeWidth={3} />
              <line x1={ox} y1={oy + 20} x2={ox} y2={oy - graphH - 40} stroke="#475569" strokeWidth={3} />

              {/* Dynamic Riemann Rectangles */}
              {rects.map((r, i) => (
                <rect
                  key={i}
                  x={r.x}
                  y={r.y}
                  width={r.w}
                  height={r.h}
                  fill="rgba(56, 189, 248, 0.4)"
                  stroke="#38BDF8"
                  strokeWidth={1}
                />
              ))}
            </svg>

            {/* Sleek Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#38BDF8", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                TỔNG RIEMANN ({numRects} CỘT):
              </span>
              <KaTeXLabel
                latex="\int_a^b f(x) \, dx = \lim_{n \to \infty} \sum_{i=1}^n f(x_i) \Delta x"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 2: Fundamental Theorem of Calculus */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: 1200,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 48px",
                borderRadius: 24,
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                ĐỊNH LÝ CƠ BẢN CỦA GIẢI TÍCH (NEWTON & LEIBNIZ)
              </div>
              <KaTeXLabel
                latex="\frac{d}{dx} \left( \int_a^x f(t) \, dt \right) = f(x) \iff \int_a^b f'(x) \, dx = f(b) - f(a)"
                isInline={true}
                fontSize={42}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Vi phân và Tích phân là hai phép toán đảo ngược của nhau — gắn kết biến thiên và diện tích
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Differential Equations */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${deScale})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: PHƯƠNG TRÌNH VI PHÂN
              </div>
              <KaTeXLabel
                latex="F = m \cdot a \implies F = m \frac{d^2 x}{dt^2}"
                isInline={true}
                fontSize={48}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Kết hợp biến thiên và tích lũy vào một phương trình để dự đoán toàn bộ quy luật tự nhiên
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
