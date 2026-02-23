import * as THREE from 'three';

// ─────────────────────────────────────────────────────────────────────────────
// BRAIN REGIONS — neuroscience-based mapping
// ─────────────────────────────────────────────────────────────────────────────
export const REGIONS: Record<string, { label: string; color: [number, number, number]; glowColor: string; desc: string }> = {
  prefrontal:    { label: "Prefrontal Cortex",      color: [1.0, 0.85, 0.1],  glowColor: "#FFD700", desc: "Executive reasoning & judgment" },
  broca:         { label: "Broca's Area",            color: [0.8, 0.3, 1.0],   glowColor: "#AA44FF", desc: "Language production & grammar" },
  wernicke:      { label: "Wernicke's Area",         color: [0.5, 0.2, 0.95],  glowColor: "#7733EE", desc: "Language comprehension" },
  leftParietal:  { label: "Left Parietal Lobe",      color: [0.1, 0.8, 1.0],   glowColor: "#11CCFF", desc: "Numerical & spatial reasoning" },
  rightParietal: { label: "Right Parietal Lobe",     color: [0.1, 0.95, 0.7],  glowColor: "#00F0AA", desc: "Physics intuition & spatial modelling" },
  leftTemporal:  { label: "Left Temporal Lobe",      color: [1.0, 0.4, 0.7],   glowColor: "#FF55AA", desc: "Verbal memory & linguistic detail" },
  rightTemporal: { label: "Right Temporal Lobe",     color: [1.0, 0.6, 0.2],   glowColor: "#FF9933", desc: "Narrative, metaphor & poetry" },
  occipital:     { label: "Occipital Lobe",          color: [0.3, 1.0, 0.4],   glowColor: "#44FF66", desc: "Visual pattern recognition" },
  anteriorCing:  { label: "Anterior Cingulate",      color: [1.0, 0.7, 0.0],   glowColor: "#FFAA00", desc: "Moral reasoning & empathy" },
  rightFrontal:  { label: "Right Frontal Lobe",      color: [0.2, 0.9, 0.9],   glowColor: "#22DDDD", desc: "Philosophical abstraction & wonder" },
  somatosensory: { label: "Somatosensory Cortex",    color: [1.0, 0.3, 0.3],   glowColor: "#FF4444", desc: "Bodily schema & physical intuition" },
  cerebellum:    { label: "Cerebellum",              color: [0.7, 1.0, 0.2],   glowColor: "#AAFF33", desc: "Procedural skill & design precision" },
};

// Course → region mapping (maps subject prefixes to brain regions)
export const COURSE_REGION_MAP: Record<string, string> = {
  greek: 'wernicke',
  latin: 'broca',
  mathematics: 'leftParietal',
  math: 'leftParietal',
  calculus: 'leftParietal',
  arithmetic: 'leftParietal',
  physics: 'rightParietal',
  chemistry: 'occipital',
  science: 'occipital',
  biology: 'occipital',
  logic: 'prefrontal',
  philosophy: 'rightFrontal',
  naturalphil: 'rightFrontal',
  history: 'rightTemporal',
  classics: 'leftTemporal',
  literature: 'rightTemporal',
  ethics: 'anteriorCing',
  rhetoric: 'broca',
  engineering: 'cerebellum',
  anatomy: 'somatosensory',
  reading: 'leftTemporal',
  geometry: 'rightParietal',
  astronomy: 'rightParietal',
};

// ─────────────────────────────────────────────────────────────────────────────
// PARTICLE GENERATION
// ─────────────────────────────────────────────────────────────────────────────
function assignRegion(x: number, y: number, z: number): string {
  if (z > 0.55 && y > 0.0) return "prefrontal";
  if (x < -0.15 && z > 0.25 && y < 0.1 && y > -0.25) return "broca";
  if (x < -0.1 && z < -0.1 && y < 0.0 && y > -0.4) return "wernicke";
  if (x < -0.1 && y > 0.15 && z > -0.1 && z < 0.5) return "leftParietal";
  if (x > 0.1 && y > 0.15 && z > -0.1 && z < 0.5) return "rightParietal";
  if (x < -0.3 && y < -0.05 && z > -0.4 && z < 0.3) return "leftTemporal";
  if (x > 0.3 && y < -0.05 && z > -0.4 && z < 0.3) return "rightTemporal";
  if (z < -0.45 && y > -0.1) return "occipital";
  if (Math.abs(x) < 0.18 && z > 0.1 && y > 0.0) return "anteriorCing";
  if (x > 0.15 && z > 0.2 && y > -0.1) return "rightFrontal";
  if (y > 0.45 && z > -0.2 && z < 0.2) return "somatosensory";
  if (y < -0.35) return "cerebellum";
  return "prefrontal";
}

