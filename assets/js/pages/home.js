/** 
 * Import functions
 */
import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { getFromLocal, saveToLocal } from '../services/storage.js';

// Global array to store characters in memory
let currentCharacters = [];

// ── Render Home ──
export async function renderHome() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/home.html');
  const container = document.getElementById('characters-container');

  // Load from localStorage or fetch from API
  const localCharacters = getFromLocal('mis_personajes');
  if (localCharacters) {
    currentCharacters = localCharacters;
  } else {
    const characters = await getInfo('character');
    currentCharacters = characters;
    saveToLocal('mis_personajes', currentCharacters);
  }

  // Render character cards
  container.innerHTML = currentCharacters
    .map((character) => {
      return characterCard(character);
    })
    .join('');

  // Initialize event listeners
  addDeleteEvents(container);
  addEditEvents(container);
  addCreateButton(container);
}

// ── Delete Events ──
function addDeleteEvents(container) {
  container.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleDelete(id, container);
    });
  });
}

// ── Handle Delete ──
function handleDelete(id, container) {
  if (confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
    // Remove from memory and localStorage
    currentCharacters = currentCharacters.filter(
      (character) => character.id != id,
    );
    saveToLocal('mis_personajes', currentCharacters);

    // Re-render and reattach events
    container.innerHTML = currentCharacters
      .map((character) => {
        return characterCard(character);
      })
      .join('');
    addDeleteEvents(container);
    addEditEvents(container);
    alert('✅ Personaje eliminado correctamente');
  }
}

// ── Create Button ──
function addCreateButton(container) {
  // Prevent duplicate buttons
  if (document.getElementById('btn-create')) return;

  const createBtnHTML = `
    <div style="text-align: center; margin: 20px 0;">
      <button id="btn-create">➕ Crear Personaje Ficticio</button>
    </div>
  `;

  container.insertAdjacentHTML('beforebegin', createBtnHTML);

  document.getElementById('btn-create').addEventListener('click', () => {
    createNewCharacter(container);
  });
}

// ── Create New Character ──
function createNewCharacter(container) {
  const name = prompt('Nombre del personaje:');
  if (!name) return;


  const species = prompt('Especie del personaje:');
  const status = prompt('Estado (Alive / Dead / unknown):') || 'Alive';
  const image =
    prompt('URL de la imagen (puedes dejar vacío):') ||
    'https://via.placeholder.com/300x300?text=Personaje';

  // Build new character with unique local id
  let custom = "flase"
  const newCharacter = {
    id: 'local-' + Date.now(),
    name: name,
    species: species,
    status: status,
    image: image,
  };

  // Add to beginning of array and save
  currentCharacters.unshift(newCharacter);
  saveToLocal('mis_personajes', currentCharacters);

  // Re-render and reattach events
  container.innerHTML = currentCharacters
    .map((character) => {
      return characterCard(character);
    })
    .join('');
  addDeleteEvents(container);
  addEditEvents(container);
  alert('✅ Personaje creado correctamente');
}

// ── Edit Events ──
function addEditEvents(container) {
  container.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleEdit(id, container);
    });
  });
}

// ── Handle Edit ──
function handleEdit(id, container) {
  // Find character by id
  const character = currentCharacters.find((char) => char.id == id);
  if (!character) return;

  // Prompt for new values (null = user cancelled)
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

  // Save and re-render
  saveToLocal('mis_personajes', currentCharacters);

  container.innerHTML = currentCharacters
    .map((char) => {
      return characterCard(char);
    })
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);
  alert('✅ Personaje editado correctamente');
}