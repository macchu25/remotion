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

export const DivideByZeroShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  // Progress Bar percentage
  const progressPercent = (frame / durationInFrames) * 100;

  // Audio Music Ducking (Ducks to 0.08 when speech is active, cuts to 0 during silence at frames 630-650 & 1410-1440)
  let musicVolume = 0.08;
  if ((frame >= 625 && frame <= 655) || (frame >= 1410 && frame <= 1450)) {
    musicVolume = 0.0;
  }

  // 16 Sentence Subtitles (CapCut style 3-6 words per caption)
  const captions = [
    { start: 0, end: 90, text: "❓ Tại sao không thể chia cho số 0?" },
    { start: 90, end: 210, text: "💻 Không phải vì máy tính yếu..." },
    { start: 210, end: 300, text: "🍎 10 chia 2 là chia 10 thứ thành 2 nhóm bằng nhau." },
    { start: 300, end: 390, text: "🔄 Hay 2 nhân mấy bằng 10? Là 5." },
    { start: 390, end: 480, text: "❓ Vậy 10 chia 0 nghĩa là: 0 nhân mấy bằng 10?" },
    { start: 480, end: 630, text: "🔢 Nhưng 0 nhân 1... 10... 1 triệu... vẫn bằng 0!" },
    { start: 630, end: 720, text: "❌ KHÔNG CÓ ĐÁP ÁN NÀO HỢP LÝ!" },
    { start: 720, end: 810, text: "🌀 Nhưng 0 CHIA 0 còn kỳ lạ hơn..." },
    { start: 810, end: 990, text: "❓ Vì 0 nhân mấy bằng 0? MỌI SỐ!" },
    { start: 990, end: 1050, text: "💥 QUÁ NHIỀU ĐÁP ÁN!" },
    { start: 1050, end: 1140, text: "♾️ Tại sao không gọi nó là VÔ CỰC?" },
    { start: 1140, end: 1320, text: "📈 Tiến gần 0, kết quả tăng đến VÔ CỰC!" },
    { start: 1320, end: 1410, text: "➕/➖ Nhưng phía dương là +∞, phía âm là -∞!" },
    { start: 1410, end: 1500, text: "❓ Vậy tại số 0... bạn chọn vô cực nào?" },
    { start: 1500, end: 1620, text: "🚫 Phép chia 0: KHÔNG XÁC ĐỊNH (UNDEFINED)!" },
    { start: 1620, end: 1800, text: "❓ Nhưng còn 0 mũ 0 thì sao?" },
  ];

  const currentCap = captions.find((c) => frame >= c.start && frame < c.end);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #050811 0%, #0b1120 50%, #020409 100%)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ===== AUDIO TRACKS (PLAYBACK 1.0X NATURAL SPEED) ===== */}
      <Audio src={staticFile("audio/voice/voiceover.mp3")} volume={1.0} playbackRate={1.0} />
      <Audio src={staticFile("math_bgm.wav")} volume={musicVolume} loop />

      {/* ===== MINIMALIST CLEAN SFX TRACKS ===== */}

      {/* Scene 01 SFX */}
      <Sequence from={10}><Audio src={staticFile("audio/sfx/pop.wav")} volume={0.2} /></Sequence>
      <Sequence from={40}><Audio src={staticFile("audio/sfx/impact.wav")} volume={0.3} /></Sequence>

      {/* Scene 02 SFX */}
      <Sequence from={130}><Audio src={staticFile("audio/sfx/click.wav")} volume={0.2} /></Sequence>
      <Sequence from={145}><Audio src={staticFile("audio/sfx/stamp.wav")} volume={0.35} /></Sequence>

      {/* Scene 03 SFX */}
      <Sequence from={280}><Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} /></Sequence>

      {/* Scene 04 SFX */}
      <Sequence from={370}><Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} /></Sequence>

      {/* Scene 05 SFX */}
      <Sequence from={425}><Audio src={staticFile("audio/sfx/impact.wav")} volume={0.3} /></Sequence>

      {/* Scene 06 SFX */}
      <Sequence from={495}><Audio src={staticFile("audio/sfx/click.wav")} volume={0.2} /></Sequence>

      {/* Scene 07 SFX */}
      <Sequence from={645}><Audio src={staticFile("audio/sfx/stamp.wav")} volume={0.4} /></Sequence>

      {/* Scene 08 SFX */}
      <Sequence from={770}><Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} /></Sequence>

      {/* Scene 09 SFX */}
      <Sequence from={825}><Audio src={staticFile("audio/sfx/pop.wav")} volume={0.2} /></Sequence>

      {/* Scene 10 SFX */}
      <Sequence from={1010}><Audio src={staticFile("audio/sfx/impact.wav")} volume={0.35} /></Sequence>

      {/* Scene 11 SFX */}
      <Sequence from={1065}><Audio src={staticFile("audio/sfx/boom.wav")} volume={0.3} /></Sequence>

      {/* Scene 12 SFX */}
      <Sequence from={1150}><Audio src={staticFile("audio/sfx/tick.wav")} volume={0.2} /></Sequence>

      {/* Scene 13 SFX */}
      <Sequence from={1370}><Audio src={staticFile("audio/sfx/impact.wav")} volume={0.3} /></Sequence>

      {/* Scene 14 SFX */}
      <Sequence from={1450}><Audio src={staticFile("audio/sfx/heartbeat.wav")} volume={0.4} /></Sequence>

      {/* Scene 15 SFX */}
      <Sequence from={1515}><Audio src={staticFile("audio/sfx/stamp.wav")} volume={0.4} /></Sequence>

      {/* Scene 16 SFX */}
      <Sequence from={1730}><Audio src={staticFile("audio/sfx/ding.wav")} volume={0.3} /></Sequence>

      {/* ===== TOP RETENTION PROGRESS BAR ===== */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", zIndex: 200 }}>
        <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #ef4444, #38bdf8, #10b981)", boxShadow: "0 0 15px #38bdf8" }} />
      </div>

      {/* ===== 16 FULL-SCREEN 9:16 SCENES ===== */}

      {/* SCENE 01: HOOK (0 - 90 / 0s - 3s) */}
      <Sequence from={0} durationInFrames={90}>
        <Scene01Hook />
      </Sequence>

      {/* SCENE 02: ERROR (90 - 210 / 3s - 7s) */}
      <Sequence from={90} durationInFrames={120}>
        <Scene02Error />
      </Sequence>

      {/* SCENE 03: 10 ÷ 2 = 5 (210 - 300 / 7s - 10s) */}
      <Sequence from={210} durationInFrames={90}>
        <Scene03Division />
      </Sequence>

      {/* SCENE 04: REVERSE MULTIPLICATION (300 - 390 / 10s - 13s) */}
      <Sequence from={300} durationInFrames={90}>
        <Scene04Multiplication />
      </Sequence>

      {/* SCENE 05: THE REAL PROBLEM (390 - 480 / 13s - 16s) */}
      <Sequence from={390} durationInFrames={90}>
        <Scene05Problem />
      </Sequence>

      {/* SCENE 06: TESTING EVERY NUMBER (480 - 630 / 16s - 21s) */}
      <Sequence from={480} durationInFrames={150}>
        <Scene06TestingNumbers />
      </Sequence>

      {/* SCENE 07: NO ANSWER (630 - 720 / 21s - 24s) */}
      <Sequence from={630} durationInFrames={90}>
        <Scene07NoAnswer />
      </Sequence>

      {/* SCENE 08: TWIST 0 ÷ 0 (720 - 810 / 24s - 27s) */}
      <Sequence from={720} durationInFrames={90}>
        <Scene08TwistZeroZero />
      </Sequence>

      {/* SCENE 09: TOO MANY ANSWERS (810 - 990 / 27s - 33s) */}
      <Sequence from={810} durationInFrames={180}>
        <Scene09TooManyAnswers />
      </Sequence>

      {/* SCENE 10: SCREEN EXPLOSION (990 - 1050 / 33s - 35s) */}
      <Sequence from={990} durationInFrames={60}>
        <Scene10Explosion />
      </Sequence>

      {/* SCENE 11: CALL IT INFINITY? (1050 - 1140 / 35s - 38s) */}
      <Sequence from={1050} durationInFrames={90}>
        <Scene11Infinity />
      </Sequence>

      {/* SCENE 12: APPROACHING 0 (1140 - 1320 / 38s - 44s) */}
      <Sequence from={1140} durationInFrames={180}>
        <Scene12ApproachingZero />
      </Sequence>

      {/* SCENE 13: POSITIVE VS NEGATIVE INFINITY (1320 - 1410 / 44s - 47s) */}
      <Sequence from={1320} durationInFrames={90}>
        <Scene13SplitInfinity />
      </Sequence>

      {/* SCENE 14: THE CRUCIAL QUESTION (1410 - 1500 / 47s - 50s) */}
      <Sequence from={1410} durationInFrames={90}>
        <Scene14CrucialQuestion />
      </Sequence>

      {/* SCENE 15: CONCLUSION (1500 - 1620 / 50s - 54s) */}
      <Sequence from={1500} durationInFrames={120}>
        <Scene15Conclusion />
      </Sequence>

      {/* SCENE 16: OPEN LOOP ENDING (1620 - 1800 / 54s - 60s) */}
      <Sequence from={1620} durationInFrames={180}>
        <Scene16OpenLoop />
      </Sequence>

      {/* ===== KINETIC SUBTITLE OVERLAY (BOTTOM 80% MARK) ===== */}
      <div
        style={{
          position: "absolute",
          bottom: "120px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "92%",
          maxWidth: "980px",
          padding: "20px 32px",
          borderRadius: "24px",
          background: "rgba(3, 7, 18, 0.92)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(56, 189, 248, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
          textAlign: "center",
          zIndex: 150,
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", lineHeight: 1.4, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
          {currentCap ? currentCap.text : "..."}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE 01: HOOK (0s - 3s)
// ==========================================
const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame: frame - 40, fps, config: { damping: 10 } });
  const zoom = interpolate(frame, [50, 90], [1.0, 1.45], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", transform: `scale(${zoom})`, transition: "transform 0.1s ease" }}>
      <div style={{ fontSize: "32px", fontWeight: 900, color: "#38bdf8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px" }}>
        🤔 CÂU HỎI BÍ ẨN
      </div>
      <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ffffff", display: "flex", gap: "20px", alignItems: "center" }}>
        <span>10</span>
        <span style={{ color: "#38bdf8" }}>÷</span>
        <span style={{ color: "#ef4444" }}>0</span>
        <span>=</span>
        <span style={{ color: "#f59e0b", transform: `scale(${1 + scale * 0.3})`, display: "inline-block" }}>?</span>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 02: ERROR (3s - 7s)
// ==========================================
const Scene02Error: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampSpring = spring({ frame: frame - 55, fps, config: { damping: 10 } });
  const isError = frame >= 55;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ width: "100%", padding: "40px", borderRadius: "28px", background: "#1e1e2e", border: isError ? "4px solid #ef4444" : "2px solid #45475a", boxShadow: isError ? "0 0 60px rgba(239, 68, 68, 0.6)" : "none", textAlign: "center" }}>
        <div style={{ fontSize: "36px", color: "#a6adc8", marginBottom: "30px" }}>Máy tính xử lý:</div>
        <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace" }}>
          10 / 0
        </div>
        {isError && (
          <div style={{ opacity: stampSpring, transform: `scale(${stampSpring}) rotate(-8deg)`, marginTop: "40px", padding: "20px 40px", borderRadius: "16px", background: "#ef4444", color: "#ffffff", fontSize: "72px", fontWeight: 900, letterSpacing: "4px", boxShadow: "0 0 40px #ef4444" }}>
            ERROR
          </div>
        )}
      </div>
    </div>
  );
};

