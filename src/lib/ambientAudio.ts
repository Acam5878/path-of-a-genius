// Ambient audio generator using Web Audio API
// Creates soft, lo-fi atmospheric pads — no external files needed

let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let isPlaying = false;
let oscillators: OscillatorNode[] = [];
let noiseSource: AudioBufferSourceNode | null = null;

function getOrCreateContext() {
  if (!audioCtx) {
    audioCtx = new AudioContext();
    masterGain = audioCtx.createGain();
    masterGain.gain.value = 0;
    masterGain.connect(audioCtx.destination);
  }
  return { ctx: audioCtx, master: masterGain! };
}

function createPad(ctx: AudioContext, master: GainNode, freq: number, detune: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.value = freq;
  osc.detune.value = detune;

  filter.type = 'lowpass';
  filter.frequency.value = 800;
  filter.Q.value = 1;

  gain.gain.value = 0.08;

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  osc.start();

  // Slow LFO on filter for movement
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.05 + Math.random() * 0.1;
  lfoGain.gain.value = 200;
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  lfo.start();

  oscillators.push(osc, lfo);
  return osc;
}

function createFilteredNoise(ctx: AudioContext, master: GainNode) {
  const bufferSize = ctx.sampleRate * 4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * 0.5;
  }

  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 400;
  filter.Q.value = 0.5;

  const gain = ctx.createGain();
  gain.gain.value = 0.015;

  source.connect(filter);
  filter.connect(gain);
  gain.connect(master);
  source.start();

  noiseSource = source;
}

export function startAmbient() {
  if (isPlaying) return;
  const { ctx, master } = getOrCreateContext();

  if (ctx.state === 'suspended') ctx.resume();

  // Warm chord: C3-E3-G3-B3 with slight detuning
  createPad(ctx, master, 130.81, -5);  // C3
  createPad(ctx, master, 164.81, 7);   // E3
  createPad(ctx, master, 196.00, -3);  // G3
  createPad(ctx, master, 246.94, 10);  // B3
  createPad(ctx, master, 98.00, 0);    // G2 bass

  createFilteredNoise(ctx, master);

  // Fade in
  master.gain.linearRampToValueAtTime(0.6, ctx.currentTime + 2);
  isPlaying = true;
}

export function stopAmbient() {
  if (!isPlaying || !audioCtx || !masterGain) return;

  // Fade out
  masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 1.5);

  setTimeout(() => {
    oscillators.forEach(o => { try { o.stop(); } catch {} });
    if (noiseSource) try { noiseSource.stop(); } catch {}
    oscillators = [];
    noiseSource = null;
    isPlaying = false;
  }, 1600);
}

export function isAmbientPlaying() {
  return isPlaying;
}
