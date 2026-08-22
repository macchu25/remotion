import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter35_GraphTheoryNetworks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase transitions
  const p1Opacity = interpolate(frame, [0, 20, 140, 160], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const p2Opacity = interpolate(frame, [150, 170, 310, 330], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const p3Opacity = interpolate(frame, [320, 340, 480, 500], [0, 1, 1, 1], { extrapolateLeft: "clamp" });

  const graphScale = spring({ frame: frame - 10, fps, config: { damping: 14, stiffness: 80 } });
  const cryptoScale = spring({ frame: frame - 330, fps, config: { damping: 14, stiffness: 80 } });

  return (
    <div style={{ position: "relative", width: 1920, height: 1080, overflow: "hidden", backgroundColor: "#020617" }}>
      <AtmosphericBackground glowColor="#10B981" particleCount={24} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 625], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
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
        <MathematicianBadge
          name="Edsger Dijkstra"
          years="1930 – 2002"
          contribution="Thuật toán Đường đi Ngắn nhất & Đồ thị"
          color="#10B981"
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
          <div style={{ color: "#10B981", fontSize: 20, letterSpacing: 4, fontWeight: 700 }}>
            CHƯƠNG 35 · LÝ THUYẾT ĐỒ THỊ & MẠNG LƯỚI
          </div>
          <div style={{ color: "#FFFFFF", fontSize: 32, fontWeight: 800, marginTop: 8 }}>
            Toán Học Kết Nối Dòng Chảy Toàn Cầu
          </div>
        </div>

        {/* Phase 1: Graph Representation */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${graphScale})`,
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
                MÔ HÌNH ĐỒ THỊ: ĐỈNH (VERTICES) & CẠNH NỐI (EDGES)
              </div>
              <KaTeXLabel
                latex="G = (V, E), \quad \mathbf{A}_{ij} = \begin{cases} 1 & \text{nếu } (v_i, v_j) \in E \\ 0 & \text{khác} \end{cases}"
                isInline={true}
                fontSize={36}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Lý thuyết đồ thị mô hình hóa các mối liên kết thông qua những điểm nút và cạnh nối vô hình
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Dijkstra Shortest Path */}
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
                THUẬT TOÁN ĐƯỜNG ĐI NGẮN NHẤT & ĐỊNH TUYẾN INTERNET
              </div>
              <KaTeXLabel
                latex="\text{dist}[v] = \min_{u} (\text{dist}[u] + w(u, v)) \implies \text{Định tuyến gói tin tối ưu}"
                isInline={true}
                fontSize={32}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Từ thuật toán tìm đường đi ngắn nhất đến định tuyến Internet: Dòng chảy thông tin luôn tìm thấy lối đi tối ưu nhất
              </div>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Cryptography */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${cryptoScale})`,
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
                HẠT GIỐNG TIẾN HÓA: MẬT MÃ BẤT ĐỐI XỨNG
              </div>
              <KaTeXLabel
                latex="C \equiv M^e \pmod N \quad \text{vs} \quad M \equiv C^d \pmod N"
                isInline={true}
                fontSize={38}
                color="#F59E0B"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Nếu dữ liệu phải đi qua những con đường công cộng rộng lớn, làm sao để giữ trọn vẹn sự bí mật của thông tin?
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
