import { CONFIG } from './config.js';
import { formatRegistrationOpenDate } from './utils.js';

const countdownEl = document.getElementById('countdown');
const statusMessage = document.getElementById('statusMessage');

export function updateCountdown() {
  const now = new Date();
  const diff = CONFIG.eventStart - now;

  if (diff <= 0) {
    countdownEl.textContent = 'Live now';
    statusMessage.textContent = 'The webinar is live. Registered attendees can join the Zoom session.';
    statusMessage.className = 'message';
    return;
  }

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const minutes = Math.floor((diff / 60000) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  countdownEl.textContent = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(minutes).padStart(2, '0')}m ${String(seconds).padStart(2, '0')}s`;

  if (now < CONFIG.registrationOpen) {
    statusMessage.textContent = `Registration opens on ${formatRegistrationOpenDate()}.`;
    statusMessage.className = 'message warning';
  } else if (now > CONFIG.registrationClose) {
    statusMessage.textContent = 'Registration is now closed. Thank you for your interest.';
    statusMessage.className = 'message warning';
  } else {
    statusMessage.textContent = 'Registration is currently open. Complete the form to secure your place.';
    statusMessage.className = 'message';
  }
}

export function initCountdown() {
  updateCountdown();
  setInterval(updateCountdown, 1000);
}
