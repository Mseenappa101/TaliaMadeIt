/* ── Gallery: category filters + lightbox ── */
(() => {
  const items = [...document.querySelectorAll('.gallery__item')];
  const filters = document.querySelectorAll('.gallery__filter');
  if (!items.length) return;

  filters.forEach(btn => {
    btn.addEventListener('click', () => {
      const f = btn.dataset.filter;
      filters.forEach(b => b.classList.toggle('active', b === btn));
      items.forEach(it => it.classList.toggle('is-hidden', f !== 'all' && it.dataset.cat !== f));
    });
  });

  const box = document.querySelector('.lightbox');
  if (!box) return;
  const img = box.querySelector('.lightbox__img');
  const cap = box.querySelector('.lightbox__caption');
  let current = 0;

  const visible = () => items.filter(it => !it.classList.contains('is-hidden'));
  const show = (i) => {
    const list = visible();
    current = (i + list.length) % list.length;
    const el = list[current];
    const src = el.querySelector('img');
    img.src = src.src;
    img.alt = src.alt;
    cap.textContent = el.querySelector('.gallery__caption').textContent;
  };
  const open = (el) => {
    show(visible().indexOf(el));
    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  items.forEach(it => {
    it.tabIndex = 0;
    it.addEventListener('click', () => open(it));
    it.addEventListener('keydown', e => { if (e.key === 'Enter') open(it); });
  });
  box.querySelector('.lightbox__close').addEventListener('click', close);
  box.querySelector('.lightbox__prev').addEventListener('click', e => { e.stopPropagation(); show(current - 1); });
  box.querySelector('.lightbox__next').addEventListener('click', e => { e.stopPropagation(); show(current + 1); });
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', e => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });
})();
