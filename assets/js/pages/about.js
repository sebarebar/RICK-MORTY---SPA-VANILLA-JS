import { loadHTML } from '../utils/helpers.js';

/**
 * Render About
 */
export async function renderAbout() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/about.html');
}
