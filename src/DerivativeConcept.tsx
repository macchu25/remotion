import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const DerivativeConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Header entrance (Spring)
  const headerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12 },
  });

  // Delta X shrinks from 220 down to 2 as time progresses (Frames 60 to 240)
  const deltaX = interpolate(frame, [60, 240], [220, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Base Point A on the parabola f(x) = x^2 / 300
  const xA = 240;
  const f = (x: number) => (x * x) / 300;
  const yA = f(xA);

  // Moving Point B on the parabola
  const xB = xA + deltaX;
  const yB = f(xB);

  // Calculated Slope m = deltaY / deltaX
  const slope = (yB - yA) / (xB - xA);

  // Subtitle phrases time mapping (100% Vietnamese Karaoke style)
  const subtitles = [
    { start: 0, end: 60, text: "👋 Xin chào các bạn! Hôm nay chúng ta sẽ cùng khám phá BẢN CHẤT CỦA ĐẠO HÀM." },
    { start: 60, end: 130, text: "💡 Đạo hàm chính là TỐC ĐỘ THAY ĐỔI TỨC THỜI của một hàm số." },
    { start: 130, end: 220, text: "📉 Khi khoảng cách Δx tiến dần về 0, Đường Cát Tuyến sẽ trở thành Đường Tiếp Tuyến!" },
    { start: 220, end: 300, text: "✨ Độ dốc (Slope) của đường tiếp tuyến đó chính là ĐẠO HÀM f'(x)." },
  ];

  const currentSubtitle = subtitles.find((s) => frame >= s.start && frame < s.end);

  // Canvas Origin coordinates inside 1920x1080
  const originX = 350;
  const originY = 820;

  // Convert math coords to screen coords (Y is inverted on screen)
  const toScreenX = (x: number) => originX + x;
  const toScreenY = (y: number) => originY - y;

  const screenA = { x: toScreenX(xA), y: toScreenY(yA) };
  const screenB = { x: toScreenX(xB), y: toScreenY(yB) };

  // Calculate tangent line end points for SVG rendering
  const lineLength = 500;
  const tangentDx = lineLength / Math.sqrt(1 + slope * slope);
  const tangentDy = slope * tangentDx;

  const lineP1 = { x: screenA.x - tangentDx, y: screenA.y + tangentDy };
  const lineP2 = { x: screenA.x + tangentDx, y: screenA.y - tangentDy };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #030712 100%)",
        fontFamily: "'Inter', 'Fira Code', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ===== AUDIO TRACKS ===== */}
      <Audio src={staticFile("derivative_masterclass_voice.mp3")} volume={1.0} playbackRate={1.25} />
      <Audio src={staticFile("math_bgm.wav")} volume={0.14} loop />

      {/* ===== HEADER ===== */}
      <div
        style={{
          position: "absolute",
          top: "40px",
          left: "60px",
          opacity: headerSpring,
          transform: `translateY(${(1 - headerSpring) * -30}px)`,
          zIndex: 20,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 20px",
            borderRadius: "9999px",
            background: "rgba(99, 102, 241, 0.2)",
            border: "1px solid rgba(99, 102, 241, 0.4)",
            color: "#818cf8",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "1px",
            marginBottom: "12px",
          }}
        >
          📐 TOÁN HỌC TRỰC QUAN (VISUAL MATHEMATICS)
        </div>
        <div style={{ fontSize: "52px", fontWeight: 900, background: "linear-gradient(90deg, #38bdf8, #818cf8, #c084fc)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          BẢN CHẤT CỦA ĐẠO HÀM (DERIVATIVES)
        </div>
      </div>

      {/* ===== SVG MATH GRAPH CANVAS ===== */}
      <svg
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
        }}
      >
        {/* Grid Lines */}
        {Array.from({ length: 15 }).map((_, i) => (
          <line
            key={`grid-h-${i}`}
            x1="0"
            y1={i * 80}
            x2="1920"
            y2={i * 80}
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
          />
        ))}
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={`grid-v-${i}`}
            x1={i * 80}
            y1="0"
            x2={i * 80}
            y2="1080"
            stroke="rgba(255, 255, 255, 0.04)"
            strokeWidth="1"
          />
        ))}

        {/* Axes */}
        <line x1={originX - 100} y1={originY} x2={originX + 1100} y2={originY} stroke="#475569" strokeWidth="3" />
        <line x1={originX} y1={originY + 100} x2={originX} y2={originY - 650} stroke="#475569" strokeWidth="3" />

        <text x={originX + 1070} y={originY + 40} fill="#94a3b8" fontSize="24" fontWeight="bold">Trục X</text>
        <text x={originX - 60} y={originY - 630} fill="#94a3b8" fontSize="24" fontWeight="bold">Trục Y</text>

        {/* Parabola Curve y = f(x) = x^2 / 300 */}
        <path
          d={`M ${originX} ${originY} Q ${originX + 300} ${originY - 50} ${originX + 700} ${originY - 1633}`}
          fill="none"
          stroke="#38bdf8"
          strokeWidth="5"
          filter="drop-shadow(0 0 12px rgba(56, 189, 248, 0.6))"
        />

        {/* Secant / Tangent Line */}
        <line
          x1={lineP1.x}
          y1={lineP1.y}
          x2={lineP2.x}
          y2={lineP2.y}
          stroke={deltaX < 15 ? "#10b981" : "#ef4444"}
          strokeWidth={deltaX < 15 ? "5" : "3"}
          strokeDasharray={deltaX < 15 ? "0" : "8,8"}
          filter={deltaX < 15 ? "drop-shadow(0 0 15px rgba(16, 185, 129, 0.8))" : "none"}
        />

        {/* Delta X Triangle Helper */}
        {deltaX > 10 && (
          <>
            <line x1={screenA.x} y1={screenB.y} x2={screenB.x} y2={screenB.y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <line x1={screenA.x} y1={screenA.y} x2={screenA.x} y2={screenB.y} stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
            <text x={(screenA.x + screenB.x) / 2 - 20} y={screenB.y + 30} fill="#f59e0b" fontSize="20" fontWeight="bold">Δx = {Math.round(deltaX)}</text>
            <text x={screenA.x - 70} y={(screenA.y + screenB.y) / 2} fill="#f59e0b" fontSize="20" fontWeight="bold">Δy</text>
          </>
        )}

        {/* Point A (Fixed) */}
        <circle cx={screenA.x} cy={screenA.y} r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
        <text x={screenA.x - 40} y={screenA.y + 35} fill="#38bdf8" fontSize="24" fontWeight="bold">A (x₀, f(x₀))</text>

        {/* Point B (Moving as Δx -> 0) */}
        {deltaX > 5 && (
          <>
            <circle cx={screenB.x} cy={screenB.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x={screenB.x + 15} y={screenB.y - 15} fill="#ef4444" fontSize="22" fontWeight="bold">B (x₀+Δx)</text>
          </>
        )}
      </svg>

      {/* ===== REAL-TIME MATH FORMULA CARD ===== */}
      <div
        style={{
          position: "absolute",
          top: "180px",
          right: "60px",
          width: "480px",
          padding: "32px",
          borderRadius: "24px",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
          zIndex: 20,
        }}
      >
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#818cf8", marginBottom: "20px", borderBottom: "1px solid #334155", paddingBottom: "10px" }}>
          📊 THÔNG SỐ TÍNH TOÁN
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>Hàm số f(x):</span>
            <span style={{ color: "#38bdf8", fontWeight: "bold" }}>y = x² / 300</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>Khoảng cách Δx:</span>
            <span style={{ color: deltaX < 15 ? "#10b981" : "#f59e0b", fontWeight: "bold" }}>
              {deltaX.toFixed(1)} {deltaX < 15 ? "(→ 0)" : ""}
            </span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#94a3b8" }}>Đường đang xét:</span>
            <span style={{ color: deltaX < 15 ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
              {deltaX < 15 ? "✅ TIẾP TUYẾN" : "❌ CÁT TUYẾN"}
            </span>
          </div>

          <div
            style={{
              marginTop: "16px",
              padding: "20px",
              borderRadius: "16px",
              background: deltaX < 15 ? "rgba(16, 185, 129, 0.15)" : "rgba(99, 102, 241, 0.15)",
              border: deltaX < 15 ? "1px solid #10b981" : "1px solid #6366f1",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "18px", color: "#cbd5e1", marginBottom: "6px" }}>
              Độ Dốc Tiếp Tuyến (Đạo Hàm):
            </div>
            <div style={{ fontSize: "36px", fontWeight: 900, color: deltaX < 15 ? "#10b981" : "#c084fc" }}>
              f'(x₀) = {slope.toFixed(2)}
            </div>
          </div>
        </div>
      </div>

      {/* ===== VIETNAMESE KARAOKE SUBTITLES (BOTTOM) ===== */}
      <div
        style={{
          position: "absolute",
          bottom: "50px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          maxWidth: "1400px",
          padding: "20px 40px",
          borderRadius: "20px",
          background: "rgba(3, 7, 18, 0.85)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.7)",
          textAlign: "center",
          zIndex: 30,
        }}
      >
        <div style={{ fontSize: "30px", fontWeight: 700, color: "#f8fafc", lineHeight: 1.4 }}>
          {currentSubtitle ? currentSubtitle.text : "..."}
        </div>
      </div>
    </AbsoluteFill>
  );
};
