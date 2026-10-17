/* ============================================================
   XTOPIA — custom-select.js
   Turns .field--select <select> into a styled dropdown.
   The native <select> stays in the form (value + validation).
   ============================================================ */
(function () {
  'use strict';

  document.querySelectorAll('.field--select select').forEach((select) => {
    const field = select.closest('.field--select');
    const placeholder = select.querySelector('option[value=""]');
    const options = Array.from(select.options).filter((o) => o.value !== '');
    const id = select.id || 'cs-' + Math.random().toString(36).slice(2, 7);

    field.classList.add('cselect');
    select.classList.add('cselect__native');
    select.tabIndex = -1;
    select.setAttribute('aria-hidden', 'true');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cselect__btn';
    btn.id = id + '-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    btn.innerHTML = '<span class="cselect__value"></span><span class="cselect__chev" aria-hidden="true"></span>';
    const valueEl = btn.querySelector('.cselect__value');

    const label = field.querySelector('label');
    if (label) { label.setAttribute('for', btn.id); label.id = label.id || id + '-label'; btn.setAttribute('aria-labelledby', label.id + ' ' + btn.id); }

    const list = document.createElement('ul');
    list.className = 'cselect__list';
    list.setAttribute('role', 'listbox');
    list.id = id + '-list';
    list.tabIndex = -1;
    btn.setAttribute('aria-controls', list.id);

    options.forEach((o, i) => {
      const li = document.createElement('li');
      li.className = 'cselect__opt';
      li.setAttribute('role', 'option');
      li.id = id + '-opt-' + i;
      li.dataset.value = o.value;
      li.innerHTML = '<span class="cselect__num">' + String(i + 1).padStart(2, '0') + '</span><span>' + o.textContent + '</span>';
      li.addEventListener('click', () => { choose(i); close(true); });
      li.addEventListener('mousemove', () => setActive(i));
      list.appendChild(li);
    });

    select.after(btn, list);
    const items = Array.from(list.children);
    let active = -1;

    function sync() {
      const idx = options.findIndex((o) => o.value === select.value);
      valueEl.textContent = idx >= 0 ? options[idx].textContent : (placeholder ? placeholder.textContent : 'Select');
      field.classList.toggle('is-filled', idx >= 0);
      items.forEach((li, i) => li.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
    }
    function setActive(i) {
      active = i;
      items.forEach((li, j) => li.classList.toggle('is-active', j === i));
      if (i >= 0) { btn.setAttribute('aria-activedescendant', items[i].id); items[i].scrollIntoView({ block: 'nearest' }); }
    }
    function choose(i) {
      select.value = options[i].value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      sync();
    }
    function open() {
      field.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      const idx = options.findIndex((o) => o.value === select.value);
      setActive(idx >= 0 ? idx : 0);
    }
    function close(focus) {
      field.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
      btn.removeAttribute('aria-activedescendant');
      if (focus) btn.focus();
    }
    const isOpen = () => field.classList.contains('is-open');

    btn.addEventListener('click', () => (isOpen() ? close() : open()));
    btn.addEventListener('keydown', (e) => {
      const n = items.length;
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        if (!isOpen()) return open();
        setActive((active + (e.key === 'ArrowDown' ? 1 : n - 1)) % n);
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (!isOpen()) return open();
        if (active >= 0) choose(active);
        close(true);
      } else if (e.key === 'Escape' && isOpen()) {
        e.preventDefault(); close(true);
      } else if (e.key === 'Tab' && isOpen()) {
        close();
      }
    });
    document.addEventListener('click', (e) => { if (isOpen() && !field.contains(e.target)) close(); });
    select.addEventListener('invalid', () => field.classList.add('is-invalid'));
    select.addEventListener('change', () => field.classList.remove('is-invalid'));
    if (select.form) select.form.addEventListener('reset', () => setTimeout(sync, 0));

    sync();
  });
})();
