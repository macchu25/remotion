import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter26_ComplexitySearch: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Complexity Curves Growth (2 - 140 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 130, 140], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const curveGrow = interpolate(frame, [15, 110], [0, 1], { extrapolateRight: "clamp" });

  // Phase 2: P vs NP Millennium Prize Problem (140 - 280 frames, Sub 2)
  const p2Opacity = interpolate(frame, [140, 155, 268, 280], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Binary (280 - 420 frames, Sub 3)
  const p3Opacity = interpolate(frame, [280, 295], [0, 1], { extrapolateRight: "clamp" });
  const bitScale = spring({
    frame: frame - 280,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const ox = 700;
  const oy = 640;
  const maxW = 560;

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
      <AtmosphericBackground glowColor="#EF4444" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 597], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch24_kurt_godel.jpg")}
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
            Chương 26 · Độ Phức Tạp & Tìm Kiếm
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Bức Tường Khả Thi & Bài Toán P vs NP
          </div>
        </div>

        {/* Phase 1: Complexity Growth Graph Unobstructed */}
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
              {/* Axes */}
              <line x1={ox - 40} y1={oy} x2={ox + maxW + 50} y2={oy} stroke="#475569" strokeWidth={3} />
              <line x1={ox} y1={oy + 20} x2={ox} y2={oy - 380} stroke="#475569" strokeWidth={3} />
              <text x={ox + maxW + 60} y={oy + 6} fill="#94A3B8" fontSize={20} fontFamily="'Fira Code', monospace">n</text>
              <text x={ox} y={oy - 395} fill="#94A3B8" fontSize={20} fontFamily="'Fira Code', monospace" textAnchor="middle">t</text>

              {/* O(1) Constant line */}
              <line x1={ox} y1={oy - 30} x2={ox + maxW * curveGrow} y2={oy - 30} stroke="#38BDF8" strokeWidth={3} />
              <text x={ox + maxW + 10} y={oy - 25} fill="#38BDF8" fontSize={18} fontWeight={700}>O(1)</text>

              {/* O(n) Linear line */}
              <line x1={ox} y1={oy} x2={ox + maxW * curveGrow} y2={oy - (maxW * 0.45) * curveGrow} stroke="#10B981" strokeWidth={3} />
              <text x={ox + maxW + 10} y={oy - maxW * 0.45} fill="#10B981" fontSize={18} fontWeight={700}>O(n)</text>

              {/* O(2^n) Exponential Curve */}
              {curveGrow > 0.1 && (
                <path
                  d={`M ${ox},${oy} Q ${ox + maxW * 0.4 * curveGrow},${oy - 20} ${ox + maxW * 0.7 * curveGrow},${oy - 360}`}
                  fill="none"
                  stroke="#EF4444"
                  strokeWidth={4}
                  filter="drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))"
                />
              )}
              <text x={ox + maxW * 0.7 + 10} y={oy - 360} fill="#EF4444" fontSize={20} fontWeight={700}>O(2ⁿ) Bùng nổ!</text>
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
                KÝ HIỆU BIG-O:
              </span>
              <KaTeXLabel
                latex="O(1) \ll O(\log n) \ll O(n) \ll O(2^n)"
                isInline={true}
                fontSize={26}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 2: P vs NP */}
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
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#EF4444", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                BÀI TOÁN THIÊN NIÊN KỶ: P SO VỚI NP
              </div>
              <KaTeXLabel
                latex="\text{P} \subseteq \text{NP} \quad (\text{Đa thức } O(n^k) \text{ vs Hàm mũ } O(2^n))"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Liệu việc kiểm chứng một lời giải có dễ dàng như việc tự mình khám phá ra nó?
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Binary */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${bitScale})`,
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
              <div style={{ color: "#10B981", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: HỆ NHỊ PHÂN
              </div>
              <KaTeXLabel
                latex="\{0, 1\} \implies 2^n \text{ Trạng thái mã hóa}"
                isInline={true}
                fontSize={38}
                color="#10B981"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Để hiện thực hóa những cỗ máy thuật toán khổng lồ này, bảng chữ cái vật lý tối thiểu cần có là gì?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