interface BrainParticles {
  positions: Float32Array;
  baseColors: Float32Array;
  sizes: Float32Array;
  regionIds: string[];
}

function generateBrainParticles(count: number): BrainParticles {
  const positions: number[] = [];
  const baseColors: number[] = [];
  const sizes: number[] = [];
  const regionIds: string[] = [];
  let placed = 0;

  while (placed < count) {
    const x = (Math.random() - 0.5) * 2.2;
    const y = (Math.random() - 0.5) * 1.8;
    const z = (Math.random() - 0.5) * 1.6;
    const lh = Math.pow(x + 0.18, 2) / 1.0 + Math.pow(y - 0.05, 2) / 0.75 + Math.pow(z, 2) / 0.58;
    const rh = Math.pow(x - 0.18, 2) / 1.0 + Math.pow(y - 0.05, 2) / 0.75 + Math.pow(z, 2) / 0.58;
    const cb = Math.pow(x, 2) / 0.28 + Math.pow(y + 0.55, 2) / 0.14 + Math.pow(z, 2) / 0.20;
    if (Math.min(lh, rh) > 1.0 && cb > 1.0) continue;
    const coreL = Math.pow(x + 0.18, 2) / 0.38 + Math.pow(y - 0.05, 2) / 0.30 + Math.pow(z, 2) / 0.24;
    const coreR = Math.pow(x - 0.18, 2) / 0.38 + Math.pow(y - 0.05, 2) / 0.30 + Math.pow(z, 2) / 0.24;
    if (Math.min(coreL, coreR) < 1.0 && Math.random() > 0.28) continue;
    const fold = Math.sin(x * 9 + z * 6) * 0.035 + Math.cos(y * 8 + x * 5) * 0.025;
    positions.push(x + fold, y + fold * 0.4, z);
    regionIds.push(assignRegion(x, y, z));
    baseColors.push(0.08, 0.12, 0.22);
    sizes.push(0.5 + Math.random() * 1.4);
    placed++;
  }

  return {
    positions: new Float32Array(positions),
    baseColors: new Float32Array(baseColors),
    sizes: new Float32Array(sizes),
    regionIds,
  };
}

interface Connection { a: number; b: number; sameRegion: boolean; }

function generateConnections(positions: Float32Array, regionIds: string[], count: number): Connection[] {
  const n = positions.length / 3;
  const lines: Connection[] = [];
  for (let i = 0; i < count * 3; i++) {
    const a = Math.floor(Math.random() * n);
    const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
    let bestB = -1, bestD = Infinity;
    for (let t = 0; t < 30; t++) {
      const b = Math.floor(Math.random() * n);
      const d = Math.hypot(positions[b * 3] - ax, positions[b * 3 + 1] - ay, positions[b * 3 + 2] - az);
      if (d < 0.38 && d > 0.04 && d < bestD) { bestD = d; bestB = b; }
    }
    if (bestB !== -1) lines.push({ a, b: bestB, sameRegion: regionIds[a] === regionIds[bestB] });
  }
  return lines.slice(0, count);
}

// ─────────────────────────────────────────────────────────────────────────────
// RENDERER
// ─────────────────────────────────────────────────────────────────────────────
export interface BrainRendererOptions {
  activeRegions: Set<string>;
  isLocked: boolean; // unauthenticated state
}

