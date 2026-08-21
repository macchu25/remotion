import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene3Formula: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 12 } });
  const box1Spring = spring({ frame: frame - 25, fps, config: { damping: 14 } });
  const box2Spring = spring({ frame: frame - 45, fps, config: { damping: 14 } });
  const box3Spring = spring({ frame: frame - 65, fps, config: { damping: 14 } });

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
        <div style={{ padding: "8px 24px", borderRadius: "9999px", background: "rgba(192, 132, 252, 0.2)", border: "1px solid #c084fc", color: "#c084fc", fontSize: "20px", fontWeight: 800, textTransform: "uppercase", marginBottom: "16px", display: "inline-block" }}>
          CHƯƠNG 3: GIẢI MÃ CÔNG THỨC GIỚI HẠN (LIMIT FORMULA)
        </div>
        <div style={{ fontSize: "56px", fontWeight: 900, background: "linear-gradient(90deg, #c084fc, #38bdf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ĐỊNH NGHĨA CHÍNH THỨC CỦA ĐẠO HÀM
        </div>
      </div>

      {/* Main Large Formula Box */}
      <div
        style={{
          padding: "36px 60px",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.04)",
          border: "2px solid rgba(192, 132, 252, 0.4)",
          boxShadow: "0 0 50px rgba(192, 132, 252, 0.2)",
          fontSize: "64px",
          fontWeight: 900,
          fontFamily: "'Fira Code', monospace",
          color: "#f8fafc",
          textAlign: "center",
        }}
      >
        <span style={{ color: "#c084fc" }}>f'(x₀)</span> = <span style={{ color: "#ef4444" }}>lim</span><sub>Δx → 0</sub> <span style={{ color: "#38bdf8" }}>Δy</span> / <span style={{ color: "#f59e0b" }}>Δx</span>
      </div>

      {/* 3 Step Breakdown Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", width: "100%", maxWidth: "1500px" }}>
        {/* Step 1 */}
        <div style={{ opacity: box1Spring, transform: `scale(${box1Spring})`, background: "rgba(56, 189, 248, 0.1)", border: "1px solid #38bdf8", borderRadius: "20px", padding: "30px" }}>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#38bdf8", marginBottom: "10px" }}>1. Tử Số Δy</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1", lineHeight: 1.5 }}>
            Sự thay đổi của <b>Đầu ra</b> (Quãng đường / Giá trị hàm số f).
          </div>
        </div>

        {/* Step 2 */}
        <div style={{ opacity: box2Spring, transform: `scale(${box2Spring})`, background: "rgba(245, 158, 11, 0.1)", border: "1px solid #f59e0b", borderRadius: "20px", padding: "30px" }}>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#f59e0b", marginBottom: "10px" }}>2. Mẫu Số Δx</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1", lineHeight: 1.5 }}>
            Sự thay đổi của <b>Đầu vào</b> (Thời gian / Biến số x).
          </div>
        </div>

        {/* Step 3 */}
        <div style={{ opacity: box3Spring, transform: `scale(${box3Spring})`, background: "rgba(239, 68, 68, 0.1)", border: "1px solid #ef4444", borderRadius: "20px", padding: "30px" }}>
          <div style={{ fontSize: "28px", fontWeight: 800, color: "#ef4444", marginBottom: "10px" }}>3. Giới Hạn lim Δx➔0</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1", lineHeight: 1.5 }}>
            Khoảng thời gian ép về <b>Siêu nhỏ (gần như 0)</b> để tìm tỷ lệ tức thời.
          </div>
        </div>
      </div>

      {/* Summary Banner */}
      <div style={{ fontSize: "26px", fontWeight: 700, color: "#10b981", background: "rgba(16, 185, 129, 0.15)", padding: "16px 40px", borderRadius: "9999px", border: "1px solid #10b981" }}>
        💡 Đạo hàm = Tỷ lệ thay đổi khi khoảng cách biến đổi tiến về 0!
      </div>
    </AbsoluteFill>
  );
};
