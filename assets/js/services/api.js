/**
 * Servicio API Rick and Morty
 */

import httpClient from './httpClient.js';

/**
 * Obtiene personajes.
 *
 * @returns {Promise<Array>}
 */
export async function getInfo(info) {
    let response 
    try {
        debugger;
        switch (info){
            case  "character": 
                response = await httpClient.get('/character');
                break;
            case  "episodes": 
                response = await httpClient.get('/episode');
                break;

            case  "location": 
                response = await httpClient.get('/location');
                break;
            default:
                throw Error('Error to  loading info API.')
        }

        return response.data.results;


    } catch (error) {
        console.error(error);
        return [];
    }
}