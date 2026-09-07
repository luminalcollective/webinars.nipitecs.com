import { CONFIG } from './config.js';
import { getAttendee } from './utils.js';

const joinButton = document.getElementById('joinButton');

export function canJoin(now = new Date()) {
  return now >= new Date(CONFIG.eventStart.getTime() - CONFIG.joinWindowMinutes * 60000);
}

export function joinWebinar() {
  const attendee = getAttendee();
  if (!attendee) return false;
  const joinUrl = `${CONFIG.zoomJoinUrl}&token=${encodeURIComponent(attendee.token)}`;
  window.open(joinUrl, '_blank', 'noopener,noreferrer');
  return true;
}

export function initJoinButton(onMissingRegistration) {
  joinButton.addEventListener('click', () => {
    if (!joinWebinar()) onMissingRegistration();
  });
}
