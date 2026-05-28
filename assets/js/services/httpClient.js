/**
 *
 * Axios HTTP Client
 * Configuración centralizada Axios.
 */
import axios from 'axios';

/**
 * URL API desde variables de entorno
 * import.meta.env es soportado por Vite
 */
const API_URL = import.meta.env.VITE_API_URL;
const CONTENT_TYPE = import.meta.env.VITE_CONTENT_TYPE;
const TIME_OUT = import.meta.env.VITE_TIME_OUT;
/**
 * Instancia global Axios
 */
const httpClient = axios.create({
  baseURL: API_URL,
  timeout: TIME_OUT,
  headers: {
    'Content-Type': CONTENT_TYPE,
  },
});

/**
 * Interceptor Request
 */
httpClient.interceptors.request.use(
  (config) => {
    console.log(`[REQUEST]: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * Interceptor Response
 */
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('[API ERROR]:', error.response?.data || error.message);
    return Promise.reject(error);
  },
);

export default httpClient;
