import { CONFIG } from './config.js';
import { createToken, isRegistrationOpen, saveAttendee } from './utils.js';

const form = document.getElementById('registrationForm');
const formMessage = document.getElementById('formMessage');

export function showFormMessage(text, kind = 'info') {
  formMessage.className = `message${kind === 'warning' ? ' warning' : ''}`;
  formMessage.textContent = text;
  formMessage.classList.remove('hidden');
}

export function initRegistration(onRegistered) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const now = new Date();

    if (!isRegistrationOpen(now)) {
      showFormMessage(now < CONFIG.registrationOpen ? 'Registration has not opened yet. Please return later.' : 'Registration is now closed for this event.', 'warning');
      return;
    }

    const formData = new FormData(form);
    const attendee = Object.fromEntries(formData.entries());
    attendee.consent = formData.get('consent') === 'on';
    attendee.marketing = formData.get('marketing') === 'on';
    attendee.token = createToken();
    attendee.registeredAt = now.toISOString();
    saveAttendee(attendee);
    showFormMessage('Registration confirmed. Your token has been generated and your attendee portal is ready.');
    onRegistered();
  });
}
