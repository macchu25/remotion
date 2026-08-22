import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter18_CalculusMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 210 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 150, 210], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 210], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1 & 2: Secant to Tangent (2 - 320 frames)
  const p1_2Opacity = interpolate(frame, [0, 10, 305, 320], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const deltaT = interpolate(frame, [20, 160], [1.5, 0.02], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Integral (320 - 480 frames, Sub 3)
  const p3Opacity = interpolate(frame, [320, 335], [0, 1], { extrapolateRight: "clamp" });
  const intScale = spring({
    frame: frame - 320,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 600;
  const oy = 620;
  const scaleX = 160;
  const scaleY = 70;

  const t0 = 1.8;
  const t1 = t0 + deltaT;
  const y0 = 0.5 * t0 * t0;
  const y1 = 0.5 * t1 * t1;

  const pt0 = { x: ox + t0 * scaleX, y: oy - y0 * scaleY };
  const pt1 = { x: ox + t1 * scaleX, y: oy - y1 * scaleY };

  const curvePts: string[] = [];
  for (let t = 0; t <= 4.2; t += 0.1) {
    curvePts.push(`${ox + t * scaleX},${oy - 0.5 * t * t * scaleY}`);
  }

  const slope = (pt1.y - pt0.y) / (pt1.x - pt0.x || 0.001);

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
      {/* Newton & Leibniz Calculus Origin Background */}
      {imgOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            filter: "brightness(0.85) contrast(1.1)",
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
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.35) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <AtmosphericBackground glowColor="#38BDF8" particleCount={20} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Sir Isaac Newton"
          years="1643 – 1727"
          contribution="Giải tích Vi phân & Cơ học Cổ điển"
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
            Chương 18 · Vi Phân Của Chuyển Động
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Độ Dốc Tiếp Tuyến & Vận Tốc Tức Thời
          </div>
        </div>

        {/* Phase 1 & 2: Dynamic Geometry completely unobstructed */}
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
              {/* Axes */}
              <line x1={ox - 50} y1={oy} x2={ox + 780} y2={oy} stroke="#475569" strokeWidth={3} />
              <line x1={ox} y1={oy + 30} x2={ox} y2={oy - 420} stroke="#475569" strokeWidth={3} />
              <text x={ox + 790} y={oy + 6} fill="#94A3B8" fontSize={20} fontFamily="'Fira Code', monospace">t</text>
              <text x={ox} y={oy - 435} fill="#94A3B8" fontSize={20} fontFamily="'Fira Code', monospace" textAnchor="middle">s(t)</text>

              {/* Parabola Curve */}
              <path d={`M ${curvePts.join(" L ")}`} fill="none" stroke="#38BDF8" strokeWidth={4} />

              {/* Tangent Line */}
              <line
                x1={pt0.x - 220}
                y1={pt0.y + 220 * slope}
                x2={pt0.x + 360}
                y2={pt0.y - 360 * slope}
                stroke={deltaT < 0.05 ? "#10B981" : "#F59E0B"}
                strokeWidth={4}
                filter={`drop-shadow(0 0 10px ${deltaT < 0.05 ? "rgba(16, 185, 129, 0.8)" : "rgba(245, 158, 11, 0.8)"})`}
              />

              {/* Point A */}
              <circle cx={pt0.x} cy={pt0.y} r={9} fill="#38BDF8" />
              <text x={pt0.x - 25} y={pt0.y - 15} fill="#38BDF8" fontSize={22} fontWeight={700}>A</text>

              {/* Point B */}
              <circle cx={pt1.x} cy={pt1.y} r={9} fill="#EF4444" />
              <text x={pt1.x + 15} y={pt1.y - 15} fill="#EF4444" fontSize={22} fontWeight={700}>B</text>
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
                border: `1px solid ${deltaT < 0.05 ? "rgba(16, 185, 129, 0.4)" : "rgba(56, 189, 248, 0.4)"}`,
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: deltaT < 0.05 ? "#10B981" : "#38BDF8", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                {deltaT < 0.05 ? "ĐẠO HÀM TỨC THỜI:" : "VẬN TỐC TRUNG BÌNH:"}
              </span>
              <KaTeXLabel
                latex={
                  deltaT < 0.05
                    ? "v(t) = s'(t) = \\lim_{\\Delta t \\to 0} \\frac{\\Delta s}{\\Delta t} = \\frac{ds}{dt}"
                    : "v_{\\text{tb}} = \\frac{\\Delta s}{\\Delta t}"
                }
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Integral */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${intScale})`,
                width: 1240,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: TÍCH LŨY TOÀN BỘ CHUYỂN ĐỘNG
              </div>
              <KaTeXLabel
                latex="\int_a^b v(t) \, dt = s(b) - s(a) \quad (\text{Tích phân diện tích})"
                isInline={true}
                fontSize={46}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Biết vận tốc ở mọi khoảnh khắc, làm sao cộng dồn vô số lát cắt cực nhỏ để tái hiện toàn bộ hành trình?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
