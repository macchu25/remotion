const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Script to measure exact durations of the voiceover files
const v1 = path.join(__dirname, 'public', 'audio', 'voice', 'voiceover_neg_neg.mp3');
const v2 = path.join(__dirname, 'public', 'audio', 'voice', 'voiceover.mp3');

console.log("Checking voiceover files...");
if (fs.existsSync(v1)) {
  const stats1 = fs.statSync(v1);
  console.log(`voiceover_neg_neg.mp3: ${stats1.size} bytes`);
}
if (fs.existsSync(v2)) {
  const stats2 = fs.statSync(v2);
  console.log(`voiceover.mp3: ${stats2.size} bytes`);
}
