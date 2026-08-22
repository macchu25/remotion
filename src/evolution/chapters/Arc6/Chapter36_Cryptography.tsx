import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";

export const Chapter36_Cryptography: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const rsaScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const noiseScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#EC4899" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 607], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
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
            background: "radial-gradient(circle at 50% 50%, rgba(2,6,23,0.3) 0%, rgba(2,6,23,0.92) 80%)",
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
          <div style={{ color: "#EC4899", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 36 · MẬT MÃ HỌC HIỆN ĐẠI
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Vẻ Đẹp Bất Đối Xứng Bảo Vệ Chân Lý Thông Tin
          </div>
        </div>

        {/* Phase 1: RSA Prime Trapdoor */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${rsaScale})`,
                width: "max-content",
                maxWidth: 1550,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                padding: "36px 56px",
                borderRadius: 24,
                border: "1.5px solid rgba(236, 72, 153, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#EC4899", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HỆ MẬT MÃ KHÓA CÔNG KHAI RSA
              </div>
              <KaTeXLabel
                latex="N = p \times q \quad (p, q \in \mathbb{P}), \quad e \cdot d \equiv 1 \pmod{(p-1)(q-1)}"
                isInline={true}
                fontSize={34}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mật mã học hiện đại sử dụng vẻ đẹp bất đối xứng của toán học để khóa chặt ý nghĩa của thông điệp
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Asymmetric Security */}
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
                border: "1.5px solid rgba(56, 189, 248, 0.4)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HÀM MỘT CHIỀU (ONE-WAY TRAPDOOR FUNCTION)
              </div>
              <KaTeXLabel
                latex="M \xrightarrow{\text{Mã hóa dễ } M^e \pmod N} C \xrightarrow{\text{Giải mã cần khóa bí mật } d} M"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Phép nhân hai số nguyên tố khổng lồ thì dễ dàng, nhưng phân tích ngược lại đòi hỏi hàng nghìn năm tính toán
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Error Correction */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${noiseScale})`,
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
                HẠT GIỐNG TIẾN HÓA: KHÔI PHỤC DỮ LIỆU TỪ NHIỄU
              </div>
              <KaTeXLabel
                latex="H(X) = -\sum p(x) \log_2 p(x) \implies \text{Dự phòng và Mã sửa lỗi}"
                isInline={true}
                fontSize={34}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu dữ liệu không bị kẻ xấu đọc trộm mà chỉ đơn giản bị méo mó và hư hỏng trên đường truyền thì sao?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
