/**
 * Character Card Component
 */

export function characterCard(character) {
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
            </div>

            <div class="card-actions">
                <button class="btn-delete" data-id="${character.id}">
                    🗑 Eliminar
                </button>
            </div>
        </article>
    `;
}
