import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene2Graph: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 12 } });

  // Delta X shrinks from 200 down to 2
  const deltaX = interpolate(frame, [30, 240], [200, 2], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const xA = 240;
  const f = (x: number) => (x * x) / 300;
  const yA = f(xA);

  const xB = xA + deltaX;
  const yB = f(xB);

  const slope = (yB - yA) / (xB - xA);

  const originX = 350;
  const originY = 820;
  const toScreenX = (x: number) => originX + x;
  const toScreenY = (y: number) => originY - y;

  const screenA = { x: toScreenX(xA), y: toScreenY(yA) };
  const screenB = { x: toScreenX(xB), y: toScreenY(yB) };

  const lineLength = 500;
  const tangentDx = lineLength / Math.sqrt(1 + slope * slope);
  const tangentDy = slope * tangentDx;

  const lineP1 = { x: screenA.x - tangentDx, y: screenA.y + tangentDy };
  const lineP2 = { x: screenA.x + tangentDx, y: screenA.y - tangentDy };

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #030712 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        padding: "60px",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div style={{ position: "absolute", top: "40px", left: "60px", opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -30}px)`, zIndex: 20 }}>
        <div style={{ padding: "8px 24px", borderRadius: "9999px", background: "rgba(16, 185, 129, 0.2)", border: "1px solid #10b981", color: "#10b981", fontSize: "20px", fontWeight: 800, textTransform: "uppercase", marginBottom: "12px", display: "inline-block" }}>
          CHƯƠNG 2: Ý NGHĨA HÌNH HỌC VÀ ĐƯỜNG TIẾP TUYẾN
        </div>
        <div style={{ fontSize: "48px", fontWeight: 900, background: "linear-gradient(90deg, #10b981, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          CÁT TUYẾN TỪ NỐI 2 ĐIỂM ➔ TIẾP TUYẾN TẠI 1 ĐIỂM
        </div>
      </div>

      {/* SVG Canvas */}
      <svg style={{ position: "absolute", width: "100%", height: "100%", zIndex: 10 }}>
        {/* Grid & Axes */}
        <line x1={originX - 100} y1={originY} x2={originX + 1100} y2={originY} stroke="#475569" strokeWidth="3" />
        <line x1={originX} y1={originY + 100} x2={originX} y2={originY - 650} stroke="#475569" strokeWidth="3" />
        <text x={originX + 1070} y={originY + 40} fill="#94a3b8" fontSize="24" fontWeight="bold">Trục Thời Gian t (X)</text>
        <text x={originX - 60} y={originY - 630} fill="#94a3b8" fontSize="24" fontWeight="bold">Quãng Đường s(t) (Y)</text>

        {/* Parabola Curve */}
        <path d={`M ${originX} ${originY} Q ${originX + 300} ${originY - 50} ${originX + 700} ${originY - 1633}`} fill="none" stroke="#38bdf8" strokeWidth="5" />

        {/* Secant / Tangent Line */}
        <line x1={lineP1.x} y1={lineP1.y} x2={lineP2.x} y2={lineP2.y} stroke={deltaX < 15 ? "#10b981" : "#ef4444"} strokeWidth={deltaX < 15 ? "5" : "3"} strokeDasharray={deltaX < 15 ? "0" : "8,8"} />

        {/* Point A */}
        <circle cx={screenA.x} cy={screenA.y} r="10" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
        <text x={screenA.x - 40} y={screenA.y + 35} fill="#38bdf8" fontSize="24" fontWeight="bold">Điểm A (t₀, s₀)</text>

        {/* Point B */}
        {deltaX > 5 && (
          <>
            <circle cx={screenB.x} cy={screenB.y} r="8" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
            <text x={screenB.x + 15} y={screenB.y - 15} fill="#ef4444" fontSize="22" fontWeight="bold">Điểm B (t₀+Δt)</text>
          </>
        )}
      </svg>

      {/* Real-time Status Card */}
      <div style={{ position: "absolute", top: "180px", right: "60px", width: "460px", padding: "30px", borderRadius: "24px", background: "rgba(15, 23, 42, 0.85)", border: "1px solid rgba(255, 255, 255, 0.12)", zIndex: 20 }}>
        <div style={{ fontSize: "22px", fontWeight: 800, color: "#10b981", marginBottom: "16px" }}>
          📐 QUÁ TRÌNH BIẾN ĐỔI:
        </div>
        <div style={{ fontSize: "24px", color: "#cbd5e1", lineHeight: 1.6 }}>
          Khoảng thời gian <span style={{ color: "#f59e0b", fontWeight: "bold" }}>Δt = {deltaX.toFixed(1)}s</span>
        </div>
        <div style={{ fontSize: "24px", marginTop: "10px", color: deltaX < 15 ? "#10b981" : "#ef4444", fontWeight: "bold" }}>
          {deltaX < 15 ? "✅ ĐÃ THÀNH ĐƯỜNG TIẾP TUYẾN!" : "❌ ĐANG LÀ ĐƯỜNG CÁT TUYẾN"}
        </div>
        <div style={{ marginTop: "20px", padding: "16px", borderRadius: "12px", background: "rgba(16, 185, 129, 0.15)", border: "1px solid #10b981", textAlign: "center", fontSize: "28px", fontWeight: 900, color: "#10b981" }}>
          Độ Dốc f'(t) = {slope.toFixed(2)}
        </div>
      </div>
    </AbsoluteFill>
  );
};
