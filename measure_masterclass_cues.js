const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, 'public', 'audio', 'voice_masterclass');

const sentences = [
  "Giả sử bạn muốn gửi cho tôi một tin nhắn bí mật qua Internet... nhưng dữ liệu phải đi qua mạng, nên người khác có thể chặn nó giữa đường.",
  "Cách đơn giản nhất là dùng một mật khẩu chung để khóa tin nhắn... Nhưng làm sao tôi gửi mật khẩu bí mật đó cho bạn mà không bị lấy mất?",
  "Vấn đề không chỉ là mã hóa. Vấn đề là làm sao chia sẻ chìa khóa bí mật an toàn!",
  "Hãy tưởng tượng tôi phát cho cả thế giới những chiếc ổ khóa mở sẵn. Ai cũng được lấy một cái, nhưng chìa khóa mở chúng thì chỉ mình tôi giữ.",
  "Bạn lấy ổ khóa của tôi, khóa thông tin lại rồi gửi. Ai cũng có thể khóa, nhưng chỉ duy nhất tôi mở được.",
  "Trong máy tính, ổ khóa và chìa khóa được tạo bằng toán học.",
  "Hệ thống này bắt đầu bằng hai số nguyên tố bí mật chỉ chủ sở hữu biết, ví dụ 61 và 53.",
  "Nhân chúng lại rất dễ: 61 nhân 53 bằng 3233.",
  "Nhưng nếu tôi chỉ đưa bạn 3233 và hỏi hai số nguyên tố nào tạo ra nó... việc tìm ngược lại là bài toán khó.",
  "Với 3233 thì dễ, nhưng hệ thống thật dùng những số nguyên tố dài hàng trăm chữ số.",
  "RỒI SAO? Khó tìm hai số nguyên tố thì liên quan gì đến việc đọc tin nhắn?",
  "Từ hai số nguyên tố bí mật, máy tính tạo ra hai con số có quan hệ đặc biệt: Ổ khóa công khai và Chìa khóa bí mật.",
  "Ổ khóa được phát cho tất cả mọi người, còn chìa khóa chỉ người chủ giữ.",
  "Giả sử bạn muốn gửi chữ HELLO. Máy tính biến chữ HELLO thành con số 65.",
  "Bạn lấy ổ khóa công khai, thực hiện phép toán mã hóa... 65 biến thành số 2790 đã khóa!",
  "Thứ chạy qua Internet bây giờ là 2790. Kẻ nghe lén có thể chặn được 2790 và biết cả ổ khóa công khai.",
  "Nhưng ổ khóa công khai được thiết kế để khóa thì dễ, chứ không cho cách dễ dàng để làm ngược lại!",
  "Người chủ biết hai số 61 và 53 từ đầu nên có một đường tắt toán học để tạo chìa khóa bí mật.",
  "Kẻ nghe lén không có 61 và 53, nên phải giải bài toán phân tích thừa số ngược cực kỳ khó!",
  "Tạo ra bài toán thì DỄ... nhưng ĐẢO NGƯỢC NÓ THÌ KHÓ! Sự bất đối xứng này tạo nên lớp bảo vệ cho Internet.",
  "Người nhận dùng chìa khóa bí mật mở 2790 trở lại thành 65... và giải mã thành HELLO ban đầu.",
  "Hệ thống dùng chìa khóa công khai và chìa khóa bí mật này gọi là RSA. Nhưng máy tính lượng tử có thể phá nó bằng cách nào?"
];

function measure() {
  const sentenceCues = [];
  let currentFrame = 0;

  for (let i = 0; i < sentences.length; i++) {
    const chunkPath = path.join(dir, `sentence_${i}.mp3`);
    if (fs.existsSync(chunkPath)) {
      const out = execSync(`npx remotion ffprobe "${chunkPath}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
      const durSec = parseFloat(out);
      const frames = Math.round(durSec * 30);
      sentenceCues.push({
        index: i,
        text: sentences[i],
        durSec,
        frames,
        startFrame: currentFrame,
        endFrame: currentFrame + frames
      });
      currentFrame += frames;
    }
  }

  console.log(JSON.stringify(sentenceCues, null, 2));
  console.log(`TOTAL MASTER DURATION: ${currentFrame} FRAMES (${(currentFrame/30).toFixed(2)}s)`);
  fs.writeFileSync(path.join(__dirname, 'masterclass_sentence_cues.json'), JSON.stringify(sentenceCues, null, 2));
}

measure();
