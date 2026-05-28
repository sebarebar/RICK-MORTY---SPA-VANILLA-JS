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

  // añadi este para el evento de eliminar (eliminen este comentario)
  addDeleteEvents(container);
  // boton de crear un personaje
  addCreateButton(container);
}

// eliminar //

// Función para agregar eventos de eliminar
function addDeleteEvents(container) {
  container.querySelectorAll('.btn-delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleDelete(id, container);
    });
  });
}

// Función principal de eliminar
function handleDelete(id, container) {
  if (confirm('¿Estás seguro de que deseas eliminar este personaje?')) {
    currentCharacters = currentCharacters.filter(
      (character) => character.id != id,
    );

    container.innerHTML = currentCharacters
      .map((character) => characterCard(character))
      .join('');

    addDeleteEvents(container); // Reactivar botones
    alert('✅ Personaje eliminado correctamente');
  }
}

// crear personaje //

// Función para agregar el botón de crear
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

// Función para crear personaje
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

  currentCharacters.unshift(newCharacter); // Agregar al principio

  container.innerHTML = currentCharacters
    .map((character) => characterCard(character))
    .join('');

  addDeleteEvents(container);
  alert('✅ Personaje creado correctamente');
}

// Función para agregar eventos de editar
function addEditEvents(container) {
  container.querySelectorAll('.btn-edit').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      handleEdit(id, container);
    });
  });
}

// Función principal de editar
function handleEdit(id, container) {
  const character = currentCharacters.find((char) => char.id == id);
  if (!character) return;

  const newName = prompt('Nuevo nombre:', character.name);
  if (newName !== null) character.name = newName;

  const newSpecies = prompt('Nueva especie:', character.species);
  if (newSpecies !== null) character.species = newSpecies;

  const newStatus = prompt('Nuevo estado:', character.status);
  if (newStatus !== null) character.status = newStatus;

  // Re-renderizar todo
  container.innerHTML = currentCharacters
    .map((character) => characterCard(character))
    .join('');

  addDeleteEvents(container);
  addEditEvents(container);

  alert('✅ Personaje editado correctamente');
}
