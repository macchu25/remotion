const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ===========================================================================
// POST-PRODUCTION AUDIO MERGER SCRIPT (REMOTION FFMPEG EDITION)
// 1. Renders 100% clean video + voiceover + SFX from Remotion (No BGM clutter in Studio timeline!)
// 2. Uses npx remotion ffmpeg to mix custom_bgm.mp3 (df.mp3) into the final MP4 video seamlessly!
// ===========================================================================

const composition = process.argv[2] || 'PrimeMasterclassShort';
const bgmVolume = parseFloat(process.argv[3] || '0.08'); // BGM Volume multiplier (default 0.08)

const outDir = path.join(__dirname, 'out');
fs.mkdirSync(outDir, { recursive: true });

const rawVideoPath = path.join(outDir, 'temp_raw_video.mp4');
const bgmAudioPath = path.join(__dirname, 'public', 'custom_bgm.mp3');
const finalOutputPath = path.join(outDir, `${composition.toLowerCase()}_with_bgm.mp4`);

console.log(`\n🎬 Step 1: Rendering clean Remotion video: ${composition}...`);
execSync(`npx remotion render src/index.ts ${composition} "${rawVideoPath}"`, { stdio: 'inherit' });

if (fs.existsSync(bgmAudioPath)) {
  console.log(`\n🎼 Step 2: Merging background music df.mp3 at volume ${bgmVolume}...`);
  // FFmpeg filter complex: loop BGM, adjust BGM volume, mix with raw video audio (amix)
  const ffmpegCmd = `npx remotion ffmpeg -y -i "${rawVideoPath}" -stream_loop -1 -i "${bgmAudioPath}" -filter_complex "[1:a]volume=${bgmVolume}[bgm];[0:a][bgm]amix=inputs=2:duration=first:dropout_transition=2[aout]" -map 0:v:0 -map "[aout]" -c:v copy -c:a aac -b:a 192k "${finalOutputPath}"`;

  try {
    execSync(ffmpegCmd, { stdio: 'inherit' });
    console.log(`\n🎉 SUCCESS! Rendered video with background music merged: ${finalOutputPath}`);
  } catch (err) {
    console.log(`\n⚠️ Failed to merge BGM with npx remotion ffmpeg. Raw video saved to: ${rawVideoPath}`);
  }
} else {
  console.log(`\n⚠️ BGM file df.mp3 not found. Kept raw output: ${rawVideoPath}`);
}
