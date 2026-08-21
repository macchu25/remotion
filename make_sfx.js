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
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20);  // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(1, 22);  // NumChannels (1 mono)
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28); // ByteRate
  buffer.writeUInt16LE(2, 32);  // BlockAlign
  buffer.writeUInt16LE(16, 34); // BitsPerSample

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

// 1. Pop/Click SFX (0.05s short pulse)
createWav('public/pop.wav', 0.05, (t, i, total) => {
  const freq = 800 - t * 10000;
  const env = Math.exp(-t * 80);
  return Math.sin(2 * Math.PI * Math.max(100, freq) * t) * env * 0.5;
});

// 2. Success Chime SFX (0.4s pleasant C-major arpeggio)
createWav('public/success.wav', 0.4, (t, i, total) => {
  const env = Math.exp(-t * 6);
  // Arpeggio: C5 (523Hz), E5 (659Hz), G5 (784Hz)
  let freq = 523;
  if (t > 0.1) freq = 659;
  if (t > 0.2) freq = 784;
  return (Math.sin(2 * Math.PI * freq * t) + 0.3 * Math.sin(2 * Math.PI * freq * 2 * t)) * env * 0.4;
});
