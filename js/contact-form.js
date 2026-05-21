/* ============================================================
   XTOPIA — contact-form.js
   Floating labels + fake submit lifecycle (no backend).
   ============================================================ */
(function () {
  'use strict';

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const btn = form.querySelector('.contact__submit');
  const label = btn ? btn.querySelector('.contact__submit-label') : null;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!btn || btn.dataset.busy === '1') return;

    btn.dataset.busy = '1';
    const setText = (t) => { if (label) label.textContent = t; };

    setText('SENDING');
    let dots = 0;
    const anim = setInterval(() => { dots = (dots + 1) % 4; setText('SENDING' + '.'.repeat(dots)); }, 300);

    setTimeout(() => {
      clearInterval(anim);
      btn.classList.add('is-sent');
      setText('SENT ✓');
      form.reset();
      setTimeout(() => {
        btn.classList.remove('is-sent');
        setText('SEND A MESSAGE');
        btn.dataset.busy = '0';
      }, 3200);
    }, 1600);
  });
})();
