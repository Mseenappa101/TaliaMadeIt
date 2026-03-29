/* ── Contact form handling ── */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Basic validation */
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');

    if (!name.value.trim() || !email.value.trim()) return;

    /* Hide form, show success */
    form.style.display = 'none';
    const success = document.querySelector('.form__success');
    if (success) success.classList.add('show');
  });
})();
