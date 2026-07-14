/* ═══════════════════════════════════════════════════════════
   3D Solar System — script.js
   Built with Three.js (r160) — No bundler needed
═══════════════════════════════════════════════════════════ */

// ── Planet data ──────────────────────────────────────────────
const PLANETS = [
  {
    name: 'Mercury',
    radius: 0.28,
    distance: 8,
    color: '#b5b5b5',
    emissive: '#444444',
    speed: 0.0241,
    tilt: 0.034,
    selfRotate: 0.005,
    type: 'Terrestrial Planet',
    glow: 'rgba(181,181,181,0.4)',
    stats: {
      'Distance': '57.9M km',
      'Day Length': '58.6 days',
      'Year Length': '88 days',
      'Temp': '167°C avg',
    },
    desc: 'The smallest planet in our solar system and closest to the Sun. Mercury has no atmosphere to retain heat, causing extreme temperature swings.',
    textureColors: ['#b5b5b5', '#9a9a9a', '#cccccc', '#888888'],
  },
  {
    name: 'Venus',
    radius: 0.48,
    distance: 12,
    color: '#e8cda0',
    emissive: '#5a3a10',
    speed: 0.0175,
    tilt: 2.64,
    selfRotate: -0.003,
    type: 'Terrestrial Planet',
    glow: 'rgba(232,205,160,0.4)',
    stats: {
      'Distance': '108.2M km',
      'Day Length': '243 days',
      'Year Length': '225 days',
      'Temp': '464°C avg',
    },
    desc: 'The hottest planet due to its thick CO₂ atmosphere. Venus rotates backwards compared to most planets and its day is longer than its year.',
    textureColors: ['#e8cda0', '#d4a96a', '#f0ddb0', '#c89050'],
  },
  {
    name: 'Earth',
    radius: 0.52,
    distance: 17,
    color: '#4fa3e0',
    emissive: '#0a2a4a',
    speed: 0.0100,
    tilt: 0.41,
    selfRotate: 0.01,
    type: 'Terrestrial Planet',
    glow: 'rgba(79,163,224,0.4)',
    stats: {
      'Distance': '149.6M km',
      'Day Length': '24 hours',
      'Year Length': '365.25 days',
      'Temp': '15°C avg',
    },
    desc: 'Our home planet — the only known world harboring life. 71% of Earth\'s surface is covered by liquid water, making it a rare "pale blue dot" in the cosmos.',
    textureColors: ['#4fa3e0', '#2d7a40', '#4fa3e0', '#c2a870', '#ffffff'],
  },
  {
    name: 'Mars',
    radius: 0.38,
    distance: 23,
    color: '#c1440e',
    emissive: '#3a0e00',
    speed: 0.0080,
    tilt: 0.44,
    selfRotate: 0.009,
    type: 'Terrestrial Planet',
    glow: 'rgba(193,68,14,0.4)',
    stats: {
      'Distance': '227.9M km',
      'Day Length': '24.6 hours',
      'Year Length': '687 days',
      'Temp': '-60°C avg',
    },
    desc: 'The Red Planet hosts Olympus Mons — the largest volcano in the solar system — and Valles Marineris, a canyon system spanning 4,000 km.',
    textureColors: ['#c1440e', '#8b2e05', '#d4673a', '#a03010'],
  },
  {
    name: 'Jupiter',
    radius: 1.1,
    distance: 33,
    color: '#c88b3a',
    emissive: '#3a2000',
    speed: 0.0043,
    tilt: 0.05,
    selfRotate: 0.02,
    type: 'Gas Giant',
    glow: 'rgba(200,139,58,0.4)',
    stats: {
      'Distance': '778.5M km',
      'Day Length': '9.9 hours',
      'Year Length': '12 years',
      'Temp': '-110°C avg',
    },
    desc: 'The largest planet in our solar system — more than twice the mass of all other planets combined. The Great Red Spot is a storm larger than Earth that has raged for centuries.',
    textureColors: ['#c88b3a', '#8b5e2a', '#e4b080', '#d4a060', '#c07840', '#b06030'],
    banded: true,
  },
  {
    name: 'Saturn',
    radius: 0.9,
    distance: 45,
    color: '#e4d191',
    emissive: '#3a3000',
    speed: 0.0032,
    tilt: 0.47,
    selfRotate: 0.018,
    type: 'Gas Giant',
    glow: 'rgba(228,209,145,0.4)',
    stats: {
      'Distance': '1.43B km',
      'Day Length': '10.7 hours',
      'Year Length': '29.5 years',
      'Temp': '-140°C avg',
    },
    desc: 'Famous for its spectacular ring system made of ice and rock, Saturn is the least dense planet in the solar system — it could float on water!',
    textureColors: ['#e4d191', '#c4a851', '#f4e8b0', '#d4b868'],
    hasRings: true,
    banded: true,
  },
  {
    name: 'Uranus',
    radius: 0.68,
    distance: 56,
    color: '#7de8e8',
    emissive: '#003333',
    speed: 0.0023,
    tilt: 1.71,
    selfRotate: 0.012,
    type: 'Ice Giant',
    glow: 'rgba(125,232,232,0.4)',
    stats: {
      'Distance': '2.87B km',
      'Day Length': '17.2 hours',
      'Year Length': '84 years',
      'Temp': '-195°C avg',
    },
    desc: 'Uranus rotates on its side with an axial tilt of 98°, essentially rolling around the Sun on its axis. It is the coldest planetary atmosphere in the solar system.',
    textureColors: ['#7de8e8', '#5dc8c8', '#9df8f8', '#6dd8d8'],
  },
  {
    name: 'Neptune',
    radius: 0.65,
    distance: 66,
    color: '#4169e1',
    emissive: '#000a3a',
    speed: 0.0016,
    tilt: 0.49,
    selfRotate: 0.011,
    type: 'Ice Giant',
    glow: 'rgba(65,105,225,0.4)',
    stats: {
      'Distance': '4.5B km',
      'Day Length': '16 hours',
      'Year Length': '165 years',
      'Temp': '-200°C avg',
    },
    desc: 'The windiest planet with storms reaching 2,100 km/h. Neptune takes 165 Earth years to complete one orbit, meaning it has only completed one full orbit since its discovery in 1846.',
    textureColors: ['#4169e1', '#2040a0', '#6080f0', '#3050c0'],
  },
];

