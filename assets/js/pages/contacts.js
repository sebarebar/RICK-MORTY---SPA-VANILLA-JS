import { loadHTML } from '../utils/helpers.js';

/**
 * Render contacts
 */
export async function renderContacts() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/contacts.html');
  initializeFormEvents();
}

function initializeFormEvents() {
  const form = document.getElementById('contact-form');
  form.addEventListener('submit', handleSubmit);
}

function handleSubmit(event) {
  event.preventDefault();
  alert('Formulario enviado correctamente');
}
