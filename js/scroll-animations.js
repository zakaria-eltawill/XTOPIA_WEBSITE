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
      v: target, duration: 0.8, ease: 'power2.out',
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
      y: 80, opacity: 0, duration: 0.4, ease: 'power3.out', delay: i * 0.05,
      scrollTrigger: { trigger: col, start: 'top 85%' },
    });
    ScrollTrigger.create({ trigger: col, start: 'top 80%', onEnter: () => col.classList.add('is-in') });
  });

  /* ---------- Feature media reveal (clip-path wipe) ---------- */
  gsap.utils.toArray('.feature__media').forEach((media) => {
    gsap.fromTo(media,
      { clipPath: 'inset(100% 0 0 0)' },
      {
        clipPath: 'inset(0% 0 0 0)', duration: 0.5, ease: 'power4.out',
        scrollTrigger: { trigger: media, start: 'top 80%' },
        onStart: () => media.classList.add('is-in')
      });
  });

  /* ---------- Floor stack (SOHO deep-dive) ---------- */
  gsap.utils.toArray('.floor').forEach((f, i) => {
    ScrollTrigger.create({
      trigger: f, start: 'top 90%',
      onEnter: () => setTimeout(() => f.classList.add('is-in'), i * 40)
    });
  });

  /* ---------- Philosophy pinned screens (about) ---------- */
  gsap.utils.toArray('.philosophy__screen').forEach((screen) => {
    const words = screen.querySelectorAll('.p-word');
    if (!words.length) return;
    gsap.fromTo(words,
      { opacity: 0.12 },
      {
        opacity: 1, stagger: 0.15, ease: 'none',
        scrollTrigger: { trigger: screen, start: 'top 70%', end: 'center center', scrub: true }
      });
  });

  /* ---------- OUR VALUES — Pinned Scroll-Swap ---------- */
  const valuesSection = document.querySelector('.values-section');
  const valuesList = valuesSection && valuesSection.querySelector('.values-list');
  const valueRows = valuesSection ? gsap.utils.toArray(valuesSection.querySelectorAll('.value-row')) : [];

  if (valuesSection && valuesList && valueRows.length > 1 && !reduceMotion) {
    // Prevent the IO reveal system from interfering
    valueRows.forEach(row => row.removeAttribute('data-reveal'));

    // Measure tallest card before stacking
    let maxH = 0;
    valueRows.forEach(row => {
      row.style.position = 'relative';
      const h = row.offsetHeight;
      if (h > maxH) maxH = h;
    });

    // Set up container as stacking context
    valuesList.style.position = 'relative';
    valuesList.style.overflow = 'hidden';
    valuesList.style.height = maxH + 'px';

    // Inject progress dots
    const progressEl = document.createElement('div');
    progressEl.className = 'values-progress';
    valueRows.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'values-progress__dot' + (i === 0 ? ' is-active' : '');
      progressEl.appendChild(dot);
    });
    valuesList.after(progressEl);
    const dots = progressEl.querySelectorAll('.values-progress__dot');

    // Stack all cards absolutely in the same spot
    valueRows.forEach((row, i) => {
      row.style.position = 'absolute';
      row.style.top = '0';
      row.style.left = '0';
      row.style.right = '0';
      row.style.margin = '0 auto';

      if (i === 0) {
        gsap.set(row, { y: 0, opacity: 1, visibility: 'visible' });
      } else {
        gsap.set(row, { y: 30, opacity: 0, visibility: 'hidden' });
      }
    });

    // Track which value is active for the progress dots
    let activeIdx = 0;
    function setActiveDot(idx) {
      if (idx === activeIdx) return;
      dots[activeIdx].classList.remove('is-active');
      dots[idx].classList.add('is-active');
      activeIdx = idx;
    }

    // Build GSAP scrub timeline
    const count = valueRows.length;
    const tlVals = gsap.timeline({
      scrollTrigger: {
        trigger: valuesSection,
        start: 'top top',
        end: `+=${count * 65}%`,
        pin: true,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1
      }
    });

    for (let i = 0; i < count - 1; i++) {
      const curr = valueRows[i];
      const next = valueRows[i + 1];
      const nextIdx = i + 1;
      const prevIdx = i;

      // --- Outgoing card: fades out + moves up ---
      tlVals.to(curr, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onStart: () => { curr.style.visibility = 'visible'; setActiveDot(nextIdx); },
        onComplete: () => { curr.style.visibility = 'hidden'; },
        onReverseComplete: () => { curr.style.visibility = 'visible'; setActiveDot(prevIdx); }
      }, `swap${i}`);

      // --- Incoming card: enters from below + fades in ---
      tlVals.to(next, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        onStart: () => { next.style.visibility = 'visible'; },
        onReverseComplete: () => { next.style.visibility = 'hidden'; }
      }, `swap${i}`);

      // Hold for comfortable reading
      tlVals.to({}, { duration: 0.35 });
    }
  }
  /* ---------- Flip statement (home 1.2) ---------- */
  const flip = document.querySelector('.flip');
  if (flip) {
    const aWords = flip.querySelectorAll('.flip__a .word');
    const bBlock = flip.querySelector('.flip__b');
    const tl = gsap.timeline({
      scrollTrigger: { trigger: flip, start: 'top top', end: '+=80%', pin: true, scrub: 0.1 },
    });
    aWords.forEach((w) => {
      tl.to(w, { opacity: 1, filter: 'blur(0px)', duration: 0.2 });
    });
    tl.to({}, { duration: 0.5 }); // Space to read while scrolling
    tl.to(flip.querySelector('.flip__a'), { opacity: 0, filter: 'blur(10px)', duration: 0.2 });
    if (bBlock) tl.to(bBlock, { opacity: 1, filter: 'blur(0px)', duration: 0.25 }, '<0.1');
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

/* One group — connecting line (October 2026 section on About) */
(function () {
  var line = document.querySelector('.one-group__line-fill');
  if (!line) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) { line.style.width = '100%'; return; }
  gsap.fromTo(line, { width: '0%' }, { width: '100%', ease: 'none',
    scrollTrigger: { trigger: '.one-group', start: 'top 70%', end: 'bottom 65%', scrub: true } });
})();

