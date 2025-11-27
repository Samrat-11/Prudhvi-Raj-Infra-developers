(function(){
  function qs(sel, root=document){ return root.querySelector(sel); }
  const section = qs('#cta-contact');
  if (!section) return;

  // Admin's WhatsApp number is read from data-whatsapp (international format e.g. +919876543210)
  const adminRaw = section.getAttribute('data-whatsapp') || '';
  // Convert to digits-only for wa.me (strip + and non digits)
  const adminDigits = (adminRaw || '').replace(/\D/g, '');
  const form = qs('#cta-form', section);
  const inputName = qs('#cta-name', section);
  const inputPhone = qs('#cta-phone', section);
  const inputMessage = qs('#cta-message', section);
  const btn = qs('#cta-send', section);
  const status = qs('#cta-status', section);

  function showStatus(text, isError){
    status.hidden = false;
    status.textContent = text;
    status.style.color = isError ? '#b91c1c' : '#065f46';
  }

  function validatePhoneVal(v){
    // Basic validation: digits only and length >= 7. Ask user to enter country code for reliability.
    const digits = (v || '').replace(/\D/g, '');
    return digits.length >= 7;
  }

  if (!form || !inputName || !inputPhone || !inputMessage || !btn) return;

  form.addEventListener('submit', function(ev){
    ev.preventDefault();

    // Basic validation
    const name = inputName.value.trim();
    const phone = inputPhone.value.trim();
    const messageText = inputMessage.value.trim();

    if (!name){
      showStatus('Please enter your name', true);
      inputName.focus();
      return;
    }
    if (!validatePhoneVal(phone)){
      showStatus('Please enter a valid phone number (include country code if possible)', true);
      inputPhone.focus();
      return;
    }
    if (!messageText){
      showStatus('Please enter a short message', true);
      inputMessage.focus();
      return;
    }
    if (!adminDigits) {
      showStatus('Owner WhatsApp number not configured. Please contact site admin.', true);
      return;
    }

    // Build message template
    const finalMsg = `Hi, my name is ${name}. %0A${encodeURIComponent(messageText)}%0A%0AMy phone: ${phone}`;

    // wa.me requires digits only for phone number (no + or spaces)
    const url = `https://wa.me/${adminDigits}?text=${finalMsg}`;

    // disable button briefly to prevent double clicks
    btn.disabled = true;
    btn.setAttribute('aria-disabled', 'true');
    showStatus('Opening WhatsApp...', false);

    // open in new tab/window - mobile will open app if available
    const opened = window.open(url, '_blank');

    // fallback: if popup blocked, let user know full URL to open
    setTimeout(()=> {
      btn.disabled = false;
      btn.removeAttribute('aria-disabled');
      showStatus('If WhatsApp did not open, please click this link: ' + url, false);
      // optionally copy to clipboard for convenience
      // navigator.clipboard?.writeText(url).catch(()=>{/* ignore */});
    }, 1200);

    // Optionally clear form:
    // form.reset();
  });
})();
