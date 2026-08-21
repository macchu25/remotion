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
import { z } from "zod";

export const primeCompSchema = z.object({
  playbackSpeed: z
    .number()
    .min(0.5)
    .max(5.0)
    .step(0.05)
    .default(1.0)
    .describe("Tốc độ video (Cho phép nhập số lẻ tinh chỉnh e.g. 1.05, 1.15, 1.35)"),
  bgmVolume: z
    .number()
    .min(0.0)
    .max(1.0)
    .step(0.01)
    .default(0.08)
    .describe("Âm lượng Nhạc Nền (Cho phép nhập từ 0.00 đến 1.00 e.g. 0.03, 0.08, 0.15)"),
  bgmEnabled: z
    .boolean()
    .default(true)
    .describe("Bật / Tắt Nhạc Nền df.mp3 (ON / OFF)"),
});

// ===========================================================================
// ONE SOURCE OF TRUTH — DYNAMIC SPEED-CONTROLLABLE TIMELINE
// Voice is Master Clock. Each scene's start & duration scales with playbackSpeed.
// ===========================================================================

export const cues = [
  { index: 0, text: "🔒 Có một thứ giúp bảo vệ dữ liệu trên Internet…", frames: 276, startFrame: 0, endFrame: 276 },
  { index: 1, text: "⚡ Nhân hai số với nhau cực dễ. (61 × 53 = 3233)", frames: 81, startFrame: 276, endFrame: 357 },
  { index: 2, text: "❓ Nhưng nếu tôi chỉ đưa bạn 3233... 3233 = ? × ?", frames: 312, startFrame: 357, endFrame: 669 },
  { index: 3, text: "✅ Với một số nhỏ như thế này, chẳng khó chút nào.", frames: 122, startFrame: 669, endFrame: 791 },
  { index: 4, text: "📜 Nhưng bây giờ, hãy dùng hai số nguyên tố HÀNG TRĂM CHỮ SỐ!", frames: 158, startFrame: 791, endFrame: 949 },
  { index: 5, text: "⚡ Máy tính vẫn có thể nhân chúng RẤT NHANH (P × Q → N)", frames: 92, startFrame: 949, endFrame: 1041 },
  { index: 6, text: "💥 Nhưng từ N mà tìm lại P & Q ➔ Bài toán KHÓ KHỦNG KHIẾP!", frames: 235, startFrame: 1041, endFrame: 1276 },
  { index: 7, text: "🧩 Phân Tích Thừa Số Nguyên Tố (PRIME FACTORIZATION)", frames: 156, startFrame: 1276, endFrame: 1432 },
  { index: 8, text: "🔑 Ý tưởng đứng sau MẬT MÃ KHÓA CÔNG KHAI RSA!", frames: 199, startFrame: 1432, endFrame: 1631 },
  { index: 9, text: "🛡️ KHÓA CÔNG KHAI (Public Key) ➔ Mã hóa dễ, giải mã bí mật!", frames: 329, startFrame: 1631, endFrame: 1960 },
  { index: 10, text: "🎯 Đó là cái hay!", frames: 48, startFrame: 1960, endFrame: 2008 },
  { index: 11, text: "🟢 Tạo ra bài toán thì DỄ…", frames: 68, startFrame: 2008, endFrame: 2076 },
  { index: 12, text: "🔴 Nhưng ĐẢO NGƯỢC NÓ THÌ KHÓ!", frames: 68, startFrame: 2076, endFrame: 2144 },
  { index: 13, text: "🔒 Sự bất đối xứng DỄ - KHÓ trở thành LỚP BẢO VỆ INTERNET!", frames: 225, startFrame: 2144, endFrame: 2369 },
  { index: 14, text: "⚛️ Nhưng MÁY TÍNH LƯỢNG TỬ đủ mạnh có thể gây rắc rối!", frames: 239, startFrame: 2369, endFrame: 2608 },
  { index: 15, text: "❓ Máy tính lượng tử phá RSA như thế nào? (SHOR'S ALGORITHM)", frames: 144, startFrame: 2608, endFrame: 2752 },
];

