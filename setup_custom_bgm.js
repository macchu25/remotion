const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, 'df.mp3');
const destFile = path.join(__dirname, 'public', 'custom_bgm.mp3');

if (fs.existsSync(srcFile)) {
  fs.copyFileSync(srcFile, destFile);
  const stats = fs.statSync(destFile);
  console.log(`Copied custom BGM: ${destFile} (${(stats.size / 1024).toFixed(1)} KB)`);
} else {
  console.error("Source file df.mp3 not found!");
}
