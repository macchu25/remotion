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

// ===========================================================================
// ONE SOURCE OF TRUTH — 100% FRAME-LOCKED TO INDIVIDUAL VOICE SENTENCE AUDIO
// Each scene's duration is EXACTLY equal to its sentence audio duration.
// No scene will ever change before the voice finishes speaking its topic!
// Total Composition Duration: 2931 frames (97.70 seconds @ 30 FPS)
// ===========================================================================

export const cues = [
  { index: 0, text: "❓ Quy tắc ai cũng học thuộc... nhưng hiếm ai giải thích tại sao.", frames: 181, startFrame: 0, endFrame: 181 },
  { index: 1, text: "➖ Tại sao hai số ÂM nhân nhau... lại biến thành số DƯƠNG?", frames: 142, startFrame: 181, endFrame: 323 },
  { index: 2, text: "🗑️ Không phải vì toán học tự nhiên quyết định hai cái âm thành dương.", frames: 172, startFrame: 323, endFrame: 495 },
  { index: 3, text: "📊 Hãy nghĩ phép nhân là một chuyển động trên TRỤC SỐ.", frames: 112, startFrame: 495, endFrame: 607 },
  { index: 4, text: "➡️ Ba nhân hai: ta tiến 3 đơn vị, 2 lần. (3 × 2 = 6)", frames: 132, startFrame: 607, endFrame: 739 },
  { index: 5, text: "🔄 Nhưng nếu đổi 2 thành (-2) ➔ Hướng chuyển động bị ĐẢO NGƯỢC.", frames: 161, startFrame: 739, endFrame: 900 },
  { index: 6, text: "⚡ Một dấu âm (−), về bản chất = LỆNH ĐẢO HƯỚNG!", frames: 161, startFrame: 900, endFrame: 1061 },
  { index: 7, text: "↩️ Vậy nhân với âm 1 lần ➔ Nó quay bạn lại 180°.", frames: 99, startFrame: 1061, endFrame: 1160 },
  { index: 8, text: "↪️ Nhân với số âm thêm 1 lần nữa ➔ ĐẢO HƯỚNG LẦN THỨ 2!", frames: 172, startFrame: 1160, endFrame: 1332 },
  { index: 9, text: "🎯 180° + 180° = 360° ➔ Trở lại HƯỚNG BAN ĐẦU (+1)! Đó là trực giác.", frames: 170, startFrame: 1332, endFrame: 1502 },
  { index: 10, text: "📐 Nhưng toán học còn ÉP kết quả bắt buộc phải là số dương.", frames: 107, startFrame: 1502, endFrame: 1609 },
  { index: 11, text: "🔢 Ta biết: 1 + (-1) = 0.", frames: 85, startFrame: 1609, endFrame: 1694 },
  { index: 12, text: "✍️ Vì vậy: (-1) × [1 + (-1)] = 0.", frames: 148, startFrame: 1694, endFrame: 1842 },
  { index: 13, text: "🧩 Phân phối (-1) vào: (-1 × 1) + [(-1) × (-1)] = 0.", frames: 230, startFrame: 1842, endFrame: 2072 },
  { index: 14, text: "🧩 -1 + ? = 0 ➔ Số nào cộng với -1 để bằng 0? CHỈ CÓ +1!", frames: 139, startFrame: 2072, endFrame: 2211 },
  { index: 15, text: "✅ (-1) × (-1) = +1 ➔ ÂM × ÂM BẮT BUỘC THÀNH DƯƠNG!", frames: 246, startFrame: 2211, endFrame: 2457 },
  { index: 16, text: "⚠️ Nếu quy tắc này sai, logic số học sẽ TỰ MÂU THUẪN!", frames: 199, startFrame: 2457, endFrame: 2656 },
  { index: 17, text: "❓ Nhưng làm sao CĂN BẬC HAI CỦA ÂM MỘT (√-1 = i) lại tồn tại?", frames: 275, startFrame: 2656, endFrame: 2931 },
];

