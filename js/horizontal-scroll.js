/* ============================================================
   XTOPIA — horizontal-scroll.js
   1) Home verticals: pinned horizontal scroll (GSAP).
   2) Community experiences: pointer-drag carousel.
   3) Verticals hub: full-screen accordion.
   ============================================================ */
(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = window.matchMedia('(max-width: 767px)').matches;
  const hasST = window.gsap && window.ScrollTrigger;

  /* ---------- 1) Pinned horizontal scroll ---------- */
  const hScroll = document.querySelector('[data-hscroll]');
  if (hScroll && hasST && !isMobile && !reduceMotion) {
    const track = hScroll.querySelector('.h-scroll__track');
    const getScrollAmount = () => track.scrollWidth - window.innerWidth;
    gsap.to(track, {
      x: () => -getScrollAmount(),
      ease: 'none',
      scrollTrigger: {
        trigger: hScroll,
        start: 'top top',
        end: () => '+=' + getScrollAmount(),
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  /* ---------- 2) Drag carousel ---------- */
  document.querySelectorAll('[data-carousel]').forEach((car) => {
    const track = car.querySelector('.carousel__track');
    if (!track) return;
    let isDown = false, startX = 0, current = 0, last = 0;

    const maxScroll = () => Math.max(0, track.scrollWidth - car.clientWidth + 32);
    const apply = (x) => {
      current = Math.max(-maxScroll(), Math.min(0, x));
      track.style.transform = `translateX(${current}px)`;
    };

    car.addEventListener('pointerdown', (e) => {
      isDown = true; startX = e.clientX; last = current;
      car.classList.add('is-dragging');
      car.setPointerCapture(e.pointerId);
    });
    car.addEventListener('pointermove', (e) => {
      if (!isDown) return;
      apply(last + (e.clientX - startX));
    });
    const end = () => { isDown = false; car.classList.remove('is-dragging'); };
    car.addEventListener('pointerup', end);
    car.addEventListener('pointercancel', end);
    car.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { e.preventDefault(); apply(current - e.deltaX); }
    }, { passive: false });
  });

  /* ---------- 3) Verticals hub accordion ---------- */
  const accordion = document.querySelector('[data-accordion]');
  if (accordion) {
    const bars = Array.from(accordion.querySelectorAll('.acc-bar'));
    function open(bar) {
      bars.forEach((b) => b.classList.toggle('is-open', b === bar));
      if (window.XTOPIA && XTOPIA.ScrollTriggerRefresh) XTOPIA.ScrollTriggerRefresh();
    }
    bars.forEach((bar) => {
      bar.addEventListener('mouseenter', () => { if (!isMobile) open(bar); });
      bar.addEventListener('click', (e) => {
        // Let CTA links inside work normally.
        if (e.target.closest('a')) return;
        open(bar);
      });
    });
    // Open the first by default.
    if (bars[0]) bars[0].classList.add('is-open');
  }
})();
