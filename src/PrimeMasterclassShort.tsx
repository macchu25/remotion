import React from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { z } from "zod";
import { BgmManager } from "./components/BgmManager";

export const masterclassCompSchema = z.object({
  playbackSpeed: z
    .number()
    .min(0.5)
    .max(5.0)
    .step(0.05)
    .default(2.8)
    .describe("Tốc độ video (Cho phép nhập số lẻ tinh chỉnh e.g. 1.05, 1.15, 1.25, 2.8)"),
  bgmEnabled: z
    .boolean()
    .default(true)
    .describe("Bật / Tắt Nhạc Nền Preview (ON / OFF)"),
  bgmTrack: z
    .string()
    .default("custom_bgm.mp3")
    .describe("File Nhạc Nền trong public/ (e.g. custom_bgm.mp3 [df.mp3])"),
  bgmVolume: z
    .number()
    .min(0.0)
    .max(1.0)
    .step(0.01)
    .default(0.08)
    .describe("Âm lượng Nhạc Nền (0.00 đến 1.00 e.g. 0.03, 0.08)"),
});

// ===========================================================================
// ONE SOURCE OF TRUTH — PEDAGOGY MASTERCLASS TIMELINE (5413 FRAMES BASE)
// Live Audio Preview WITHOUT Timeline Track Clutter + Post Render Merge!
// ===========================================================================

export const cues = [
  { index: 0, text: "✉️ Giả sử bạn muốn gửi cho tôi một tin nhắn bí mật qua Internet... nhưng dữ liệu có thể bị chặn giữa đường.", frames: 288, startFrame: 0, endFrame: 288 },
  { index: 1, text: "🔑 Cách đơn giản là dùng mật khẩu chung... Nhưng làm sao gửi mật khẩu mà không bị lấy mất?", frames: 295, startFrame: 288, endFrame: 583 },
  { index: 2, text: "⚠️ Vấn đề không chỉ là mã hóa. Vấn đề là LÀM SAO CHIA SẺ CHÌA KHÓA AN TOÀN!", frames: 207, startFrame: 583, endFrame: 790 },
  { index: 3, text: "🔓 Tưởng tượng tôi phát cho cả thế giới những chiếc Ổ KHÓA MỞ SẴN. Chìa khóa chỉ mình tôi giữ!", frames: 320, startFrame: 790, endFrame: 1110 },
  { index: 4, text: "📦 Bạn lấy ổ khóa của tôi, khóa thông tin lại rồi gửi. Ai cũng khóa được, nhưng CHỈ TÔI MỞ ĐƯỢC!", frames: 262, startFrame: 1110, endFrame: 1372 },
  { index: 5, text: "💻 Trong máy tính, ổ khóa và chìa khóa được tạo bằng TOÁN HỌC.", frames: 146, startFrame: 1372, endFrame: 1518 },
  { index: 6, text: "🔢 Hệ thống bắt đầu bằng HAI SỐ NGUYÊN TỐ BÍ MẬT chỉ chủ sở hữu biết: 61 và 53.", frames: 240, startFrame: 1518, endFrame: 1758 },
  { index: 7, text: "⚡ Nhân chúng lại RẤT DỄ: 61 × 53 = 3233.", frames: 199, startFrame: 1758, endFrame: 1957 },
  { index: 8, text: "❓ Nhưng đưa bạn 3233... 3233 = ? × ? ➔ Việc tìm ngược lại là BÀI TOÁN KHÓ!", frames: 281, startFrame: 1957, endFrame: 2238 },
  { index: 9, text: "📜 Với 3233 thì dễ, nhưng hệ thống thật dùng số nguyên tố HÀNG TRĂM CHỮ SỐ!", frames: 240, startFrame: 2238, endFrame: 2478 },
  { index: 10, text: "❓ RỒI SAO? Khó tìm hai số nguyên tố thì liên quan gì đến việc đọc tin nhắn?", frames: 179, startFrame: 2478, endFrame: 2657 },
  { index: 11, text: "🔑 Từ 61 & 53, máy tính tạo ra 2 con số: Ổ KHÓA CÔNG KHAI và CHÌA KHÓA BÍ MẬT.", frames: 265, startFrame: 2657, endFrame: 2922 },
  { index: 12, text: "🌐 Ổ khóa được phát cho tất cả mọi người, còn chìa khóa CHỈ NGƯỜI CHỦ GIỮ.", frames: 173, startFrame: 2922, endFrame: 3095 },
  { index: 13, text: "📝 Giả sử bạn gửi chữ HELLO ➔ Máy tính biến chữ HELLO thành con số 65.", frames: 200, startFrame: 3095, endFrame: 3295 },
  { index: 14, text: "🔒 Bạn lấy ổ khóa công khai mã hóa: 65 ➔ biến thành số 2790 ĐÃ KHÓA!", frames: 285, startFrame: 3295, endFrame: 3580 },
  { index: 15, text: "🕵️ Thứ chạy qua Internet là 2790. Kẻ nghe lén chặn được 2790 & biết cả Ổ KHÓA CÔNG KHAI.", frames: 337, startFrame: 3580, endFrame: 3917 },
  { index: 16, text: "🚫 Nhưng ổ khóa công khai được thiết kế: KHÓA DỄ, KHÔNG THỂ LÀM NGƯỢC LẠI!", frames: 211, startFrame: 3917, endFrame: 4128 },
  { index: 17, text: "🚀 Người chủ biết 61 & 53 nên có ĐƯỜNG TẮT TOÁN HỌC để tạo Chìa Khóa Bí Mật.", frames: 233, startFrame: 4128, endFrame: 4361 },
  { index: 18, text: "💥 Kẻ nghe lén không có 61 & 53 ➔ Phải giải bài toán phân tích thừa số ngược CỰC KHÓ!", frames: 240, startFrame: 4361, endFrame: 4601 },
  { index: 19, text: "🔒 Tạo ra bài toán DỄ... ĐẢO NGƯỢC KHÓ! Sự bất đối xứng này BẢO VỆ INTERNET!", frames: 264, startFrame: 4601, endFrame: 4865 },
  { index: 20, text: "✅ Người nhận dùng chìa khóa mở 2790 ➔ 65 ➔ giải mã lại thành HELLO ban đầu!", frames: 252, startFrame: 4865, endFrame: 5117 },
  { index: 21, text: "🔑 Hệ thống này gọi là RSA. Nhưng máy tính lượng tử có thể phá nó bằng cách nào?", frames: 296, startFrame: 5117, endFrame: 5413 },
];

