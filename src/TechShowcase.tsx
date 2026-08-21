import React from "react";
import {
  AbsoluteFill,
  interpolate,
  Sequence,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const TechShowcase: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Background animated gradient movement
  const bgAngle = interpolate(frame, [0, durationInFrames], [135, 225]);

  // Badge entrance animation (Spring)
  const badgeSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 12 },
  });

  // Title entrance animation (Spring with slide-up)
  const titleSpring = spring({
    frame: frame - 25,
    fps,
    config: { damping: 14, mass: 0.8 },
  });
  const titleY = interpolate(titleSpring, [0, 1], [40, 0]);

  // Subtitle entrance animation
  const subtitleSpring = spring({
    frame: frame - 45,
    fps,
    config: { damping: 15 },
  });

  // Counter number (0 to 100%)
  const progressPercent = Math.round(
    interpolate(frame, [50, 110], [0, 100], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  // Bottom Timeline Progress Bar
  const progressBarWidth = interpolate(frame, [0, durationInFrames], [0, 100]);

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${bgAngle}deg, #0b0f19 0%, #111827 50%, #030712 100%)`,
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
        color: "#ffffff",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Decorative Glowing Orbs */}
      <div
        style={{
          position: "absolute",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)",
          top: "10%",
          left: "20%",
          filter: "blur(40px)",
          transform: `scale(${1 + Math.sin(frame / 20) * 0.08})`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(0,0,0,0) 70%)",
          bottom: "15%",
          right: "15%",
          filter: "blur(50px)",
          transform: `scale(${1 + Math.cos(frame / 25) * 0.1})`,
        }}
      />

      {/* Main Glassmorphic Card Container */}
      <div
        style={{
          width: "1200px",
          padding: "60px 80px",
          borderRadius: "28px",
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <div
          style={{
            opacity: badgeSpring,
            transform: `scale(${badgeSpring})`,
            padding: "8px 20px",
            borderRadius: "9999px",
            background: "linear-gradient(90deg, rgba(99,102,241,0.2), rgba(236,72,153,0.2))",
            border: "1px solid rgba(99,102,241,0.4)",
            fontSize: "18px",
            fontWeight: 600,
            letterSpacing: "2px",
            color: "#818cf8",
            marginBottom: "24px",
            textTransform: "uppercase",
          }}
        >
          ⚡ Code-Driven Video Generation
        </div>

        {/* Main Title */}
        <div
          style={{
            opacity: titleSpring,
            transform: `translateY(${titleY}px)`,
            fontSize: "76px",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            marginBottom: "20px",
            background: "linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          REMOTION + REACT
        </div>

        {/* Gradient Subtitle */}
        <div
          style={{
            opacity: subtitleSpring,
            fontSize: "32px",
            fontWeight: 500,
            color: "#94a3b8",
            maxWidth: "900px",
            lineHeight: 1.4,
            marginBottom: "48px",
          }}
        >
          Tạo video sắc nét <span style={{ color: "#38bdf8", fontWeight: 700 }}>100% bằng lập trình</span>.
          Không cần phần mềm dựng phim!
        </div>

        {/* Feature Cards Grid */}
        <Sequence from={50}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "24px",
              width: "100%",
            }}
          >
            {[
              { title: "Mã Nguồn React", desc: "Dùng JSX, CSS & Animation hooks", highlight: "React 18" },
              { title: "Tự Động Hóa", desc: `${progressPercent}% Tiến trình xử lý dữ liệu`, highlight: `${progressPercent}%` },
              { title: "Xuất File MP4", desc: "Render sắc nét 30 FPS", highlight: "Full HD 1080p" },
            ].map((item, idx) => {
              const cardSpring = spring({
                frame: frame - 50 - idx * 8,
                fps,
                config: { damping: 14 },
              });
              return (
                <div
                  key={idx}
                  style={{
                    opacity: cardSpring,
                    transform: `translateY(${(1 - cardSpring) * 30}px)`,
                    padding: "24px",
                    borderRadius: "16px",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontSize: "16px", color: "#64748b", marginBottom: "8px" }}>
                    {item.desc}
                  </div>
                  <div style={{ fontSize: "22px", fontWeight: 700, color: "#f8fafc", marginBottom: "4px" }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: "28px", fontWeight: 900, color: "#c084fc" }}>
                    {item.highlight}
                  </div>
                </div>
              );
            })}
          </div>
        </Sequence>
      </div>

      {/* Bottom Timeline Bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "8px",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${progressBarWidth}%`,
            background: "linear-gradient(90deg, #6366f1, #ec4899, #38bdf8)",
            boxShadow: "0 0 15px rgba(99, 102, 241, 0.8)",
          }}
        />
      </div>
    </AbsoluteFill>
  );
};
