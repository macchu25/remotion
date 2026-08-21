const fs = require('fs');
const path = require('path');

const mp4Path = path.join(__dirname, 'out', 'negative_times_negative.mp4');
if (fs.existsSync(mp4Path)) {
  const stats = fs.statSync(mp4Path);
  console.log(`Rendered Video MP4 Status: OK (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
} else {
  console.error("MP4 file missing!");
}