// ==========================================
// SCENE 03: 10 ÷ 2 = 5 (7s - 10s)
// ==========================================
const Scene03Division: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const groupSpring = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", marginBottom: "40px" }}>
        10 ÷ 2 = <span style={{ color: "#10b981" }}>5</span>
      </div>
      <div style={{ display: "flex", gap: "60px", transform: `scale(${groupSpring})` }}>
        <div style={{ padding: "30px", borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#38bdf8", boxShadow: "0 0 10px #38bdf8" }} />
          ))}
        </div>
        <div style={{ padding: "30px", borderRadius: "24px", background: "rgba(16, 185, 129, 0.15)", border: "2px solid #10b981", display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "16px" }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} style={{ width: "36px", height: "36px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981" }} />
          ))}
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 04: REVERSE MULTIPLICATION (10s - 13s)
// ==========================================
const Scene04Multiplication: React.FC = () => {
  const frame = useCurrentFrame();
  const isRevealed = frame >= 60;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "36px", color: "#94a3b8", marginBottom: "30px" }}>Đảo ngược phép chia thành phép nhân:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "40px", borderRadius: "24px", background: "rgba(255, 255, 255, 0.05)", border: "2px solid #38bdf8" }}>
        2 × <span style={{ color: isRevealed ? "#10b981" : "#f59e0b" }}>{isRevealed ? "5" : "?"}</span> = 10
      </div>
    </div>
  );
};

