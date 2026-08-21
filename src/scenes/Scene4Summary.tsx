import React from "react";
import {
  AbsoluteFill,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Scene4Summary: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({ frame: frame - 5, fps, config: { damping: 12 } });

  const apps = [
    { title: "🚀 1. VẬT LÝ HỌC", desc: "Đạo hàm quãng đường = Vận tốc v(t)\nĐạo hàm vận tốc = Gia tốc a(t)", color: "#38bdf8" },
    { title: "📈 2. KINH TẾ HỌC", desc: "Tính Chi phí biên (Marginal Cost) & Lợi nhuận biên để tối ưu doanh thu.", color: "#10b981" },
    { title: "🤖 3. TRÍ TUỆ NHÂN TẠO (AI)", desc: "Thuật toán Gradient Descent dùng Đạo hàm để AI tự sửa lỗi và học dữ liệu!", color: "#ec4899" },
  ];

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
        <div style={{ padding: "8px 24px", borderRadius: "9999px", background: "rgba(236, 72, 153, 0.2)", border: "1px solid #ec4899", color: "#ec4899", fontSize: "20px", fontWeight: 800, textTransform: "uppercase", marginBottom: "16px", display: "inline-block" }}>
          CHƯƠNG 4: ỨNG DỤNG THỰC TẾ & TỔNG KẾT
        </div>
        <div style={{ fontSize: "52px", fontWeight: 900, background: "linear-gradient(90deg, #ffffff, #cbd5e1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          ĐẠO HÀM XUẤT HIỆN Ở ĐÂU TRONG THỰC TẾ?
        </div>
      </div>

      {/* Grid of Applications */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "30px", width: "100%", maxWidth: "1500px" }}>
        {apps.map((item, idx) => {
          const appSpring = spring({ frame: frame - 20 - idx * 15, fps, config: { damping: 14 } });
          return (
            <div
              key={idx}
              style={{
                opacity: appSpring,
                transform: `scale(${appSpring})`,
                padding: "36px",
                borderRadius: "24px",
                background: "rgba(255, 255, 255, 0.04)",
                border: `2px solid ${item.color}`,
                boxShadow: `0 10px 30px ${item.color}25`,
              }}
            >
              <div style={{ fontSize: "32px", fontWeight: 900, color: item.color, marginBottom: "16px" }}>
                {item.title}
              </div>
              <div style={{ fontSize: "24px", color: "#cbd5e1", lineHeight: 1.6, whiteSpace: "pre-line" }}>
                {item.desc}
              </div>
            </div>
          );
        })}
      </div>

      {/* Final Wrap-up Badge */}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "28px", fontWeight: 800, color: "#f8fafc", marginBottom: "8px" }}>
          🎉 CHÚC MỪNG BẠN ĐÃ HIỂU RÕ BẢN CHẤT CỦA ĐẠO HÀM!
        </div>
        <div style={{ fontSize: "20px", color: "#94a3b8" }}>
          Hãy áp dụng tư duy trực quan này vào tất cả các bài toán tiếp theo nhé.
        </div>
      </div>
    </AbsoluteFill>
  );
};
