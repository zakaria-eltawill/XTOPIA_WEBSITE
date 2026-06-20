/* ============================================================
   XTOPIA — nav.js
   Scroll state (transparent -> blurred), mobile overlay menu,
   hamburger -> X.
   ============================================================ */
(function () {
  'use strict';

  const nav = document.querySelector('.nav');
  if (!nav) return;

  // Detect page path to style transparent nav bar correctly over light/split heroes
  const path = window.location.pathname;
  const filename = path.split('/').pop() || 'index.html';
  if (filename.includes('about.html') || filename.includes('contact.html')) {
    nav.classList.add('nav--light-links'); // Right side links are dark, logo on left split remains white over black split
  }

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
    // Accordion submenu toggling
    const items = overlay.querySelectorAll('.nav-overlay__item-wrap');
    items.forEach((item) => {
      const toggle = item.querySelector('.nav-overlay__toggle');
      if (toggle) {
        toggle.addEventListener('click', (e) => {
          const isOpen = item.classList.contains('is-open');
          // Close all other accordions
          items.forEach((oth) => oth.classList.remove('is-open'));
          // Toggle this one
          if (!isOpen) {
            item.classList.add('is-open');
          }
        });
      }
    });

    overlay.querySelectorAll('.nav-overlay__sub a, .nav-overlay__link').forEach((a) => {
      a.addEventListener('click', () => toggleMenu(false));
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) toggleMenu(false);
  });
})();
