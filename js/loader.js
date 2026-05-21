/* ============================================================
   XTOPIA — loader.js
   Real-progress preloader: the 00→100 counter and the progress
   bar track actual asset loading (critical images + fonts).
   Wordmark draws via SVG stroke, then a vertical wipe reveals the page.
   Full intro on first visit; a quick graceful flash on later in-session loads.
   ============================================================ */
(function () {
  'use strict';

  const loader = document.querySelector('.loader');
  if (!loader) { document.documentElement.classList.add('is-loaded'); return; }

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const counter = loader.querySelector('.loader__count');
  const wipe = loader.querySelector('.loader__wipe');

  // The XTOPIA logo lives in the loader markup. Wait for it to load before
  // wiping away so it is always visible (fall back to nav logo if missing).
  const mark = loader.querySelector('.loader__mark');
  let logoImg = loader.querySelector('.loader__logo');
  if (!logoImg && mark) {
    const navLogo = document.querySelector('.nav__logo img');
    if (navLogo) {
      mark.innerHTML = '<img class="loader__logo" src="' + navLogo.getAttribute('src') + '" alt="XTOPIA" />';
      logoImg = mark.querySelector('img');
    }
  }
  let logoReady = true;
  if (logoImg && !(logoImg.complete && logoImg.naturalWidth > 0)) {
    logoReady = false;
    logoImg.addEventListener('load', () => { logoReady = true; }, { once: true });
    logoImg.addEventListener('error', () => { logoReady = true; }, { once: true });
  }
  const paths = loader.querySelectorAll('.loader__mark path, .loader__mark text');

  // Inject the progress bar (keeps HTML untouched across all pages).
  let bar = loader.querySelector('.loader__progress span');
  if (!bar) {
    const track = document.createElement('div');
    track.className = 'loader__progress';
    track.innerHTML = '<span></span>';
    loader.appendChild(track);
    bar = track.firstElementChild;
  }

  function finish() {
    document.documentElement.classList.add('is-loaded');
    loader.classList.add('is-done');
    const hero = document.querySelector('.hero');
    if (hero) hero.classList.add('is-ready');
    window.dispatchEvent(new CustomEvent('xtopia:loaded'));
  }

  /* ---------- Track real loading progress ---------- */
  // Critical = above-the-fold assets (everything not explicitly lazy) + fonts.
  const critical = Array.from(document.images)
    .filter((img) => (img.getAttribute('loading') || '') !== 'lazy');
  let imgLoaded = 0;
  let fontsDone = 0;
  const total = critical.length + 2; // +1 fonts, +1 logo

  const bump = () => { imgLoaded = Math.min(imgLoaded + 1, critical.length); };
  critical.forEach((img) => {
    if (img.complete && img.naturalWidth > 0) { bump(); }
    else {
      img.addEventListener('load', bump, { once: true });
      img.addEventListener('error', bump, { once: true });
    }
  });
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => { fontsDone = 1; });
  } else {
    fontsDone = 1;
  }

  /* ---------- Wordmark stroke animation ---------- */
  if (!reduceMotion) {
    paths.forEach((p) => {
      let len = 0;
      try { len = p.getComputedTextLength ? p.getComputedTextLength() : p.getTotalLength(); }
      catch (e) { len = 800; }
      p.style.strokeDasharray = len;
      p.style.strokeDashoffset = len;
      p.style.transition = 'stroke-dashoffset 2s cubic-bezier(0.16,1,0.3,1), fill 0.6s ease 1.4s';
    });
    requestAnimationFrame(() => {
      paths.forEach((p) => { p.style.strokeDashoffset = 0; p.style.fill = 'var(--c-cream)'; });
    });
  } else {
    paths.forEach((p) => { p.style.fill = 'var(--c-cream)'; p.style.stroke = 'none'; });
  }

  /* ---------- Drive the counter / bar ---------- */
  const seen = sessionStorage.getItem('xtopia-loaded') === '1';
  const minTime = reduceMotion ? 0 : (seen ? 500 : 1500);
  const start = performance.now();
  let shown = 0;
  let finished = false;

  const targetPct = () => ((imgLoaded + fontsDone + (logoReady ? 1 : 0)) / total) * 100;

  function tick(now) {
    if (finished) return;
    const target = targetPct();
    shown += (target - shown) * 0.12;
    const elapsed = now - start;
    const ready = target >= 99.5 && elapsed >= minTime;
    const display = ready ? 100 : Math.min(shown, 99);
    if (counter) counter.textContent = String(Math.round(display)).padStart(3, '0').slice(-3);
    if (bar) bar.style.transform = `scaleX(${Math.min(display, 100) / 100})`;
    if (ready && shown > 99) { finished = true; close(); return; }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  // Safety net so a stalled asset can never trap the user behind the loader.
  setTimeout(() => { if (!finished) { finished = true; close(); } }, 8000);

  function close() {
    sessionStorage.setItem('xtopia-loaded', '1');
    if (counter) counter.textContent = '100';
    if (bar) bar.style.transform = 'scaleX(1)';
    if (window.gsap && wipe) {
      gsap.to(loader.querySelector('.loader__mark'), { autoAlpha: 0, duration: 0.4 });
      gsap.to(loader.querySelector('.loader__progress'), { autoAlpha: 0, duration: 0.3 });
      gsap.to(loader, {
        scaleY: 0, transformOrigin: 'top', duration: 0.9, ease: 'power4.inOut',
        delay: 0.15, onComplete: () => { loader.style.display = 'none'; finish(); },
      });
    } else {
      loader.style.transition = 'opacity 0.6s ease';
      loader.style.opacity = '0';
      setTimeout(() => { loader.style.display = 'none'; finish(); }, 650);
    }
  }
})();
