import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter25_Algorithms: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Establishing Image Slow Zoom & Fade (0 - 216 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 160, 216], [0, 0.45, 0.45, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 216], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Sorting Numbers / Euclid GCD (2 - 150 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 138, 150], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Turing Machine (150 - 300 frames, Sub 2)
  const p2Opacity = interpolate(frame, [150, 165, 285, 300], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Complexity (300 - 450 frames, Sub 3)
  const p3Opacity = interpolate(frame, [300, 315], [0, 1], { extrapolateRight: "clamp" });
  const compScale = spring({
    frame: frame - 300,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  return (
    <div
      style={{
        width: 1920,
        height: 1080,
        backgroundColor: "#020617",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Alan Turing Bletchley Park Background */}
      {imgOpacity > 0 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgOpacity,
            transform: `scale(${imgScale})`,
            filter: "brightness(0.85) contrast(1.1)",
          }}
        >
          <Img
            src={staticFile("images/ch25_alan_turing.jpg")}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at 50% 50%, rgba(2, 6, 23, 0.35) 0%, rgba(2, 6, 23, 0.95) 100%)",
            }}
          />
        </div>
      )}

      <AtmosphericBackground glowColor="#10B981" particleCount={20} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Alan Turing"
          years="1912 – 1954"
          contribution="Máy Turing & Khoa học Thuật toán"
          color="#10B981"
          delay={15}
        />

        {/* Chapter Header */}
        <div
          style={{
            position: "absolute",
            top: 50,
            left: 960,
            transform: "translateX(-50%)",
            textAlign: "center",
            zIndex: 20,
          }}
        >
          <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 4, textTransform: "uppercase", fontWeight: 700 }}>
            Chương 25 · Thuật Toán
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Quy Trình Hữu Hạn Để Giải Quyết Vấn Đề
          </div>
        </div>

        {/* Phase 1: Euclid GCD */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
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
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                THUẬT TOÁN EUCLID TÌM ƯỚC CHUNG LỚN NHẤT
              </div>
              <KaTeXLabel
                latex="\gcd(48, 18) \to 48 = 2 \times 18 + 12 \to 18 = 1 \times 12 + 6 \to 12 = 2 \times 6 + 0 \implies \mathbf{6}"
                isInline={true}
                fontSize={27}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Một chuỗi hữu hạn các chỉ dẫn rõ ràng và lặp lại liên tục cho đến khi bài toán kết thúc
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Universal Turing Machine */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                width: "max-content",
                maxWidth: 1500,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(16, 185, 129, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#10B981", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                MÁY TURING PHỔ QUÁT (TURING MACHINE)
              </div>
              <KaTeXLabel
                latex="\delta: Q \times \Gamma \to Q \times \Gamma \times \{L, R\}"
                isInline={true}
                fontSize={40}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Băng từ vô hạn, đầu đọc ghi và các trạng thái chuyển dịch: Tư duy được cơ giới hóa thành các bước chạy tuần tự
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Complexity */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${compScale})`,
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
                HẠT GIỐNG TIẾN HÓA: ĐỘ PHỨC TẠP TÍNH TOÁN
              </div>
              <KaTeXLabel
                latex="O(1) \subset O(\log n) \subset O(n) \subset O(n^2) \subset O(2^n)"
                isInline={true}
                fontSize={34}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Một bài toán có thể giải được trên lý thuyết, nhưng liệu ta có đủ thời gian và tài nguyên để chờ nó tính xong?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