// ── Canvas texture generators ────────────────────────────────
function makeTexture(data) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');

  if (data.banded) {
    // Banded gas giant
    const colors = data.textureColors;
    const bands = 16;
    for (let i = 0; i <= bands; i++) {
      const y = (i / bands) * size;
      const color = colors[i % colors.length];
      ctx.fillStyle = color;
      const h = size / bands + (Math.random() * 4 - 2);
      ctx.fillRect(0, y, size, h);
    }
    // Cloud swirls
    for (let i = 0; i < 6; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, size * 0.2
      );
      grd.addColorStop(0, 'rgba(255,255,255,0.08)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }
    // Great Red Spot for Jupiter
    if (data.name === 'Jupiter') {
      ctx.save();
      ctx.translate(size * 0.65, size * 0.55);
      ctx.scale(1, 0.6);
      const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.1);
      grd.addColorStop(0, 'rgba(180,60,20,0.9)');
      grd.addColorStop(0.5, 'rgba(200,80,30,0.7)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  } else if (data.name === 'Earth') {
    // Ocean base
    const ocean = ctx.createLinearGradient(0, 0, size, size);
    ocean.addColorStop(0, '#2066b0');
    ocean.addColorStop(1, '#1a4490');
    ctx.fillStyle = ocean;
    ctx.fillRect(0, 0, size, size);
    // Continents
    const continents = [
      { x: 0.45, y: 0.3, w: 0.18, h: 0.25 },
      { x: 0.35, y: 0.55, w: 0.12, h: 0.2 },
      { x: 0.7, y: 0.35, w: 0.22, h: 0.28 },
      { x: 0.1, y: 0.3, w: 0.15, h: 0.2 },
      { x: 0.15, y: 0.6, w: 0.1, h: 0.18 },
    ];
    continents.forEach(c => {
      ctx.fillStyle = `hsl(${100 + Math.random() * 30}, 40%, ${35 + Math.random() * 15}%)`;
      ctx.beginPath();
      ctx.ellipse(c.x * size, c.y * size, c.w * size, c.h * size, Math.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    });
    // Polar ice
    ctx.fillStyle = 'rgba(240,248,255,0.7)';
    ctx.fillRect(0, 0, size, size * 0.08);
    ctx.fillRect(0, size * 0.92, size, size * 0.08);
    // Clouds
    for (let i = 0; i < 12; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, size * 0.12
      );
      grd.addColorStop(0, 'rgba(255,255,255,0.35)');
      grd.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }
  } else if (data.name === 'Mercury') {
    // Cratered grey surface
    ctx.fillStyle = '#aaaaaa';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 80; i++) {
      const x = Math.random() * size, y = Math.random() * size;
      const r = Math.random() * size * 0.05 + 1;
      const grd = ctx.createRadialGradient(x, y, 0, x, y, r);
      grd.addColorStop(0, 'rgba(80,80,80,0.7)');
      grd.addColorStop(0.7, 'rgba(120,120,120,0.3)');
      grd.addColorStop(1, 'rgba(160,160,160,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (data.name === 'Mars') {
    // Rust surface with polar ice
    ctx.fillStyle = '#b84020';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 40; i++) {
      const x = Math.random() * size, y = Math.random() * size;
      const r = Math.random() * size * 0.08 + 2;
      ctx.fillStyle = `hsl(${10 + Math.random() * 15}, ${50 + Math.random() * 20}%, ${35 + Math.random() * 20}%)`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    }
    // Valles Marineris
    ctx.strokeStyle = 'rgba(100,30,10,0.6)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(size * 0.2, size * 0.48);
    ctx.bezierCurveTo(size * 0.4, size * 0.44, size * 0.6, size * 0.52, size * 0.8, size * 0.48);
    ctx.stroke();
    // Polar ice
    ctx.fillStyle = 'rgba(240,248,255,0.7)';
    ctx.fillRect(0, 0, size, size * 0.07);
    ctx.fillRect(0, size * 0.93, size, size * 0.07);
  } else if (data.name === 'Venus') {
    // Thick cloudy atmosphere
    ctx.fillStyle = '#d4a864';
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 15; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, size * 0.2
      );
      grd.addColorStop(0, 'rgba(240,200,130,0.4)');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }
  } else {
    // Generic smooth surface
    const baseColor = data.textureColors[0];
    ctx.fillStyle = baseColor;
    ctx.fillRect(0, 0, size, size);
    for (let i = 0; i < 20; i++) {
      const grd = ctx.createRadialGradient(
        Math.random() * size, Math.random() * size, 0,
        Math.random() * size, Math.random() * size, size * 0.25
      );
      const c2 = data.textureColors[Math.floor(Math.random() * data.textureColors.length)];
      grd.addColorStop(0, c2 + '80');
      grd.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, size, size);
    }
  }

  return new THREE.CanvasTexture(canvas);
}

function makeSunTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grd.addColorStop(0, '#fff8e0');
  grd.addColorStop(0.15, '#fff200');
  grd.addColorStop(0.4, '#ffaa00');
  grd.addColorStop(0.7, '#ff6600');
  grd.addColorStop(1, '#cc2200');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  // Sunspots
  for (let i = 0; i < 8; i++) {
    const x = size/2 + (Math.random()-0.5)*size*0.5;
    const y = size/2 + (Math.random()-0.5)*size*0.5;
    const r = Math.random() * size * 0.04 + 2;
    ctx.fillStyle = 'rgba(100,20,0,0.4)';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  // Surface granules
  for (let i = 0; i < 80; i++) {
    const x = Math.random() * size, y = Math.random() * size;
    const r = Math.random() * 6 + 2;
    ctx.fillStyle = `rgba(255,${200 + Math.floor(Math.random()*55)},0,0.15)`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

function makeSaturnRingTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = 1;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createLinearGradient(0, 0, size, 0);
  grd.addColorStop(0, 'rgba(200,185,140,0)');
  grd.addColorStop(0.05, 'rgba(220,200,150,0.9)');
  grd.addColorStop(0.15, 'rgba(200,180,120,0.7)');
  grd.addColorStop(0.25, 'rgba(180,160,100,0.85)');
  grd.addColorStop(0.35, 'rgba(160,145,100,0.6)');
  grd.addColorStop(0.45, 'rgba(220,200,160,0.9)');
  grd.addColorStop(0.55, 'rgba(240,225,180,0.95)');
  grd.addColorStop(0.6, 'rgba(200,180,130,0.5)');
  grd.addColorStop(0.65, 'rgba(180,160,110,0.8)');
  grd.addColorStop(0.75, 'rgba(160,145,100,0.7)');
  grd.addColorStop(0.85, 'rgba(200,185,140,0.4)');
  grd.addColorStop(0.95, 'rgba(180,165,120,0.6)');
  grd.addColorStop(1, 'rgba(200,185,140,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, 1);
  return new THREE.CanvasTexture(canvas);
}

function makeStarfieldTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);
  for (let i = 0; i < 600; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const r = Math.random() * 1.5;
    const alpha = 0.5 + Math.random() * 0.5;
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  return new THREE.CanvasTexture(canvas);
}

// ── Scene Setup ──────────────────────────────────────────────
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000008, 0.0025);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 25, 55);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  antialias: true,
  alpha: false,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// ── Lighting ─────────────────────────────────────────────────
