import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 10, fps, config: { damping: 12 } });

  // Speedometer needle rotation (from 0 to 75 km/h)
  const needleAngle = interpolate(frame, [40, 120], [-90, 45], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const speedValue = Math.round(
    interpolate(frame, [40, 120], [0, 75], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(135deg, #090d16 0%, #0f172a 50%, #030712 100%)",
        color: "#ffffff",
        fontFamily: "'Inter', sans-serif",
        padding: "60px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", opacity: titleSpring, transform: `translateY(${(1 - titleSpring) * -30}px)` }}>
        <div style={{ padding: "8px 24px", borderRadius: "9999px", background: "rgba(56, 189, 248, 0.2)", border: "1px solid #38bdf8", color: "#38bdf8", fontSize: "20px", fontWeight: 800, textTransform: "uppercase", marginBottom: "16px", display: "inline-block" }}>
          CHƯƠNG 1: ĐẶT VẤN ĐỀ TRONG ĐỜI SỐNG
        </div>
        <div style={{ fontSize: "52px", fontWeight: 900, background: "linear-gradient(90deg, #ffffff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          VẬN TỐC TRUNG BÌNH VS VẬN TỐC TỨC THỜI
        </div>
      </div>

      {/* Main Grid: Comparison */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", width: "100%", maxWidth: "1500px", marginTop: "20px" }}>
        {/* Left Card: Average Speed */}
        <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(255, 255, 255, 0.1)", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          <div style={{ fontSize: "26px", color: "#94a3b8", fontWeight: 600, marginBottom: "12px" }}>🚗 Quãng đường Hà Nội ➔ Hải Phòng (100km)</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#38bdf8", marginBottom: "20px" }}>Vận Tốc Trung Bình</div>
          <div style={{ fontSize: "64px", fontWeight: 900, color: "#f8fafc", marginBottom: "10px" }}>50 km/h</div>
          <div style={{ fontSize: "22px", color: "#64748b" }}>Tính bằng: Tổng Quãng Đường / Tổng Thời Gian (100km / 2h)</div>
        </div>

        {/* Right Card: Instantaneous Speed (Speedometer) */}
        <div style={{ background: "rgba(255, 255, 255, 0.04)", border: "1px solid rgba(239, 68, 68, 0.3)", borderRadius: "24px", padding: "40px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", boxShadow: "0 0 30px rgba(239, 68, 68, 0.15)" }}>
          <div style={{ fontSize: "26px", color: "#ef4444", fontWeight: 800, marginBottom: "12px" }}>⚡ Cảnh Sát Giao Thông Bắn Tốc Độ Tại Phút 30</div>
          <div style={{ fontSize: "36px", fontWeight: 800, color: "#f8fafc", marginBottom: "20px" }}>Vận Tốc Tức Thời (Đạo Hàm)</div>

          {/* Speedometer Gauge Visual */}
          <div style={{ position: "relative", width: "220px", height: "110px", margin: "20px 0" }}>
            <div style={{ width: "220px", height: "220px", borderRadius: "50%", border: "12px solid #334155", borderBottomColor: "transparent", borderLeftColor: "transparent", transform: "rotate(-45deg)" }} />
            {/* Needle */}
            <div style={{ position: "absolute", bottom: "0", left: "105px", width: "10px", height: "90px", background: "#ef4444", borderRadius: "5px", transformOrigin: "bottom center", transform: `rotate(${needleAngle}deg)`, transition: "transform 0.1s ease" }} />
          </div>

          <div style={{ fontSize: "64px", fontWeight: 900, color: "#ef4444" }}>{speedValue} km/h</div>
          <div style={{ fontSize: "22px", color: "#f8fafc", marginTop: "10px", fontWeight: 600 }}>
            Làm sao toán học tính được vận tốc khi khoảng thời gian Δt = 0?
          </div>
        </div>
      </div>

      {/* Footer Note */}
      <div style={{ fontSize: "26px", color: "#38bdf8", fontWeight: 700, background: "rgba(56, 189, 248, 0.1)", padding: "16px 40px", borderRadius: "9999px", border: "1px solid rgba(56, 189, 248, 0.3)" }}>
        👉 Câu trả lời chính là: ĐẠO HÀM (DERIVATIVE)!
      </div>
    </AbsoluteFill>
  );
};
