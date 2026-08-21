const fs = require('fs');
const http = require('http');
const https = require('https');
const path = require('path');

// Helper to fetch Google Translate TTS MP3 for Vietnamese text chunk
function fetchTTSChunk(text) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodedText}`;

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`TTS Request Failed with status ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

// Full Vietnamese lesson transcript split into clean sentences
const scriptParagraphs = [
  "Xin chào các bạn! Hôm nay chúng ta sẽ cùng giải mã bản chất của Đạo Hàm.",
  "Nhiều bạn học sinh cảm thấy đạo hàm rất khó vì toàn công thức phức tạp.",
  "Nhưng đừng lo! Hôm nay chúng ta sẽ hiểu bản chất đạo hàm một cách thú vị nhất từ con số 0!",

  // Scene 1
  "Chương một: Từ câu hỏi trong đời sống.",
  "Hãy tưởng tượng bạn đang lái xe máy từ Hà Nội đến Hải Phòng dài 100 ki lô mét hết 2 giờ.",
  "Vận tốc trung bình là 50 ki lô mét trên giờ.",
  "Nhưng khi cảnh sát giao thông bắn tốc độ ở phút thứ 30 và thông báo bạn đang đi 75 ki lô mét trên giờ.",
  "Đó chính là vận tốc tức thời tại đúng thời điểm đó!",
  "Làm sao toán học tính được vận tốc khi thời gian bằng 0?",

  // Scene 2
  "Chương hai: Ý nghĩa hình học và đường tiếp tuyến.",
  "Trên đồ thị, vận tốc trung bình là độ dốc của đường cát tuyến nối 2 điểm A và B.",
  "Khi ta thu hẹp khoảng thời gian Delta t ngày càng nhỏ, từ 10 giây xuong 1 giây, rồi 0 phẩy 0 0 1 giây.",
  "Điểm B trượt dần về phía điểm A.",
  "Lúc này, đường cát tuyến sẽ biến thành đường tiếp tuyến sượt qua đúng 1 điểm!",
  "Độ dốc của đường tiếp tuyến đó chính là đạo hàm!",

  // Scene 3
  "Chương ba: Giải mã công thức giới hạn.",
  "Công thức đạo hàm f phẩy x bằng giới hạn lim khi Delta x tiến về 0 của Delta y chia cho Delta x.",
  "Delta y là sự thay đổi của đầu ra. Delta x là sự thay đổi của đầu vào.",
  "Đạo hàm đơn giản là tỷ lệ thay đổi tức thời khi Delta x siêu nhỏ!",

  // Scene 4
  "Chương bốn: Ứng dụng trong thực tế.",
  "Trong vật lý, đạo hàm của quãng đường là vận tốc, đạo hàm của vận tốc là gia tốc.",
  "Trong kinh tế, đạo hàm giúp tính chi phí biên để tối ưu lợi nhuận.",
  "Và đặc biệt trong Trí tuệ nhân tạo AI, thuật toán Gradient Descent dùng đạo hàm để giúp AI tự học và sửa lỗi!",
  "Chúc mừng bạn đã hiểu rõ bản chất của đạo hàm!"
];

async function generateFullVietnameseAudio() {
  console.log("Downloading real Vietnamese AI voiceover chunks...");
  const buffers = [];

  for (let i = 0; i < scriptParagraphs.length; i++) {
    const text = scriptParagraphs[i];
    console.log(`Processing [${i + 1}/${scriptParagraphs.length}]: ${text.slice(0, 30)}...`);
    try {
      const audioBuffer = await fetchTTSChunk(text);
      buffers.push(audioBuffer);
      // Wait 150ms between requests to be polite to server
      await new Promise(r => setTimeout(r, 150));
    } catch (err) {
      console.error(`Error on chunk ${i}:`, err.message);
    }
  }

  const fullAudio = Buffer.concat(buffers);
  const outputPath = path.join(__dirname, 'public', 'derivative_masterclass_voice.mp3');
  fs.writeFileSync(outputPath, fullAudio);
  console.log(`Successfully generated REAL Vietnamese AI Voiceover: ${outputPath} (${(fullAudio.length / 1024).toFixed(1)} KB)`);
}

generateFullVietnameseAudio();
