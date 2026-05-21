// Create the scene
const scene = new THREE.Scene();

// Create a camera (FOV, aspect ratio, near, far)
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Create renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1); // black background

// Add a sphere (the Sun)
const geometry = new THREE.SphereGeometry(2, 32, 32);
const material = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(geometry, material);
const light = new THREE.PointLight(0xffffff, 200, 100);
light.position.set(0, 0, 0);
scene.add(light);

scene.add(sun);
// --- STAR FIELD ---
for (let i = 0; i < 20000; i++) { // increased to 3000 stars
  const geometry = new THREE.SphereGeometry(0.05, 8, 8);
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: Math.random() * 0.5 + 0.5,
  });
  const star = new THREE.Mesh(geometry, material);

  // Wider spread so stars fill all around
  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(400)); // expanded to 400
  star.position.set(x, y, z);

  scene.add(star);
}


// --- EARTH ---
const earthOrbit = new THREE.Object3D(); // invisible container for Earth
scene.add(earthOrbit);

const earthGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const earthMaterial = new THREE.MeshStandardMaterial({ color: 0x3399ff });
const earth = new THREE.Mesh(earthGeometry, earthMaterial);
earth.position.x = 6; // distance from the Sun
earthOrbit.add(earth);

// --- MERCURY ---
const mercuryOrbit = new THREE.Object3D();
scene.add(mercuryOrbit);

const mercuryGeometry = new THREE.SphereGeometry(0.25, 32, 32);
const mercuryMaterial = new THREE.MeshStandardMaterial({ color: 0xbfb8aa });
const mercury = new THREE.Mesh(mercuryGeometry, mercuryMaterial);
mercury.position.x = 3.5; // closer to Sun
mercuryOrbit.add(mercury);

// --- VENUS ---
const venusOrbit = new THREE.Object3D();
scene.add(venusOrbit);

const venusGeometry = new THREE.SphereGeometry(0.45, 32, 32);
const venusMaterial = new THREE.MeshStandardMaterial({ color: 0xe6b566 });
const venus = new THREE.Mesh(venusGeometry, venusMaterial);
venus.position.x = 5;
venusOrbit.add(venus);

// --- MARS ---
const marsOrbit = new THREE.Object3D();
scene.add(marsOrbit);

const marsGeometry = new THREE.SphereGeometry(0.4, 32, 32);
const marsMaterial = new THREE.MeshStandardMaterial({ color: 0xff5533 });
const mars = new THREE.Mesh(marsGeometry, marsMaterial);
mars.position.x = 8;
marsOrbit.add(mars);

// --- JUPITER ---
const jupiterOrbit = new THREE.Object3D();
scene.add(jupiterOrbit);

const jupiterGeometry = new THREE.SphereGeometry(1, 32, 32);
const jupiterMaterial = new THREE.MeshStandardMaterial({ color: 0xd1a46f });
const jupiter = new THREE.Mesh(jupiterGeometry, jupiterMaterial);
jupiter.position.x = 11;
jupiterOrbit.add(jupiter);

// --- SATURN ---
const saturnOrbit = new THREE.Object3D();
scene.add(saturnOrbit);

const saturnGeometry = new THREE.SphereGeometry(0.9, 32, 32);
const saturnMaterial = new THREE.MeshStandardMaterial({ color: 0xc2b280 });
const saturn = new THREE.Mesh(saturnGeometry, saturnMaterial);
saturn.position.x = 14;
saturnOrbit.add(saturn);

// --- SATURN'S RINGS ---
const ringGeometry = new THREE.RingGeometry(1.1, 1.6, 64);
const ringMaterial = new THREE.MeshBasicMaterial({
  color: 0xd2b48c,
  side: THREE.DoubleSide,
});
const ring = new THREE.Mesh(ringGeometry, ringMaterial);
ring.rotation.x = Math.PI / 2;
saturn.add(ring);

// --- URANUS ---
const uranusOrbit = new THREE.Object3D();
scene.add(uranusOrbit);

const uranusGeometry = new THREE.SphereGeometry(0.7, 32, 32);
const uranusMaterial = new THREE.MeshStandardMaterial({ color: 0x99ffff });
const uranus = new THREE.Mesh(uranusGeometry, uranusMaterial);
uranus.position.x = 17;
uranusOrbit.add(uranus);

// --- NEPTUNE ---
const neptuneOrbit = new THREE.Object3D();
scene.add(neptuneOrbit);

const neptuneGeometry = new THREE.SphereGeometry(0.65, 32, 32);
const neptuneMaterial = new THREE.MeshStandardMaterial({ color: 0x3366ff });
const neptune = new THREE.Mesh(neptuneGeometry, neptuneMaterial);
neptune.position.x = 20;
neptuneOrbit.add(neptune);




// Move the camera back so we can see the Sun
camera.position.z = 10;

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Spin the Sun
  sun.rotation.y += 0.01;

  // --- Orbits ---
mercuryOrbit.rotation.y += 0.02; // fastest
venusOrbit.rotation.y += 0.015;
earthOrbit.rotation.y += 0.01;
marsOrbit.rotation.y += 0.008;
jupiterOrbit.rotation.y += 0.006;
saturnOrbit.rotation.y += 0.004;
uranusOrbit.rotation.y += 0.002;
neptuneOrbit.rotation.y += 0.001;

// --- Planet spins ---
mercury.rotation.y += 0.02;
venus.rotation.y += 0.015;
earth.rotation.y += 0.02;
mars.rotation.y += 0.018;
jupiter.rotation.y += 0.02;
saturn.rotation.y += 0.018;
uranus.rotation.y += 0.015;
neptune.rotation.y += 0.012;


  renderer.render(scene, camera);
}


animate();

// Handle resizing
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
