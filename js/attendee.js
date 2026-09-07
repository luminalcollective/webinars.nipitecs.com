import { CONFIG } from './config.js';
import { canJoin } from './join.js';
import { getAttendee } from './utils.js';

const attendeeIntro = document.getElementById('attendeeIntro');
const attendeeStatus = document.getElementById('attendeeStatus');
const joinSection = document.getElementById('joinSection');
const joinButton = document.getElementById('joinButton');
const joinHint = document.getElementById('joinHint');

export function updateAttendeePanel() {
  const attendee = getAttendee();
  if (!attendee) {
    attendeeIntro.classList.remove('hidden');
    attendeeStatus.classList.add('hidden');
    joinSection.classList.add('hidden');
    return;
  }

  attendeeIntro.classList.add('hidden');
  attendeeStatus.classList.remove('hidden');
  attendeeStatus.innerHTML = `<div class="status-pill">Registration confirmed</div><p><strong>${attendee.name}</strong> • ${attendee.email}</p><p>Token: <code>${attendee.token}</code></p>`;
  joinSection.classList.remove('hidden');

  const now = new Date();
  if (now >= CONFIG.eventStart) {
    joinButton.disabled = false;
    joinButton.textContent = 'Join webinar';
    joinHint.textContent = 'The webinar is live. Use the join button to enter the session.';
    attendeeStatus.insertAdjacentHTML('beforeend', '<div class="status-pill">Session live</div>');
  } else if (canJoin(now)) {
    joinButton.disabled = false;
    joinButton.textContent = 'Join webinar';
    joinHint.textContent = 'You can join now because the webinar is within 30 minutes of start time.';
    attendeeStatus.insertAdjacentHTML('beforeend', '<div class="status-pill">Join window open</div>');
  } else {
    joinButton.disabled = true;
    joinButton.textContent = 'Join webinar';
    joinHint.textContent = 'The join button will unlock 30 minutes before the event begins.';
    attendeeStatus.insertAdjacentHTML('beforeend', '<div class="status-pill warn">Waiting for join window</div>');
  }
}

export function initAttendee() {
  updateAttendeePanel();
  setInterval(updateAttendeePanel, 10000);
}