export const NegativeTimesNegativeShort: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPercent = (frame / durationInFrames) * 100;

  // Background Music Volume (Subtle 0.08, cut to 0 in payoffs)
  let musicVolume = 0.08;
  if ((frame >= 1332 && frame <= 1502) || (frame >= 2656)) {
    musicVolume = 0.0;
  }

  const currentCap = cues.find((c) => frame >= c.startFrame && frame < c.endFrame);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #070a12 0%, #0d1322 50%, #020409 100%)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Background BGM */}
      <Audio src={staticFile("math_bgm.wav")} volume={musicVolume} loop />

      {/* ===== RETENTION PROGRESS BAR ===== */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", zIndex: 200 }}>
        <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #ef4444, #c084fc, #10b981)", boxShadow: "0 0 15px #c084fc" }} />
      </div>

      {/* ===== 18 VOICE-LOCKED SCENES (EACH IN ITS OWN SEQUENCED TIME-SLOT) ===== */}

      {/* Scene 0: Hook */}
      <Sequence from={cues[0].startFrame} durationInFrames={cues[0].frames}>
        <Audio src={staticFile("audio/voice/sentence_0.mp3")} volume={1.0} />
        <Scene01Hook />
      </Sequence>

      {/* Scene 1: Question */}
      <Sequence from={cues[1].startFrame} durationInFrames={cues[1].frames}>
        <Audio src={staticFile("audio/voice/sentence_1.mp3")} volume={1.0} />
        <Scene02Question />
      </Sequence>

      {/* Scene 2: Don't Memorize */}
      <Sequence from={cues[2].startFrame} durationInFrames={cues[2].frames}>
        <Audio src={staticFile("audio/voice/sentence_2.mp3")} volume={1.0} />
        <Scene03DontMemorize />
      </Sequence>

      {/* Scene 3: Number Line Intro */}
      <Sequence from={cues[3].startFrame} durationInFrames={cues[3].frames}>
        <Audio src={staticFile("audio/voice/sentence_3.mp3")} volume={1.0} />
        <Scene04NumberLineIntro />
      </Sequence>

      {/* Scene 4: 3 x 2 = 6 */}
      <Sequence from={cues[4].startFrame} durationInFrames={cues[4].frames}>
        <Audio src={staticFile("audio/voice/sentence_4.mp3")} volume={1.0} />
        <Scene04BThreeTimesTwo />
      </Sequence>

      {/* Scene 5: Direction Inversion */}
      <Sequence from={cues[5].startFrame} durationInFrames={cues[5].frames}>
        <Audio src={staticFile("audio/voice/sentence_5.mp3")} volume={1.0} />
        <Scene05DirectionInversion />
      </Sequence>

      {/* Scene 6: Core Concept */}
      <Sequence from={cues[6].startFrame} durationInFrames={cues[6].frames}>
        <Audio src={staticFile("audio/voice/sentence_6.mp3")} volume={1.0} />
        <Scene06CoreConcept />
      </Sequence>

      {/* Scene 7: 1st Flip */}
      <Sequence from={cues[7].startFrame} durationInFrames={cues[7].frames}>
        <Audio src={staticFile("audio/voice/sentence_7.mp3")} volume={1.0} />
        <Scene07FirstFlip />
      </Sequence>

      {/* Scene 8: 2nd Flip */}
      <Sequence from={cues[8].startFrame} durationInFrames={cues[8].frames}>
        <Audio src={staticFile("audio/voice/sentence_8.mp3")} volume={1.0} />
        <Scene08SecondFlip />
      </Sequence>

      {/* Scene 9: Intuition Payoff */}
      <Sequence from={cues[9].startFrame} durationInFrames={cues[9].frames}>
        <Audio src={staticFile("audio/voice/sentence_9.mp3")} volume={1.0} />
        <Scene09IntuitionPayoff />
      </Sequence>

      {/* Scene 10: Transition Proof */}
      <Sequence from={cues[10].startFrame} durationInFrames={cues[10].frames}>
        <Audio src={staticFile("audio/voice/sentence_10.mp3")} volume={1.0} />
        <Scene10TransitionProof />
      </Sequence>

      {/* Scene 11: Proof Start */}
      <Sequence from={cues[11].startFrame} durationInFrames={cues[11].frames}>
        <Audio src={staticFile("audio/voice/sentence_11.mp3")} volume={1.0} />
        <Scene11ProofStart />
      </Sequence>

      {/* Scene 12: Equation Setup */}
      <Sequence from={cues[12].startFrame} durationInFrames={cues[12].frames}>
        <Audio src={staticFile("audio/voice/sentence_12.mp3")} volume={1.0} />
        <Scene12EquationSetup />
      </Sequence>

      {/* Scene 13: Distributive Expansion */}
      <Sequence from={cues[13].startFrame} durationInFrames={cues[13].frames}>
        <Audio src={staticFile("audio/voice/sentence_13.mp3")} volume={1.0} />
        <Scene13DistributiveDiagram />
      </Sequence>

      {/* Scene 14: Puzzle Lock */}
      <Sequence from={cues[14].startFrame} durationInFrames={cues[14].frames}>
        <Audio src={staticFile("audio/voice/sentence_14.mp3")} volume={1.0} />
        <Scene14PuzzleLock />
      </Sequence>

      {/* Scene 15: Conclusion */}
      <Sequence from={cues[15].startFrame} durationInFrames={cues[15].frames}>
        <Audio src={staticFile("audio/voice/sentence_15.mp3")} volume={1.0} />
        <Scene15Conclusion />
      </Sequence>

      {/* Scene 16: Contradiction Twist */}
      <Sequence from={cues[16].startFrame} durationInFrames={cues[16].frames}>
        <Audio src={staticFile("audio/voice/sentence_16.mp3")} volume={1.0} />
        <Scene16ContradictionTwist />
      </Sequence>

      {/* Scene 17: Open Loop Ending */}
      <Sequence from={cues[17].startFrame} durationInFrames={cues[17].frames}>
        <Audio src={staticFile("audio/voice/sentence_17.mp3")} volume={1.0} />
        <Scene17OpenLoop />
      </Sequence>

      {/* ===== KINETIC SUBTITLE OVERLAY ===== */}
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
          background: "rgba(3, 7, 18, 0.94)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(192, 132, 252, 0.5)",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.9)",
          textAlign: "center",
          zIndex: 150,
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: 800, color: "#ffffff", lineHeight: 1.45, textShadow: "0 2px 10px rgba(0,0,0,0.9)" }}>
          {currentCap ? currentCap.text : "..."}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// ==========================================
