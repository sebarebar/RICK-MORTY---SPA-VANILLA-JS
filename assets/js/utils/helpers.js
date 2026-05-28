/**
 * Helpers reutilizables
 */
export async function loadHTML(path) {
  try {
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Error cargando HTML: ${path}`);
    }
    return await response.text();
  } catch (error) {
    throw error; // Este Throw error automatíza los errores como tal de los servicios.
  }
}