export const PrimeMasterclassShort: React.FC<z.infer<typeof masterclassCompSchema>> = ({
  playbackSpeed = 2.8,
  bgmEnabled = true,
  bgmTrack = "custom_bgm.mp3",
  bgmVolume = 0.08,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const progressPercent = (frame / durationInFrames) * 100;
  const unscaledFrame = Math.round(frame * playbackSpeed);

  // Background Music Ducking
  let effectiveVolume = bgmEnabled && bgmTrack !== "none" ? bgmVolume : 0.0;
  if ((unscaledFrame >= 4601 && unscaledFrame <= 4865) || unscaledFrame >= 5250) {
    effectiveVolume = 0.0;
  }

  const currentCap = cues.find((c) => unscaledFrame >= c.startFrame && unscaledFrame < c.endFrame);

  const getSeqStart = (sf: number) => Math.round(sf / playbackSpeed);
  const getSeqDur = (f: number) => Math.round(f / playbackSpeed);

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #030712 0%, #080f24 50%, #010308 100%)",
        fontFamily: "'Be Vietnam Pro', system-ui, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
      }}
    >
      {/* Hidden BGM Preview Manager (Plays audio preview LIVE without creating ANY green timeline track row!) */}
      <BgmManager
        bgmEnabled={bgmEnabled}
        bgmTrack={bgmTrack}
        bgmVolume={bgmVolume}
        overrideVolume={effectiveVolume}
      />

      {/* ===== RETENTION PROGRESS BAR ===== */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "8px", background: "rgba(255, 255, 255, 0.1)", zIndex: 200 }}>
        <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #38bdf8, #c084fc, #10b981)", boxShadow: "0 0 15px #38bdf8" }} />
      </div>

      {/* ===== 22 SCENE SEQUENCES (VOICE-LOCKED TO MASTER NARRATION) ===== */}

      {/* Scene 0: Intercepted Data */}
      <Sequence from={getSeqStart(cues[0].startFrame)} durationInFrames={getSeqDur(cues[0].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_0.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene01InterceptedData />
      </Sequence>

      {/* Scene 1: Shared Password Dilemma */}
      <Sequence from={getSeqStart(cues[1].startFrame)} durationInFrames={getSeqDur(cues[1].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_1.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene02PasswordDilemma />
      </Sequence>

      {/* Scene 2: Real Problem Key Sharing */}
      <Sequence from={getSeqStart(cues[2].startFrame)} durationInFrames={getSeqDur(cues[2].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_2.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene03RealProblemKeySharing />
      </Sequence>

      {/* Scene 3: Open Padlocks Metaphor */}
      <Sequence from={getSeqStart(cues[3].startFrame)} durationInFrames={getSeqDur(cues[3].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_3.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_masterclass/padlock_snap.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene04OpenPadlocksMetaphor />
      </Sequence>

      {/* Scene 4: Lock Box & Send */}
      <Sequence from={getSeqStart(cues[4].startFrame)} durationInFrames={getSeqDur(cues[4].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_4.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/padlock_snap.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene05LockBoxAndSend />
      </Sequence>

      {/* Scene 5: Math Padlock Morph */}
      <Sequence from={getSeqStart(cues[5].startFrame)} durationInFrames={getSeqDur(cues[5].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_5.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_masterclass/digit_morph.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene06MathPadlockMorph />
      </Sequence>

      {/* Scene 6: Secret Primes 61 & 53 */}
      <Sequence from={getSeqStart(cues[6].startFrame)} durationInFrames={getSeqDur(cues[6].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_6.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene07SecretPrimes />
      </Sequence>

      {/* Scene 7: Easy Multiplication 3233 */}
      <Sequence from={getSeqStart(cues[7].startFrame)} durationInFrames={getSeqDur(cues[7].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_7.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/shortcut_sweep.wav")} volume={0.3} playbackRate={playbackSpeed} /></Sequence>
        <Scene08EasyMultiplication />
      </Sequence>

      {/* Scene 8: Hard Reverse Question */}
      <Sequence from={getSeqStart(cues[8].startFrame)} durationInFrames={getSeqDur(cues[8].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_8.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(20)}><Audio src={staticFile("audio/sfx_masterclass/maze_glitch.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene09HardReverseQuestion />
      </Sequence>

      {/* Scene 9: Scale Up Hundreds Digits */}
      <Sequence from={getSeqStart(cues[9].startFrame)} durationInFrames={getSeqDur(cues[9].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_9.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene10ScaleUpHundredsDigits />
      </Sequence>

      {/* Scene 10: Pattern Interrupt "RỒI SAO?" */}
      <Sequence from={getSeqStart(cues[10].startFrame)} durationInFrames={getSeqDur(cues[10].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_10.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene11PatternInterruptSoWhat />
      </Sequence>

      {/* Scene 11: Machine Output Lock & Key */}
      <Sequence from={getSeqStart(cues[11].startFrame)} durationInFrames={getSeqDur(cues[11].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_11.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_masterclass/padlock_snap.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene12MachineOutputLockKey />
      </Sequence>

      {/* Scene 12: Public Lock vs Private Vault */}
      <Sequence from={getSeqStart(cues[12].startFrame)} durationInFrames={getSeqDur(cues[12].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_12.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene13PublicLockPrivateVault />
      </Sequence>

      {/* Scene 13: HELLO to Number 65 */}
      <Sequence from={getSeqStart(cues[13].startFrame)} durationInFrames={getSeqDur(cues[13].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_13.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/digit_morph.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene14HelloToNumber65 />
      </Sequence>

      {/* Scene 14: 65 to 2790 Encryption */}
      <Sequence from={getSeqStart(cues[14].startFrame)} durationInFrames={getSeqDur(cues[14].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_14.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_masterclass/digit_morph.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene15EncryptionTo2790 />
      </Sequence>

      {/* Scene 15: Network Intercepted 2790 */}
      <Sequence from={getSeqStart(cues[15].startFrame)} durationInFrames={getSeqDur(cues[15].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_15.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Scene16NetworkIntercepted2790 />
      </Sequence>

      {/* Scene 16: One Way Lock Design */}
      <Sequence from={getSeqStart(cues[16].startFrame)} durationInFrames={getSeqDur(cues[16].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_16.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/maze_glitch.wav")} volume={0.35} playbackRate={playbackSpeed} /></Sequence>
        <Scene17OneWayLockDesign />
      </Sequence>

      {/* Scene 17: Owner Shortcut Path */}
      <Sequence from={getSeqStart(cues[17].startFrame)} durationInFrames={getSeqDur(cues[17].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_17.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(25)}><Audio src={staticFile("audio/sfx_masterclass/shortcut_sweep.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene18OwnerShortcutPath />
      </Sequence>

      {/* Scene 18: Attacker Impossible Search */}
      <Sequence from={getSeqStart(cues[18].startFrame)} durationInFrames={getSeqDur(cues[18].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_18.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/maze_glitch.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene19AttackerImpossibleSearch />
      </Sequence>

      {/* Scene 19: VISUAL PAYOFF - Asymmetry Shield */}
      <Sequence from={getSeqStart(cues[19].startFrame)} durationInFrames={getSeqDur(cues[19].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_19.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(50)}><Audio src={staticFile("audio/sfx_masterclass/padlock_snap.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Sequence from={getSeqStart(120)}><Audio src={staticFile("audio/sfx_masterclass/decryption_resolve.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene20VisualPayoffAsymmetryShield />
      </Sequence>

      {/* Scene 20: Decryption Back to HELLO */}
      <Sequence from={getSeqStart(cues[20].startFrame)} durationInFrames={getSeqDur(cues[20].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_20.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(40)}><Audio src={staticFile("audio/sfx_masterclass/decryption_resolve.wav")} volume={0.45} playbackRate={playbackSpeed} /></Sequence>
        <Scene21DecryptionBackToHello />
      </Sequence>

      {/* Scene 21: RSA Label & Quantum Ending */}
      <Sequence from={getSeqStart(cues[21].startFrame)} durationInFrames={getSeqDur(cues[21].frames)}>
        <Audio src={staticFile("audio/voice_masterclass/sentence_21.mp3")} volume={1.0} playbackRate={playbackSpeed} />
        <Sequence from={getSeqStart(30)}><Audio src={staticFile("audio/sfx_masterclass/quantum_riser.wav")} volume={0.4} playbackRate={playbackSpeed} /></Sequence>
        <Scene22RSALabelQuantumEnding />
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
// SCENE COMPONENTS
// ==========================================

const Scene01InterceptedData: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>🌐 TRUYỀN DỮ LIỆU INTERNET</div>
      <div style={{ display: "flex", gap: "20px", alignItems: "center", fontSize: "40px", fontWeight: 900, background: "rgba(255,255,255,0.05)", padding: "30px 40px", borderRadius: "24px", border: "2px solid #ef4444" }}>
        <span>Người A</span>
        <span style={{ color: "#ef4444" }}>➔ [HELLO] ➔</span>
        <span>Hacker 🕵️ ➔</span>
        <span>Người B</span>
      </div>
    </div>
  );
};

const Scene02PasswordDilemma: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#f59e0b", fontWeight: 800, marginBottom: "30px" }}>🔑 MẬT KHẨU CHUNG (SHARED KEY)?</div>
      <div style={{ fontSize: "48px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ef4444", padding: "30px", borderRadius: "24px", background: "rgba(239,68,68,0.15)", border: "2px solid #ef4444" }}>
        Gửi Password ➔ Bị Hacker Chặn Ngay!
      </div>
    </div>
  );
};

const Scene03RealProblemKeySharing: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "44px", fontWeight: 900, color: "#ef4444", marginBottom: "30px" }}>⚠️ VẤN ĐỀ THẬT SỰ:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#ffffff", padding: "40px 50px", borderRadius: "28px", background: "rgba(239, 68, 68, 0.2)", border: "4px solid #ef4444", boxShadow: "0 0 60px #ef4444" }}>
        LÀM SAO CHIA SẺ CHÌA KHÓA AN TOÀN?
      </div>
    </div>
  );
};

const Scene04OpenPadlocksMetaphor: React.FC = () => {
  const frame = useCurrentFrame();
  const isSnap = frame >= 40;

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>🔓 Ý TƯỞNG Ổ KHÓA CÔNG KHAI</div>
      <div style={{ fontSize: "120px", marginBottom: "20px" }}>{isSnap ? "🔒" : "🔓"}</div>
      <div style={{ fontSize: "36px", fontWeight: 900, color: "#10b981" }}>
        Phát ổ khóa mở cho cả thế giới!
      </div>
    </div>
  );
};

const Scene05LockBoxAndSend: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>📦 KHÓA TIN NHẮN VÀ GỬI</div>
      <div style={{ fontSize: "52px", fontWeight: 900, padding: "30px 40px", borderRadius: "24px", background: "rgba(16, 185, 129, 0.15)", border: "2px solid #10b981" }}>
        Ai cũng khóa được ➔ Nhưng CHỈ TÔI MỞ ĐƯỢC!
      </div>
    </div>
  );
};

const Scene06MathPadlockMorph: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 800, marginBottom: "30px" }}>💻 TRONG MÁY TÍNH</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#c084fc", padding: "30px 40px", borderRadius: "24px", background: "rgba(192, 132, 252, 0.15)", border: "2px solid #c084fc" }}>
        🔒 Ổ khóa = TOÁN HỌC
      </div>
    </div>
  );
};

const Scene07SecretPrimes: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Bắt đầu với 2 số nguyên tố bí mật:</div>
      <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#c084fc", display: "flex", gap: "40px" }}>
        <span>61</span>
        <span style={{ color: "#10b981" }}>53</span>
      </div>
      <div style={{ fontSize: "28px", color: "#f59e0b", marginTop: "20px" }}>(Chỉ chủ sở hữu giữ bí mật)</div>
    </div>
  );
};

const Scene08EasyMultiplication: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "20px" }}>NHÂN CHIỀU XUÔI: RẤT DỄ</div>
      <div style={{ fontSize: "80px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981" }}>
        61 × 53 = 3233
      </div>
    </div>
  );
};

const Scene09HardReverseQuestion: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "20px" }}>TÌM CHIỀU NGƯỢC: BÀI TOÁN KHÓ</div>
      <div style={{ fontSize: "80px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#f59e0b" }}>
        3233 = ? × ?
      </div>
    </div>
  );
};

const Scene10ScaleUpHundredsDigits: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 900, marginBottom: "30px" }}>SỐ NGUYÊN TỐ HÀNG TRĂM CHỮ SỐ!</div>
      <div style={{ fontSize: "24px", fontFamily: "'Fira Code', monospace", color: "#38bdf8", wordBreak: "break-all", background: "rgba(56,189,248,0.1)", padding: "20px", borderRadius: "16px", border: "1px solid #38bdf8", width: "100%" }}>
        P = 98245165304918273645839201...
      </div>
      <div style={{ fontSize: "24px", fontFamily: "'Fira Code', monospace", color: "#10b981", wordBreak: "break-all", background: "rgba(16,185,129,0.1)", padding: "20px", borderRadius: "16px", border: "1px solid #10b981", width: "100%", marginTop: "15px" }}>
        Q = 9617489410384726154389201...
      </div>
    </div>
  );
};

const Scene11PatternInterruptSoWhat: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "100px", fontWeight: 900, color: "#f59e0b", textShadow: "0 0 50px #f59e0b", marginBottom: "20px" }}>
        RỒI SAO?
      </div>
      <div style={{ fontSize: "36px", fontWeight: 800, color: "#ffffff" }}>
        Khó tìm hai số nguyên tố thì liên quan gì đến việc đọc tin nhắn?
      </div>
    </div>
  );
};

const Scene12MachineOutputLockKey: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#38bdf8", fontWeight: 800, marginBottom: "30px" }}>⚙️ TẠO RA 2 CON SỐ ĐẶC BIỆT</div>
      <div style={{ display: "flex", gap: "30px" }}>
        <div style={{ padding: "30px", borderRadius: "20px", background: "rgba(56,189,248,0.2)", border: "2px solid #38bdf8", fontSize: "32px", fontWeight: 900 }}>
          🔒 Ổ KHÓA CÔNG KHAI
        </div>
        <div style={{ padding: "30px", borderRadius: "20px", background: "rgba(192,132,252,0.2)", border: "2px solid #c084fc", fontSize: "32px", fontWeight: 900 }}>
          🔑 CHÌA KHÓA BÍ MẬT
        </div>
      </div>
    </div>
  );
};

const Scene13PublicLockPrivateVault: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "40px", color: "#38bdf8", fontWeight: 900, marginBottom: "20px" }}>🌐 Ổ KHÓA ➔ PHÁT CHO MỌI NGƯỜI</div>
      <div style={{ fontSize: "40px", color: "#c084fc", fontWeight: 900, marginTop: "20px" }}>🏛️ CHÌA KHÓA ➔ CHỈ CHỦ GIỮ</div>
    </div>
  );
};

const Scene14HelloToNumber65: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#cbd5e1", marginBottom: "30px" }}>Biến chữ thành số:</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#38bdf8", padding: "30px 50px", borderRadius: "24px", background: "rgba(56,189,248,0.15)", border: "2px solid #38bdf8" }}>
        "HELLO" ➔ 65
      </div>
    </div>
  );
};

const Scene15EncryptionTo2790: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>🔒 PHÉP TOÁN MÃ HÓA</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", padding: "30px 50px", borderRadius: "24px", background: "rgba(16,185,129,0.2)", border: "3px solid #10b981" }}>
        65 ➔ 2790 (ĐÃ KHÓA)
      </div>
    </div>
  );
};

const Scene16NetworkIntercepted2790: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "30px" }}>🕵️ KẺ NGHE LÉN CHẶN ĐƯỢC:</div>
      <div style={{ fontSize: "48px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#ef4444", padding: "20px 40px", borderRadius: "20px", background: "rgba(239,68,68,0.15)", border: "2px solid #ef4444" }}>
        Dữ liệu mã hóa: 2790 ✅<br />
        Ổ khóa công khai ✅
      </div>
    </div>
  );
};

