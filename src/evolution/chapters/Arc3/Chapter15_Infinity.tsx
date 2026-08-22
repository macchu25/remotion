import React from "react";
import { Img, interpolate, staticFile, useCurrentFrame } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter15_Infinity: React.FC = () => {
  const frame = useCurrentFrame();

  // Establishing Image Slow Zoom & Fade (0 - 203 frames, Sub 1)
  const imgOpacity = interpolate(frame, [0, 15, 150, 203], [0, 0.42, 0.42, 0], {
    extrapolateRight: "clamp",
  });
  const imgScale = interpolate(frame, [0, 203], [1.0, 1.07], {
    extrapolateRight: "clamp",
  });

  // Phase 1: Infinite geometric series bar (2 - 177 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 165, 177], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const barProgress = interpolate(frame, [10, 140], [0, 0.999], { extrapolateRight: "clamp" });

  // Phase 2: Cosmic Infinity symbol glow (177 - 349 frames, Sub 2)
  const p2Opacity = interpolate(frame, [177, 190, 335, 349], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 3: Bridge to Primes (349 - 492 frames, Sub 3)
  const p3Opacity = interpolate(frame, [349, 365], [0, 1], { extrapolateRight: "clamp" });

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
      {/* Georg Cantor Infinite Universe Background */}
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
            src={staticFile("images/ch15_cantor_infinity.jpg")}
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

      <AtmosphericBackground glowColor="#38BDF8" particleCount={26} />

      <CameraRig panBehavior="slow_push">
        <MathematicianBadge
          name="Georg Cantor"
          years="1845 – 1918"
          contribution="Lý thuyết Tập hợp & Vô hạn siêu hạn"
          color="#38BDF8"
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
            Chương 15 · Khái Niệm Vô Hạn
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Quá Trình Vô Tận Tiệm Cận Giới Hạn
          </div>
        </div>

        {/* Phase 1: Subdivided Unit Bar (0 to 1) */}
        {p1Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p1Opacity }}>
            {/* Top Bar Outline at y = 440 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 440,
                transform: "translateX(-50%)",
                width: 1000,
                height: 48,
                border: "2px solid #475569",
                borderRadius: 10,
                overflow: "hidden",
              }}
            >
              <div style={{ width: `${barProgress * 100}%`, height: "100%", position: "absolute", left: 0, top: 0, overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, width: 500, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.7)", borderRight: "2px solid #030712" }} />
                <div style={{ position: "absolute", left: 500, top: 0, width: 250, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.6)", borderRight: "2px solid #030712" }} />
                <div style={{ position: "absolute", left: 750, top: 0, width: 125, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.5)", borderRight: "2px solid #030712" }} />
                <div style={{ position: "absolute", left: 875, top: 0, width: 62.5, height: "100%", backgroundColor: "rgba(56, 189, 248, 0.4)", borderRight: "2px solid #030712" }} />
              </div>
            </div>

            {/* Fraction Labels below Bar */}
            <KaTeXLabel latex="\frac{1}{2}" x={710} y={520} fontSize={28} color="#38BDF8" delay={15} />
            <KaTeXLabel latex="\frac{1}{4}" x={1085} y={520} fontSize={28} color="#38BDF8" delay={40} />
            <KaTeXLabel latex="\frac{1}{8}" x={1272} y={520} fontSize={28} color="#38BDF8" delay={65} />

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                CHUỖI HÌNH HỌC VÔ HẠN:
              </span>
              <KaTeXLabel
                latex="\sum_{n=1}^{\infty} \frac{1}{2^n} = \frac{1}{2} + \frac{1}{4} + \frac{1}{8} + \dots = 1"
                isInline={true}
                fontSize={30}
                color="#F8FAFC"
                scaleIn={false}
              />
            </div>
          </div>
        )}

        {/* Phase 2: Cosmic Infinity Symbol */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <KaTeXLabel latex="\infty" isInline={true} fontSize={140} color="#38BDF8" scaleIn={false} />
            </div>

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(56, 189, 248, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#38BDF8", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                BIỂU TƯỢNG VÔ CỰC:
              </span>
              <span style={{ color: "#CBD5E1", fontSize: 20, fontWeight: 500 }}>
                Quá trình mở rộng không bao giờ có giới hạn dừng lại
              </span>
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Primes */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 440,
                transform: "translateX(-50%)",
                display: "flex",
                gap: 16,
              }}
            >
              {[2, 3, 5, 7, 11, 13, 17, 19].map((p) => (
                <div
                  key={p}
                  style={{
                    width: 65,
                    height: 65,
                    borderRadius: 12,
                    backgroundColor: "rgba(56, 189, 248, 0.2)",
                    border: "2px solid #38BDF8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 15px rgba(56, 189, 248, 0.4)",
                  }}
                >
                  <span style={{ color: "#38BDF8", fontSize: 28, fontFamily: "'Fira Code', monospace", fontWeight: 700 }}>
                    {p}
                  </span>
                </div>
              ))}
            </div>

            {/* Bottom Badge at y = 740 */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 740,
                transform: "translateX(-50%)",
                padding: "12px 36px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.82)",
                border: "1px solid rgba(245, 158, 11, 0.4)",
                boxShadow: "0 0 25px rgba(0, 0, 0, 0.5)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#F59E0B", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                HẠT GIỐNG TIẾN HÓA:
              </span>
              <KaTeXLabel latex="p \in \mathbb{P} \quad (\text{Số nguyên tố bất khả phân})" isInline={true} fontSize={30} color="#F8FAFC" scaleIn={false} />
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
