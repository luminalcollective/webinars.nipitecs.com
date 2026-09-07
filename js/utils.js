import { CONFIG } from './config.js';

export function getAttendee() {
  try { return JSON.parse(localStorage.getItem(CONFIG.storageKey)); } catch { return null; }
}

export function saveAttendee(data) {
  localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
}

export function createToken() {
  const random = Math.random().toString(36).slice(2, 10);
  return `nipitecs-${Date.now()}-${random}`;
}

export function isRegistrationOpen(now = new Date()) {
  return now >= CONFIG.registrationOpen && now <= CONFIG.registrationClose;
}

export function formatRegistrationOpenDate() {
  return CONFIG.registrationOpen.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short', year: 'numeric' });
}
