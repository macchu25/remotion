import React from "react";
import {
  AbsoluteFill,
  Audio,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TikTokMathMasterclass: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Progress Bar percentage
  const progressPercent = (frame / durationInFrames) * 100;

  // Kinetic Subtitles Timeline (CapCut / Shorts style)
  const subtitles = [
    { start: 0, end: 70, text: "👋 Xin chào các bạn! Hôm nay ta sẽ giải mã BẢN CHẤT ĐẠO HÀM." },
    { start: 70, end: 140, text: "🚗 CHƯƠNG 1: Chạy xe máy 100km trong 2 giờ ➔ Vận tốc trung bình 50 km/h." },
    { start: 140, end: 220, text: "⚡ Tại phút 30 bắn tốc độ 75 km/h ➔ Đó chính là VẬN TỐC TỨC THỜI!" },
    { start: 220, end: 360, text: "📉 CHƯƠNG 2: Trên đồ thị, vận tốc trung bình là độ dốc của đường CÁT TUYẾN." },
    { start: 360, end: 500, text: "✨ Khi Δt tiến về 0, Cát Tuyến biến thành TIẾP TUYẾN sượt qua 1 điểm!" },
    { start: 500, end: 620, text: "📐 CHƯƠNG 3: Công thức f'(x) = lim (Δy / Δx) chính là TỶ LỆ THAY ĐỔI TỨC THỜI!" },
    { start: 620, end: 750, text: "🚀 CHƯƠNG 4: Đạo hàm xuất hiện trong Vật lý (Vận tốc/Gia tốc) & Kinh tế." },
    { start: 750, end: 900, text: "🤖 Đặc biệt trong AI: Thuật toán Gradient Descent dùng Đạo hàm để AI tự học!" },
  ];

  const currentSub = subtitles.find((s) => frame >= s.start && frame < s.end);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #070a12 0%, #0d1322 50%, #02040a 100%)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ===== AUDIO TRACKS ===== */}
      <Audio src={staticFile("derivative_masterclass_voice.mp3")} volume={1.0} playbackRate={1.25} />
      <Audio src={staticFile("math_bgm.wav")} volume={0.14} loop />

      {/* ===== TOP PROGRESS BAR ===== */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", zIndex: 100 }}>
        <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #38bdf8, #ec4899, #10b981)", boxShadow: "0 0 12px #38bdf8" }} />
      </div>

      {/* ===== FULL-SCREEN PRO SCENE SEQUENCES (1080x1920 VERTICAL) ===== */}

      {/* SCENE 1: SPEEDOMETER & REAL-LIFE ANALOGY (FRAMES 0 - 220) */}
      <Sequence from={0} durationInFrames={220}>
        <Scene1Speedometer />
      </Sequence>

      {/* SCENE 2: FULL-SCREEN INTERACTIVE MATH GRAPH (FRAMES 220 - 500) */}
      <Sequence from={220} durationInFrames={280}>
        <Scene2MathGraph />
      </Sequence>

      {/* SCENE 3: LIMIT FORMULA BREAKDOWN (FRAMES 500 - 720) */}
      <Sequence from={500} durationInFrames={220}>
        <Scene3LimitFormula />
      </Sequence>

      {/* SCENE 4: APPLICATIONS IN PHYSICS, ECON & AI (FRAMES 720 - 900) */}
      <Sequence from={720} durationInFrames={180}>
        <Scene4Applications />
      </Sequence>

      {/* ===== CAPCUT STYLE KINETIC SUBTITLES (BOTTOM) ===== */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "92%",
          maxWidth: "980px",
          padding: "24px 32px",
          borderRadius: "24px",
          background: "rgba(3, 7, 18, 0.92)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(56, 189, 248, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(56, 189, 248, 0.2)",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.45, textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}>
          {currentSub ? currentSub.text : "🎓 Mẹo Lập Trình & Toán Học: Bản Chất Đạo Hàm"}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 1: SPEEDOMETER & REAL LIFE
// ==========================================
const Scene1Speedometer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const springIntro = spring({ frame, fps, config: { damping: 12 } });

  const needleAngle = interpolate(frame, [20, 140], [-90, 45], { extrapolateRight: "clamp" });
  const speedValue = Math.round(interpolate(frame, [20, 140], [0, 75], { extrapolateRight: "clamp" }));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 40px 220px 40px", textAlign: "center" }}>
      {/* Chapter Badge */}
      <div style={{ opacity: springIntro, transform: `scale(${springIntro})`, padding: "12px 32px", borderRadius: "9999px", background: "linear-gradient(90deg, #ef4444, #f97316)", color: "#ffffff", fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 10px 25px rgba(239, 68, 68, 0.4)", marginBottom: "30px" }}>
        🚗 CHƯƠNG 1: VẬN TỐC TỨC THỜI
      </div>

      <div style={{ fontSize: "44px", fontWeight: 900, lineHeight: 1.25, marginBottom: "50px", background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
        LÀM SAO TÍNH VẬN TỐC KHI THỜI GIAN Δt = 0?
      </div>

      {/* Massive Speedometer Display */}
      <div style={{ position: "relative", width: "380px", height: "190px", margin: "30px 0" }}>
        <div style={{ width: "380px", height: "380px", borderRadius: "50%", border: "20px solid #1e293b", borderTopColor: "#ef4444", borderRightColor: "#ef4444", transform: "rotate(-135deg)" }} />
        {/* Needle */}
        <div style={{ position: "absolute", bottom: "0", left: "182px", width: "16px", height: "160px", background: "#ef4444", borderRadius: "8px", transformOrigin: "bottom center", transform: `rotate(${needleAngle}deg)`, boxShadow: "0 0 20px #ef4444" }} />
      </div>

      <div style={{ fontSize: "96px", fontWeight: 900, color: "#ef4444", textShadow: "0 0 40px rgba(239,68,68,0.6)", marginTop: "20px" }}>
        {speedValue} <span style={{ fontSize: "40px", color: "#f8fafc" }}>km/h</span>
      </div>

      <div style={{ fontSize: "28px", color: "#94a3b8", marginTop: "30px", padding: "16px 32px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}>
        ⚡ Đồng hồ công-tơ-mét chỉ vận tốc tức thời tại đúng 1 khoảnh khắc!
      </div>
    </div>
  );
};

// ==========================================
// SCENE 2: FULL-SCREEN INTERACTIVE MATH GRAPH
// ==========================================
const Scene2MathGraph: React.FC = () => {
  const frame = useCurrentFrame();

  // Delta X shrinks from 180 down to 2
  const deltaX = interpolate(frame, [20, 240], [180, 2], { extrapolateRight: "clamp" });

  const xA = 160;
  const f = (x: number) => (x * x) / 220;
  const yA = f(xA);

  const xB = xA + deltaX;
  const yB = f(xB);
  const slope = (yB - yA) / (xB - xA);

  const originX = 180;
  const originY = 1150;
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
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", padding: "100px 30px 220px 30px" }}>
      {/* Chapter Badge */}
      <div style={{ padding: "12px 32px", borderRadius: "9999px", background: "linear-gradient(90deg, #10b981, #06b6d4)", color: "#ffffff", fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 10px 25px rgba(16, 185, 129, 0.4)", marginBottom: "20px" }}>
        📉 CHƯƠNG 2: Ý NGHĨA HÌNH HỌC
      </div>

      <div style={{ fontSize: "38px", fontWeight: 900, textAlign: "center", marginBottom: "20px", color: deltaX < 15 ? "#10b981" : "#ef4444" }}>
        {deltaX < 15 ? "✅ CÁT TUYẾN ĐÃ THÀNH TIẾP TUYẾN!" : "❌ CÁT TUYẾN NỐI 2 ĐIỂM (Δt còn lớn)"}
      </div>

      {/* Full-Screen Math SVG */}
      <div style={{ position: "relative", width: "100%", height: "900px", borderRadius: "28px", background: "rgba(15, 23, 42, 0.85)", border: "2px solid rgba(16, 185, 129, 0.4)", boxShadow: "0 20px 50px rgba(0,0,0,0.6)", overflow: "hidden" }}>
        <svg style={{ width: "100%", height: "100%" }}>
          {/* Grid */}
          {Array.from({ length: 12 }).map((_, i) => (
            <line key={i} x1="0" y1={i * 80} x2="1080" y2={i * 80} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          ))}

          {/* Axes */}
          <line x1={originX - 50} y1={originY - 600} x2={originX + 780} y2={originY - 600} stroke="#475569" strokeWidth="3" />
          <line x1={originX} y1={originY - 100} x2={originX} y2={originY - 1100} stroke="#475569" strokeWidth="3" />
          <text x={originX + 730} y={originY - 570} fill="#94a3b8" fontSize="22" fontWeight="bold">Trục t</text>
          <text x={originX - 50} y={originY - 1080} fill="#94a3b8" fontSize="22" fontWeight="bold">Trục s(t)</text>

          {/* Curve */}
          <path d={`M ${originX} ${originY - 600} Q ${originX + 250} ${originY - 640} ${originX + 700} ${originY - 1800}`} fill="none" stroke="#38bdf8" strokeWidth="6" filter="drop-shadow(0 0 15px rgba(56,189,248,0.7))" />

          {/* Line */}
          <line x1={lineP1.x} y1={lineP1.y - 600} x2={lineP2.x} y2={lineP2.y - 600} stroke={deltaX < 15 ? "#10b981" : "#ef4444"} strokeWidth={deltaX < 15 ? "6" : "4"} strokeDasharray={deltaX < 15 ? "0" : "8,8"} filter={deltaX < 15 ? "drop-shadow(0 0 20px #10b981)" : "none"} />

          {/* Point A */}
          <circle cx={screenA.x} cy={screenA.y - 600} r="12" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
          <text x={screenA.x - 40} y={screenA.y - 560} fill="#38bdf8" fontSize="24" fontWeight="bold">Điểm A</text>

          {/* Point B */}
          {deltaX > 5 && (
            <>
              <circle cx={screenB.x} cy={screenB.y - 600} r="10" fill="#ef4444" stroke="#ffffff" strokeWidth="3" />
              <text x={screenB.x + 15} y={screenB.y - 610} fill="#ef4444" fontSize="22" fontWeight="bold">B (Δt={Math.round(deltaX)})</text>
            </>
          )}
        </svg>

        {/* Slope Banner */}
        <div style={{ position: "absolute", bottom: "24px", left: "50%", transform: "translateX(-50%)", padding: "16px 36px", borderRadius: "16px", background: "rgba(3, 7, 18, 0.95)", border: deltaX < 15 ? "2px solid #10b981" : "2px solid #ef4444", fontSize: "28px", fontWeight: 900, color: deltaX < 15 ? "#10b981" : "#ef4444" }}>
          Độ Dốc Tiếp Tuyến f'(t) = {slope.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 3: LIMIT FORMULA BREAKDOWN
// ==========================================
const Scene3LimitFormula: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 40px 220px 40px", textAlign: "center" }}>
      {/* Chapter Badge */}
      <div style={{ padding: "12px 32px", borderRadius: "9999px", background: "linear-gradient(90deg, #c084fc, #3b82f6)", color: "#ffffff", fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 10px 25px rgba(192, 132, 252, 0.4)", marginBottom: "30px" }}>
        📐 CHƯƠNG 3: CÔNG THỨC GIỚI HẠN
      </div>

      <div style={{ fontSize: "40px", fontWeight: 900, marginBottom: "40px", color: "#cbd5e1" }}>
        ĐỊNH NGHĨA CHÍNH THỨC CỦA ĐẠO HÀM
      </div>

      {/* Big Formula Display */}
      <div style={{ padding: "40px 30px", borderRadius: "28px", background: "rgba(192, 132, 252, 0.1)", border: "2px solid #c084fc", boxShadow: "0 0 50px rgba(192, 132, 252, 0.3)", fontSize: "52px", fontWeight: 900, fontFamily: "'Fira Code', monospace", marginBottom: "40px", width: "100%" }}>
        <span style={{ color: "#c084fc" }}>f'(x₀)</span> = <span style={{ color: "#ef4444" }}>lim</span><sub>Δx➔0</sub> (<span style={{ color: "#38bdf8" }}>Δy</span> / <span style={{ color: "#f59e0b" }}>Δx</span>)
      </div>

      {/* Explanation Cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
        <div style={{ padding: "20px 30px", borderRadius: "16px", background: "rgba(56, 189, 248, 0.12)", border: "1px solid #38bdf8", textAlign: "left", fontSize: "24px" }}>
          <b style={{ color: "#38bdf8" }}>🔹 Tử Số Δy:</b> Biến thiên quãng đường (Đầu ra)
        </div>
        <div style={{ padding: "20px 30px", borderRadius: "16px", background: "rgba(245, 158, 11, 0.12)", border: "1px solid #f59e0b", textAlign: "left", fontSize: "24px" }}>
          <b style={{ color: "#f59e0b" }}>🔸 Mẫu Số Δx:</b> Biến thiên thời gian (Đầu vào)
        </div>
        <div style={{ padding: "20px 30px", borderRadius: "16px", background: "rgba(239, 68, 68, 0.12)", border: "1px solid #ef4444", textAlign: "left", fontSize: "24px" }}>
          <b style={{ color: "#ef4444" }}>🔻 lim Δx➔0:</b> Khoảng thời gian ép về SIÊU NHỎ
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 4: APPLICATIONS & WRAP-UP
// ==========================================
const Scene4Applications: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 40px 220px 40px", textAlign: "center" }}>
      {/* Chapter Badge */}
      <div style={{ padding: "12px 32px", borderRadius: "9999px", background: "linear-gradient(90deg, #ec4899, #8b5cf6)", color: "#ffffff", fontSize: "24px", fontWeight: 900, textTransform: "uppercase", letterSpacing: "1px", boxShadow: "0 10px 25px rgba(236, 72, 153, 0.4)", marginBottom: "30px" }}>
        🚀 CHƯƠNG 4: ỨNG DỤNG THỰC TẾ
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "24px", width: "100%" }}>
        <div style={{ padding: "28px", borderRadius: "20px", background: "rgba(56, 189, 248, 0.1)", border: "2px solid #38bdf8", textAlign: "left" }}>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#38bdf8", marginBottom: "6px" }}>🏎️ VẬT LÝ HỌC</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1" }}>Vận tốc v(t) = s'(t) & Gia tốc a(t) = v'(t)</div>
        </div>

        <div style={{ padding: "28px", borderRadius: "20px", background: "rgba(16, 185, 129, 0.1)", border: "2px solid #10b981", textAlign: "left" }}>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#10b981", marginBottom: "6px" }}>📈 KINH TẾ HỌC</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1" }}>Tính Chi Phí Biên & Lợi Nhuận Biên tối ưu</div>
        </div>

        <div style={{ padding: "28px", borderRadius: "20px", background: "rgba(236, 72, 153, 0.1)", border: "2px solid #ec4899", textAlign: "left" }}>
          <div style={{ fontSize: "28px", fontWeight: 900, color: "#ec4899", marginBottom: "6px" }}>🤖 TRÍ TUỆ NHÂN TẠO (AI)</div>
          <div style={{ fontSize: "22px", color: "#cbd5e1" }}>Thuật toán Gradient Descent giúp AI tự học dữ liệu</div>
        </div>
      </div>
    </div>
  );
};