// SCENE COMPONENTS (HOLD EXACT DURATION OF EACH SENTENCE)
// ==========================================

const Scene01Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const minus2Spring = spring({ frame: frame - 25, fps, config: { damping: 10 } });
  const zoom = interpolate(frame, [0, 181], [1.0, 1.25], { extrapolateRight: "clamp" });
  const isPlus = frame >= 80;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", transform: `scale(${zoom})` }}>
      <div style={{ fontSize: "36px", fontWeight: 900, color: "#c084fc", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px" }}>
        ❓ TẠI SAO?
      </div>
      <div style={{ fontSize: "120px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ffffff", display: "flex", gap: "24px", alignItems: "center" }}>
        <span style={{ color: "#ef4444" }}>−</span>
        <span style={{ color: "#38bdf8" }}>×</span>
        <span style={{ color: "#ef4444", transform: `rotate(${minus2Spring * 180}deg) scale(${minus2Spring})`, display: "inline-block" }}>−</span>
        <span>=</span>
        <span style={{ color: isPlus ? "#10b981" : "#f59e0b", fontSize: "140px", textShadow: isPlus ? "0 0 40px #10b981" : "none" }}>{isPlus ? "+" : "?"}</span>
      </div>
    </div>
  );
};

const Scene02Question: React.FC = () => {
  const frame = useCurrentFrame();
  const isRevealed = frame >= 50;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "40px 50px", borderRadius: "28px", background: "rgba(255, 255, 255, 0.05)", border: "2px solid #c084fc", textAlign: "center" }}>
        (-3) × (-2) = <span style={{ color: "#10b981", background: isRevealed ? "transparent" : "#1e1e2e", padding: "4px 16px", borderRadius: "8px" }}>{isRevealed ? "+6" : "██"}</span>
      </div>
    </div>
  );
};

const Scene03DontMemorize: React.FC = () => {
  const frame = useCurrentFrame();
  const dragY = interpolate(frame, [30, 90], [0, 300], { extrapolateRight: "clamp" });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px" }}>
      <div style={{ width: "100%", padding: "50px 30px", borderRadius: "28px", background: "#1b2820", border: "4px solid #344e41", boxShadow: "0 20px 50px rgba(0,0,0,0.8)", textAlign: "center" }}>
        <div style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", fontFamily: "'Fira Code', monospace", marginBottom: "30px" }}>
          Âm × Âm = Dương
        </div>
        <div style={{ fontSize: "36px", fontWeight: 900, color: "#ef4444", textDecoration: "line-through", transform: `translateY(${dragY}px)` }}>
          🗑️ HỌC THUỘC LÒNG
        </div>
      </div>
    </div>
  );
};

