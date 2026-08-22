import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter13_TrigonometryWaves: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1 & 2: Unit Circle to Projected Sine Wave (2 - 345 frames)
  const angle = (frame * 0.08) % (Math.PI * 8);
  const circleR = 85;
  const circleX = 420;
  const circleY = 480;

  const pointX = circleX + Math.cos(angle) * circleR;
  const pointY = circleY - Math.sin(angle) * circleR;

  // Phase 3: Bridge to Square Diagonal (345 - 482 frames, Sub 3)
  const p3Opacity = interpolate(frame, [345, 360], [0, 1], { extrapolateRight: "clamp" });
  const squareBridge = spring({
    frame: frame - 345,
    fps,
    config: { damping: 15, mass: 0.8, stiffness: 120 },
  });

  const wavePoints: string[] = [];
  const waveStartX = 620;
  const waveLength = 880;
  for (let x = 0; x <= waveLength; x += 8) {
    const currentAngle = angle - (x / waveLength) * (Math.PI * 4);
    const y = circleY - Math.sin(currentAngle) * circleR;
    wavePoints.push(`${waveStartX + x},${y}`);
  }
  const sineD = `M ${wavePoints.join(" L ")}`;

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
          transform: `scale(${interpolate(frame, [0, 524], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch05_cosmic_observatory.jpg")}
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
            Chương 13 · Lượng Giác & Sóng
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Chuyển Động Tròn Sinh Ra Sóng Hình Sin
          </div>
        </div>

        {/* Phase 1 & 2: Rotating Circle & Projected Sine Wave */}
        {p3Opacity < 0.9 && (
          <div style={{ position: "absolute", inset: 0, opacity: 1 - p3Opacity }}>
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: 1920,
                height: 1080,
                pointerEvents: "none",
              }}
            >
              <circle cx={circleX} cy={circleY} r={circleR} stroke="#475569" strokeWidth={3} fill="none" />
              <line x1={circleX - circleR - 20} y1={circleY} x2={circleX + circleR + 20} y2={circleY} stroke="#334155" strokeWidth={2} />
              <line x1={circleX} y1={circleY - circleR - 20} x2={circleX} y2={circleY + circleR + 20} stroke="#334155" strokeWidth={2} />

              <line x1={circleX} y1={circleY} x2={pointX} y2={pointY} stroke="#F59E0B" strokeWidth={4} />
              <circle cx={pointX} cy={pointY} r={8} fill="#F59E0B" filter="drop-shadow(0 0 10px rgba(245, 158, 11, 0.8))" />

              <line
                x1={pointX}
                y1={pointY}
                x2={waveStartX}
                y2={pointY}
                stroke="rgba(245, 158, 11, 0.6)"
                strokeWidth={2}
                strokeDasharray="6,4"
              />

              <path
                d={sineD}
                fill="none"
                stroke="#38BDF8"
                strokeWidth={5}
                filter="drop-shadow(0 0 15px rgba(56, 189, 248, 0.7))"
              />
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
                border: "1px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#38BDF8", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                SÓNG HÌNH SIN (SINE WAVE):
              </span>
              <KaTeXLabel
                latex="y(t) = A \sin(\omega t + \phi)"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Unit Square & Diagonal */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 450,
                transform: `translate(-50%, -50%) scale(${squareBridge})`,
              }}
            >
              <svg width={220} height={220} style={{ overflow: "visible" }}>
                <rect x={20} y={20} width={180} height={180} stroke="#38BDF8" strokeWidth={4} fill="rgba(56, 189, 248, 0.1)" />
                <line x1={20} y1={200} x2={200} y2={20} stroke="#EF4444" strokeWidth={5} />
                <text x={110} y={230} fill="#94A3B8" fontSize={22} textAnchor="middle">1</text>
                <text x={0} y={115} fill="#94A3B8" fontSize={22} textAnchor="middle">1</text>
              </svg>
            </div>

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
                border: "1px solid rgba(239, 68, 68, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#EF4444", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                HẠT GIỐNG TIẾN HÓA:
              </span>
              <KaTeXLabel
                latex="d = \sqrt{1^2 + 1^2} = \sqrt{2} = 1.41421356..."
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
