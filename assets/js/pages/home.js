import { loadHTML } from '../utils/helpers.js';
import { getInfo } from '../services/api.js';
import { characterCard } from '../components/characterCard.js';
import { create } from 'axios';

let currentCharacters = [];
currentCharacters.unshift(newCharacter);
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
  addCreaterButton();
}

// eliminar //

function addDeleteEvents(container) {
  container.querySelectorAll('.btn-delete').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = e.target.dataset.id;
      handleDelete(id, container);
    });
  });
}

function handleDelete(id, container) {
  if(confirm('¿Estás seguro de que deseas eliminar este personaje?')){
    currentCharacters = currentCharacters.filter(character => character.id != id);
    
    container.innerHTML = currentCharacters
      .map((character) => characterCard(character))
      .join('');

    addDeleteEvents(container);

    alert('Personaje eliminado correctamente');
  }
}

// crear personaje //

function addCreateButton() {
  const container = document.getElementById('characters-container');

  const createBtnHTML = `
    <div style="text-align: center: margin: 20px 0;">
      <button id="btn-create-character" class="btn-create">
        ➕ Crear Personaje Ficticio
      </button>
    </div>
  `;

  container.insertAdjacentHTML('beforegin', createBtnHTML);

  document.getElementById('btn-create-character').addEventListener('click', showCreateModal);
}

function showCreateModel() {
  const modalHTML = `
    <div id="create-modal" class="modal">
      <div class="modal-content">
        <h2>Crear Nuevo Personaje</h2>

        <form id="create-form">
          <label>Nombre:</label>
          <input type="text" id="name" required>

          <label>Especie:</label>
          <input type="text" id="especies" required>

          <label>Género:</label>
          <select id="gender" required>
            <option value="">Seleccionar></option>
            <option value="Male">Masculino</option>
            <option value="Female">Femenino</option>
            <option value="Unknown">Desconocido</option>
          </select>
          <label>Estado:</label>
          <select id="status" required>
            <option value="">Seleccionar</option>
            <option value="Alive">Vivo</option>
            <option value="Dead">Muerto</option>
            <option value="Unknown">Desconocido</option>
          </select>

          <label>URL de imagen:</label>
          <input type="url" id="image" placeholder="https://..." required>

          <div class="modal-buttons">
            <button type="button" id="cancel-btn">Cancelar</button>
            <button type="submit">Crear personaje</button>
          </div>
        </form>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend, modalHTML');
  
  const form = document.getElementById('create-form');
  const modal = document.getElementById('create modal');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    createNewCharacter();
  });
}

document.getElementById('cancel-btn').addEventListener('click',() =>{
  modal.remove();
});

function createNewCharacter(){
  const name = document.getElementById('name').value.trim();
  const species = document.getElementById('species').value.trim();
  const gender = document.getElementById('gener').value.trim();
  const status = document.getElementById('status').value.trim();
  const image = document.getElementById('image').value.trim();

  if (!name || !species || !image) {
    alert("Por favor completa todos los campos");
    return;
  }

  const newCharacter = {
    id: 'local-' + date-now(),
    name: name,
    species: species,
    gender: gender,
    status: status,
    image: image,
    isLocal: true
  };

  const container = document.getElementById('characters-container');
  container.innerHTML = currentCharacters
    .map((character) => characterCard(character))
    .join('');
  
  addDeleteEvents(container);

  document.getElementById('create-modal').remove();

  alert('✅ personaje ficticio creado correctamente');
}