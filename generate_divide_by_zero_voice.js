const fs = require('fs');
const https = require('https');
const path = require('path');

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
  "Bạn có từng tự hỏi... tại sao máy tính không cho phép chia cho số 0?", // 0-3s
  "Không phải vì máy tính yếu... mà vì bản thân phép tính này không có một đáp án hợp lý.", // 3-7s
  "Chia 10 cho 2 nghĩa là chia 10 thứ thành hai nhóm bằng nhau.", // 7-10s
  "Hay nói cách khác, 2 nhân với số nào bằng 10? Là 5.", // 10-13s
  "Vậy 10 chia 0 sẽ là hỏi: 0 nhân với số nào bằng 10?", // 13-16s
  "Nhưng 0 nhân với 1... 10... một triệu... hay bất kỳ số nào...", // 16-21s
  "Không tồn tại con số nào khiến 0 nhân với nó bằng 10.", // 21-24s
  "Nhưng... 0 chia 0 còn kỳ lạ hơn.", // 24-27s
  "Bởi vì bây giờ câu hỏi là: 0 nhân với số nào bằng 0? Và câu trả lời là... gần như bất kỳ số nào.", // 27-33s
  "Thay vì không có đáp án... bây giờ lại có quá nhiều đáp án.", // 33-35s
  "Nhưng nếu vậy... tại sao không cứ cho chia cho 0 bằng vô cực?", // 35-38s
  "Khi số chia càng tiến gần về 0... kết quả càng ngày càng lớn.", // 38-44s
  "Nhưng tiến tới 0 từ phía dương, ta đi về dương vô cực. Còn phía âm... lại là âm vô cực.", // 44-47s
  "Vậy tại đúng số 0... bạn chọn vô cực nào?", // 47-50s
  "Đó là lý do phép chia cho 0 được gọi là không xác định.", // 50-54s
  "Nhưng số 0 vẫn chưa hết kỳ lạ. Bởi vì... 0 mũ 0 bằng bao nhiêu?" // 54-60s
];

async function generateVoice() {
  const dir = path.join(__dirname, 'public', 'audio', 'voice');
  fs.mkdirSync(dir, { recursive: true });

  console.log("Generating Voiceover MP3 sentences...");
  const buffers = [];

  for (let i = 0; i < sentences.length; i++) {
    console.log(`Downloading sentence ${i + 1}/${sentences.length}...`);
    try {
      const buf = await fetchTTSChunk(sentences[i]);
      buffers.push(buf);
      await new Promise(r => setTimeout(r, 120));
    } catch (err) {
      console.error(`Error on sentence ${i}:`, err.message);
    }
  }

  const combined = Buffer.concat(buffers);
  const outPath = path.join(dir, 'voiceover.mp3');
  fs.writeFileSync(outPath, combined);
  console.log(`Saved Voiceover MP3: ${outPath} (${(combined.length / 1024).toFixed(1)} KB)`);
}

generateVoice();
