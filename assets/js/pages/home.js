import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { getFromLocal, saveToLocal } from '../services/storage.js';

let currentCharacters = [];

/**
 * Renderiza Home
 */
export async function renderHome() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/home.html');
  const container = document.getElementById('characters-container');

  const localCharacters = getFromLocal('mis_personajes');
  if (localCharacters) {
    currentCharacters = localCharacters;
  } else {
    const characters = await getInfo('character');
    currentCharacters = characters;
    saveToLocal('mis_personajes', currentCharacters);
  }

  const favorites = getFromLocal('favoritos_rick') || [];

  container.innerHTML = currentCharacters
    .map((character) => {
      const isFavorite = favorites.some((fav) => fav.id == character.id);
      return characterCard(character, isFavorite);
    })
    .join('');

  // Inicializar todos los escuchadores de eventos al cargar la página
  addDeleteEvents(container);
  addEditEvents(container);
  addFavoriteEvents(container);
  addCreateButton(container);
}

function addDeleteEvents(container) {
  container.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleDelete(id, container);
    });
  });
}

function handleDelete(id, container) {
  if (confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
    currentCharacters = currentCharacters.filter(
      (character) => character.id != id,
    );

    saveToLocal('mis_personajes', currentCharacters);

    const favorites = getFromLocal('favoritos_rick') || [];
    const updatedFavorites = favorites.filter((fav) => fav.id != id);
    saveToLocal('favoritos_rick', updatedFavorites);

    const updatedFavs = getFromLocal('favoritos_rick') || [];
    // Re-renderizado inmediato
    container.innerHTML = currentCharacters
      .map((character) => {
        const isFavorite = updatedFavs.some((fav) => fav.id == character.id);
        return characterCard(character, isFavorite);
      })
      .join('');

    // Reactivar eventos tras limpiar el contenedor
    addDeleteEvents(container);
    addEditEvents(container);
    addFavoriteEvents(container);
    alert('✅ Personaje eliminado correctamente');
  }
}

function addCreateButton(container) {
  if (document.getElementById('btn-create')) return;

  const createBtnHTML = `
        <div style="text-align: center; margin: 20px 0;">
            <button id="btn-create" >
                ➕ Crear Personaje Ficticio
            </button>
        </div>
    `;

  container.insertAdjacentHTML('beforebegin', createBtnHTML);

  document.getElementById('btn-create').addEventListener('click', () => {
    createNewCharacter(container);
  });
}

function createNewCharacter(container) {
  const name = prompt('Nombre del personaje:');
  if (!name) return;

  const species = prompt('Especie del personaje:');
  const status = prompt('Estado (Alive / Dead / unknown):') || 'Alive';
  const image =
    prompt('URL de la imagen (puedes dejar vacío):') ||
    'https://via.placeholder.com/300x300?text=Personaje';

  const newCharacter = {
    id: 'local-' + Date.now(),
    name: name,
    species: species,
    status: status,
    image: image,
  };

  currentCharacters.unshift(newCharacter);
  saveToLocal('mis_personajes', currentCharacters);

  const favorites = getFromLocal('favoritos_rick') || [];
  container.innerHTML = currentCharacters
    .map((character) => {
      const isFavorite = favorites.some((fav) => fav.id == character.id);
      return characterCard(character, isFavorite);
    })
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);
  addFavoriteEvents(container);
  alert('✅ Personaje creado correctamente');
}

function addEditEvents(container) {
  container.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleEdit(id, container);
    });
  });
}

function handleEdit(id, container) {
  const character = currentCharacters.find((char) => char.id == id);
  if (!character) return;

  const newName = prompt('Nuevo nombre:', character.name);
  if (newName !== null) {
    if (!newName.trim()) {
      alert('⚠️ Error: El nombre no puede estar vacío.');
      return;
    }
    character.name = newName;
  }

  const newSpecies = prompt('Nueva especie:', character.species);
  if (newSpecies !== null) {
    if (!newSpecies.trim()) {
      alert('⚠️ Error: La especie no puede estar vacía.');
      return;
    }
    character.species = newSpecies;
  }

  const newStatus = prompt(
    'Nuevo estado (Alive / Dead / unknown):',
    character.status,
  );
  if (newStatus !== null) {
    character.status = newStatus;
  }

  saveToLocal('mis_personajes', currentCharacters);

  const favorites = getFromLocal('favoritos_rick') || [];
  const favIndex = favorites.findIndex((fav) => fav.id == id);
  if (favIndex !== -1) {
    favorites[favIndex] = { ...character };
    saveToLocal('favoritos_rick', favorites);
  }

  const updatedFavs = getFromLocal('favoritos_rick') || [];
  container.innerHTML = currentCharacters
    .map((char) => {
      const isFavorite = updatedFavs.some((fav) => fav.id == char.id);
      return characterCard(char, isFavorite);
    })
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);
  addFavoriteEvents(container);

  alert('✅ Personaje editado correctamente');
}

function addFavoriteEvents(container) {
  container.querySelectorAll('.btn-fav').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleToggleFavorite(id, container);
    });
  });
}

function handleToggleFavorite(id, container) {
  let favorites = getFromLocal('favoritos_rick') || [];
  const isAlreadyFav = favorites.some((fav) => fav.id == id);

  if (isAlreadyFav) {
    favorites = favorites.filter((fav) => fav.id != id);
  } else {
    const character = currentCharacters.find((char) => char.id == id);
    if (character) {
      favorites.push(character);
    }
  }

  saveToLocal('favoritos_rick', favorites);

  container.innerHTML = currentCharacters
    .map((character) => {
      const isFavorite = favorites.some((fav) => fav.id == character.id);
      return characterCard(character, isFavorite);
    })
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);
  addFavoriteEvents(container);
}
