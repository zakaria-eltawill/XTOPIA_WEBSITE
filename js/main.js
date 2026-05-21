/* ============================================================
   XTOPIA — main.js
   Lenis smooth scroll, GSAP/ScrollTrigger wiring, scroll progress,
   reveal observer, reduced-motion + mobile guards.
   ============================================================ */
(function () {
  'use strict';

  window.XTOPIA = window.XTOPIA || {};

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined';
  const hasST = hasGSAP && typeof window.ScrollTrigger !== 'undefined';

  XTOPIA.reduceMotion = reduceMotion;
  XTOPIA.isMobile = isMobile;

  /* ---------- Lenis smooth scroll ---------- */
  let lenis = null;
  if (!reduceMotion && !isMobile && typeof window.Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    XTOPIA.lenis = lenis;

    if (hasST) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* Smooth-scroll for in-page anchors */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    if (lenis) lenis.scrollTo(target, { offset: -80 });
    else target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  if (hasGSAP && hasST) gsap.registerPlugin(ScrollTrigger);

  /* ---------- Scroll progress line ---------- */
  const progress = document.querySelector('.scroll-progress__bar');
  if (progress) {
    if (reduceMotion || !hasST) {
      const onScroll = () => {
        const h = document.documentElement.scrollHeight - window.innerHeight;
        progress.style.transform = `scaleY(${h > 0 ? window.scrollY / h : 0})`;
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    } else {
      gsap.to(progress, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: document.body, start: 'top top', end: 'bottom bottom', scrub: 0.4 },
      });
    }
  }

  /* ---------- Reveal observer ([data-reveal]) ---------- */
  const reveals = document.querySelectorAll('[data-reveal]');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('is-in'));
    } else {
      const io = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -12% 0px', threshold: 0.15 });
      reveals.forEach((el) => io.observe(el));
    }
  }

  /* ---------- Graceful image load-in (blur-up / soft fade) ---------- */
  if (!reduceMotion) {
    const blurSel = [
      '.hero__media img', '.vhero__layer img', '.about-hero__media img',
      '.v-panel__bg img', '.pillar__bg img', '.park-map img',
      '.proj-card img', '.feature__media img', '.media img', '.exp-card img',
    ].join(',');
    const softSel = '.team-card img';

    const mark = (img, cls) => {
      if (img.classList.contains('lazy-img') || img.classList.contains('lazy-soft')) return;
      if ((img.className || '').toLowerCase().includes('logo')) return; // skip brand marks
      img.classList.add(cls);
      const done = () => img.classList.add('is-loaded');
      if (img.complete && img.naturalWidth > 0) requestAnimationFrame(done);
      else {
        img.addEventListener('load', done, { once: true });
        img.addEventListener('error', done, { once: true });
      }
    };

    document.querySelectorAll(softSel).forEach((img) => mark(img, 'lazy-soft'));
    document.querySelectorAll(blurSel).forEach((img) => mark(img, 'lazy-img'));
  }

  /* Refresh ScrollTrigger once everything (fonts/images) settles */
  window.addEventListener('load', () => { if (hasST) ScrollTrigger.refresh(); });
})();
