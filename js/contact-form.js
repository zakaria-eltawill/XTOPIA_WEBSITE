/* ============================================================
   XTOPIA — contact-form.js
   The site has no backend yet, so a valid submit opens the
   visitor's email app with the message pre-filled and addressed
   to the right inbox (careers -> hr@, everything else -> info@).
   Swap this for a form service (e.g. Web3Forms / Formspree)
   once the client provides an access key.
   ============================================================ */
(function () {
  'use strict';

  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const btn = form.querySelector('.contact__submit');
  const label = btn ? btn.querySelector('.contact__submit-label') : null;
  const setText = (t) => { if (label) label.textContent = t; };
  const val = (n) => { const el = form.elements[n]; return el ? String(el.value || '').trim() : ''; };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    if (!btn || btn.dataset.busy === '1') return;

    const reasonEl = form.elements.reason;
    const reasonText = reasonEl && reasonEl.selectedIndex > 0 ? reasonEl.options[reasonEl.selectedIndex].text : '';
    const to = val('reason') === 'careers' ? 'hr@xtopia.life' : 'info@xtopia.life';
    const subject = val('subject') || (reasonText ? 'Website enquiry: ' + reasonText : 'Website enquiry');
    const body = [
      val('message'),
      '',
      '—',
      'Name: ' + val('name'),
      'Email: ' + val('email'),
      reasonText ? 'Topic: ' + reasonText : ''
    ].filter((l, i, a) => !(l === '' && i === a.length - 1)).join('\n');

    btn.dataset.busy = '1';
    setText('OPENING YOUR EMAIL…');
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

    setTimeout(() => {
      setText('SEND A MESSAGE');
      btn.dataset.busy = '0';
    }, 3000);
  });
})();
