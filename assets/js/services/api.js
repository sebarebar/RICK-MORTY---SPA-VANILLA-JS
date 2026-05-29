/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';
import { saveToLocal } from './storage.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getInfo(info) {
  let response;
  try {
    switch (info) {
      case 'character':
        response = await httpClient.get('/character');
        break;
      case 'episode':
        response = await httpClient.get('/episode');
        break;

      case 'locations':
        response = await httpClient.get('/location');
        break;
      default:
        throw Error('Error to  loading info API.');
    }

    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
}
