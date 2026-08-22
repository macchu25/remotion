import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter34_FourierSignal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const fourScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const netScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#38BDF8" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 645], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch05_cosmic_observatory.jpg")}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(circle at 50% 50%, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.92) 80%)",
          }}
        />
      </div>

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Joseph Fourier"
          years="1768 – 1830"
          contribution="Biến đổi Fourier & Phổ Tần số Sóng"
          color="#38BDF8"
          delay={15}
        />

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
            CHƯƠNG 34 · BIẾN ĐỔI FOURIER & XỬ LÝ TÍN HIỆU
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Phân Tách Sóng Phức Tạp Thành Bản Giao Hưởng Sóng Sin
          </div>
        </div>

        {/* Phase 1: Continuous Fourier Transform */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${fourScale})`,
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
                BIẾN ĐỔI FOURIER LIÊN TỤC (FOURIER TRANSFORM)
              </div>
              <KaTeXLabel
                latex="\hat{f}(\xi) = \int_{-\infty}^\infty f(t) \, e^{-2\pi i t \xi} \, dt \iff f(t) = \int_{-\infty}^\infty \hat{f}(\xi) \, e^{2\pi i t \xi} \, d\xi"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Biến đổi Fourier tiết lộ bí mật kinh ngạc: Mọi dạng sóng phức tạp đều là sự hòa âm của những sóng sin đơn giản
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Frequency Spectrum & Compression */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                PHỔ TẦN SỐ & NÉN DỮ LIỆU ĐA PHƯƠNG TIỆN (FFT)
              </div>
              <KaTeXLabel
                latex="\text{Miền thời gian } f(t) \xrightarrow{\text{FFT } O(N \log N)} \text{Phổ tần số } |\hat{f}(\xi)|^2 \implies \text{Nén MP3 / JPEG}"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Tách rời tín hiệu thành các tần số giúp loài người nén âm nhạc, truyền tải hình ảnh và nhìn xuyên qua cơ thể người
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Networks */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${netScale})`,
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(245, 158, 11, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#F59E0B", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: MẠNG LƯỚI & ĐỒ THỊ
              </div>
              <KaTeXLabel
                latex="G = (V, E), \quad \text{Shortest Path}: \min \sum_{e \in \mathcal{P}} w(e)"
                isInline={true}
                fontSize={36}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Dữ liệu sau khi được mã hóa và xử lý không thể đứng yên, nó phải tìm đường di chuyển giữa các mạng lưới
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
