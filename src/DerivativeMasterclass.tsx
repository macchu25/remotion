import React from "react";
import {
  AbsoluteFill,
  Audio,
  Series,
  staticFile,
  useCurrentFrame,
} from "remotion";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2Graph } from "./scenes/Scene2Graph";
import { Scene3Formula } from "./scenes/Scene3Formula";
import { Scene4Summary } from "./scenes/Scene4Summary";

export const DerivativeMasterclass: React.FC = () => {
  const frame = useCurrentFrame();

  // Subtitle phrases mapped across the 3-minute lesson timeline
  const subtitles = [
    { start: 0, end: 120, text: "👋 Xin chào các bạn! Hôm nay chúng ta sẽ cùng giải mã BẢN CHẤT CỦA ĐẠO HÀM." },
    { start: 120, end: 300, text: "💡 Nhiều bạn thấy khó vì toàn công thức. Nhưng hôm nay ta sẽ hiểu từ con số ZERO!" },
    
    // Scene 1 Captions (15s to 50s)
    { start: 450, end: 700, text: "🚗 CHƯƠNG 1: Hãy tưởng tượng bạn lái xe từ Hà Nội đến Hải Phòng 100km trong 2 giờ." },
    { start: 700, end: 1000, text: "📊 Vận tốc trung bình là 50 km/h. Nhưng có phải lúc nào bạn cũng đi 50 km/h không?" },
    { start: 1000, end: 1350, text: "⚡ Khi công an bắn tốc độ mốc 30 phút là 75 km/h ➔ Đó là VẬN TỐC TỨC THỜI!" },

    // Scene 2 Captions (50s to 100s)
    { start: 1500, end: 1900, text: "📉 CHƯƠNG 2: Trên đồ thị, vận tốc trung bình là độ dốc của Cát Tuyến nối 2 điểm A và B." },
    { start: 1900, end: 2400, text: "✨ Khi ép khoảng thời gian Δt siêu nhỏ (gần 0), Cát Tuyến biến thành TIẾP TUYẾN sượt qua 1 điểm!" },
    { start: 2400, end: 2800, text: "🎯 Độ dốc của đường tiếp tuyến đó CHÍNH LÀ ĐẠO HÀM f'(t)!" },

    // Scene 3 Captions (100s to 140s)
    { start: 3000, end: 3400, text: "📐 CHƯƠNG 3: Công thức f'(x) = lim (Δy / Δx) nghe có vẻ phức tạp nhưng rất đơn giản." },
    { start: 3400, end: 3900, text: "💡 Δy là sự thay đổi đầu ra, Δx là sự thay đổi đầu vào. Đạo hàm là tỷ lệ thay đổi tức thời!" },

    // Scene 4 Captions (140s to 180s)
    { start: 4200, end: 4700, text: "🚀 CHƯƠNG 4: Đạo hàm có ở khắp nơi: Vật lý (vận tốc/gia tốc), Kinh tế (chi phí biên)..." },
    { start: 4700, end: 5400, text: "🤖 Đặc biệt trong AI: Thuật toán Gradient Descent dùng Đạo hàm để AI tự học và sửa lỗi!" },
  ];

  const currentSub = subtitles.find((s) => frame >= s.start && frame < s.end);

  return (
    <AbsoluteFill style={{ background: "#090d16" }}>
      {/* Audio Tracks with 1.25x Playback Speed */}
      <Audio src={staticFile("derivative_masterclass_voice.mp3")} volume={1.0} playbackRate={1.25} />
      <Audio src={staticFile("math_bgm.wav")} volume={0.14} loop />

      {/* Sequential Scene Chapters (Total 5400 Frames = 3 Minutes @ 30 FPS) */}
      <Series>
        {/* Scene 1: Real-life Analogy (45 seconds = 1350 frames) */}
        <Series.Sequence durationInFrames={1350}>
          <Scene1Intro />
        </Series.Sequence>

        {/* Scene 2: Geometric Secant to Tangent (55 seconds = 1650 frames) */}
        <Series.Sequence durationInFrames={1650}>
          <Scene2Graph />
        </Series.Sequence>

        {/* Scene 3: Limit Formula Breakdown (45 seconds = 1350 frames) */}
        <Series.Sequence durationInFrames={1350}>
          <Scene3Formula />
        </Series.Sequence>

        {/* Scene 4: Applications in Physics, Econ & AI (35 seconds = 1050 frames) */}
        <Series.Sequence durationInFrames={1050}>
          <Scene4Summary />
        </Series.Sequence>
      </Series>

      {/* Persistent Bottom Subtitle Karaoke Box */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "85%",
          maxWidth: "1500px",
          padding: "20px 40px",
          borderRadius: "20px",
          background: "rgba(3, 7, 18, 0.88)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(56, 189, 248, 0.4)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.8)",
          textAlign: "center",
          zIndex: 100,
        }}
      >
        <div style={{ fontSize: "32px", fontWeight: 800, color: "#f8fafc", lineHeight: 1.4 }}>
          {currentSub ? currentSub.text : "🎓 Bài giảng: Bản Chất Của Đạo Hàm Cho Người Mới Bắt Đầu"}
        </div>
      </div>
    </AbsoluteFill>
  );
};
