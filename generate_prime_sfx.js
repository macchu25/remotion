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
  const outPath = path.join(__dirname, 'public', 'audio', 'sfx_prime', filename);
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, Buffer.concat([header, data]));
  console.log(`Synthesized SFX: ${filename}`);
}

// 1. Forward Sweep (Clean digital sweep: 440Hz -> 880Hz)
generateTone('forward_sweep.wav', 0.25, (t, dur) => 440 + (t / dur) * 440, (t, dur) => (1 - t / dur) * 0.4);

// 2. Digital Click (High frequency short click: 1200Hz)
generateTone('digital_click.wav', 0.08, () => 1200, (t, dur) => (1 - t / dur) * 0.5);

// 3. Easy Lock (Clean C-Major chord resolution: 523.25Hz C5)
generateTone('easy_lock.wav', 0.35, () => 523.25, (t, dur) => (1 - t / dur) * 0.5);

// 4. Reverse Glitch (Frequency downward sweep + distortion: 880Hz -> 220Hz)
generateTone('reverse_glitch.wav', 0.45, (t, dur) => 880 - (t / dur) * 660, (t, dur) => Math.sin(t / dur * Math.PI) * 0.4);

// 5. Branch Tick (Short computational tick: 800Hz)
generateTone('branch_tick.wav', 0.05, () => 800, (t, dur) => (1 - t / dur) * 0.3);

// 6. Cyber Lock (Sub low frequency lock: 110Hz + metallic resonance)
generateTone('cyber_lock.wav', 0.6, (t, dur) => 110 + Math.sin(t * 50) * 10, (t, dur) => (1 - t / dur) * 0.6);

// 7. Metallic Resolve (Clean 659.25Hz E5 resonance)
generateTone('metallic_resolve.wav', 0.5, () => 659.25, (t, dur) => (1 - t / dur) * 0.5);

// 8. Quantum Riser (Frequency exponential pitch rise: 150Hz -> 1500Hz)
generateTone('quantum_riser.wav', 1.2, (t, dur) => 150 + Math.pow(t / dur, 2) * 1350, (t, dur) => (t / dur) * 0.5);

console.log("All Cyber SFX synthesized successfully!");
