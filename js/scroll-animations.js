/* ============================================================
   XTOPIA — scroll-animations.js
   GSAP ScrollTrigger: count-ups, flip statement pin, framework
   columns, feature reveal, floor stack, philosophy screens.
   Degrades gracefully when GSAP/ScrollTrigger absent or reduced-motion.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasST = window.gsap && window.ScrollTrigger;

  /* ---------- Count-ups ([data-count]) ---------- */
  function formatCount(el, value) {
    const dec = parseInt(el.dataset.decimals || '0', 10);
    if (el.dataset.pad) return String(Math.round(value)).padStart(parseInt(el.dataset.pad, 10), '0');
    if (dec === 0) return Math.round(value).toLocaleString('en-US');
    return value.toFixed(dec);
  }
  function runCount(el) {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const finalText = prefix + formatCount(el, target) + suffix;

    // Reserve the final footprint up front so counting never reflows the
    // layout (which caused the numbers to jump up/down). Tabular figures keep
    // the digit columns from jiggling as the value changes.
    el.style.display = 'inline-block';
    el.style.fontVariantNumeric = 'tabular-nums';
    el.style.whiteSpace = 'nowrap';
    el.textContent = finalText;
    el.style.minWidth = Math.ceil(el.getBoundingClientRect().width) + 'px';

    if (reduceMotion || !window.gsap) { return; } // already shows final value

    const obj = { v: 0 };
    el.textContent = prefix + formatCount(el, 0) + suffix;
    gsap.to(obj, {
      v: target, duration: 1.6, ease: 'power2.out',
      onUpdate: () => { el.textContent = prefix + formatCount(el, obj.v) + suffix; },
    });
  }
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if (!('IntersectionObserver' in window)) {
      counters.forEach(runCount);
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((e) => { if (e.isIntersecting) { runCount(e.target); obs.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach((el) => io.observe(el));
    }
  }

  if (!hasST) { initFlipFallback(); return; }
  gsap.registerPlugin(ScrollTrigger);

  /* ---------- Framework columns ---------- */
  gsap.utils.toArray('.fw-col').forEach((col, i) => {
    gsap.from(col, {
      y: 80, opacity: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.12,
      scrollTrigger: { trigger: col, start: 'top 85%' },
    });
    ScrollTrigger.create({ trigger: col, start: 'top 80%', onEnter: () => col.classList.add('is-in') });
  });

  /* ---------- Feature media reveal (clip-path wipe) ---------- */
  gsap.utils.toArray('.feature__media').forEach((media) => {
    gsap.fromTo(media,
      { clipPath: 'inset(100% 0 0 0)' },
      { clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: media, start: 'top 80%' },
        onStart: () => media.classList.add('is-in') });
  });

  /* ---------- Floor stack (SOHO deep-dive) ---------- */
  gsap.utils.toArray('.floor').forEach((f, i) => {
    ScrollTrigger.create({ trigger: f, start: 'top 90%',
      onEnter: () => setTimeout(() => f.classList.add('is-in'), i * 90) });
  });

  /* ---------- Philosophy pinned screens (about) ---------- */
  gsap.utils.toArray('.philosophy__screen').forEach((screen) => {
    const words = screen.querySelectorAll('.p-word');
    if (!words.length) return;
    gsap.fromTo(words,
      { opacity: 0.12 },
      { opacity: 1, stagger: 0.15, ease: 'none',
        scrollTrigger: { trigger: screen, start: 'top 70%', end: 'center center', scrub: true } });
  });

  /* ---------- Flip statement (home 1.2) ---------- */
  const flip = document.querySelector('.flip');
  if (flip) {
    const aWords = flip.querySelectorAll('.flip__a .word');
    const bBlock = flip.querySelector('.flip__b');
    const tl = gsap.timeline({ 
      paused: true,
      repeat: -1
    });
    
    aWords.forEach((w) => {
      tl.to(w, { opacity: 1, filter: 'blur(0px)', duration: 0.4 });
    });
    tl.to({}, { duration: 0.6 });
    tl.to(flip.querySelector('.flip__a'), { opacity: 0, filter: 'blur(10px)', duration: 0.4 });
    if (bBlock) {
      tl.to(bBlock, { opacity: 1, filter: 'blur(0px)', duration: 0.5 }, '<0.1');
      tl.to({}, { duration: 1.2 });
      tl.to(bBlock, { opacity: 0, filter: 'blur(10px)', duration: 0.4 });
      
      // Explicitly reset flip__a and aWords state while everything is invisible.
      // This ensures the timeline's ending values align perfectly with its starting values,
      // preventing any frame-lag or flashing during the loop restart.
      tl.set(aWords, { opacity: 0, filter: 'blur(6px)' });
      tl.set(flip.querySelector('.flip__a'), { opacity: 1, filter: 'blur(0px)' });
      
      tl.to({}, { duration: 0.2 });
    }

    ScrollTrigger.create({
      trigger: flip,
      start: 'top 40%',
      once: true,
      onEnter: () => tl.play(),
    });
  }
})();

/* Flip fallback when GSAP/ScrollTrigger missing or reduced motion */
function initFlipFallback() {
  document.querySelectorAll('.flip__a .word').forEach((w) => w.classList.add('is-on'));
  const b = document.querySelector('.flip__b');
  document.querySelectorAll('.p-word').forEach((w) => (w.style.opacity = 1));
  document.querySelectorAll('.floor').forEach((f) => f.classList.add('is-in'));
  document.querySelectorAll('.feature__media').forEach((m) => m.classList.add('is-in'));
  if (b) {
    // Reveal flip B once the flip section scrolls into view.
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((e) => { if (e.isIntersecting) b.classList.add('is-on'); });
      }, { threshold: 0.5 });
      io.observe(b.closest('.flip'));
    } else { b.classList.add('is-on'); }
  }
}
