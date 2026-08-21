const fs = require('fs');
const path = require('path');

function createWavHeader(dataLength, sampleRate = 44100, numChannels = 1, bitsPerSample = 16) {
  const header = Buffer.alloc(44);
  const blockAlign = numChannels * bitsPerSample / 8;
  const byteRate = sampleRate * blockAlign;

  header.write('RIFF', 0);
  header.writeUInt32LE(36 + dataLength, 4);
  header.write('WAVE', 8);
  header.write('fmt ', 12);
  header.writeUInt32LE(16, 16);
  header.writeUInt16LE(1, 20);
  header.writeUInt16LE(numChannels, 22);
  header.writeUInt32LE(sampleRate, 24);
  header.writeUInt32LE(byteRate, 28);
  header.writeUInt16LE(blockAlign, 32);
  header.writeUInt16LE(bitsPerSample, 34);
  header.write('data', 36);
  header.writeUInt32LE(dataLength, 40);

  return header;
}

function generateTone(filename, durationSec, freqFunc, volFunc) {
  const sampleRate = 44100;
  const numSamples = Math.floor(sampleRate * durationSec);
  const data = Buffer.alloc(numSamples * 2);

  let phase = 0;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const freq = freqFunc(t, durationSec);
    const vol = volFunc(t, durationSec);

    phase += 2 * Math.PI * freq / sampleRate;
    const sample = Math.sin(phase) * vol * 32767;

    const clamped = Math.max(-32768, Math.min(32767, Math.floor(sample)));
    data.writeInt16LE(clamped, i * 2);
  }

  const header = createWavHeader(data.length, sampleRate);
  const outPath = path.join(__dirname, 'public', 'audio', 'sfx_masterclass', filename);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.concat([header, data]));
  console.log(`Synthesized SFX: ${filename}`);
}

// 1. Padlock Snap (Clean mechanical lock click: 350Hz -> 100Hz punch)
generateTone('padlock_snap.wav', 0.2, (t, dur) => 350 - (t / dur) * 250, (t, dur) => (1 - t / dur) * 0.6);

// 2. Digit Morph (Granular digital transformation sweep: 600Hz -> 1200Hz)
generateTone('digit_morph.wav', 0.35, (t, dur) => 600 + Math.sin(t * 100) * 200 + (t / dur) * 400, (t, dur) => (1 - t / dur) * 0.4);

// 3. Shortcut Sweep (Clean fast tonal movement: 523Hz -> 1046Hz)
generateTone('shortcut_sweep.wav', 0.25, (t, dur) => 523.25 + (t / dur) * 523.25, (t, dur) => (1 - t / dur) * 0.35);

// 4. Maze Glitch (Branching computational noise: 800Hz -> 200Hz frequency jitter)
generateTone('maze_glitch.wav', 0.5, (t, dur) => 800 - (t / dur) * 600 + Math.sin(t * 150) * 100, (t, dur) => Math.sin(t / dur * Math.PI) * 0.35);

// 5. Decryption Resolve (Harmonious resolve C5-E5 chord sweep: 523.25Hz -> 659.25Hz)
generateTone('decryption_resolve.wav', 0.45, (t, dur) => 523.25 + (t / dur) * 136, (t, dur) => (1 - t / dur) * 0.5);

// 6. Quantum Riser (Shor's algorithm riser: 100Hz -> 1800Hz)
generateTone('quantum_riser.wav', 1.0, (t, dur) => 100 + Math.pow(t / dur, 2) * 1700, (t, dur) => (t / dur) * 0.5);

console.log("All Pedagogy Masterclass SFX synthesized successfully!");
