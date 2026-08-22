import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter42_FinalReturn: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const collapseScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const infinityScale = spring({ frame: frame - 160, fps, config: { damping: 14, stiffness: 80 } });
  const pointGlow = interpolate(frame, [330, 400, 480], [0.4, 1.2, 1], { extrapolateLeft: "clamp" });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#38BDF8" particleCount={16} />

      {/* Cinematic Cosmic Return Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.22,
          transform: `scale(${interpolate(frame, [0, 623], [1.0, 1.12], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch15_cantor_infinity.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(2,6,23,0.25) 0%, rgba(2,6,23,0.92) 80%)",
          }}
        />
      </div>

      <CameraRig panBehavior="slow_push">
        {/* Chapter Header */}
        <div
          style={{
            position: "absolute",
            left: 960,
            top: 50,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 42 · ĐẠI SỤP ĐỔ & TRỞ VỀ ĐIỂM NGUYÊN THỦY
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Từ Một Điểm Sáng Đến Toàn Thể Vũ Trụ
          </div>
        </div>

        {/* Phase 1: Reverse Timeline Collapse */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${collapseScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                SỤP ĐỔ NGƯỢC DÒNG TIẾN HÓA
              </div>
              <KaTeXLabel
                latex="\text{AI} \to \text{Chip} \to \text{Logic} \to \text{Giải tích} \to \text{Tọa độ} \to \text{Hình học} \to \text{Vết khắc}"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mọi thuật toán AI, hàng tỷ bóng bán dẫn, các phương trình giải tích và hệ tọa độ dần sụp đổ ngược dòng thời gian
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: The Loop of Infinity */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${infinityScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(168, 85, 247, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#A855F7", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                VÒNG LẶP VÔ CỰC CỦA TOÁN HỌC (THE INFINITE LOOP)
              </div>
              <KaTeXLabel
                latex="\infty \iff \text{Hữu hạn} \leftrightarrow \text{Vô hạn}"
                isInline={true}
                fontSize={56}
                color="#A855F7"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Tất cả các con số, hình học và vết khắc cổ xưa thu bé lại thành một vòng lặp vô cực thuần khiết
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: The Primordial Point */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              {/* Pulsing primordial point */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  backgroundColor: "#FFFFFF",
                  boxShadow: `0 0 ${40 * pointGlow}px ${20 * pointGlow}px rgba(56, 189, 248, 0.9)`,
                  margin: "0 auto 36px auto",
                  transform: `scale(${pointGlow})`,
                }}
              />
              <div style={{ color: "#F8FAFC", fontSize: 36, letterSpacing: 8, fontWeight: 800 }}>
                TỪ MỘT ĐẾN TẤT CẢ
              </div>
              <div style={{ color: "#38BDF8", fontSize: 22, letterSpacing: 4, fontWeight: 600, marginTop: 14 }}>
                FROM ONE TO EVERYTHING
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
