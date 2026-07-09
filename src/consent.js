const STORAGE_KEY = 'psk-agenda:consent:v1';
const CALENDAR_SRC =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1SuBEwK-SNAWoxYo4q5AVGWlLJgvMKXvS6TVXD0SOu0fPHMpYcjkkvhRmEXr0TJ2fEUUEY4oY4?gv=true&hl=es';

function getConsent() {
  const value = localStorage.getItem(STORAGE_KEY);
  if (value === 'accepted' || value === 'rejected') return value;
  return 'pending';
}

function setConsent(value) {
  localStorage.setItem(STORAGE_KEY, value);
}

function updateConsentLabel(state) {
  const label = document.getElementById('consent-status');
  if (!label) return;

  const labels = {
    accepted: 'aceptado',
    rejected: 'solo necesarias',
    pending: 'pendiente',
  };

  label.textContent = labels[state] ?? 'pendiente';
}

function renderCalendar(state) {
  const slot = document.getElementById('calendar-slot');
  if (!slot) return;

  if (state === 'accepted') {
    slot.innerHTML = `
      <iframe
        src="${CALENDAR_SRC}"
        style="border: 0"
        width="100%"
        height="600"
        frameborder="0"
        title="Reservar cita con Karolina Cieliczka"
        loading="lazy"
      ></iframe>
    `;
    return;
  }

  if (state === 'rejected') {
    slot.innerHTML = `
      <div class="calendar-placeholder">
        <p>Has elegido usar solo cookies necesarias.</p>
        <p>El calendario de reservas utiliza servicios de Google que pueden instalar cookies de terceros.</p>
        <p>
          Puedes
          <button type="button" class="text-link" data-action="accept-cookies">aceptar el calendario</button>
          o visitar
          <a href="https://psiquekarolina.com" rel="noopener">psiquekarolina.com</a>
          para contactar por otros medios.
        </p>
      </div>
    `;
    slot.querySelector('[data-action="accept-cookies"]')?.addEventListener('click', acceptCookies);
    return;
  }

  slot.innerHTML = `
    <div class="calendar-placeholder">
      <p>Para mostrar el calendario de reservas necesitamos tu consentimiento.</p>
      <p>Google Calendar puede usar cookies de terceros al reservar una cita.</p>
      <button type="button" class="calendar-placeholder__btn" data-action="accept-cookies">
        Aceptar y cargar calendario
      </button>
    </div>
  `;
  slot.querySelector('[data-action="accept-cookies"]')?.addEventListener('click', acceptCookies);
}

function hideBanner() {
  document.getElementById('cookie-banner')?.setAttribute('hidden', '');
}

function showBanner() {
  document.getElementById('cookie-banner')?.removeAttribute('hidden');
}

function acceptCookies() {
  setConsent('accepted');
  hideBanner();
  updateConsentLabel('accepted');
  renderCalendar('accepted');
}

function rejectCookies() {
  setConsent('rejected');
  hideBanner();
  updateConsentLabel('rejected');
  renderCalendar('rejected');
}

function initConsent() {
  const state = getConsent();
  updateConsentLabel(state);
  renderCalendar(state);

  if (state === 'pending') {
    showBanner();
  }

  document.getElementById('cookie-accept')?.addEventListener('click', acceptCookies);
  document.getElementById('cookie-reject')?.addEventListener('click', rejectCookies);
}

export { initConsent, getConsent };
