import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter17_ComplexNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 & 2: Complex Plane (Real + Imaginary Axes) (2 - 352 frames)
  const p1_2Opacity = interpolate(frame, [0, 10, 335, 352], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const axisUnfold = spring({
    frame: frame - 20,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 100 },
  });

  const rotAngle = interpolate(frame, [190, 330], [0, Math.PI * 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Bridge to Calculus of Motion (352 - 502 frames, Sub 3)
  const p3Opacity = interpolate(frame, [352, 365], [0, 1], { extrapolateRight: "clamp" });
  const calcScale = spring({
    frame: frame - 352,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 480;
  const r = 160;

  const px = ox + Math.cos(rotAngle) * r;
  const py = oy - Math.sin(rotAngle) * r;

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
      <AtmosphericBackground glowColor="#818CF8" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 544], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
        <MathematicianBadge
          name="Leonhard Euler"
          years="1707 – 1783"
          contribution="Đẳng thức Euler & Mặt phẳng Phức"
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
            Chương 17 · Số Phức
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Mặt Phẳng Phức & Phép Quay Kỳ Diệu
          </div>
        </div>

        {/* Phase 1 & 2: Complex Plane Geometry */}
        {p1_2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1_2Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              {/* Real Axis */}
              <line x1={480} y1={oy} x2={1440} y2={oy} stroke="#64748B" strokeWidth={3} />
              <text x={1455} y={oy + 6} fill="#38BDF8" fontSize={20} fontFamily="'Fira Code', monospace">Re (Thực)</text>

              {/* Imaginary Axis */}
              <line
                x1={ox}
                y1={oy + 240 * axisUnfold}
                x2={ox}
                y2={oy - 240 * axisUnfold}
                stroke="#818CF8"
                strokeWidth={3}
              />
              {axisUnfold > 0.5 && (
                <text x={ox} y={oy - 255} fill="#818CF8" fontSize={20} fontFamily="'Fira Code', monospace" textAnchor="middle">
                  Im (Ảo: i)
                </text>
              )}

              {/* Orbit Circle */}
              <circle cx={ox} cy={oy} r={r} stroke="rgba(129, 140, 248, 0.3)" strokeWidth={2} strokeDasharray="6,4" fill="none" />

              {/* Rotating Complex Vector */}
              <line x1={ox} y1={oy} x2={px} y2={py} stroke="#F59E0B" strokeWidth={4} />
              <circle cx={px} cy={py} r={10} fill="#F59E0B" filter="drop-shadow(0 0 12px rgba(245, 158, 11, 0.9))" />
            </svg>

            {/* Labels at key coordinates */}
            <KaTeXLabel latex="1" x={ox + r + 30} y={oy} fontSize={28} color="#38BDF8" delay={10} />
            <KaTeXLabel latex="i" x={ox} y={oy - r - 30} fontSize={32} color="#818CF8" delay={30} />
            <KaTeXLabel latex="-1" x={ox - r - 40} y={oy} fontSize={28} color="#38BDF8" delay={50} />
            <KaTeXLabel latex="-i" x={ox} y={oy + r + 30} fontSize={32} color="#818CF8" delay={70} />

            {/* Euler Formula Badge at Bottom (y = 750) - Safely away from title */}
            {frame >= 180 && (
              <div
                style={{
                  position: "absolute",
                  left: 960,
                  top: 740,
                  transform: "translateX(-50%)",
                  padding: "12px 36px",
                  borderRadius: 20,
                  backgroundColor: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 0 25px rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <span style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                  ĐẲNG THỨC EULER:
                </span>
                <KaTeXLabel latex="e^{i\pi} + 1 = 0" isInline={true} fontSize={32} color="#F8FAFC" scaleIn={false} />
              </div>
            )}
          </div>
        )}

        {/* Phase 3: Bridge to Calculus of Motion */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${calcScale})`,
                width: 1100,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 48px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: VI TÍCH PHÂN & CHUYỂN ĐỘNG
              </div>
              <KaTeXLabel
                latex="\frac{dy}{dx} = \lim_{\Delta x \to 0} \frac{f(x+\Delta x) - f(x)}{\Delta x}"
                isInline={true}
                fontSize={46}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Biết một vật đang ở đâu vẫn chưa cho ta biết nó đang thay đổi nhanh đến mức nào
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
