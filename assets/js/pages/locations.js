import { locationsCard} from '../components/locationsCard.js';
import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
/**
 * Renderiza Episodes
 */
export async function renderLocations() {
    const content = document.getElementById('content');
    content.innerHTML = await loadHTML(
        './assets/js/views/locations.html'
    );
    const container = document.getElementById(
            'location-container')

    const location = await getInfo("locations");
        container.innerHTML = location
            .map(location => locationsCard(location))
            .join('');
} 