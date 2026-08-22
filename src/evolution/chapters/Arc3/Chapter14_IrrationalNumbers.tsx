import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter14_IrrationalNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Unit Square Diagonal (2 - 193 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 175, 193], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const squareDraw = interpolate(frame, [10, 60], [0, 1], { extrapolateRight: "clamp" });
  const diagDraw = interpolate(frame, [50, 110], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: Endless decimal stream on number line (193 - 349 frames, Sub 2)
  const p2Opacity = interpolate(frame, [193, 205, 335, 349], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const streamOffset = (frame - 193) * 3;

  // Phase 3: Bridge to Infinite Horizon (349 - 517 frames, Sub 3)
  const p3Opacity = interpolate(frame, [349, 365], [0, 1], { extrapolateRight: "clamp" });
  const infScale = spring({
    frame: frame - 349,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 960;
  const oy = 480;
  const sqSize = 220;

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
      <AtmosphericBackground glowColor="#EF4444" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 559], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch08_pythagorean_mosaic.jpg")}
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
            Chương 14 · Số Vô Tỉ
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Đại Lượng Không Thể Đo Đạc Bằng Phân Số
          </div>
        </div>

        {/* Phase 1: Unit Square & Diagonal Slicing */}
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
              {/* Square */}
              <rect
                x={ox - sqSize / 2}
                y={oy - sqSize / 2}
                width={sqSize * squareDraw}
                height={sqSize * squareDraw}
                stroke="#38BDF8"
                strokeWidth={3}
                fill="rgba(56, 189, 248, 0.08)"
              />

              {/* Diagonal Line */}
              {diagDraw > 0 && (
                <line
                  x1={ox - sqSize / 2}
                  y1={oy + sqSize / 2}
                  x2={(ox - sqSize / 2) + sqSize * diagDraw}
                  y2={(oy + sqSize / 2) - sqSize * diagDraw}
                  stroke="#EF4444"
                  strokeWidth={5}
                  filter="drop-shadow(0 0 12px rgba(239, 68, 68, 0.9))"
                />
              )}

              {/* Side Labels */}
              <text x={ox} y={oy + sqSize / 2 + 35} fill="#94A3B8" fontSize={22} fontFamily="'Fira Code', monospace" textAnchor="middle">1</text>
              <text x={ox - sqSize / 2 - 35} y={oy + 6} fill="#94A3B8" fontSize={22} fontFamily="'Fira Code', monospace" textAnchor="middle">1</text>
            </svg>

            <KaTeXLabel
              latex="\sqrt{2} \neq \frac{p}{q} \quad (\text{Bất khả đo đạc bằng phân số})"
              x={960}
              y={720}
              fontSize={46}
              color="#EF4444"
              delay={70}
            />
          </div>
        )}

        {/* Phase 2: Beautiful Flowing Decimal Ribbon */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: 1300,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  padding: "24px 36px",
                  borderRadius: 20,
                  backgroundColor: "rgba(15, 23, 42, 0.75)",
                  border: "1.5px solid rgba(16, 185, 129, 0.4)",
                  boxShadow: "0 0 35px rgba(16, 185, 129, 0.2)",
                  marginBottom: 30,
                  overflow: "hidden",
                }}
              >
                <div style={{ color: "#10B981", fontSize: 20, fontWeight: 700, letterSpacing: 3, marginBottom: 12 }}>
                  DÃY SỐ THẬP PHÂN BẤT TẬN KHÔNG TUẦN HOÀN
                </div>
                <div
                  style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 32,
                    color: "#F8FAFC",
                    letterSpacing: 2,
                    whiteSpace: "nowrap",
                    transform: `translateX(-${streamOffset % 300}px)`,
                  }}
                >
                  √2 = 1.41421356237309504880168872420969807856967187537694807317667973799...
                </div>
              </div>

              {/* Constants comparison grid */}
              <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
                <div style={{ padding: "16px 28px", borderRadius: 16, backgroundColor: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(245, 158, 11, 0.3)" }}>
                  <KaTeXLabel latex="\pi = 3.14159265..." isInline={true} fontSize={32} color="#F59E0B" scaleIn={false} />
                </div>
                <div style={{ padding: "16px 28px", borderRadius: 16, backgroundColor: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(129, 140, 248, 0.3)" }}>
                  <KaTeXLabel latex="e = 2.71828182..." isInline={true} fontSize={32} color="#818CF8" scaleIn={false} />
                </div>
                <div style={{ padding: "16px 28px", borderRadius: 16, backgroundColor: "rgba(15, 23, 42, 0.6)", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
                  <KaTeXLabel latex="\phi = 1.61803398..." isInline={true} fontSize={32} color="#38BDF8" scaleIn={false} />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Infinity */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${infScale})`,
                textAlign: "center",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 24, letterSpacing: 4, marginBottom: 15, fontWeight: 700 }}>
                HẠT GIỐNG TIẾN HÓA: CHÂN TRỜI VÔ HẠN
              </div>
              <KaTeXLabel latex="\infty" isInline={true} fontSize={140} color="#38BDF8" scaleIn={false} />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 15 }}>
                Không phải một con số để dừng lại, mà là một quá trình vô tận
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
