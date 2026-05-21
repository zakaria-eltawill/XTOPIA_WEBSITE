/* ============================================================
   XTOPIA — three-hero.js  (ES module)
   Receding 3D grid of cream lines on void black. Slow Y-rotation,
   gentle mouse tilt, infinite forward drift. Powers the home hero
   and the verticals-hub hero (any <canvas data-three-grid>).
   ============================================================ */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('[data-three-grid]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.matchMedia('(max-width: 767px)').matches;

if (canvas && !reduceMotion) {
  const wrap = canvas.parentElement;
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setClearColor(0x000000, 0);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x111010, 0.055);

  const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 120);
  camera.position.set(0, 3.2, 9);
  camera.lookAt(0, 0, -10);

  // Build a large grid of lines lying on the XZ plane.
  const size = 80;
  const divisions = 40;
  const grid = new THREE.GridHelper(size, divisions, 0xF0EDE3, 0xF0EDE3);
  grid.material.transparent = true;
  grid.material.opacity = 0.16;
  scene.add(grid);

  // A second, finer grid slightly above for depth layering.
  const grid2 = new THREE.GridHelper(size, divisions * 2, 0xC2C7A3, 0xF0EDE3);
  grid2.material.transparent = true;
  grid2.material.opacity = 0.05;
  grid2.position.y = 4;
  scene.add(grid2);

  let targetX = 0, targetY = 0;
  if (!isMobile) {
    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5);
      targetY = (e.clientY / window.innerHeight - 0.5);
    }, { passive: true });
  }

  function resize() {
    const w = wrap.clientWidth || window.innerWidth;
    const h = wrap.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  let raf = null;
  let running = true;
  const clock = new THREE.Clock();

  function animate() {
    if (!running) return;
    const dt = clock.getDelta();
    // Forward drift — move grids toward camera, wrap for infinity.
    const step = (size / divisions);
    grid.position.z = (grid.position.z + dt * 1.4) % step;
    grid2.position.z = (grid2.position.z + dt * 0.9) % (step / 2);
    // Slow Y rotation + mouse tilt.
    scene.rotation.y += 0.0003;
    camera.position.x += (targetX * 2.2 - camera.position.x) * 0.04;
    camera.position.y += (3.2 - targetY * 1.6 - camera.position.y) * 0.04;
    camera.lookAt(0, 0.5, -12);
    renderer.render(scene, camera);
    raf = requestAnimationFrame(animate);
  }
  animate();

  // Pause when tab hidden
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { running = false; if (raf) cancelAnimationFrame(raf); }
    else if (!running) { running = true; clock.getDelta(); animate(); }
  });

  // Dispose on navigate-away
  window.addEventListener('pagehide', () => {
    running = false;
    if (raf) cancelAnimationFrame(raf);
    grid.geometry.dispose(); grid.material.dispose();
    grid2.geometry.dispose(); grid2.material.dispose();
    renderer.dispose();
  });
}
