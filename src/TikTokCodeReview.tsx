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

export const TikTokCodeReview: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Header entrance (Spring)
  const headerSpring = spring({
    frame: frame - 5,
    fps,
    config: { damping: 12 },
  });

  // Switch phase at frame 80
  const isGoodPhase = frame >= 80;

  // Transition animation between Bad and Good code (Spring)
  const transitionSpring = spring({
    frame: frame - 80,
    fps,
    config: { damping: 14, mass: 0.7 },
  });

  // Typing effect for Good Code (character count)
  const goodCodeChars = Math.floor(
    interpolate(frame, [85, 150], [0, 95], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const fullGoodCodeText = `function getUser(user) {
  // Guard clause - Return sớm!
  if (!user || !user.isActive) return null;

  return user.data;
}`;

  const displayedGoodCode = fullGoodCodeText.slice(0, goodCodeChars);

  // Bottom Timeline Progress
  const progressPercent = (frame / durationInFrames) * 100;

  return (
    <AbsoluteFill
      style={{
        background: "linear-gradient(180deg, #090d16 0%, #0f172a 50%, #020617 100%)",
        fontFamily: "'Fira Code', 'Courier New', monospace, sans-serif",
        color: "#f8fafc",
        padding: "60px 40px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ===== AUDIO TRACKS ===== */}

      {/* 1. Voiceover narration track */}
      <Audio src={staticFile("voiceover.wav")} volume={1.0} />

      {/* 2. Success chime sound effect at transition (Frame 80) */}
      <Sequence from={80}>
        <Audio src={staticFile("success.wav")} volume={0.7} />
      </Sequence>

      {/* 3. Typing pop SFX during typing sequence */}
      {[90, 102, 114, 126, 138].map((startFrame) => (
        <Sequence key={startFrame} from={startFrame}>
          <Audio src={staticFile("pop.wav")} volume={0.25} />
        </Sequence>
      ))}

      {/* Background Ambient Glows */}
      <div
        style={{
          position: "absolute",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: isGoodPhase
            ? "radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(0,0,0,0) 70%)"
            : "radial-gradient(circle, rgba(239, 68, 68, 0.25) 0%, rgba(0,0,0,0) 70%)",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(60px)",
          transition: "background 0.5s ease",
        }}
      />

      {/* ===== HEADER SECTION ===== */}
      <div
        style={{
          opacity: headerSpring,
          transform: `translateY(${(1 - headerSpring) * -30}px)`,
          textAlign: "center",
          marginTop: "40px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "10px 24px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #06b6d4, #3b82f6)",
            fontSize: "22px",
            fontWeight: 800,
            letterSpacing: "1px",
            textTransform: "uppercase",
            boxShadow: "0 10px 25px -5px rgba(6, 182, 212, 0.5)",
            marginBottom: "20px",
          }}
        >
          💡 MẸO CLEAN CODE #01
        </div>
        <div
          style={{
            fontSize: "46px",
            fontWeight: 900,
            lineHeight: 1.2,
            fontFamily: "'Inter', sans-serif",
            background: "linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          ĐỪNG VIẾT IF/ELSE LỒNG NHAU!
        </div>
      </div>

      {/* ===== CODE WINDOW ===== */}
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          borderRadius: "24px",
          background: "#1e1e2e",
          border: isGoodPhase
            ? "2px solid rgba(16, 185, 129, 0.6)"
            : "2px solid rgba(239, 68, 68, 0.6)",
          boxShadow: isGoodPhase
            ? "0 20px 50px rgba(16, 185, 129, 0.3)"
            : "0 20px 50px rgba(239, 68, 68, 0.3)",
          overflow: "hidden",
          zIndex: 10,
          transform: isGoodPhase ? `scale(${0.95 + transitionSpring * 0.05})` : "scale(1)",
        }}
      >
        {/* macOS Editor Header */}
        <div
          style={{
            height: "56px",
            background: "#181825",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #313244",
          }}
        >
          <div style={{ display: "flex", gap: "10px" }}>
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#ff5f56" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#ffbd2e" }} />
            <div style={{ width: "16px", height: "16px", borderRadius: "50%", background: "#27c93f" }} />
          </div>
          <div style={{ fontSize: "18px", color: "#a6adc8", fontWeight: 600 }}>
            userController.js
          </div>
          <div
            style={{
              fontSize: "16px",
              fontWeight: 700,
              color: isGoodPhase ? "#10b981" : "#ef4444",
              padding: "4px 14px",
              borderRadius: "8px",
              background: isGoodPhase ? "rgba(16,185,129,0.15)" : "rgba(239,68,68,0.15)",
            }}
          >
            {isGoodPhase ? "✅ CLEAN CODE" : "❌ BAD PRACTICE"}
          </div>
        </div>

        {/* Editor Body */}
        <div style={{ padding: "36px 32px", fontSize: "28px", lineHeight: 1.6 }}>
          {!isGoodPhase ? (
            /* BAD CODE DISPLAY */
            <div style={{ color: "#cdd6f4" }}>
              <div><span style={{ color: "#cba6f7" }}>function</span> <span style={{ color: "#89b4fa" }}>getUser</span>(user) &#123;</div>
              <div style={{ paddingLeft: "32px", background: "rgba(239, 68, 68, 0.15)", borderLeft: "4px solid #ef4444" }}>
                <span style={{ color: "#f38ba8" }}>if</span> (user) &#123;
              </div>
              <div style={{ paddingLeft: "64px", background: "rgba(239, 68, 68, 0.15)", borderLeft: "4px solid #ef4444" }}>
                <span style={{ color: "#f38ba8" }}>if</span> (user.isActive) &#123;
              </div>
              <div style={{ paddingLeft: "96px" }}>
                <span style={{ color: "#f38ba8" }}>return</span> user.data;
              </div>
              <div style={{ paddingLeft: "64px" }}>&#125;</div>
              <div style={{ paddingLeft: "32px" }}>&#125;</div>
              <div style={{ paddingLeft: "32px" }}>
                <span style={{ color: "#f38ba8" }}>return</span> <span style={{ color: "#fab387" }}>null</span>;
              </div>
              <div>&#125;</div>
            </div>
          ) : (
            /* GOOD CODE DISPLAY (TYPING EFFECT) */
            <pre style={{ margin: 0, color: "#a6e3a1", whiteSpace: "pre-wrap" }}>
              <code>{displayedGoodCode}</code>
              <span
                style={{
                  display: "inline-block",
                  width: "12px",
                  height: "28px",
                  background: "#10b981",
                  marginLeft: "4px",
                  verticalAlign: "middle",
                  opacity: Math.sin(frame / 4) > 0 ? 1 : 0,
                }}
              />
            </pre>
          )}
        </div>
      </div>

      {/* ===== CALL TO ACTION FOOTER ===== */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: "40px",
          zIndex: 10,
        }}
      >
        <div
          style={{
            fontSize: "28px",
            fontWeight: 700,
            color: "#f8fafc",
            marginBottom: "16px",
            fontFamily: "'Inter', sans-serif",
          }}
        >
          👉 Bấm <span style={{ color: "#38bdf8" }}>Follow</span> để nhận bài học tiếp theo!
        </div>
        <div
          style={{
            padding: "14px 36px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, #ec4899, #8b5cf6)",
            fontSize: "24px",
            fontWeight: 800,
            boxShadow: "0 10px 30px rgba(236, 72, 153, 0.4)",
          }}
        >
          @DevMastery · TikTok Coding Tips
        </div>
      </div>

      {/* Bottom Timeline Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "12px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressPercent}%`,
            background: "linear-gradient(90deg, #ef4444, #10b981)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
