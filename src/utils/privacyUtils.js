/**
 * Helper utilities for Worker Privacy & Safety Shield.
 * Hides full real name and photo prior to booking confirmation.
 * Reveals real identity, photo, and contact details post-booking.
 */

// Custom SVG Avatars for trade categories (Data URIs for offline reliability & fast rendering)
const TRADE_AVATARS = {
  Plumber: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%230284C7"/><path d="M50 20C38.954 20 30 28.954 30 40C30 55 50 78 50 78C50 78 70 55 70 40C70 28.954 61.046 20 50 20Z" fill="%23E0F2FE"/><circle cx="50" cy="40" r="10" fill="%230284C7"/><path d="M35 84C35 78 40 73 50 73C60 73 65 78 65 84" stroke="%23E0F2FE" stroke-width="6" stroke-linecap="round"/></svg>`,
  Electrician: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%23D97706"/><path d="M54 22L30 52H48L44 78L68 48H50L54 22Z" fill="%23FEF3C7" stroke="%23FEF3C7" stroke-width="2" stroke-linejoin="round"/></svg>`,
  Carpenter: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%23B45309"/><path d="M30 30H70V42H30V30Z" fill="%23FEF3C7"/><path d="M45 42H55V75H45V42Z" fill="%23FEF3C7"/><path d="M30 65L70 65" stroke="%23FEF3C7" stroke-width="6" stroke-linecap="round"/></svg>`,
  Painter: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%23059669"/><rect x="30" y="25" width="40" height="25" rx="4" fill="%23D1FAE5"/><rect x="44" y="50" width="12" height="30" rx="3" fill="%23D1FAE5"/><path d="M30 38H70" stroke="%23059669" stroke-width="4"/></svg>`,
  Mason: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%234F46E5"/><rect x="25" y="30" width="22" height="14" rx="2" fill="%23EEF2FF"/><rect x="53" y="30" width="22" height="14" rx="2" fill="%23EEF2FF"/><rect x="38" y="48" width="24" height="14" rx="2" fill="%23EEF2FF"/><rect x="25" y="66" width="22" height="14" rx="2" fill="%23EEF2FF"/></svg>`,
  Default: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none"><rect width="100" height="100" rx="50" fill="%23475569"/><circle cx="50" cy="38" r="18" fill="%23F1F5F9"/><path d="M22 82C22 66.536 34.536 54 50 54C65.464 54 78 66.536 78 82" fill="%23F1F5F9"/></svg>`
};

/**
 * Returns anonymized name before booking, or real full name after booking.
 */
export function getDisplayWorkerName(worker, isBooked = false) {
  if (!worker) return '';
  if (isBooked) {
    return worker.name || 'Assigned Tradesperson';
  }
  return '';
}

/**
 * Returns vector trade avatar before booking, or real photo after booking.
 */
export function getDisplayWorkerPhoto(worker, isBooked = false) {
  if (!worker) return TRADE_AVATARS.Default;
  if (isBooked && worker.photo) {
    return worker.photo;
  }
  
  // Choose avatar based on trade skill
  const skill = worker.skill || '';
  if (skill.toLowerCase().includes('plumb')) return TRADE_AVATARS.Plumber;
  if (skill.toLowerCase().includes('elec')) return TRADE_AVATARS.Electrician;
  if (skill.toLowerCase().includes('carp')) return TRADE_AVATARS.Carpenter;
  if (skill.toLowerCase().includes('paint')) return TRADE_AVATARS.Painter;
  if (skill.toLowerCase().includes('mason')) return TRADE_AVATARS.Mason;

  const seed = worker.id || 'worker';
  return `https://api.dicebear.com/7.x/bottts/svg?seed=${seed}&backgroundColor=0284c7,059669,d97706,4f46e5`;
}

/**
 * Returns worker phone number if booked, or privacy notice if not.
 */
export function getDisplayWorkerPhone(worker, isBooked = false) {
  if (!worker) return 'Available post-booking';
  if (isBooked) {
    return worker.phone || '+91 98230 41102';
  }
  return '🔒 Provided upon booking confirmation';
}
