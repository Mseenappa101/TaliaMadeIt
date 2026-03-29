/* ── Menu tab switching ── */
(() => {
  const tabs = document.querySelectorAll('.menus__tab');
  const panels = document.querySelectorAll('.menus__panel');
  if (!tabs.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.id === target) p.classList.add('active');
      });
    });
  });
})();
