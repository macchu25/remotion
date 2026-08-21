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
  "Có một quy tắc toán học mà chúng ta học thuộc... nhưng hiếm ai giải thích tại sao.",
  "Tại sao hai số âm nhân nhau... lại biến thành số dương?",
  "Không phải vì toán học tự nhiên quyết định rằng hai cái âm thì phải thành dương.",
  "Hãy nghĩ phép nhân là một chuyển động trên trục số.",
  "Ba nhân hai: ta tiến ba đơn vị, hai lần.",
  "Nhưng nếu đổi số hai thành âm hai... hướng chuyển động bị đảo ngược.",
  "Một dấu âm, về bản chất, có thể hiểu như một lệnh: đảo hướng.",
  "Vậy nhân với âm một lần... nó quay bạn lại.",
  "Nhưng nhân với số âm thêm một lần nữa... bạn lại bị đảo hướng lần thứ hai.",
  "Và hai lần đảo... đưa bạn trở lại hướng ban đầu. Đó là trực giác.",
  "Nhưng toán học còn ép kết quả phải là số dương.",
  "Ta biết một cộng âm một bằng không.",
  "Vì vậy: âm một nhân với một cộng âm một... phải bằng không.",
  "Phân phối âm một vào bên trong, ta có: âm một... cộng với âm một nhân âm một... bằng không.",
  "Vậy số nào cộng với âm một để bằng không? Chỉ có dương một.",
  "Vì thế: âm một nhân âm một bằng dương một. Và nói rộng hơn, âm nhân âm bắt buộc phải thành dương.",
  "Nếu quy tắc này không đúng... những quy tắc cơ bản của số học sẽ bắt đầu tự mâu thuẫn.",
  "Nhưng số âm từng dẫn tới một thứ còn kỳ lạ hơn. Làm sao căn bậc hai của âm một... lại có thể tồn tại?"
];

async function generateVoice() {
  const dir = path.join(__dirname, 'public', 'audio', 'voice');
  fs.mkdirSync(dir, { recursive: true });

  console.log("Generating Individual Voiceover Sentence Chunks...");
  const sentenceTimings = [];
  let currentFrame = 0;
  const allBuffers = [];

  for (let i = 0; i < sentences.length; i++) {
    const chunkPath = path.join(dir, `sentence_${i}.mp3`);
    console.log(`[${i + 1}/${sentences.length}] ${sentences[i].slice(0, 30)}...`);
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

  const combinedPath = path.join(dir, 'voiceover_neg_neg.mp3');
  fs.writeFileSync(combinedPath, Buffer.concat(allBuffers));

  console.log("\n================ EXACT SENTENCE TIMINGS ================");
  console.log(JSON.stringify(sentenceTimings, null, 2));
  console.log(`TOTAL MASTER DURATION: ${currentFrame} FRAMES (${(currentFrame/30).toFixed(2)} seconds)`);

  fs.writeFileSync(path.join(__dirname, 'sentence_cues.json'), JSON.stringify(sentenceTimings, null, 2));
}

generateVoice();
