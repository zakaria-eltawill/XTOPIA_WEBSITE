/* ============================================================
   XTOPIA — nav.js
   Scroll state (transparent -> blurred), mobile overlay menu,
   hamburger -> X.
   ============================================================ */
(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  if (!nav) return;

  const burger = nav.querySelector('.nav__burger');
  const overlay = document.querySelector('.nav-overlay');

  /* Scroll state */
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('is-scrolled', window.scrollY > 80);
        ticking = false;
      });
      ticking = true;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile overlay */
  function toggleMenu(open) {
    const isOpen = open ?? !nav.classList.contains('is-open');
    nav.classList.toggle('is-open', isOpen);
    if (overlay) overlay.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (window.XTOPIA && XTOPIA.lenis) { isOpen ? XTOPIA.lenis.stop() : XTOPIA.lenis.start(); }
  }

  if (burger) burger.addEventListener('click', () => toggleMenu());

  if (overlay) {
    overlay.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => toggleMenu(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) toggleMenu(false);
  });
})();
