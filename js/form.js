/* ── Contact form: submits to Netlify Forms, which saves the entry and emails it ── */
(() => {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const button = form.querySelector('.form__submit');
  const error = form.querySelector('.form__error');
  const success = document.querySelector('.form__success');
  const label = button.textContent;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Put the client's name in the notification email's subject line
    const name = form.elements.name.value.trim();
    form.elements.subject.value = `New consultation request from ${name}`;

    error.hidden = true;
    button.disabled = true;
    button.textContent = 'Sending…';

    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString(),
      });
      if (!res.ok) throw new Error(`Status ${res.status}`);

      form.style.display = 'none';
      if (success) success.classList.add('show');
    } catch (err) {
      error.hidden = false;
      button.disabled = false;
      button.textContent = label;
    }
  });
})();