const Scene04NumberLineIntro: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 30px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>Phép nhân là gì?</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#ffffff", padding: "30px 40px", borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8" }}>
        📊 CHUYỂN ĐỘNG TRÊN TRỤC SỐ
      </div>
    </div>
  );
};

const Scene04BThreeTimesTwo: React.FC = () => {
  const frame = useCurrentFrame();
  const jumpIdx = Math.min(2, Math.floor(frame / 45));
  const dotX = [0, 3, 6][jumpIdx];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 30px" }}>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", marginBottom: "40px" }}>
        3 × 2 = 6
      </div>

      <div style={{ position: "relative", width: "100%", height: "120px", display: "flex", alignItems: "center", justifyContent: "space-around", background: "rgba(255,255,255,0.05)", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.1)" }}>
        {[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} style={{ fontSize: "24px", fontWeight: "bold", color: num === dotX ? "#10b981" : "#94a3b8" }}>
            {num}
          </div>
        ))}
        <div style={{ position: "absolute", bottom: "70px", left: `${((dotX + 4) / 10) * 88 + 6}%`, width: "24px", height: "24px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 20px #10b981", transition: "left 0.3s ease" }} />
      </div>
    </div>
  );
};

const Scene05DirectionInversion: React.FC = () => {
  const frame = useCurrentFrame();
  const jumpIdx = Math.min(2, Math.floor(frame / 50));
  const dotX = [0, -3, -6][jumpIdx];

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 30px" }}>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ef4444", marginBottom: "40px" }}>
        3 × (-2) = -6
      </div>

      <div style={{ position: "relative", width: "100%", height: "120px", display: "flex", alignItems: "center", justifyContent: "space-around", background: "rgba(239,68,68,0.1)", borderRadius: "20px", border: "1px solid #ef4444" }}>
        {[-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4].map((num) => (
          <div key={num} style={{ fontSize: "24px", fontWeight: "bold", color: num === dotX ? "#ef4444" : "#94a3b8" }}>
            {num}
          </div>
        ))}
        <div style={{ position: "absolute", bottom: "70px", left: `${((dotX + 6) / 10) * 88 + 6}%`, width: "24px", height: "24px", borderRadius: "50%", background: "#ef4444", boxShadow: "0 0 20px #ef4444", transition: "left 0.3s ease" }} />
      </div>
    </div>
  );
};

const Scene06CoreConcept: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowRotate = spring({ frame: frame - 30, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "44px", fontWeight: 900, color: "#c084fc", marginBottom: "40px" }}>
        BẢN CHẤT DẤU ÂM (−):
      </div>
      <div style={{ fontSize: "72px", fontWeight: 900, color: "#ef4444", padding: "30px 50px", borderRadius: "24px", background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444", marginBottom: "50px" }}>
        − = LỆNH ĐẢO HƯỚNG!
      </div>
      <div style={{ fontSize: "140px", color: "#38bdf8", transform: `rotate(${arrowRotate * 180}deg)`, transition: "transform 0.1s ease" }}>
        ➔
      </div>
    </div>
  );
};

const Scene07FirstFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotateSpring = spring({ frame: frame - 20, fps, config: { damping: 12 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#f59e0b", fontWeight: 800, marginBottom: "30px" }}>LẦN ĐẢO THỨ 1: × (-1)</div>
      <div style={{ fontSize: "140px", color: "#ef4444", transform: `rotate(${rotateSpring * 180}deg)` }}>
        ➔
      </div>
      <div style={{ fontSize: "32px", color: "#cbd5e1", marginTop: "40px" }}>Quay bạn 180° lại phía sau (←)</div>
    </div>
  );
};

const Scene08SecondFlip: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const rotateSpring = spring({ frame: frame - 30, fps, config: { damping: 12 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>LẦN ĐẢO THỨ 2: × (-1) NỮA!</div>
      <div style={{ fontSize: "140px", color: "#10b981", transform: `rotate(${180 + rotateSpring * 180}deg)` }}>
        ➔
      </div>
      <div style={{ fontSize: "32px", color: "#cbd5e1", marginTop: "40px" }}>Đảo tiếp 180° trở về hướng cũ (➔)!</div>
    </div>
  );
};

const Scene09IntuitionPayoff: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popSpring = spring({ frame: frame - 30, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>180° + 180° = 360°</div>
      <div style={{ transform: `scale(${popSpring})`, padding: "40px 60px", borderRadius: "28px", background: "rgba(16, 185, 129, 0.2)", border: "4px solid #10b981", boxShadow: "0 0 60px #10b981" }}>
        <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981" }}>
          (-1) × (-1) = +1
        </div>
      </div>
    </div>
  );
};

const Scene10TransitionProof: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#94a3b8", marginBottom: "30px" }}>ĐÓ MỚI CHỈ LÀ TRỰC GIÁC...</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#c084fc", padding: "30px 40px", borderRadius: "24px", background: "rgba(192, 132, 252, 0.15)", border: "2px solid #c084fc" }}>
        📐 CHỨNG MINH TOÁN HỌC CHÍNH THỨC
      </div>
    </div>
  );
};