export const PrimeProtectionShort: React.FC<z.infer<typeof primeCompSchema>> = ({
  playbackSpeed = 1.0,
  bgmVolume = 0.08,
  bgmEnabled = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPercent = (frame / durationInFrames) * 100;
  const unscaledFrame = Math.round(frame * playbackSpeed);

  // Audio Music Ducking
  let effectiveVolume = bgmEnabled ? bgmVolume : 0.0;
  if ((unscaledFrame >= 2144 && unscaledFrame <= 2369) || unscaledFrame >= 2650) {
    effectiveVolume = 0.0;
  }

  const currentCap = cues.find((c) => unscaledFrame >= c.startFrame && unscaledFrame < c.endFrame);

  const getSeqStart = (sf: number) => Math.round(sf / playbackSpeed);
  const getSeqDur = (f: number) => Math.round(f / playbackSpeed);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #030712 0%, #0b1329 50%, #010308 100%)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* ===== RETENTION PROGRESS BAR ===== */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", zIndex: 200 }}>
        <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #38bdf8, #c084fc, #10b981)", boxShadow: "0 0 15px #38bdf8" }} />
      </div>

      {/* ===== 16 SCENE SEQUENCES (SPEED SCALED FOR DYNAMIC PLAYBACK) ===== */}

      {/* Scene 0: Hook */}
      <Sequence from={getSeqStart(cues[0].startFrame)} durationInFrames={getSeqDur(cues[0].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_0.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(10)}><Audio src={staticFile("audio/sfx_prime/forward_sweep.wav")} volume={0.25} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(140)}><Audio src={staticFile("audio/sfx_prime/cyber_lock.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene01Hook />
      </Sequence>

      {/* Scene 1: Multiplication Easy */}
      <Sequence from={getSeqStart(cues[1].startFrame)} durationInFrames={getSeqDur(cues[1].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_1.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(10)}><Audio src={staticFile("audio/sfx_prime/digital_click.wav")} volume={0.25} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_prime/easy_lock.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene02EasyMultiplication />
      </Sequence>

      {/* Scene 2: Reverse Question */}
      <Sequence from={getSeqStart(cues[2].startFrame)} durationInFrames={getSeqDur(cues[2].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_2.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_prime/reverse_glitch.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(120)}><Audio src={staticFile("audio/sfx_prime/branch_tick.wav")} volume={0.2} playbackRate={playbackSpeed} /></Sequence>
        <Scene03ReverseQuestion />
      </Sequence>

      {/* Scene 3: Small Numbers Done */}
      <Sequence from={getSeqStart(cues[3].startFrame)} durationInFrames={getSeqDur(cues[3].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_3.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_prime/easy_lock.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene04SmallNumbersDone />
      </Sequence>

      {/* Scene 4: Scale Up Hundreds Digits */}
      <Sequence from={getSeqStart(cues[4].startFrame)} durationInFrames={getSeqDur(cues[4].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_4.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(15)}><Audio src={staticFile("audio/sfx_prime/reverse_glitch.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene05ScaleUp />
      </Sequence>

      {/* Scene 5: Fast Multiplication */}
      <Sequence from={getSeqStart(cues[5].startFrame)} durationInFrames={getSeqDur(cues[5].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_5.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_prime/forward_sweep.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene06FastMultiplication />
      </Sequence>

      {/* Scene 6: Hard Factorization */}
      <Sequence from={getSeqStart(cues[6].startFrame)} durationInFrames={getSeqDur(cues[6].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_6.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_prime/reverse_glitch.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene07HardFactorization />
      </Sequence>

      {/* Scene 7: Definition Prime Factorization */}
      <Sequence from={getSeqStart(cues[7].startFrame)} durationInFrames={getSeqDur(cues[7].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_7.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_prime/digital_click.wav")} volume={0.25} playbackRate={playbackSpeed} /></Sequence>
        <Scene08Definition />
      </Sequence>

      {/* Scene 8: RSA Reveal */}
      <Sequence from={getSeqStart(cues[8].startFrame)} durationInFrames={getSeqDur(cues[8].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_8.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_prime/cyber_lock.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene09RSAReveal />
      </Sequence>

      {/* Scene 9: Public Key Encryption */}
      <Sequence from={getSeqStart(cues[9].startFrame)} durationInFrames={getSeqDur(cues[9].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_9.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_prime/forward_sweep.wav")} volume={0.25} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(180)}><Audio src={staticFile("audio/sfx_prime/branch_tick.wav")} volume={0.2} playbackRate={playbackSpeed} /></Sequence>
        <Scene10PublicKeyEncryption />
      </Sequence>

      {/* Scene 10: Core Concept Short */}
      <Sequence from={getSeqStart(cues[10].startFrame)} durationInFrames={getSeqDur(cues[10].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_10.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene11CoreConceptShort />
      </Sequence>

      {/* Scene 11: Forward Easy */}
      <Sequence from={getSeqStart(cues[11].startFrame)} durationInFrames={getSeqDur(cues[11].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_11.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(10)}><Audio src={staticFile("audio/sfx_prime/forward_sweep.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene12ForwardEasy />
      </Sequence>

      {/* Scene 12: Reverse Hard */}
      <Sequence from={getSeqStart(cues[12].startFrame)} durationInFrames={getSeqDur(cues[12].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_12.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(10)}><Audio src={staticFile("audio/sfx_prime/reverse_glitch.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene13ReverseHard />
      </Sequence>

      {/* Scene 13: VISUAL PAYOFF - Cyber Shield Lock */}
      <Sequence from={getSeqStart(cues[13].startFrame)} durationInFrames={getSeqDur(cues[13].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_13.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(50)}><Audio src={staticFile("audio/sfx_prime/cyber_lock.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(120)}><Audio src={staticFile("audio/sfx_prime/metallic_resolve.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene14VisualPayoffLock />
      </Sequence>

      {/* Scene 14: Quantum Computer Twist */}
      <Sequence from={getSeqStart(cues[14].startFrame)} durationInFrames={getSeqDur(cues[14].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_14.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_prime/quantum_riser.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene15QuantumTwist />
      </Sequence>

      {/* Scene 15: Open Loop Ending */}
      <Sequence from={getSeqStart(cues[15].startFrame)} durationInFrames={getSeqDur(cues[15].frames)}>
        <Audio src={staticFile("audio/voice_prime/sentence_15.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene16OpenLoopEnding />
      </Sequence>

      {/* ===== KINETIC CAPCUT STYLE SUBTITLES ===== */}
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
          border: "2px solid rgba(56, 189, 248, 0.5)",
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

  const prime1Spring = spring({ frame: frame - 15, fps, config: { damping: 12 } });
  const prime2Spring = spring({ frame: frame - 25, fps, config: { damping: 12 } });
  const collide = frame >= 60;
  const isQuestion = frame >= 180;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", fontWeight: 900, color: "#38bdf8", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "40px" }}>
        🔒 BẢO VỆ INTERNET
      </div>

      {!isQuestion ? (
        <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", display: "flex", gap: "24px", alignItems: "center" }}>
          <span style={{ color: "#c084fc", transform: `translateX(${(1 - prime1Spring) * -200}px)` }}>61</span>
          <span style={{ color: "#cbd5e1" }}>×</span>
          <span style={{ color: "#10b981", transform: `translateX(${(1 - prime2Spring) * 200}px)` }}>53</span>
          {collide && <span style={{ color: "#38bdf8", padding: "10px 24px", borderRadius: "16px", background: "rgba(56, 189, 248, 0.2)", border: "2px solid #38bdf8" }}>= 3233</span>}
        </div>
      ) : (
        <div style={{ padding: "40px 50px", borderRadius: "28px", background: "rgba(239, 68, 68, 0.15)", border: "3px solid #ef4444", boxShadow: "0 0 60px rgba(239, 68, 68, 0.5)" }}>
          <div style={{ fontSize: "40px", fontWeight: 900, color: "#ef4444", marginBottom: "20px" }}>NHƯNG...</div>
          <div style={{ fontSize: "80px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ffffff" }}>
            3233 = <span style={{ color: "#f59e0b" }}>? × ?</span>
          </div>
        </div>
      )}
    </div>
  );
};

const Scene02EasyMultiplication: React.FC = () => {
  const frame = useCurrentFrame();

  const progress = Math.min(100, Math.floor((frame / 40) * 100));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "20px" }}>DỄ: CHIỀU XUÔI</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", marginBottom: "40px" }}>
        61 × 53 = 3233
      </div>
      <div style={{ width: "80%", height: "24px", borderRadius: "12px", background: "rgba(255,255,255,0.1)", overflow: "hidden", border: "1px solid #10b981" }}>
        <div style={{ height: "100%", width: `${progress}%`, background: "#10b981", boxShadow: "0 0 20px #10b981" }} />
      </div>
      <div style={{ fontSize: "28px", color: "#cbd5e1", marginTop: "20px" }}>Tính toán 0.0001s</div>
    </div>
  );
};

const Scene03ReverseQuestion: React.FC = () => {
  const frame = useCurrentFrame();

  const tries = ["7 × ?", "11 × ?", "17 × ?", "31 × ?", "47 × ?", "61 × 53 ✓"];
  const activeIdx = Math.min(tries.length - 1, Math.floor(frame / 45));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "20px" }}>KHÓ: CHIỀU NGƯỢC</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ffffff", marginBottom: "40px" }}>
        3233
      </div>
      <div style={{ fontSize: "44px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: activeIdx === 5 ? "#10b981" : "#f59e0b", padding: "20px 40px", borderRadius: "20px", background: activeIdx === 5 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.15)", border: `2px solid ${activeIdx === 5 ? "#10b981" : "#f59e0b"}` }}>
        Thử: {tries[activeIdx]}
      </div>
    </div>
  );
};

const Scene04SmallNumbersDone: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "20px" }}>Với số nhỏ như 3233:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", padding: "30px 40px", borderRadius: "24px", background: "rgba(16, 185, 129, 0.15)", border: "2px solid #10b981" }}>
        3233 ➔ 61 × 53 (DONE)
      </div>
    </div>
  );
};

const Scene05ScaleUp: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 900, marginBottom: "30px" }}>NHƯNG NẾU DÙNG SỐ NGUYÊN TỐ LỚN:</div>
      <div style={{ fontSize: "28px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#38bdf8", wordBreak: "break-all", background: "rgba(56, 189, 248, 0.1)", padding: "20px", borderRadius: "16px", border: "1px solid #38bdf8", width: "100%" }}>
        P = 98245165304918273645... (150 chữ số)
      </div>
      <div style={{ fontSize: "32px", color: "#ffffff", margin: "10px 0" }}>×</div>
      <div style={{ fontSize: "28px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", wordBreak: "break-all", background: "rgba(16, 185, 129, 0.1)", padding: "20px", borderRadius: "16px", border: "1px solid #10b981", width: "100%" }}>
        Q = 96174894103847261543... (150 chữ số)
      </div>
    </div>
  );
};

const Scene06FastMultiplication: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>MÁY TÍNH NHÂN CHIỀU XUÔI:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", padding: "30px 50px", borderRadius: "24px", background: "rgba(16, 185, 129, 0.2)", border: "3px solid #10b981", boxShadow: "0 0 50px #10b981" }}>
        P × Q ➔ N (RẤT NHANH!)
      </div>
    </div>
  );
};

const Scene07HardFactorization: React.FC = () => {
  const frame = useCurrentFrame();
  const branchCount = Math.min(1000000, Math.floor(Math.pow(frame, 3) * 100));

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "20px" }}>TÌM NGƯỢC TỪ N ➔ P & Q:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, color: "#ef4444", padding: "30px 40px", borderRadius: "24px", background: "rgba(239, 68, 68, 0.15)", border: "2px solid #ef4444", marginBottom: "30px" }}>
        KHÓ KHỦNG KHIẾP!
      </div>
      <div style={{ fontSize: "32px", fontFamily: "'Fira Code', monospace", color: "#f59e0b" }}>
        Số nhánh cần thử: {branchCount.toLocaleString()}...
      </div>
    </div>
  );
};

const Scene08Definition: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "32px", color: "#94a3b8", marginBottom: "20px" }}>TÊN GỌI TOÁN HỌC:</div>
      <div style={{ fontSize: "52px", fontWeight: 900, color: "#38bdf8", padding: "30px", borderRadius: "24px", background: "rgba(56, 189, 248, 0.15)", border: "2px solid #38bdf8", marginBottom: "20px" }}>
        PRIME FACTORIZATION
      </div>
      <div style={{ fontSize: "32px", color: "#cbd5e1" }}>Phân tích thừa số nguyên tố</div>
    </div>
  );
};

const Scene09RSAReveal: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 800, marginBottom: "30px" }}>Ý TƯỞNG ĐỨNG SAU:</div>
      <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#c084fc", padding: "40px 60px", borderRadius: "28px", background: "rgba(192, 132, 252, 0.2)", border: "4px solid #c084fc", boxShadow: "0 0 60px #c084fc" }}>
        RSA
      </div>
      <div style={{ fontSize: "32px", color: "#cbd5e1", marginTop: "30px" }}>Mật Mã Khóa Công Khai</div>
    </div>
  );
};

const Scene10PublicKeyEncryption: React.FC = () => {
  const frame = useCurrentFrame();
  const isEncrypted = frame >= 120;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>🛡️ KHÓA CÔNG KHAI (PUBLIC KEY)</div>
      <div style={{ fontSize: "48px", fontWeight: 900, fontFamily: "'Fira Code', monospace", padding: "30px 40px", borderRadius: "24px", background: "rgba(255, 255, 255, 0.05)", border: "2px solid #38bdf8" }}>
        {isEncrypted ? "Dữ liệu mã hóa: 8F A2 91 C7..." : "Dữ liệu ban đầu: HELLO"}
      </div>
    </div>
  );
};

const Scene11CoreConceptShort: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "72px", fontWeight: 900, color: "#10b981", textShadow: "0 0 40px #10b981" }}>
        🎯 ĐÓ LÀ CÁI HAY!
      </div>
    </div>
  );
};

const Scene12ForwardEasy: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#10b981", padding: "30px 50px", borderRadius: "24px", background: "rgba(16, 185, 129, 0.2)", border: "3px solid #10b981" }}>
        🟢 DỄ: P × Q ➔ N
      </div>
    </div>
  );
};

