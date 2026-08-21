const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, 'public', 'audio', 'voice');

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
  "Và hai lần đảo... đưa bạn trở lại hướng ban đầu.",
  "Đó là trực giác.",
  "Nhưng toán học còn ép kết quả phải là số dương.",
  "Ta biết một cộng âm một bằng không.",
  "Vì vậy: âm một nhân với một cộng âm một... phải bằng không.",
  "Phân phối âm một vào bên trong, ta có:",
  "âm một... cộng với âm một nhân âm một... bằng không.",
  "Vậy số nào cộng với âm một để bằng không?",
  "Chỉ có dương một.",
  "Vì thế: âm một nhân âm một bằng dương một.",
  "Và nói rộng hơn, âm nhân âm bắt buộc phải thành dương.",
  "Nếu quy tắc này không đúng... những quy tắc cơ bản của số học sẽ bắt đầu tự mâu thuẫn.",
  "Nhưng số âm từng dẫn tới một thứ còn kỳ lạ hơn. Làm sao căn bậc hai của âm một... lại có thể tồn tại?"
];

async function measureEachSentence() {
  console.log("Measuring individual sentence audio durations...");
  let currentFrame = 0;
  const sentenceCues = [];

  for (let i = 0; i < sentences.length; i++) {
    const chunkPath = path.join(dir, `sentence_${i}.mp3`);
    if (fs.existsSync(chunkPath)) {
      const out = execSync(`npx remotion ffprobe "${chunkPath}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
      const durSec = parseFloat(out);
      const frames = Math.round(durSec * 30);
      sentenceCues.push({
        index: i,
        text: sentences[i],
        durationSec: durSec,
        durationFrames: frames,
        startFrame: currentFrame,
        endFrame: currentFrame + frames
      });
      currentFrame += frames;
    }
  }

  console.log(JSON.stringify(sentenceCues, null, 2));
  console.log(`TOTAL CALCULATED FRAMES: ${currentFrame}`);
}

measureEachSentence();