/* Footprint map pins — reveal when the map scrolls into view */
(function () {
  var pins = document.querySelectorAll('.numbers-map__pin');
  if (!pins.length) return;
  var show = function () { pins.forEach(function (p, i) { setTimeout(function () { p.classList.add('is-in'); }, i * 180); }); };
  if (!('IntersectionObserver' in window)) return show();
  var io = new IntersectionObserver(function (e) { if (e[0].isIntersecting) { show(); io.disconnect(); } }, { threshold: 0.3 });
  io.observe(document.querySelector('.numbers-map'));
})();

/* About — The XTOPIA Advantage: cards slide in toward the X, connectors draw, X assembles, spine fills */
(function () {
  var sec = document.querySelector('.adv2');
  if (!sec) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var mobile = window.matchMedia('(max-width: 900px)').matches;

  gsap.from(sec.querySelectorAll('.adv2__intro > *'), {
    y: 40, opacity: 0, duration: 1, ease: 'power3.out', stagger: 0.12,
    scrollTrigger: { trigger: sec, start: 'top 75%' }
  });
  gsap.from(sec.querySelectorAll('.adv2__head'), {
    y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
    scrollTrigger: { trigger: sec.querySelector('.adv2__stage'), start: 'top 80%' }
  });

  // X: ghost outline first, then the photo fills the X with a scale + slight rotation
  var x = sec.querySelector('.adv2__x-img');
  gsap.fromTo(x, { clipPath: 'inset(50% 50% 50% 50%)', rotate: -8, scale: 0.85 },
    { clipPath: 'inset(0% 0% 0% 0%)', rotate: 0, scale: 1, ease: 'none',
      scrollTrigger: { trigger: sec.querySelector('.adv2__stage'), start: 'top 75%', end: 'top 25%', scrub: 0.6 } });
  gsap.fromTo(sec.querySelector('.adv2__x-img img'), { scale: 1.4 }, { scale: 1.05, ease: 'none',
    scrollTrigger: { trigger: sec, start: 'top bottom', end: 'bottom top', scrub: true } });

  // spine fills as you move through the pairs
  var fill = sec.querySelector('.adv2__spine-fill');
  if (fill) gsap.to(fill, { height: '100%', ease: 'none',
    scrollTrigger: { trigger: sec.querySelector('.adv2__stage'), start: 'top 60%', end: 'bottom 60%', scrub: true } });

  // each pair (left + right row i) converges on the centre together
  for (var i = 0; i < 4; i++) {
    var pair = sec.querySelectorAll('[data-adv-row="' + i + '"]');
    var l = pair[0], r = pair[1];
    var tl = gsap.timeline({ scrollTrigger: { trigger: l, start: 'top 82%' } });
    tl.from(l, { x: mobile ? 0 : -70, y: mobile ? 30 : 0, opacity: 0, duration: 0.9, ease: 'power3.out' }, 0)
      .from(r, { x: mobile ? 0 : 70, y: mobile ? 30 : 0, opacity: 0, duration: 0.9, ease: 'power3.out' }, mobile ? 0.15 : 0)
      .from(pair[0].querySelector('.adv2__link'), { scaleX: 0, duration: 0.6, ease: 'power2.out' }, 0.45)
      .from(pair[1].querySelector('.adv2__link'), { scaleX: 0, duration: 0.6, ease: 'power2.out' }, 0.45)
      .from([l.querySelector('.adv2__num'), r.querySelector('.adv2__num')], { y: 10, opacity: 0, duration: 0.5 }, 0.3);
  }

  gsap.from(sec.querySelector('.adv2__footline'), {
    y: 30, opacity: 0, duration: 1, ease: 'power3.out',
    scrollTrigger: { trigger: sec.querySelector('.adv2__footline'), start: 'top 88%' }
  });
})();

