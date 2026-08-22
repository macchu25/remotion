import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../camera/CameraRig";
import { AtmosphericBackground } from "../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../primitives/KaTeXLabel";
import { SpatialGrid } from "../primitives/SpatialGrid";

export const EvolutionCinematicHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // =========================================================================
  // FX-001: Book Cover Reveal (0 - 50 frames / 0 - 1.7s)
  // =========================================================================
  const bookAppear = spring({
    frame,
    fps,
    config: { damping: 14, mass: 0.9, stiffness: 100 },
  });

  const bookDolly = interpolate(frame, [0, 50], [0.92, 1.0], {
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // FX-002: Book Opening (50 - 120 frames / 1.7s - 4.0s)
  // =========================================================================
  const coverRotateY = interpolate(frame, [50, 115], [0, -165], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const coverShadow = interpolate(frame, [50, 115], [0.2, 0.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // FX-004: Accelerating Page Search (Slow at first -> Rapid -> Lightning)
  // =========================================================================
  // Page 1: Prehistoric (Flips slowly: 75 frames)
  const page1Rotate = interpolate(frame, [120, 195], [0, -170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Page 2: Greek Geometry (Flips faster: 60 frames)
  const page2Rotate = interpolate(frame, [195, 255], [0, -170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Page 3: Calculus (Flips faster: 45 frames)
  const page3Rotate = interpolate(frame, [255, 300], [0, -170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Page 4: Turing & Logic (Flips fast: 35 frames)
  const page4Rotate = interpolate(frame, [300, 335], [0, -170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Page 5: AI & Modern (Flips lightning fast: 20 frames)
  const page5Rotate = interpolate(frame, [335, 355], [0, -170], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // =========================================================================
  // FX-005: Accelerating Zoom Into Page 1 (440 - 490 frames / 14.6s - 16.3s)
  // =========================================================================
  const zoomProgress = interpolate(frame, [440, 490], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  // Exponential zoom acceleration curve
  const pageZoomScale = 1.0 + Math.pow(zoomProgress, 2.8) * 6.5;

  const pageZoomOpacity = interpolate(frame, [470, 490], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Title & Subtitle Reveals
  const titleOpacity = interpolate(frame, [15, 30, 150, 166], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const searchTitleOpacity = interpolate(frame, [169, 185, 335, 347], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const finalHookOpacity = interpolate(frame, [350, 365, 460, 472], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#020617",
        position: "relative",
        overflow: "hidden",
        opacity: pageZoomOpacity,
      }}
    >
      <SpatialGrid opacity={0.1} />
      <AtmosphericBackground glowColor="#F59E0B" particleCount={30} />

      <CameraRig panBehavior="slow_push">
        {/* Ambient Candlelight Warmth */}
        <div
          style={{
            position: "absolute",
            left: 960 - 500,
            top: 540 - 500,
            width: 1000,
            height: 1000,
            background: "radial-gradient(circle, rgba(245, 158, 11, 0.15) 0%, rgba(56, 189, 248, 0.05) 50%, rgba(2, 6, 23, 0) 75%)",
            filter: "blur(50px)",
            pointerEvents: "none",
          }}
        />

        {/* Top Header Typography */}
        {titleOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 960,
              transform: "translateX(-50%)",
              opacity: titleOpacity,
              textAlign: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                color: "#F59E0B",
                fontSize: 20,
                letterSpacing: 6,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              The Grand Chronicles
            </div>
            <div
              style={{
                color: "#F8FAFC",
                fontSize: 44,
                fontWeight: 900,
                letterSpacing: -0.5,
                textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              }}
            >
              Cuốn Đại Thư Tịch 20.000 Năm Toán Học
            </div>
          </div>
        )}

        {searchTitleOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              top: 70,
              left: 960,
              transform: "translateX(-50%)",
              opacity: searchTitleOpacity,
              textAlign: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                color: "#38BDF8",
                fontSize: 20,
                letterSpacing: 5,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              Rapid Historical Scan
            </div>
            <div
              style={{
                color: "#F8FAFC",
                fontSize: 40,
                fontWeight: 800,
                textShadow: "0 4px 24px rgba(0,0,0,0.8)",
              }}
            >
              Hành Trình Mở Khóa Mọi Bí Mật Vũ Trụ
            </div>
          </div>
        )}

        {finalHookOpacity > 0 && (
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 960,
              transform: "translateX(-50%)",
              opacity: finalHookOpacity,
              textAlign: "center",
              zIndex: 50,
            }}
          >
            <div
              style={{
                color: "#10B981",
                fontSize: 22,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 8,
              }}
            >
              Chapter 01 · The Genesis
            </div>
            <div
              style={{
                color: "#F8FAFC",
                fontSize: 42,
                fontWeight: 900,
                textShadow: "0 4px 30px rgba(0,0,0,0.9)",
              }}
            >
              Bắt đầu từ vết khía đầu tiên của nhân loại...
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* 3D BOOK RIG (FX-001, FX-002, FX-003, FX-004, FX-005)              */}
        {/* =================================================================== */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 540,
            width: 700,
            height: 480,
            transform: `translate(-50%, -50%) scale(${bookAppear * bookDolly * pageZoomScale})`,
            transformStyle: "preserve-3d",
            perspective: 1400,
            zIndex: 20,
          }}
        >
          {/* Base Book Spine & Backplate */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundColor: "#1c1917",
              borderRadius: 16,
              boxShadow: `0 30px 80px rgba(0,0,0,${coverShadow}), 0 0 40px rgba(245, 158, 11, 0.2)`,
              border: "2px solid rgba(245, 158, 11, 0.4)",
            }}
          />

          {/* Right Page (Fixed Base: Chapter 1 Genesis Preview) */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              boxShadow: "inset 20px 0 30px rgba(0,0,0,0.15)",
              padding: 36,
              boxSizing: "border-box",
              color: "#451a03",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: 13, letterSpacing: 3, fontWeight: 800, color: "#92400e", textTransform: "uppercase" }}>
                Kỷ Nguyên Tiền Sử · 20,000 TCN
              </div>
              <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8, color: "#78350f" }}>
                Chương 1: Xương Ishango
              </div>
              <div style={{ fontSize: 14, marginTop: 14, lineHeight: 1.5, color: "#78350f", opacity: 0.9 }}>
                Tại vùng hồ Edward, những vết khía song song đầu tiên xuất hiện, đánh dấu khoảnh khắc trí tuệ con người tách khỏi thế giới tự nhiên.
              </div>
            </div>

            {/* Glowing Tally Graphic on Page */}
            <div
              style={{
                display: "flex",
                gap: 8,
                alignItems: "center",
                padding: "16px 20px",
                background: "rgba(180, 83, 9, 0.12)",
                borderRadius: 10,
                border: "1px dashed rgba(180, 83, 9, 0.3)",
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  style={{
                    width: 4,
                    height: 36,
                    backgroundColor: "#b45309",
                    borderRadius: 2,
                    boxShadow: "0 0 8px rgba(245, 158, 11, 0.4)",
                  }}
                />
              ))}
              <div style={{ marginLeft: "auto", fontWeight: 800, fontSize: 18, color: "#92400e" }}>
                N = 1, 2, 3...
              </div>
            </div>
          </div>

          {/* Left Page (Fixed Base) */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderTopLeftRadius: 16,
              borderBottomLeftRadius: 16,
              boxShadow: "inset -20px 0 30px rgba(0,0,0,0.15)",
              padding: 36,
              boxSizing: "border-box",
              color: "#451a03",
            }}
          >
            <div style={{ fontSize: 14, letterSpacing: 2, fontWeight: 800, color: "#92400e", textTransform: "uppercase" }}>
              Biểu Tượng Vũ Trụ
            </div>
            <div style={{ marginTop: 24 }}>
              <KaTeXLabel latex="\\mathcal{M} = \\{ \\text{Numbers} \\to \\text{AI} \\}" color="#78350f" fontSize={18} />
            </div>
            <div style={{ marginTop: 40, borderTop: "1px solid rgba(120, 53, 15, 0.2)", paddingTop: 20 }}>
              <KaTeXLabel latex="e^{i\\pi} + 1 = 0" color="#92400e" fontSize={22} />
            </div>
          </div>

          {/* FLIPPING PAGE 5: Modern AI & Neural Networks */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderRadius: 16,
              transformOrigin: "left center",
              transform: `rotateY(${page5Rotate}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: `${page5Rotate < -90 ? "inset 20px" : "inset -20px"} 0 30px rgba(0,0,0,0.2)`,
              padding: 32,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              zIndex: 25,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: "#8b5cf6", textTransform: "uppercase" }}>
              Kỷ Nguyên Hiện Đại · Thế Kỷ 21
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, color: "#5b21b6" }}>
              Mạng Nơ-ron & AI
            </div>
            <div style={{ marginTop: 20 }}>
              <KaTeXLabel latex="\\text{Attn} = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right)V" color="#4c1d95" fontSize={16} />
            </div>
          </div>

          {/* FLIPPING PAGE 4: Turing Machine & Digital Logic */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderRadius: 16,
              transformOrigin: "left center",
              transform: `rotateY(${page4Rotate}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: `${page4Rotate < -90 ? "inset 20px" : "inset -20px"} 0 30px rgba(0,0,0,0.2)`,
              padding: 32,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              zIndex: 24,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: "#0284c7", textTransform: "uppercase" }}>
              Kỷ Nguyên Số · 1936
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, color: "#0369a1" }}>
              Máy Turing Phổ Quát
            </div>
            <div style={{ marginTop: 20 }}>
              <KaTeXLabel latex="\\mathcal{M} = \\langle Q, \\Sigma, \\Gamma, \\delta, q_0 \\rangle" color="#0c4a6e" fontSize={16} />
            </div>
          </div>

          {/* FLIPPING PAGE 3: Calculus of Newton & Leibniz */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderRadius: 16,
              transformOrigin: "left center",
              transform: `rotateY(${page3Rotate}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: `${page3Rotate < -90 ? "inset 20px" : "inset -20px"} 0 30px rgba(0,0,0,0.2)`,
              padding: 32,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              zIndex: 23,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: "#2563eb", textTransform: "uppercase" }}>
              Kỷ Nguyên Khai Sáng · 1680
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, color: "#1e3a8a" }}>
              Giải Tích & Cơ Học
            </div>
            <div style={{ marginTop: 20 }}>
              <KaTeXLabel latex="\\frac{df}{dx} = \\lim_{\\Delta x \\to 0} \\frac{f(x+\\Delta x)-f(x)}{\\Delta x}" color="#1e3a8a" fontSize={16} />
            </div>
          </div>

          {/* FLIPPING PAGE 2: Greek Geometry & Pythagoras */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderRadius: 16,
              transformOrigin: "left center",
              transform: `rotateY(${page2Rotate}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: `${page2Rotate < -90 ? "inset 20px" : "inset -20px"} 0 30px rgba(0,0,0,0.2)`,
              padding: 32,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              zIndex: 22,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: "#059669", textTransform: "uppercase" }}>
              Hy Lạp Cổ Đại · 500 TCN
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, color: "#064e3b" }}>
              Cấu Trúc Hình Học
            </div>
            <div style={{ marginTop: 20 }}>
              <KaTeXLabel latex="a^2 + b^2 = c^2" color="#064e3b" fontSize={22} />
            </div>
          </div>

          {/* FLIPPING PAGE 1: Prehistoric Marks */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#fef3c7",
              borderRadius: 16,
              transformOrigin: "left center",
              transform: `rotateY(${page1Rotate}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: `${page1Rotate < -90 ? "inset 20px" : "inset -20px"} 0 30px rgba(0,0,0,0.2)`,
              padding: 32,
              boxSizing: "border-box",
              backfaceVisibility: "hidden",
              zIndex: 21,
            }}
          >
            <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: "#d97706", textTransform: "uppercase" }}>
              Kỷ Băng Hà · 30,000 TCN
            </div>
            <div style={{ fontSize: 20, fontWeight: 900, marginTop: 8, color: "#78350f" }}>
              Vết Khía Xương Lebombo
            </div>
            <div style={{ marginTop: 20 }}>
              <KaTeXLabel latex="\\text{Count} = 1, 2, 3, 4, 5" color="#78350f" fontSize={18} />
            </div>
          </div>

          {/* FRONT COVER (FX-001 & FX-002: Opens 3D outwards) */}
          <div
            style={{
              position: "absolute",
              left: 350,
              top: 0,
              width: 350,
              height: 480,
              backgroundColor: "#292524",
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16,
              border: "3px solid #f59e0b",
              borderLeft: "none",
              transformOrigin: "left center",
              transform: `rotateY(${coverRotateY}deg)`,
              transformStyle: "preserve-3d",
              boxShadow: "0 25px 50px rgba(0,0,0,0.7), inset 0 0 30px rgba(0,0,0,0.6)",
              padding: 40,
              boxSizing: "border-box",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              backfaceVisibility: "hidden",
              zIndex: 25,
            }}
          >
            {/* Sacred Geometry Emblem on Cover */}
            <div
              style={{
                width: 110,
                height: 110,
                borderRadius: "50%",
                border: "2px solid #f59e0b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 25px rgba(245, 158, 11, 0.3)",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  width: 80,
                  height: 80,
                  border: "1.5px dashed #f59e0b",
                  transform: "rotate(45deg)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ color: "#f59e0b", fontSize: 32, fontWeight: 900, transform: "rotate(-45deg)" }}>
                  $\infty$
                </div>
              </div>
            </div>

            <div
              style={{
                color: "#f59e0b",
                fontSize: 13,
                letterSpacing: 4,
                textTransform: "uppercase",
                fontWeight: 800,
                marginBottom: 10,
              }}
            >
              Master Collection
            </div>

            <div
              style={{
                color: "#f8fafc",
                fontSize: 26,
                fontWeight: 900,
                letterSpacing: 1,
                lineHeight: 1.25,
                textShadow: "0 2px 10px rgba(0,0,0,0.9)",
              }}
            >
              SỰ TIẾN HÓA CỦA TOÁN HỌC
            </div>

            <div
              style={{
                width: 60,
                height: 2,
                backgroundColor: "#f59e0b",
                marginTop: 20,
                marginBottom: 16,
              }}
            />

            <div
              style={{
                color: "#d6d3d1",
                fontSize: 12,
                letterSpacing: 2,
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              42 Chapters · 20,000 Years
            </div>
          </div>

          {/* Book Spine (Central 3D hinge) */}
          <div
            style={{
              position: "absolute",
              left: 345,
              top: 0,
              width: 10,
              height: 480,
              backgroundColor: "#1c1917",
              boxShadow: "0 0 15px rgba(0,0,0,0.9)",
              zIndex: 30,
            }}
          />
        </div>

        {/* Film Vignette Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 45%, rgba(2,6,23,0.85) 100%)",
            pointerEvents: "none",
            zIndex: 40,
          }}
        />
      </CameraRig>
    </div>
  );
};