const sunLight = new THREE.PointLight(0xfff5e0, 3000, 0, 1.5);
sunLight.position.set(0, 0, 0);
sunLight.castShadow = true;
sunLight.shadow.mapSize.set(2048, 2048);
scene.add(sunLight);

const ambientLight = new THREE.AmbientLight(0x111133, 0.8);
scene.add(ambientLight);

// ── Starfield skybox ─────────────────────────────────────────
const starfieldGeo = new THREE.BufferGeometry();
const starCount = 8000;
const starPositions = new Float32Array(starCount * 3);
const starColors = new Float32Array(starCount * 3);
const starSizes = new Float32Array(starCount);
for (let i = 0; i < starCount; i++) {
  const r = 400 + Math.random() * 600;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  starPositions[i*3]   = r * Math.sin(phi) * Math.cos(theta);
  starPositions[i*3+1] = r * Math.sin(phi) * Math.sin(theta);
  starPositions[i*3+2] = r * Math.cos(phi);
  // Slightly varied star colors
  const hue = Math.random() < 0.15 ? (Math.random() < 0.5 ? 0.6 : 0.1) : 0;
  const sat = Math.random() < 0.15 ? 0.5 : 0;
  const lum = 0.7 + Math.random() * 0.3;
  const c = new THREE.Color().setHSL(hue, sat, lum);
  starColors[i*3] = c.r; starColors[i*3+1] = c.g; starColors[i*3+2] = c.b;
  starSizes[i] = Math.random() * 2.5 + 0.5;
}
starfieldGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
starfieldGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
starfieldGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

const starMat = new THREE.PointsMaterial({
  size: 1.2,
  vertexColors: true,
  sizeAttenuation: false,
  transparent: true,
  opacity: 0.9,
});
const starfield = new THREE.Points(starfieldGeo, starMat);
scene.add(starfield);

// ── Sun ──────────────────────────────────────────────────────
const sunGeo = new THREE.SphereGeometry(3, 64, 64);
const sunMat = new THREE.MeshBasicMaterial({ map: makeSunTexture() });
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

// Sun glow (sprite)
function makeGlowCanvas(innerColor, outerColor, size = 256) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const grd = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
  grd.addColorStop(0, innerColor);
  grd.addColorStop(0.35, innerColor.replace('1)', '0.4)').replace('0.9', '0.4'));
  grd.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const sunGlowMat = new THREE.SpriteMaterial({
  map: makeGlowCanvas('rgba(255,200,50,0.9)', 'rgba(255,80,0,0)', 512),
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
});
const sunGlow = new THREE.Sprite(sunGlowMat);
sunGlow.scale.set(24, 24, 1);
sun.add(sunGlow);

// ── Orbit paths ──────────────────────────────────────────────
const orbitGroup = new THREE.Group();
scene.add(orbitGroup);

function makeOrbitRing(radius) {
  const segments = 128;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius));
  }
  const geo = new THREE.BufferGeometry().setFromPoints(pts);
  const mat = new THREE.LineBasicMaterial({
    color: 0x334466,
    transparent: true,
    opacity: 0.4,
  });
  return new THREE.Line(geo, mat);
}

