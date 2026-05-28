// --- LOCAL STORAGE ---

export function saveToLocal(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error guardando en LocalStorage:', error);
  }
}

export function getFromLocal(key) {
  try {
    const serializedValue = localStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error obteniendo de LocalStorage:', error);
    return null;
  }
}

// --- SESSION STORAGE ---

export function saveToSession(key, value) {
  try {
    const serializedValue = JSON.stringify(value);
    sessionStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error('Error guardando en SessionStorage:', error);
  }
}

export function getFromSession(key) {
  try {
    const serializedValue = sessionStorage.getItem(key);
    return serializedValue ? JSON.parse(serializedValue) : null;
  } catch (error) {
    console.error('Error obteniendo de SessionStorage:', error);
    return null;
  }
}

export function removeFromStorage(key, isSession = false) {
  if (isSession) {
    sessionStorage.removeItem(key);
  } else {
    localStorage.removeItem(key);
  }
}

export function clearAllStorage() {
  localStorage.clear();
  sessionStorage.clear();
}