const Scene17OneWayLockDesign: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "44px", fontWeight: 900, color: "#f59e0b", marginBottom: "30px" }}>⚡ THIẾT KẾ MỘT CHIỀU:</div>
      <div style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", padding: "30px", borderRadius: "24px", background: "rgba(255,255,255,0.05)", border: "2px solid #f59e0b" }}>
        KHÓA THÌ DỄ ➔ LÀM NGƯỢC LẠI THÌ KHÔNG THỂ!
      </div>
    </div>
  );
};

const Scene18OwnerShortcutPath: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>🚀 NGƯỜI CHỦ BIẾT 61 & 53 TỪ ĐẦU:</div>
      <div style={{ fontSize: "64px", fontWeight: 900, color: "#10b981", padding: "30px 40px", borderRadius: "24px", background: "rgba(16,185,129,0.2)", border: "3px solid #10b981" }}>
        CÓ ĐƯỜNG TẮT TOÁN HỌC!
      </div>
    </div>
  );
};

const Scene19AttackerImpossibleSearch: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#ef4444", fontWeight: 800, marginBottom: "30px" }}>💥 KẺ NGHE LÉN KHÔNG CÓ 61 & 53:</div>
      <div style={{ fontSize: "52px", fontWeight: 900, color: "#ef4444", padding: "30px", borderRadius: "24px", background: "rgba(239,68,68,0.15)", border: "2px solid #ef4444" }}>
        Phải giải bài toán phân tích thừa số CỰC KHÓ!
      </div>
    </div>
  );
};