// ── Asteroid belt ────────────────────────────────────────────
const asteroidGroup = new THREE.Group();
scene.add(asteroidGroup);
const asteroidCount = 300;
for (let i = 0; i < asteroidCount; i++) {
  const r = 27 + Math.random() * 4;
  const angle = Math.random() * Math.PI * 2;
  const y = (Math.random() - 0.5) * 0.8;
  const size = 0.04 + Math.random() * 0.1;
  const geo = new THREE.IcosahedronGeometry(size, 0);
  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color().setHSL(0.08, 0.1, 0.3 + Math.random() * 0.2),
    roughness: 0.9,
    metalness: 0.1,
  });
  const ast = new THREE.Mesh(geo, mat);
  ast.position.set(Math.cos(angle) * r, y, Math.sin(angle) * r);
  ast.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
  ast.userData.orbitRadius = r;
  ast.userData.orbitSpeed = 0.0005 + Math.random() * 0.001;
  ast.userData.orbitAngle = angle;
  ast.userData.orbitY = y;
  asteroidGroup.add(ast);
}

// ── Build planets ────────────────────────────────────────────
const planetMeshes = [];
const orbitObjects = [];
const labelEls = [];

PLANETS.forEach((data, idx) => {
  // Orbit container
  const orbit = new THREE.Object3D();
  scene.add(orbit);
  orbitObjects.push(orbit);

  // Orbit path ring
  const orbitRing = makeOrbitRing(data.distance);
  orbitGroup.add(orbitRing);

  // Planet sphere
  const geo = new THREE.SphereGeometry(data.radius, 64, 64);
  const mat = new THREE.MeshStandardMaterial({
    map: makeTexture(data),
    roughness: data.type === 'Gas Giant' ? 0.85 : 0.75,
    metalness: 0.05,
    emissive: new THREE.Color(data.emissive),
    emissiveIntensity: 0.25,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.x = data.distance;
  mesh.rotation.z = data.tilt;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.userData = { ...data, index: idx };
  orbit.add(mesh);

  // Planet glow sprite
  const glowMat = new THREE.SpriteMaterial({
    map: makeGlowCanvas(data.glow.replace('0.4)', '0.6)'), 'rgba(0,0,0,0)', 256),
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glow = new THREE.Sprite(glowMat);
  glow.scale.set(data.radius * 4, data.radius * 4, 1);
  mesh.add(glow);

  // Saturn rings
  if (data.hasRings) {
    const ringGeo = new THREE.RingGeometry(data.radius * 1.35, data.radius * 2.4, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      map: makeSaturnRingTexture(),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
    });
    // Fix UV for ring so texture maps radially
    const pos = ringGeo.attributes.position;
    const uv = ringGeo.attributes.uv;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      const len = v.length();
      const inner = data.radius * 1.35, outer = data.radius * 2.4;
      uv.setXY(i, (len - inner) / (outer - inner), 0.5);
    }
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.2;
    mesh.add(ring);
  }

  // Label
  const label = document.createElement('div');
  label.className = 'planet-label';
  label.textContent = data.name;
  label.id = `label-${data.name.toLowerCase()}`;
  document.body.appendChild(label);
  labelEls.push(label);

  planetMeshes.push(mesh);
});

// ── Camera controls ──────────────────────────────────────────
let isDragging = false;
let prevMouse = { x: 0, y: 0 };
let spherical = { theta: Math.PI / 8, phi: Math.PI / 3.5, radius: 60 };
const TARGET = new THREE.Vector3(0, 0, 0);
let targetSpherical = { ...spherical };

document.addEventListener('mousedown', e => {
  if (e.target.closest('.hud-header, .info-panel, .legend, .instructions')) return;
  isDragging = true;
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mousemove', e => {
  if (!isDragging) return;
  const dx = e.clientX - prevMouse.x;
  const dy = e.clientY - prevMouse.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.15, Math.min(Math.PI * 0.9, targetSpherical.phi - dy * 0.005));
  prevMouse = { x: e.clientX, y: e.clientY };
});
document.addEventListener('mouseup', () => { isDragging = false; });
document.addEventListener('wheel', e => {
  targetSpherical.radius = Math.max(10, Math.min(200, targetSpherical.radius + e.deltaY * 0.05));
}, { passive: true });

// Touch support
document.addEventListener('touchstart', e => {
  if (e.target.closest('.hud-header, .info-panel, .legend, .instructions')) return;
  isDragging = true;
  prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});
document.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - prevMouse.x;
  const dy = e.touches[0].clientY - prevMouse.y;
  targetSpherical.theta -= dx * 0.005;
  targetSpherical.phi = Math.max(0.15, Math.min(Math.PI * 0.9, targetSpherical.phi - dy * 0.005));
  prevMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY };
});
document.addEventListener('touchend', () => { isDragging = false; });