const Scene13ReverseHard: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#ef4444", padding: "30px 50px", borderRadius: "24px", background: "rgba(239, 68, 68, 0.2)", border: "3px solid #ef4444" }}>
        🔴 KHÓ: N ➔ P & Q
      </div>
    </div>
  );
};

const Scene14VisualPayoffLock: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lockScale = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ transform: `scale(${lockScale})`, padding: "50px 60px", borderRadius: "32px", background: "rgba(56, 189, 248, 0.2)", border: "4px solid #38bdf8", boxShadow: "0 0 80px rgba(56, 189, 248, 0.8)", textAlign: "center" }}>
        <div style={{ fontSize: "140px", marginBottom: "20px" }}>🔒</div>
        <div style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", letterSpacing: "2px" }}>
          PRIME SHIELD
        </div>
        <div style={{ fontSize: "32px", color: "#38bdf8", marginTop: "10px", fontFamily: "'Fira Code', monospace" }}>
          Lớp Bảo Vệ Internet
        </div>
      </div>
    </div>
  );
};

const Scene15QuantumTwist: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 900, marginBottom: "20px" }}>⚠️ NHƯNG CÓ MỘT VẤN ĐỀ:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#c084fc", padding: "30px 40px", borderRadius: "24px", background: "rgba(192, 132, 252, 0.2)", border: "2px solid #c084fc", marginBottom: "30px" }}>
        ⚛️ QUANTUM COMPUTER
      </div>
      <div style={{ fontSize: "32px", color: "#f59e0b" }}>Shor's Algorithm có thể phá vỡ RSA!</div>
    </div>
  );
};

const Scene16OpenLoopEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const isCutBlack = frame >= 120;

  if (isCutBlack) {
    return <AbsoluteFill style={{ background: "#000000" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>CÂU HỎI MỞ:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, color: "#ffffff", lineHeight: 1.3 }}>
        MÁY TÍNH LƯỢNG TỬ<br />
        <span style={{ color: "#ef4444" }}>PHÁ RSA NHƯ THẾ NÀO?</span>
      </div>
    </div>
  );
};
