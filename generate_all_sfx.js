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

// 1. whoosh.wav
createWav('whoosh.wav', 0.25, (t) => {
  const env = Math.sin(Math.PI * (t / 0.25));
  const noise = (Math.random() * 2 - 1) * env;
  const freq = 400 + Math.sin(t * 30) * 200;
  return (noise * 0.6 + Math.sin(2 * Math.PI * freq * t) * 0.4) * env * 0.5;
});

// 2. pop.wav
createWav('pop.wav', 0.05, (t) => {
  const env = Math.exp(-t * 100);
  return Math.sin(2 * Math.PI * (1200 - t * 15000) * t) * env * 0.4;
});

// 3. click.wav
createWav('click.wav', 0.04, (t) => {
  const env = Math.exp(-t * 120);
  return Math.sin(2 * Math.PI * 2400 * t) * env * 0.3;
});

// 4. tick.wav
createWav('tick.wav', 0.03, (t) => {
  const env = Math.exp(-t * 150);
  return (Math.random() * 2 - 1) * env * 0.25;
});

// 5. impact.wav
createWav('impact.wav', 0.35, (t) => {
  const env = Math.exp(-t * 12);
  const sub = Math.sin(2 * Math.PI * 65 * t);
  const click = Math.sin(2 * Math.PI * 250 * t) * Math.exp(-t * 40);
  return (sub * 0.7 + click * 0.4) * env * 0.8;
});

// 6. boom.wav
createWav('boom.wav', 0.6, (t) => {
  const env = Math.exp(-t * 5);
  const low = Math.sin(2 * Math.PI * (50 - t * 20) * t);
  return low * env * 0.9;
});

// 7. glitch.wav
createWav('glitch.wav', 0.2, (t) => {
  const env = Math.exp(-t * 10);
  const noise = (Math.random() * 2 - 1);
  const square = Math.sin(2 * Math.PI * 880 * t) > 0 ? 0.3 : -0.3;
  return (noise * 0.5 + square) * env * 0.4;
});

// 8. error.wav
createWav('error.wav', 0.3, (t) => {
  const env = Math.exp(-t * 8);
  const tone1 = Math.sin(2 * Math.PI * 300 * t);
  const tone2 = Math.sin(2 * Math.PI * 150 * t);
  return (tone1 + tone2) * 0.4 * env;
});

// 9. ding.wav
createWav('ding.wav', 0.4, (t) => {
  const env = Math.exp(-t * 7);
  return Math.sin(2 * Math.PI * 1760 * t) * env * 0.4;
});

// 10. riser.wav
createWav('riser.wav', 0.6, (t) => {
  const env = Math.pow(t / 0.6, 2);
  const freq = 150 + (t / 0.6) * 1200;
  return Math.sin(2 * Math.PI * freq * t) * env * 0.5;
});

// 11. typing.wav
createWav('typing.wav', 0.03, (t) => {
  const env = Math.exp(-t * 200);
  return (Math.random() * 2 - 1) * env * 0.3;
});

// 12. suction.wav
createWav('suction.wav', 0.3, (t) => {
  const env = Math.pow(1 - (t / 0.3), 2);
  const freq = 1200 - (t / 0.3) * 1000;
  return Math.sin(2 * Math.PI * freq * t) * env * 0.4;
});

// 13. burst.wav
createWav('burst.wav', 0.4, (t) => {
  const env = Math.exp(-t * 10);
  const noise = (Math.random() * 2 - 1);
  return noise * env * 0.6;
});

// 14. stamp.wav
createWav('stamp.wav', 0.25, (t) => {
  const env = Math.exp(-t * 15);
  const thud = Math.sin(2 * Math.PI * 80 * t);
  const snap = Math.sin(2 * Math.PI * 600 * t) * Math.exp(-t * 50);
  return (thud * 0.7 + snap * 0.5) * env * 0.8;
});

// 15. heartbeat.wav
createWav('heartbeat.wav', 0.4, (t) => {
  const env1 = Math.exp(-t * 25);
  const env2 = t > 0.15 ? Math.exp(-(t - 0.15) * 25) : 0;
  const thump1 = Math.sin(2 * Math.PI * 55 * t) * env1;
  const thump2 = Math.sin(2 * Math.PI * 50 * (t - 0.15)) * env2;
  return (thump1 + thump2) * 0.8;
});
