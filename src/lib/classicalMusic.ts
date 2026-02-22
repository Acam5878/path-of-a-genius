// Classical music player for the Feed
// Uses public domain recordings stored in /public/audio/

export interface ClassicalTrack {
  id: string;
  title: string;
  composer: string;
  src: string;
}

const TRACKS: ClassicalTrack[] = [
  { id: 'satie-1', title: 'Gymnopédie No. 1', composer: 'Erik Satie', src: '/audio/satie-gymnopedie-1.mp3' },
  { id: 'debussy-1', title: 'Clair de Lune', composer: 'Claude Debussy', src: '/audio/debussy-clair-de-lune.mp3' },
  { id: 'bach-1', title: 'Cello Suite No. 1 – Prelude', composer: 'J.S. Bach', src: '/audio/bach-cello-suite-1.mp3' },
  { id: 'chopin-1', title: 'Nocturne Op. 9 No. 2', composer: 'Frédéric Chopin', src: '/audio/chopin-nocturne-op9-2.mp3' },
];

let currentAudio: HTMLAudioElement | null = null;
let nextAudio: HTMLAudioElement | null = null;
let trackIndex = -1;
let isPlaying = false;
let currentVolume = 0.35;
let fadeInterval: ReturnType<typeof setInterval> | null = null;

function shuffledOrder(): number[] {
  const indices = TRACKS.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  return indices;
}

let playOrder = shuffledOrder();
let orderPos = 0;

function fadeIn(audio: HTMLAudioElement, targetVol: number, durationMs = 2000) {
  audio.volume = 0;
  const steps = 40;
  const stepMs = durationMs / steps;
  const increment = targetVol / steps;
  let step = 0;

  if (fadeInterval) clearInterval(fadeInterval);
  fadeInterval = setInterval(() => {
    step++;
    audio.volume = Math.min(increment * step, targetVol);
    if (step >= steps) {
      if (fadeInterval) clearInterval(fadeInterval);
      fadeInterval = null;
    }
  }, stepMs);
}

function fadeOut(audio: HTMLAudioElement, durationMs = 1500): Promise<void> {
  return new Promise(resolve => {
    const startVol = audio.volume;
    const steps = 30;
    const stepMs = durationMs / steps;
    const decrement = startVol / steps;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      audio.volume = Math.max(startVol - decrement * step, 0);
      if (step >= steps) {
        clearInterval(interval);
        audio.pause();
        resolve();
      }
    }, stepMs);
  });
}

function playNextTrack() {
  if (!isPlaying) return;

  orderPos = (orderPos + 1) % playOrder.length;
  if (orderPos === 0) playOrder = shuffledOrder();

  trackIndex = playOrder[orderPos];
  const track = TRACKS[trackIndex];

  const audio = new Audio(track.src);
  audio.preload = 'auto';
  audio.loop = false;

  audio.addEventListener('canplaythrough', () => {
    if (!isPlaying) return;

    if (currentAudio) {
      fadeOut(currentAudio, 1500);
    }

    currentAudio = audio;
    audio.play().then(() => {
      fadeIn(audio, currentVolume);
    }).catch(() => {});
  }, { once: true });

  audio.addEventListener('ended', () => {
    if (isPlaying) playNextTrack();
  });

  audio.addEventListener('error', () => {
    // Skip broken track
    if (isPlaying) setTimeout(playNextTrack, 500);
  });

  audio.load();
}

export function startClassicalMusic() {
  if (isPlaying) return;
  isPlaying = true;

  playOrder = shuffledOrder();
  orderPos = 0;
  trackIndex = playOrder[0];

  const track = TRACKS[trackIndex];
  currentAudio = new Audio(track.src);
  currentAudio.preload = 'auto';

  currentAudio.addEventListener('canplaythrough', () => {
    if (!isPlaying || !currentAudio) return;
    currentAudio.play().then(() => {
      fadeIn(currentAudio!, currentVolume);
    }).catch(() => {});
  }, { once: true });

  currentAudio.addEventListener('ended', () => {
    if (isPlaying) playNextTrack();
  });

  currentAudio.addEventListener('error', () => {
    if (isPlaying) setTimeout(playNextTrack, 500);
  });

  currentAudio.load();
}

export function stopClassicalMusic() {
  isPlaying = false;
  if (fadeInterval) {
    clearInterval(fadeInterval);
    fadeInterval = null;
  }
  if (currentAudio) {
    fadeOut(currentAudio, 1000).then(() => {
      currentAudio = null;
    });
  }
  if (nextAudio) {
    nextAudio.pause();
    nextAudio = null;
  }
}

export function isClassicalPlaying() {
  return isPlaying;
}

export function getCurrentTrack(): ClassicalTrack | null {
  if (!isPlaying || trackIndex < 0) return null;
  return TRACKS[trackIndex];
}

export function setClassicalVolume(vol: number) {
  currentVolume = Math.max(0, Math.min(1, vol));
  if (currentAudio && isPlaying) {
    currentAudio.volume = currentVolume;
  }
}