const Scene20VisualPayoffAsymmetryShield: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lockScale = spring({ frame: frame - 40, fps, config: { damping: 10 } });

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ transform: `scale(${lockScale})`, padding: "50px 60px", borderRadius: "32px", background: "rgba(56, 189, 248, 0.2)", border: "4px solid #38bdf8", boxShadow: "0 0 80px rgba(56, 189, 248, 0.8)", textAlign: "center" }}>
        <div style={{ fontSize: "140px", marginBottom: "20px" }}>🔒</div>
        <div style={{ fontSize: "52px", fontWeight: 900, color: "#ffffff", letterSpacing: "2px" }}>
          SỰ BẤT ĐỐI XỨNG
        </div>
        <div style={{ fontSize: "32px", color: "#38bdf8", marginTop: "10px", fontFamily: "'Fira Code', monospace" }}>
          DỄ (Xuôi) - KHÓ (Ngược) ➔ BẢO VỆ INTERNET
        </div>
      </div>
    </div>
  );
};

const Scene21DecryptionBackToHello: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#10b981", fontWeight: 800, marginBottom: "30px" }}>✅ GIẢI MÃ THÀNH CÔNG</div>
      <div style={{ fontSize: "72px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#10b981", padding: "30px 50px", borderRadius: "24px", background: "rgba(16,185,129,0.2)", border: "3px solid #10b981" }}>
        2790 ➔ 65 ➔ "HELLO"
      </div>
    </div>
  );
};

const Scene22RSALabelQuantumEnding: React.FC = () => {
  const frame = useCurrentFrame();
  const isCutBlack = frame >= 180;

  if (isCutBlack) {
    return <AbsoluteFill style={{ background: "#000000" }} />;
  }

  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "100px 40px", textAlign: "center" }}>
      <div style={{ fontSize: "36px", color: "#c084fc", fontWeight: 800, marginBottom: "20px" }}>HỆ THỐNG NÀY GỌI LÀ:</div>
      <div style={{ fontSize: "96px", fontWeight: 900, fontFamily: "'Fira Code', monospace", color: "#c084fc", padding: "30px 50px", borderRadius: "28px", background: "rgba(192, 132, 252, 0.2)", border: "4px solid #c084fc", marginBottom: "30px" }}>
        RSA
      </div>
      <div style={{ fontSize: "32px", color: "#ef4444", fontWeight: 700 }}>
        ⚛️ Nhưng máy tính lượng tử có thể phá nó bằng cách nào?
      </div>
    </div>
  );
};
