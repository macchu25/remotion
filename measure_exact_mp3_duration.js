const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const mp3Path = path.join(__dirname, 'public', 'audio', 'voice', 'voiceover_neg_neg.mp3');

// Use ffprobe or node buffer analysis to get exact duration in seconds
try {
  const output = execSync(`npx remotion ffprobe "${mp3Path}" -show_entries format=duration -v quiet -of csv="p=0"`).toString().trim();
  const durationSec = parseFloat(output);
  console.log(`EXACT MP3 DURATION: ${durationSec} seconds`);
  console.log(`EXACT FRAMES AT 30 FPS: ${Math.round(durationSec * 30)} frames`);
} catch (err) {
  console.error("Error probing MP3:", err.message);
}