// ── Raycaster for clicks / hover ─────────────────────────────
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const tooltip = document.getElementById('tooltip');
let hoveredPlanet = null;

function getIntersects(event) {
  const x = event.clientX || event.touches?.[0]?.clientX || 0;
  const y = event.clientY || event.touches?.[0]?.clientY || 0;
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(mouse, camera);
  const clickable = [...planetMeshes, sun];
  return raycaster.intersectObjects(clickable, false);
}

// Hover
document.addEventListener('mousemove', e => {
  if (isDragging) { tooltip.classList.add('hidden'); return; }
  const hits = getIntersects(e);
  if (hits.length > 0 && hits[0].object.userData.name) {
    const data = hits[0].object.userData;
    tooltip.textContent = data.name;
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY - 10) + 'px';
    tooltip.classList.remove('hidden');
    document.body.style.cursor = 'pointer';
    hoveredPlanet = hits[0].object;
  } else if (hits.length > 0 && hits[0].object === sun) {
    tooltip.textContent = '☀ Sun';
    tooltip.style.left = (e.clientX + 14) + 'px';
    tooltip.style.top = (e.clientY - 10) + 'px';
    tooltip.classList.remove('hidden');
    document.body.style.cursor = 'pointer';
    hoveredPlanet = sun;
  } else {
    tooltip.classList.add('hidden');
    document.body.style.cursor = 'default';
    hoveredPlanet = null;
  }
});

// Click → info panel
document.addEventListener('click', e => {
  if (e.target.closest('.hud-header, .info-panel, .legend, .instructions')) return;
  const hits = getIntersects(e);
  if (hits.length > 0 && hits[0].object.userData.name) {
    showInfoPanel(hits[0].object.userData);
  } else {
    // Sun click
    if (hits.length > 0 && hits[0].object === sun) {
      showInfoPanel({
        name: 'The Sun', type: 'G-type Main Sequence Star', color: '#FFD700', glow: 'rgba(255,200,0,0.5)',
        stats: { 'Diameter': '1.39M km', 'Mass': '1.989 × 10³⁰ kg', 'Temp': '5,778 K', 'Age': '4.6B years' },
        desc: 'The Sun accounts for 99.86% of the solar system\'s mass. Its core reaches 15 million°C, fusing hydrogen into helium and releasing the energy that powers all life on Earth.',
      });
    }
  }
});

// ── Info panel ───────────────────────────────────────────────
const infoPanel = document.getElementById('info-panel');
const infoIcon = document.getElementById('info-icon');
const infoName = document.getElementById('info-name');
const infoType = document.getElementById('info-type');
const infoStats = document.getElementById('info-stats');
const infoDesc = document.getElementById('info-desc');
const infoClose = document.getElementById('info-close');

function showInfoPanel(data) {
  infoIcon.style.background = `radial-gradient(circle at 35% 35%, ${data.color}, ${data.emissive || '#000'})`;
  infoIcon.style.setProperty('--planet-glow', data.glow || 'rgba(91,158,255,0.3)');
  infoIcon.style.boxShadow = `0 0 30px 10px ${data.glow || 'rgba(91,158,255,0.3)'}`;
  infoName.textContent = data.name;
  infoType.textContent = data.type || '';
  infoStats.innerHTML = Object.entries(data.stats || {}).map(([k, v]) =>
    `<div class="stat-card"><div class="stat-label">${k}</div><div class="stat-value">${v}</div></div>`
  ).join('');
  infoDesc.textContent = data.desc || '';
  infoPanel.classList.remove('hidden');
}

