const fs = require('fs');
const path = require('path');

// Read voiceover mp3 file size and estimate exact duration / cues
const voicePath = path.join(__dirname, 'public', 'audio', 'voice', 'voiceover_neg_neg.mp3');

if (fs.existsSync(voicePath)) {
  const stats = fs.statSync(voicePath);
  console.log(`Voiceover MP3 exists: ${voicePath} (${(stats.size / 1024).toFixed(1)} KB)`);
} else {
  console.error("Voiceover MP3 missing!");
}
