import { loadHTML } from '../utils/helpers.js';

/**
 * Render Feedback
 */
export async function renderFeebacks() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/feedback.html');
  initializeFormEvents();
}

function initializeFormEvents() {
  const form = document.getElementById('feedback-form');

  if (form) {
    form.addEventListener('submit', handleSubmit);
  }
}

function handleSubmit(event) {
  event.preventDefault();

  const nameInput = document.getElementById('name');
  const msgInput = document.getElementById('message');
  const container = document.getElementById('feedback-container');

  if (!container) return; // Esto es para que verifique que el container exista.

  const card = document.createElement('div');
  card.classList.add('feedback-card');

  card.innerHTML = `<h4>${nameInput.value}</h4>
    <p>"${msgInput.value}"</p>
    <span class="feedback-date">Justo ahora</span>`;

  container.prepend(card); // El prepend es para insentar la tarjeta al inicio del la cuadricula del grid, es decir añade el comentario del usuario como el más reciente.

  alert('Feedback recibido correctamente');
  event.target.reset();
}