infoClose.addEventListener('click', () => infoPanel.classList.add('hidden'));

// ── HUD Controls ─────────────────────────────────────────────
let paused = false;
let speedMult = 1;
let showOrbits = true;
let showLabels = true;

document.getElementById('btn-pause').addEventListener('click', function() {
  paused = !paused;
  this.textContent = paused ? '▶ Resume' : '⏸ Pause';
  this.classList.toggle('active', paused);
});

const speedSlider = document.getElementById('speed-slider');
const speedVal = document.getElementById('speed-val');
speedSlider.addEventListener('input', function() {
  speedMult = parseFloat(this.value);
  speedVal.textContent = speedMult.toFixed(1) + '×';
});

document.getElementById('btn-orbits').addEventListener('click', function() {
  showOrbits = !showOrbits;
  orbitGroup.visible = showOrbits;
  this.classList.toggle('active', showOrbits);
});

document.getElementById('btn-labels').addEventListener('click', function() {
  showLabels = !showLabels;
  labelEls.forEach(el => { el.style.opacity = showLabels ? '1' : '0'; });
  this.classList.toggle('active', showLabels);
});

document.getElementById('btn-reset').addEventListener('click', () => {
  targetSpherical = { theta: Math.PI / 8, phi: Math.PI / 3.5, radius: 60 };
});

// ── Projection helper ─────────────────────────────────────────
const _vec = new THREE.Vector3();
function toScreenPos(worldPos) {
  _vec.copy(worldPos);
  _vec.project(camera);
  return {
    x: (_vec.x + 1) / 2 * window.innerWidth,
    y: (1 - (_vec.y + 1) / 2) * window.innerHeight,
    behind: _vec.z > 1,
  };
}

// ── Clock & Animation ─────────────────────────────────────────
const clock = new THREE.Clock();
let time = 0;

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (!paused) time += delta * speedMult;

  // Smooth camera
  spherical.theta += (targetSpherical.theta - spherical.theta) * 0.08;
  spherical.phi += (targetSpherical.phi - spherical.phi) * 0.08;
  spherical.radius += (targetSpherical.radius - spherical.radius) * 0.08;
  camera.position.set(
    spherical.radius * Math.sin(spherical.phi) * Math.sin(spherical.theta),
    spherical.radius * Math.cos(spherical.phi),
    spherical.radius * Math.sin(spherical.phi) * Math.cos(spherical.theta)
  );
  camera.lookAt(TARGET);

  // Sun spin + pulse
  if (!paused) {
    sun.rotation.y += 0.003 * speedMult;
    const pulse = 1 + 0.05 * Math.sin(time * 2);
    sunGlow.scale.set(24 * pulse, 24 * pulse, 1);
  }

  // Planets
  PLANETS.forEach((data, idx) => {
    const mesh = planetMeshes[idx];
    const orbit = orbitObjects[idx];

    if (!paused) {
      orbit.rotation.y = time * data.speed;
      mesh.rotation.y += data.selfRotate * speedMult;
    }

    // Label positions
    const worldPos = new THREE.Vector3();
    mesh.getWorldPosition(worldPos);
    const screen = toScreenPos(worldPos);
    const label = labelEls[idx];
    if (!screen.behind && showLabels) {
      label.style.left = screen.x + 'px';
      label.style.top = (screen.y - data.radius * 40 - 10) + 'px';
      label.style.opacity = showLabels ? '1' : '0';
    } else {
      label.style.opacity = '0';
    }
  });

  // Asteroids
  if (!paused) {
    asteroidGroup.children.forEach(ast => {
      ast.userData.orbitAngle += ast.userData.orbitSpeed * speedMult;
      const r = ast.userData.orbitRadius;
      ast.position.set(
        Math.cos(ast.userData.orbitAngle) * r,
        ast.userData.orbitY,
        Math.sin(ast.userData.orbitAngle) * r
      );
      ast.rotation.x += 0.005;
      ast.rotation.y += 0.008;
    });
  }

  // Star twinkle
  starMat.opacity = 0.85 + 0.1 * Math.sin(time * 1.5);

  renderer.render(scene, camera);
}

animate();

// ── Resize ────────────────────────────────────────────────────
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