const Scene11ProofStart: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Sự thật hiển nhiên:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "30px 40px", borderRadius: "24px", background: "rgba(255, 255, 255, 0.05)", border: "2px solid #38bdf8" }}>
        1 + (-1) = 0
      </div>
    </div>
  );
};

const Scene12EquationSetup: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Nhân (-1) vào hai vế:</div>
      <div style={{ fontSize: "56px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#38bdf8", padding: "30px", borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8" }}>
        (-1) × [1 + (-1)] = 0
      </div>
    </div>
  );
};

const Scene13DistributiveDiagram: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#f59e0b", fontWeight: 800, marginBottom: "30px" }}>Phân phối (-1) vào bên trong:</div>
      <div style={{ fontSize: "44px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "30px", borderRadius: "24px", background: "rgba(245, 158, 11, 0.15)", border: "2px solid #f59e0b", width: "100%" }}>
        [(-1) × 1] + [(-1) × (-1)] = 0
      </div>
      <div style={{ fontSize: "52px", fontWeight: 900, fontFamily: "'Fira Code', monospace", marginTop: "30px", color: "#10b981" }}>
        -1 + <span style={{ color: "#ef4444" }}>[(-1) × (-1)]</span> = 0
      </div>
    </div>
  );
};

const Scene14PuzzleLock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lockSpring = spring({ frame: frame - 60, fps, config: { damping: 12 } });
  const isLocked = frame >= 60;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Số nào cộng với (-1) để bằng 0?</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "40px", borderRadius: "28px", background: "rgba(255, 255, 255, 0.05)", border: "2px solid #10b981", width: "100%" }}>
        -1 + <span style={{ color: "#10b981", background: "rgba(16, 185, 129, 0.2)", padding: "8px 20px", borderRadius: "12px", transform: `scale(${isLocked ? lockSpring : 1})`, display: "inline-block" }}>{isLocked ? "+1" : "?"}</span> = 0
      </div>
    </div>
  );
};

const Scene15Conclusion: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>VÌ THẾ:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", marginBottom: "40px" }}>
        (-1) × (-1) = +1
      </div>
      <div style={{ fontSize: "52px", fontWeight: 900, color: "#38bdf8", padding: "20px 40px", borderRadius: "20px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8" }}>
        (−a) × (−b) = +ab
      </div>
    </div>
  );
};

const Scene16ContradictionTwist: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "30px" }}>NẾU QUY TẮC NÀY SAI:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ef4444", padding: "30px", borderRadius: "24px", background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444", marginBottom: "30px" }}>
        0 = -2  |  1 = -1
      </div>
      <div style={{ fontSize: "32px", color: "#f59e0b", fontWeight: 700 }}>
        ⚠️ Toàn bộ logic số học sẽ tự sụp đổ & mâu thuẫn!
      </div>
    </div>
  );
};

const Scene17OpenLoop: React.FC = () => {
  const frame = useCurrentFrame();
  const isCutBlack = frame >= 240;

  if (isCutBlack) {
    return <AbsoluteFill style={{ background: "#000000" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 800, marginBottom: "30px" }}>NHƯNG SỐ ÂM CÒN KỲ LẠ HƠN...</div>
      <div style={{ fontSize: "110px", fontWeight: 900, color: "#38bdf8", textShadow: "0 0 50px #38bdf8", marginBottom: "20px" }}>
        √-1 = i ?
      </div>
      <div style={{ fontSize: "36px", fontWeight: 900, color: "#f59e0b" }}>
        SỐ ẢO THỰC SỰ LÀ GÌ?
      </div>
    </div>
  );
};