// ==========================================
// SCENE 05: THE REAL PROBLEM (13s - 16s)
// ==========================================
const Scene05Problem: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "40px", color: "#ef4444", fontWeight: 900, marginBottom: "30px" }}>VẬY VỚI PHÉP CHIA CHO 0:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "40px", borderRadius: "24px", background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444" }}>
        0 × <span style={{ color: "#f59e0b" }}>?</span> = 10
      </div>
    </div>
  );
};

// ==========================================
// SCENE 06: TESTING EVERY NUMBER (16s - 21s)
// ==========================================
const Scene06TestingNumbers: React.FC = () => {
  const frame = useCurrentFrame();

  const tests = [
    { num: "1", result: "0" },
    { num: "10", result: "0" },
    { num: "1,000", result: "0" },
    { num: "1,000,000", result: "0" },
  ];

  const activeIdx = Math.min(3, Math.floor(frame / 35));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Thử thay mọi con số:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%", maxWidth: "800px" }}>
        {tests.slice(0, activeIdx + 1).map((t, idx) => (
          <div key={idx} style={{ fontSize: "48px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "20px 30px", borderRadius: "16px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)", display: "flex", justifyContent: "space-between" }}>
            <span>0 × {t.num}</span>
            <span style={{ color: "#ef4444" }}>= 0 (≠ 10)</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// SCENE 07: NO ANSWER (21s - 24s)
// ==========================================
const Scene07NoAnswer: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampSpring = spring({ frame: frame - 15, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ transform: `scale(${stampSpring})`, padding: "40px 60px", borderRadius: "28px", background: "rgba(239, 68, 68, 0.2)", border: "4px solid #ef4444", boxShadow: "0 0 60px rgba(239, 68, 68, 0.6)", textAlign: "center" }}>
        <div style={{ fontSize: "120px", marginBottom: "20px" }}>❌</div>
        <div style={{ fontSize: "56px", fontWeight: 900, color: "#ef4444", letterSpacing: "2px" }}>
          KHÔNG CÓ ĐÁP ÁN!
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 08: TWIST 0 ÷ 0 (24s - 27s)
// ==========================================
const Scene08TwistZeroZero: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 800, marginBottom: "30px" }}>NHƯNG PHÉP CHIA NÀY CÒN KỲ LẠ HƠN:</div>
      <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#c084fc" }}>
        0 ÷ 0 = <span style={{ color: "#f59e0b" }}>?</span>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 09: TOO MANY ANSWERS (27s - 33s)
// ==========================================
const Scene09TooManyAnswers: React.FC = () => {
  const frame = useCurrentFrame();

  const answers = ["? = 1", "? = 5", "? = 100", "? = -999", "? = π"];
  const count = Math.min(answers.length, Math.floor(frame / 30) + 1);

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "48px", fontWeight: 900, color: "#f59e0b", marginBottom: "40px" }}>0 × ? = 0 ➔ MỌI SỐ ĐỀU ĐÚNG!</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", justifyContent: "center" }}>
        {answers.slice(0, count).map((ans, idx) => (
          <div key={idx} style={{ fontSize: "48px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "20px 40px", borderRadius: "20px", background: "rgba(245, 158, 11, 0.2)", border: "2px solid #f59e0b" }}>
            {ans}
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// SCENE 10: SCREEN EXPLOSION (33s - 35s)
// ==========================================
const Scene10Explosion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const burstSpring = spring({ frame: frame - 20, fps, config: { damping: 8 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ transform: `scale(${burstSpring})`, padding: "40px 60px", borderRadius: "28px", background: "rgba(236, 72, 153, 0.2)", border: "4px solid #ec4899", boxShadow: "0 0 80px #ec4899", textAlign: "center" }}>
        <div style={{ fontSize: "64px", fontWeight: 900, color: "#ec4899" }}>
          💥 QUÁ NHIỀU ĐÁP ÁN!
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 11: CALL IT INFINITY? (35s - 38s)
// ==========================================
const Scene11Infinity: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "36px", color: "#94a3b8", marginBottom: "30px" }}>TẠI SAO KHÔNG CHO BẰNG VÔ CỰC?</div>
      <div style={{ fontSize: "140px", fontWeight: 900, color: "#38bdf8", textShadow: "0 0 60px rgba(56, 189, 248, 0.8)" }}>
        1 ÷ 0 = ∞ ?
      </div>
    </div>
  );
};

// ==========================================
// SCENE 12: APPROACHING 0 (38s - 44s)
// ==========================================
const Scene12ApproachingZero: React.FC = () => {
  const frame = useCurrentFrame();

  const steps = [
    { div: "1 ÷ 1", res: "1" },
    { div: "1 ÷ 0.5", res: "2" },
    { div: "1 ÷ 0.1", res: "10" },
    { div: "1 ÷ 0.01", res: "100" },
    { div: "1 ÷ 0.001", res: "1,000" },
  ];

  const idx = Math.min(4, Math.floor(frame / 30));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "36px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>Khi số chia càng tiến dần về 0:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "30px 50px", borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8" }}>
        {steps[idx].div} = <span style={{ color: "#10b981" }}>{steps[idx].res}</span>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 13: POSITIVE VS NEGATIVE INFINITY (44s - 47s)
// ==========================================
const Scene13SplitInfinity: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateRows: "1fr 1fr", gap: "20px", padding: "120px 40px 220px 40px" }}>
      <div style={{ borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "28px", color: "#38bdf8" }}>Tiến từ phía Dương (+):</div>
        <div style={{ fontSize: "72px", fontWeight: 900, color: "#38bdf8" }}>➔ + ∞</div>
      </div>
      <div style={{ borderRadius: "24px", background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
        <div style={{ fontSize: "28px", color: "#ef4444" }}>Tiến từ phía Âm (-):</div>
        <div style={{ fontSize: "72px", fontWeight: 900, color: "#ef4444" }}>➔ - ∞</div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 14: THE CRUCIAL QUESTION (47s - 50s)
// ==========================================
const Scene14CrucialQuestion: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "48px", fontWeight: 900, color: "#f8fafc", lineHeight: 1.3 }}>
        VẬY TẠI ĐÚNG SỐ 0...<br />
        <span style={{ color: "#f59e0b" }}>BẠN CHỌN VÔ CỰC NÀO?</span>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 15: CONCLUSION (50s - 54s)
// ==========================================
const Scene15Conclusion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const stampSpring = spring({ frame: frame - 15, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ transform: `scale(${stampSpring})`, padding: "40px 50px", borderRadius: "28px", background: "rgba(239, 68, 68, 0.2)", border: "4px solid #ef4444", boxShadow: "0 0 60px #ef4444", textAlign: "center" }}>
        <div style={{ fontSize: "40px", color: "#94a3b8", marginBottom: "10px" }}>PHÉP CHIA CHO 0:</div>
        <div style={{ fontSize: "64px", fontWeight: 900, color: "#ef4444", letterSpacing: "2px" }}>
          KHÔNG XÁC ĐỊNH
        </div>
        <div style={{ fontSize: "36px", color: "#f8fafc", marginTop: "10px", fontFamily: "'Fira Code', monospace" }}>
          (UNDEFINED)
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SCENE 16: OPEN LOOP ENDING (54s - 60s)
// ==========================================
const Scene16OpenLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const isFlash = frame >= 110;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      {!isFlash ? (
        <div style={{ fontSize: "44px", fontWeight: 900, color: "#c084fc", lineHeight: 1.4 }}>
          NHƯNG SỐ 0 VẪN CHƯA HẾT KỲ LẠ...<br />
          <span style={{ color: "#ffffff" }}>BỞI VÌ...</span>
        </div>
      ) : (
        <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#f59e0b", textShadow: "0 0 50px #f59e0b" }}>
          0⁰ = ?
        </div>
      )}
    </div>
  );
};
