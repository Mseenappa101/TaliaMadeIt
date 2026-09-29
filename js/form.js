/* ── Contact form ──
   Each inquiry is sent two ways:
   1. Netlify Forms  — saved in the Netlify dashboard (Forms → consultation)
   2. Web3Forms      — emailed to the inbox tied to the access key below
   The key only routes email; it is safe to be public. */
(() => {
  const WEB3FORMS_KEY = '8990b789-b954-4752-8767-72dbe2cd03a7';

  const form = document.getElementById('contactForm');
  if (!form) return;

  const button = form.querySelector('.form__submit');
  const error = form.querySelector('.form__error');
  const success = document.querySelector('.form__success');
  const label = button.textContent;

  const showSuccess = () => {
    form.style.display = 'none';
    if (success) success.classList.add('show');
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    // Bots fill the hidden field; quietly pretend it worked
    if (form.elements['bot-field'].value) {
      showSuccess();
      return;
    }

    const f = form.elements;
    const name = f.name.value.trim();
    f.subject.value = `New consultation request from ${name}`;

    error.hidden = true;
    button.disabled = true;
    button.textContent = 'Sending…';

    const toNetlify = fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    }).then(r => { if (!r.ok) throw new Error(`Netlify ${r.status}`); });

    const toEmail = fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: WEB3FORMS_KEY,
        subject: f.subject.value,
        from_name: 'TaliaMadeIt Website',
        replyto: f.email.value.trim(),
        Name: name,
        Email: f.email.value.trim(),
        Phone: f.phone.value.trim() || '—',
        Service: f.service.value,
        Guests: f.guests.value.trim() || '—',
        'Preferred date': f.date.value || '—',
        Vision: f.message.value.trim() || '—',
      }),
    }).then(r => r.json()).then(d => { if (!d.success) throw new Error(d.message || 'Web3Forms failed'); });

    const results = await Promise.allSettled([toNetlify, toEmail]);

    // Success if the inquiry reached at least one place
    if (results.some(r => r.status === 'fulfilled')) {
      showSuccess();
    } else {
      error.hidden = false;
      button.disabled = false;
      button.textContent = label;
    }
  });
})();
