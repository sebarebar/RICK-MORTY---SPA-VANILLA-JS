/**
 * Router SPA
 */

import { renderHome } from './pages/home.js';
import { renderContacts } from './pages/contacts.js';
import { renderAbout } from './pages/about.js';
import { renderEpisodes } from './pages/episodes.js';
import { renderLocations } from './pages/locations.js';
import { renderFeebacks } from './pages/feedback.js';

/**
 * Rutas disponibles
 */
const routes = {
  '/': renderHome,
  '/contacts': renderContacts,
  '/about': renderAbout,
  '/episodes': renderEpisodes,
  '/locations': renderLocations,
  '/feedback': renderFeebacks,
};

/**
 * Router principal
 */
export async function router() {
  // Obtiene ruta real
  const path = window.location.pathname;
  // Busca render
  const render = routes[path];
  if (render) {
    await render();
  } else {
    document.getElementById('content').innerHTML = `
            <section>
                <h2>404 - Página no encontrada</h2>
            </section>
        `;
  }
}