/* ARADA Saudi — Venn: the two circles slide together as you scroll, items and the core appear */
(function () {
  var v = document.querySelector('.venn');
  if (!v) return;
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  var desktop = window.matchMedia('(min-width: 901px)').matches;
  var l = v.querySelector('.venn__circle--l'), r = v.querySelector('.venn__circle--r');
  if (desktop) {
    gsap.fromTo(l, { xPercent: -128, yPercent: -50, opacity: 0.25 }, { xPercent: -86, yPercent: -50, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: v, start: 'top 85%', end: 'center 55%', scrub: 0.8 } });
    gsap.fromTo(r, { xPercent: 28, yPercent: -50, opacity: 0.25 }, { xPercent: -14, yPercent: -50, opacity: 1, ease: 'none',
      scrollTrigger: { trigger: v, start: 'top 85%', end: 'center 55%', scrub: 0.8 } });
    gsap.set([l, r], { x: 0 });
  } else {
    gsap.from([l, r], { y: 40, opacity: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out', scrollTrigger: { trigger: v, start: 'top 80%' } });
  }
  gsap.from(v.querySelectorAll('.venn__logo, .venn__role'), { y: 14, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
    scrollTrigger: { trigger: v, start: 'top 60%' } });
  gsap.from(v.querySelectorAll('.venn__item'), { y: 12, opacity: 0, duration: 0.5, stagger: 0.07, ease: 'power2.out',
    scrollTrigger: { trigger: v, start: 'top 55%' } });
  gsap.from(v.querySelector('.venn__core'), { scale: 0, opacity: 0, duration: 0.9, ease: 'back.out(1.6)',
    scrollTrigger: { trigger: v, start: 'center 60%' } });
})();

/* ARADA Saudi — capability scroll story: active step drives the image, counter and progress */
(function () {
  var sec = document.querySelector('.cap-story');
  if (!sec) return;
  var steps = sec.querySelectorAll('.cap-story__step');
  var imgs = sec.querySelectorAll('.cap-story__img');
  var badge = sec.querySelector('.cap-story__badge-num');
  var bar = sec.querySelector('.cap-story__bar-fill');
  var current = 0;
  function activate(i) {
    if (i === current) return;
    current = i;
    steps.forEach(function (s, j) { s.classList.toggle('is-active', j === i); });
    imgs.forEach(function (im, j) { im.classList.toggle('is-active', j === i); });
    if (badge) badge.textContent = '0' + (i + 1);
    if (bar) bar.style.width = ((i + 1) / steps.length * 100) + '%';
  }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) activate(parseInt(e.target.dataset.step, 10)); });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    steps.forEach(function (s) { io.observe(s); });
  }
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fill = sec.querySelector('.cap-story__rail-fill');
  if (fill && window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(fill, { height: '100%', ease: 'none',
      scrollTrigger: { trigger: sec.querySelector('.cap-story__steps'), start: 'top 50%', end: 'bottom 50%', scrub: true } });
    gsap.from(sec.querySelector('.cap-story__frame'), { y: 60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: sec.querySelector('.cap-story__grid'), start: 'top 80%' } });
  } else if (fill) { fill.style.height = '100%'; }
})();

/* XEED intro — title lines rise, column lines draw, stats slide up */
(function () {
  var sec = document.querySelector('.xeed-intro');
  if (!sec || !window.gsap || !window.ScrollTrigger) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(sec.querySelectorAll('.eyebrow, .xeed-intro__line, .xeed-intro__lead'), { y: 40, opacity: 0, duration: 1, stagger: 0.12, ease: 'power3.out', scrollTrigger: { trigger: sec, start: 'top 75%' } });
  var cols = sec.querySelectorAll('.xeed-col');
  gsap.from(sec.querySelectorAll('.xeed-col__line'), { scaleX: 0, duration: 1.1, stagger: 0.15, ease: 'power3.inOut', scrollTrigger: { trigger: sec.querySelector('.xeed-cols'), start: 'top 85%' } });
  gsap.from(sec.querySelectorAll('.xeed-col__num, .xeed-col__title, .xeed-col__text'), { y: 20, opacity: 0, duration: 0.7, stagger: 0.06, delay: 0.3, ease: 'power3.out', scrollTrigger: { trigger: sec.querySelector('.xeed-cols'), start: 'top 85%' } });
  gsap.from(sec.querySelectorAll('.xeed-stat'), { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sec.querySelector('.xeed-stats'), start: 'top 90%' } });
})();
