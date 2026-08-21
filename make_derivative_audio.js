const fs = require('fs');

function createWav(filename, durationSec, getSample) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt subchunk
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);

  // data subchunk
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sampleVal = Math.max(-1, Math.min(1, getSample(t, i, numSamples)));
    const int16Val = Math.floor(sampleVal * 32767);
    buffer.writeInt16LE(int16Val, 44 + i * 2);
  }

  fs.writeFileSync(filename, buffer);
  console.log(`Generated ${filename}`);
}

// Generate background ambient music (8 seconds soft synth chord progression)
createWav('public/math_bgm.wav', 10.0, (t, i, total) => {
  // Soft ambient chord sequence in C-major (C - G - Am - F)
  const chordTime = Math.floor((t % 8) / 2);
  let freq1 = 261.63; // C4
  let freq2 = 329.63; // E4
  let freq3 = 392.00; // G4

  if (chordTime === 1) { // G major
    freq1 = 196.00; freq2 = 246.94; freq3 = 293.66;
  } else if (chordTime === 2) { // A minor
    freq1 = 220.00; freq2 = 261.63; freq3 = 329.63;
  } else if (chordTime === 3) { // F major
    freq1 = 174.61; freq2 = 220.00; freq3 = 261.63;
  }

  const env = 0.15 + 0.05 * Math.sin(t * 2);
  const wave = (Math.sin(2 * Math.PI * freq1 * t) +
                Math.sin(2 * Math.PI * freq2 * t) * 0.7 +
                Math.sin(2 * Math.PI * freq3 * t) * 0.5) / 2.2;
  return wave * env * 0.3;
});
