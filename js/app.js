import { initAttendee, updateAttendeePanel } from './attendee.js';
import { initCountdown } from './countdown.js';
import { initJoinButton } from './join.js';
import { initRegistration, showFormMessage } from './registration.js';

initCountdown();
initAttendee();
initRegistration(updateAttendeePanel);
initJoinButton(() => showFormMessage('You must register before joining the webinar.', 'warning'));