export function createBrainRenderer(mount: HTMLDivElement) {
  const W = mount.clientWidth;
  const H = mount.clientHeight;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, W / H, 0.01, 100);
  camera.position.set(0, 0.1, 4.0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(W, H);
  renderer.setClearColor(0x000000, 0);
  mount.appendChild(renderer.domElement);

  const PCOUNT = 5000;
  const { positions, baseColors, sizes, regionIds } = generateBrainParticles(PCOUNT);

  const regionParticles: Record<string, number[]> = {};
  Object.keys(REGIONS).forEach(r => regionParticles[r] = []);
  regionIds.forEach((r, i) => regionParticles[r].push(i));

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const colorArr = baseColors.slice();
  const colorAttr = new THREE.BufferAttribute(colorArr, 3);
  geometry.setAttribute("color", colorAttr);
  geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const vertShader = `
    attribute float size;
    varying vec3 vColor;
    void main() {
      vColor = color;
      vec4 mvp = modelViewMatrix * vec4(position, 1.0);
      gl_PointSize = size * (300.0 / -mvp.z);
      gl_Position = projectionMatrix * mvp;
    }
  `;
  const fragShader = `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float a = 1.0 - smoothstep(0.15, 0.5, d);
      gl_FragColor = vec4(vColor, a * 0.95);
    }
  `;

  const material = new THREE.ShaderMaterial({
    vertexShader: vertShader,
    fragmentShader: fragShader,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
  });

  const brain = new THREE.Points(geometry, material);
  brain.scale.setScalar(1.22);
  scene.add(brain);

  // Neural connections
  const connections = generateConnections(positions, regionIds, 220);
  const linePos: number[] = [];
  connections.forEach(({ a, b }) => {
    linePos.push(positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2]);
    linePos.push(positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]);
  });
  const lineGeo = new THREE.BufferGeometry();
  lineGeo.setAttribute("position", new THREE.BufferAttribute(new Float32Array(linePos), 3));
  const lineColorArr = new Float32Array(linePos.length);
  for (let i = 0; i < lineColorArr.length; i += 3) {
    lineColorArr[i] = 0.05; lineColorArr[i + 1] = 0.1; lineColorArr[i + 2] = 0.25;
  }
  const lineColorAttr = new THREE.BufferAttribute(lineColorArr, 3);
  lineGeo.setAttribute("color", lineColorAttr);
  const lineMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0.2, depthWrite: false });
  const lineSegs = new THREE.LineSegments(lineGeo, lineMat);
  lineSegs.scale.setScalar(1.22);
  scene.add(lineSegs);

  // Ambient glow sphere
  const glowGeo = new THREE.SphereGeometry(1.1, 24, 24);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0x001133, transparent: true, opacity: 0.05, side: THREE.BackSide });
  scene.add(new THREE.Mesh(glowGeo, glowMat));

  // Firing state for neural pulses
  const fireStates = new Float32Array(PCOUNT);
  let currentOptions: BrainRendererOptions = { activeRegions: new Set(), isLocked: false };

  function triggerRegionFire(regionName: string, intensity = 1.0) {
    const idxs = regionParticles[regionName] || [];
    const sample = idxs.filter(() => Math.random() < 0.25);
    sample.forEach(i => {
      fireStates[i] = intensity * (0.7 + Math.random() * 0.3);
    });
  }

  function triggerRandomFiring() {
    const active = currentOptions.activeRegions;
    if (active.size > 0) {
      const arr = Array.from(active);
      if (Math.random() < 0.4) {
        triggerRegionFire(arr[Math.floor(Math.random() * arr.length)], 0.6);
      }
    } else {
      const allRegions = Object.keys(REGIONS);
      triggerRegionFire(allRegions[Math.floor(Math.random() * allRegions.length)], currentOptions.isLocked ? 0.15 : 0.3);
    }
  }

  const fireInterval = setInterval(triggerRandomFiring, 700);

  // Rotation controls
  let rotY = 0, rotX = 0, targetRotY = 0, targetRotX = 0;
  let isDragging = false, prevMx = 0, prevMy = 0, hasDragged = false;
  let autoRotate = true;
  let autoRotTimer: ReturnType<typeof setTimeout> | null = null;

  const onDown = (e: MouseEvent | TouchEvent) => {
    isDragging = true; hasDragged = false; autoRotate = false;
    if (autoRotTimer) clearTimeout(autoRotTimer);
    const src = 'touches' in e ? e.touches[0] : e;
    prevMx = src.clientX; prevMy = src.clientY;
  };
  const onMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;
    const src = 'touches' in e ? e.touches[0] : e;
    const dx = src.clientX - prevMx;
    const dy = src.clientY - prevMy;
    if (Math.abs(dx) > 2 || Math.abs(dy) > 2) hasDragged = true;
    targetRotY += dx * 0.009;
    targetRotX += dy * 0.007;
    targetRotX = Math.max(-0.75, Math.min(0.75, targetRotX));
    prevMx = src.clientX; prevMy = src.clientY;
  };
  const onUp = () => {
    isDragging = false;
    autoRotTimer = setTimeout(() => { autoRotate = true; }, 3000);
  };

  mount.addEventListener("mousedown", onDown);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", onUp);
  mount.addEventListener("touchstart", onDown, { passive: true });
  window.addEventListener("touchmove", onMove, { passive: true });
  window.addEventListener("touchend", onUp);

  const onResize = () => {
    const W = mount.clientWidth, H = mount.clientHeight;
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
    renderer.setSize(W, H);
  };
  window.addEventListener("resize", onResize);

  let frame: number;
  let t = 0;

  const animate = () => {
    frame = requestAnimationFrame(animate);
    t += 0.01;

    if (autoRotate) targetRotY += 0.0025;
    rotY += (targetRotY - rotY) * 0.055;
    rotX += (targetRotX - rotX) * 0.055;
    brain.rotation.y = rotY; brain.rotation.x = rotX;
    lineSegs.rotation.y = rotY; lineSegs.rotation.x = rotX;

    const breathe = 1.0 + Math.sin(t * 0.35) * 0.01;
    brain.scale.setScalar(1.22 * breathe);
    lineSegs.scale.setScalar(1.22 * breathe);

    const active = currentOptions.activeRegions;
    const locked = currentOptions.isLocked;

    for (let i = 0; i < PCOUNT; i++) {
      const region = regionIds[i];
      const regData = REGIONS[region];
      const isActive = active.has(region);
      const fire = fireStates[i];
      let r: number, g: number, b: number;

      if (fire > 0) {
        const rc = regData.color;
        const fireBoost = isActive ? 1.0 : locked ? 0.2 : 0.5;
        r = rc[0] * fire * fireBoost + 0.9 * (1 - fire * fireBoost);
        g = rc[1] * fire * fireBoost + 0.9 * (1 - fire * fireBoost);
        b = rc[2] * fire * fireBoost + 0.4 * (1 - fire * fireBoost);
        fireStates[i] -= 0.022;
        if (fireStates[i] < 0) fireStates[i] = 0;
      } else if (isActive) {
        const pulse = 0.6 + Math.sin(t * 1.5 + i * 0.003) * 0.2;
        const rc = regData.color;
        r = rc[0] * pulse; g = rc[1] * pulse; b = rc[2] * pulse;
      } else {
        const dimFactor = locked ? 0.5 : 1.0;
        r = (0.05 + Math.sin(t * 0.5 + i * 0.01) * 0.02) * dimFactor;
        g = (0.08 + Math.sin(t * 0.5 + i * 0.01) * 0.02) * dimFactor;
        b = (0.18 + Math.sin(t * 0.5 + i * 0.01) * 0.04) * dimFactor;
      }
      colorAttr.setXYZ(i, r, g, b);
    }
    colorAttr.needsUpdate = true;

    for (let i = 0; i < connections.length; i++) {
      const { a, b: bIdx } = connections[i];
      const regA = regionIds[a], regB = regionIds[bIdx];
      const aActive = active.has(regA), bActive = active.has(regB);
      const both = aActive && bActive;
      const either = aActive || bActive;
      const li = i * 2 * 3;
      const intensity = both ? 0.4 : either ? 0.18 : locked ? 0.02 : 0.04;
      const pulse = both ? Math.sin(t * 2 + i * 0.1) * 0.15 : 0;
      const col = both ? REGIONS[regA].color : [0.05, 0.1, 0.3] as [number, number, number];
      lineColorAttr.setXYZ(li / 3, col[0] * (intensity + pulse), col[1] * (intensity + pulse), col[2] * (intensity + pulse));
      lineColorAttr.setXYZ(li / 3 + 1, col[0] * (intensity + pulse), col[1] * (intensity + pulse), col[2] * (intensity + pulse));
    }
    lineColorAttr.needsUpdate = true;
    lineMat.opacity = 0.15 + Math.sin(t * 0.6) * 0.06;

    renderer.render(scene, camera);
  };

  animate();

  return {
    updateOptions(opts: BrainRendererOptions) {
      currentOptions = opts;
    },
    triggerRegionFire,
    get hasDragged() { return hasDragged; },
    dispose() {
      cancelAnimationFrame(frame);
      clearInterval(fireInterval);
      if (autoRotTimer) clearTimeout(autoRotTimer);
      mount.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      mount.removeEventListener("touchstart", onDown);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onUp);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    },
  };
}
