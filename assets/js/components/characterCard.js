/**
 * Character Card Component
 */
export function characterCard(character,) {
    const isNew = character.id.toString().startsWith('local-');
    const custom = isNew ? "fictitious" : "Real";
  return `
        <article class="card">
            <img
                src="${character.image}"
                alt="${character.name}"
            >

            <div class="card-body">
                <h3>${character.name}</h3>
                <p>
                    <strong>Status:</strong>
                    ${character.status}
                </p>
                <p>
                    <strong>Species:</strong>
                    ${character.species}
                </p>
                <p>
                    <strong>Type:</strong>
                    ${custom}
                </p>
            </div>

            <div class="card-actions">
                <button class="btn-edit" data-id="${character.id}">
                    ✏️ Editar
                </button>
                <button class="btn-delete" data-id="${character.id}">
                    🗑 Eliminar
                </button>
            </div>
        </article>
    `;
}
