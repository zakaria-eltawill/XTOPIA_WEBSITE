/* ============================================================
   XTOPIA — cursor.js
   Custom magnetic cursor: dot + ring, "VIEW ↗" on media.
   The .cursor container follows the mouse (with lag); the inner
   dot/ring scaling is handled by CSS via .is-hover / .is-view.
   Desktop fine-pointer only.
   ============================================================ */
(function () {
  'use strict';

  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduceMotion) return;

  const cursor = document.querySelector('.cursor');
  if (!cursor) return;

  document.documentElement.classList.add('has-custom-cursor');

  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  let cx = mx, cy = my;
  let visible = false;

  window.addEventListener('mousemove', (e) => {
    mx = e.clientX; my = e.clientY;
    if (!visible) { cursor.style.opacity = '1'; visible = true; }
  }, { passive: true });

  document.addEventListener('mouseleave', () => { cursor.style.opacity = '0'; visible = false; });

  function render() {
    cx += (mx - cx) * 0.32;
    cy += (my - cy) * 0.32;
    cursor.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(render);
  }
  cursor.style.opacity = '0';
  requestAnimationFrame(render);

  // Hover states via event delegation
  const hoverSel = 'a, button, .nav__cta, .btn, .acc-bar, [data-cursor="hover"]';
  const viewSel = '[data-cursor="view"], .v-panel, .proj-card, .exp-card, .team-card, .feature__media';

  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(viewSel)) { cursor.classList.add('is-view'); cursor.classList.remove('is-hover'); }
    else if (e.target.closest(hoverSel)) { cursor.classList.add('is-hover'); }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(viewSel)) cursor.classList.remove('is-view');
    if (e.target.closest(hoverSel)) cursor.classList.remove('is-hover');
  });
})();
