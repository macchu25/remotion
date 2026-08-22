import React from "react";
import { Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { CameraRig } from "../../camera/CameraRig";
import { AtmosphericBackground } from "../../primitives/AtmosphericBackground";
import { KaTeXLabel } from "../../primitives/KaTeXLabel";
import { MathematicianBadge } from "../../primitives/MathematicianBadge";

export const Chapter16_PrimeNumbers: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Factoring Composites (2 - 182 frames, Sub 1)
  const p1Opacity = interpolate(frame, [0, 10, 170, 182], [0, 1, 1, 0], { extrapolateRight: "clamp" });

  // Phase 2: Sieve Grid of 1 to 30 (182 - 360 frames, Sub 2)
  const p2Opacity = interpolate(frame, [182, 195, 345, 360], [0, 1, 1, 0], { extrapolateRight: "clamp" });
  const sieveProgress = interpolate(frame, [195, 310], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Phase 3: Bridge to Complex Numbers (360 - 502 frames, Sub 3)
  const p3Opacity = interpolate(frame, [360, 375], [0, 1], { extrapolateRight: "clamp" });
  const eqScale = spring({
    frame: frame - 360,
    fps,
    config: { damping: 14, mass: 0.8, stiffness: 120 },
  });

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];

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
      <AtmosphericBackground glowColor="#38BDF8" particleCount={22} />

      {/* Cinematic Historical Background Image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.18,
          transform: `scale(${interpolate(frame, [0, 544], [1.0, 1.08], { extrapolateRight: "clamp" })})`,
          transformOrigin: "center center",
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("images/ch03_ancient_numerals.jpg")}
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
          name="Eratosthenes"
          years="276 – 194 TCN"
          contribution="Sàng Số Nguyên Tố Alexandria"
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
            Chương 16 · Số Nguyên Tố
          </div>
          <div style={{ color: "#F8FAFC", fontSize: 32, fontWeight: 700, marginTop: 4 }}>
            Những Khối Xây Dựng Bất Hoại Của Số Học
          </div>
        </div>

        {/* Phase 1: Factorization Demo */}
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
                padding: "36px 60px",
                borderRadius: 24,
                border: "1.5px solid rgba(56, 189, 248, 0.3)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ color: "#38BDF8", fontSize: 20, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                ĐỊNH LÝ CƠ BẢN CỦA SỐ HỌC
              </div>
              <KaTeXLabel
                latex="12 = 2^2 \times 3 \quad \text{vs} \quad \mathbf{7 = 7} \quad (\text{Khối nguyên tố})"
                isInline={true}
                fontSize={38}
                color="#F8FAFC"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Mọi hợp số đều vỡ vụn thành các thừa số, nhưng số nguyên tố giữ nguyên bản thể
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Sieve Grid with Sleek Bottom Pill */}
        {p2Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p2Opacity }}>
            {/* Grid 1 to 30 centered cleanly at y = 430 */}
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: 410,
                transform: "translate(-50%, -50%)",
                display: "grid",
                gridTemplateColumns: "repeat(10, 68px)",
                gap: 12,
              }}
            >
              {Array.from({ length: 30 }).map((_, idx) => {
                const num = idx + 1;
                const isPrime = primes.includes(num);

                return (
                  <div
                    key={num}
                    style={{
                      width: 68,
                      height: 68,
                      borderRadius: 12,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: isPrime
                        ? "rgba(56, 189, 248, 0.3)"
                        : "rgba(15, 23, 42, 0.5)",
                      border: isPrime ? "2px solid #38BDF8" : "1px solid #334155",
                      boxShadow: isPrime ? "0 0 15px rgba(56, 189, 248, 0.6)" : "none",
                      opacity: isPrime ? 1 : 1 - sieveProgress * 0.75,
                      transform: isPrime ? "scale(1.06)" : "scale(0.92)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 24,
                        fontWeight: isPrime ? 700 : 400,
                        color: isPrime ? "#38BDF8" : "#64748B",
                      }}
                    >
                      {num}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Sleek Pill at y = 730, completely safe from subtitle and grid */}
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 730,
                transform: "translateX(-50%)",
                padding: "10px 32px",
                borderRadius: 20,
                backgroundColor: "rgba(15, 23, 42, 0.8)",
                border: "1px solid rgba(16, 185, 129, 0.4)",
                display: "flex",
                alignItems: "center",
                gap: 20,
              }}
            >
              <span style={{ color: "#10B981", fontSize: 18, fontWeight: 700, letterSpacing: 2 }}>
                SÀNG ERATOSTHENES:
              </span>
              <KaTeXLabel latex="\pi(x) \sim \frac{x}{\ln x}" isInline={true} fontSize={28} color="#F8FAFC" scaleIn={false} />
            </div>
          </div>
        )}

        {/* Phase 3: Bridge to Complex Numbers */}
        {p3Opacity > 0 && (
          <div style={{ position: "absolute", inset: 0, opacity: p3Opacity }}>
            <div
              style={{
                position: "absolute",
                left: 960,
                top: 480,
                transform: `translate(-50%, -50%) scale(${eqScale})`,
                width: 1100,
                textAlign: "center",
                backgroundColor: "rgba(15, 23, 42, 0.75)",
                padding: "36px 48px",
                borderRadius: 24,
                border: "1.5px solid rgba(239, 68, 68, 0.4)",
              }}
            >
              <div style={{ color: "#EF4444", fontSize: 22, letterSpacing: 3, fontWeight: 700, marginBottom: 16 }}>
                HẠT GIỐNG TIẾN HÓA: GIỚI HẠN CỦA TRỤC THỰC
              </div>
              <KaTeXLabel
                latex="x^2 = -1 \implies x = \pm \sqrt{-1} = \pm i"
                isInline={true}
                fontSize={50}
                color="#EF4444"
                scaleIn={false}
              />
              <div style={{ color: "#94A3B8", fontSize: 22, marginTop: 18 }}>
                Phương trình vô nghiệm trên trục thực mở ra một chiều không gian ảo hoàn toàn mới
              </div>
            </div>
          </div>
        )}
      </CameraRig>
    </div>
  );
};
