import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { create } from 'axios';

let currentCharacters = [];

/**
 * Renderiza Home
 */
export async function renderHome() {
  const content = document.getElementById('content');
  content.innerHTML = await loadHTML('./assets/js/views/home.html');
  const container = document.getElementById('characters-container');
  const characters = await getInfo('character');
  currentCharacters = characters;
  
  container.innerHTML = characters
    .map((character) => characterCard(character))
    .join('');

  // Inicializar todos los escuchadores de eventos al cargar la página
  addDeleteEvents(container);
  addEditEvents(container); 
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

    // Re-renderizado inmediato
    container.innerHTML = currentCharacters
      .map((character) => characterCard(character))
      .join('');

    // Reactivar eventos tras limpiar el contenedor
    addDeleteEvents(container); 
    addEditEvents(container); 
    alert('✅ Personaje eliminado correctamente');
  }
}

function addCreateButton(container) {
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

  container.innerHTML = currentCharacters
    .map((character) => characterCard(character))
    .join('');

  addDeleteEvents(container);
  addEditEvents(container); 
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
      alert("⚠️ Error: El nombre no puede estar vacío.");
      return;
    }
    character.name = newName; 
  }

  const newSpecies = prompt('Nueva especie:', character.species);
  if (newSpecies !== null) {
    if (!newSpecies.trim()) {
      alert("⚠️ Error: La especie no puede estar vacía.");
      return;
    }
    character.species = newSpecies;
  }

  const newStatus = prompt('Nuevo estado (Alive / Dead / unknown):', character.status);
  if (newStatus !== null) {
    character.status = newStatus;
  }

  container.innerHTML = currentCharacters
    .map((character) => characterCard(character))
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);

  alert('✅ Personaje editado correctamente');
}