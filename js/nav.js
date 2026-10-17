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
  // (about/contact used to have split light heroes; both are dark now, so no light-links variant)

  const burger = nav.querySelector('.nav__burger');
  const overlay = document.querySelector('.nav-overlay');

  /* Active-link state — computed here rather than hardcoded per page, so the
     nav/overlay partials (tools/sync-partials.py) stay byte-identical across pages. */
  (function setActiveLinks() {
    const inVerticalsDir = /\/verticals\//.test(path);
    const links = document.querySelectorAll('.nav__link, .nav__cta, .nav-overlay__link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('javascript:')) return;
      const linkFile = href.split('/').pop().split('#')[0].split('?')[0];
      let active = linkFile === filename;
      if (!active && inVerticalsDir && linkFile === 'verticals.html') active = true;
      link.classList.toggle('is-active', active);
    });
  })();

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
