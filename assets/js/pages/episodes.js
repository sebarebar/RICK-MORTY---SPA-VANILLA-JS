import { episodesCard } from '../components/episodesCard.js';
import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
/**
 * Render Episodes
 */
export async function renderEpisodes() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/episodes.html');
  const container = document.getElementById('episode-container');

  const episode = await getInfo('episode');
  container.innerHTML = episode
    .map((episode) => episodesCard(episode))
    .join('');
}
