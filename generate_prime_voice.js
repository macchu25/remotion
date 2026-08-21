const fs = require('fs');
const https = require('https');
const path = require('path');
const { execSync } = require('child_process');

function fetchTTSChunk(text) {
  return new Promise((resolve, reject) => {
    const encodedText = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=vi&client=tw-ob&q=${encodedText}`;

    https.get(url, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`TTS status ${res.statusCode}`));
        return;
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
    }).on('error', reject);
  });
}

const sentences = [
  "Có một thứ giúp bảo vệ dữ liệu trên Internet… chỉ vì một phép toán rất dễ làm theo một chiều, nhưng cực khó làm ngược lại.",
  "Nhân hai số với nhau cực dễ.",
  "Nhưng nếu tôi chỉ đưa bạn 3233, và hỏi hai số nguyên tố nào đã tạo ra nó, bạn phải tìm ngược lại các thừa số của nó.",
  "Với một số nhỏ như thế này, chẳng khó chút nào.",
  "Nhưng bây giờ, hãy dùng hai số nguyên tố dài hàng trăm chữ số.",
  "Máy tính vẫn có thể nhân chúng rất nhanh.",
  "Nhưng chỉ từ kết quả mà tìm lại hai số ban đầu… lại là một bài toán khó khủng khiếp khi các số đủ lớn.",
  "Đó là bài toán phân tích một số lớn thành các thừa số nguyên tố.",
  "Và đây là ý tưởng đứng sau RSA, một hệ mật mã khóa công khai nổi tiếng.",
  "Bạn có thể công khai một phần thông tin để người khác mã hóa dữ liệu cho bạn, nhưng biết khóa công khai không đồng nghĩa với việc bạn dễ dàng tìm ra bí mật phía sau.",
  "Đó là cái hay.",
  "Tạo ra bài toán thì dễ…",
  "nhưng đảo ngược nó thì khó.",
  "Và trong mật mã, sự chênh lệch giữa dễ đi tới và khó đi ngược có thể trở thành một lớp bảo vệ.",
  "Nhưng có một vấn đề. Máy tính lượng tử đủ mạnh có thể khiến một số hệ mật mã kiểu này gặp rắc rối.",
  "Vậy một máy tính lượng tử có thể phá RSA như thế nào?"
];

async function generatePrimeVoice() {
  const dir = path.join(__dirname, 'public', 'audio', 'voice_prime');
  fs.mkdirSync(dir, { recursive: true });

  console.log("Generating Voiceover for Prime Protection Short...");
  const sentenceTimings = [];
  let currentFrame = 0;
  const allBuffers = [];

  for (let i = 0; i < sentences.length; i++) {
    const chunkPath = path.join(dir, `sentence_${i}.mp3`);
    console.log(`[${i + 1}/${sentences.length}] ${sentences[i].slice(0, 35)}...`);
    try {
      const buf = await fetchTTSChunk(sentences[i]);
      fs.writeFileSync(chunkPath, buf);
      allBuffers.push(buf);

      const out = execSync(`npx remotion ffprobe "${chunkPath}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
      const durSec = parseFloat(out);
      const frames = Math.round(durSec * 30);

      sentenceTimings.push({
        index: i,
        text: sentences[i],
        durSec,
        frames,
        startFrame: currentFrame,
        endFrame: currentFrame + frames
      });

      currentFrame += frames;
      await new Promise(r => setTimeout(r, 120));
    } catch (err) {
      console.error(`Error on sentence ${i}:`, err.message);
    }
  }

  const combinedPath = path.join(dir, 'voiceover_prime.mp3');
  fs.writeFileSync(combinedPath, Buffer.concat(allBuffers));

  console.log("\n================ EXACT SENTENCE TIMINGS ================");
  console.log(JSON.stringify(sentenceTimings, null, 2));
  console.log(`TOTAL MASTER DURATION: ${currentFrame} FRAMES (${(currentFrame/30).toFixed(2)} seconds)`);

  fs.writeFileSync(path.join(__dirname, 'prime_sentence_cues.json'), JSON.stringify(sentenceTimings, null, 2));
}

generatePrimeVoice();
