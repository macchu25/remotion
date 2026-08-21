const fs = require('fs');
const path = require('path');

function createWav(filename, durationSec, getSample) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * durationSec);
  const dataSize = numSamples * 2;
  const buffer = Buffer.alloc(44 + dataSize);

  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const sampleVal = Math.max(-1, Math.min(1, getSample(t, i, numSamples)));
    const int16Val = Math.floor(sampleVal * 32767);
    buffer.writeInt16LE(int16Val, 44 + i * 2);
  }

  const sfxDir = path.join(__dirname, 'public', 'audio', 'sfx');
  fs.mkdirSync(sfxDir, { recursive: true });
  fs.writeFileSync(path.join(sfxDir, filename), buffer);
  console.log(`Generated SFX: ${filename}`);
}

// 1. Signature Negative Sonic Motif: reverse_pulse.wav (Reverse hollow tonal sweep)
createWav('reverse_pulse.wav', 0.3, (t) => {
  const env = Math.sin(Math.PI * (t / 0.3));
  const freq = 180 + (t / 0.3) * 220;
  const tone = Math.sin(2 * Math.PI * freq * t);
  const sub = Math.sin(2 * Math.PI * (freq / 2) * t);
  return (tone * 0.6 + sub * 0.4) * env * 0.6;
});

// 2. Reverse Pulse Low (1st flip)
createWav('reverse_pulse_low.wav', 0.35, (t) => {
  const env = Math.sin(Math.PI * (t / 0.35));
  const freq = 130 + (t / 0.35) * 150;
  return Math.sin(2 * Math.PI * freq * t) * env * 0.7;
});

// 3. Reverse Pulse High (2nd flip)
createWav('reverse_pulse_high.wav', 0.35, (t) => {
  const env = Math.sin(Math.PI * (t / 0.35));
  const freq = 260 + (t / 0.35) * 320;
  return Math.sin(2 * Math.PI * freq * t) * env * 0.7;
});

// 4. Harmonic Resolve (Clean C-Major Chord for 360° / +1 Payoff)
createWav('harmonic_resolve.wav', 0.6, (t) => {
  const env = Math.exp(-t * 5);
  const c = Math.sin(2 * Math.PI * 523.25 * t); // C5
  const e = Math.sin(2 * Math.PI * 659.25 * t); // E5
  const g = Math.sin(2 * Math.PI * 783.99 * t); // G5
  return (c + e + g) / 3 * env * 0.6;
});

// 5. Mechanical Lock (Puzzle piece fitting +1 slot)
createWav('mechanical_lock.wav', 0.25, (t) => {
  const env = Math.exp(-t * 18);
  const thud = Math.sin(2 * Math.PI * 120 * t);
  const snap = Math.sin(2 * Math.PI * 1200 * t) * Math.exp(-t * 60);
  return (thud * 0.6 + snap * 0.6) * env * 0.8;
});

// 6. Chalk Scratch
createWav('chalk_scratch.wav', 0.2, (t) => {
  const env = Math.exp(-t * 12);
  const noise = (Math.random() * 2 - 1) * Math.sin(2 * Math.PI * 2500 * t);
  return noise * env * 0.3;
});

// 7. Granular Dissolve
createWav('dissolve.wav', 0.4, (t) => {
  const env = 1 - (t / 0.4);
  const noise = (Math.random() * 2 - 1) * Math.sin(t * 100);
  return noise * env * 0.4;
});

// 8. Corrupted Tonal Motif (Math logic failure / contradiction)
createWav('corrupted.wav', 0.5, (t) => {
  const env = Math.exp(-t * 4);
  const f1 = Math.sin(2 * Math.PI * 220 * t);
  const f2 = Math.sin(2 * Math.PI * 233.08 * t); // Tritone dissonance
  const glitch = Math.sin(2 * Math.PI * 80 * t) > 0 ? 1 : -1;
  return (f1 + f2 + glitch * 0.2) / 2.2 * env * 0.6;
});

// 9. Metallic Mystery Ping (Ending open loop sqrt(-1))
createWav('mystery_ping.wav', 0.8, (t) => {
  const env = Math.exp(-t * 3);
  const p1 = Math.sin(2 * Math.PI * 1480 * t);
  const p2 = Math.sin(2 * Math.PI * 2960 * t) * 0.5;
  return (p1 + p2) * env * 0.5;
});
