/**
 * Character Card Component
 */

export function episodesCard(episodes) {

    return `
        <article class="card">

            <div class="card-body">
                <h3>${episodes.name}</h3>
                <p>
                    <strong>Air data:</strong>
                    ${episodes.air-data}
                </p>
                <p>
                    <strong>Number episode:</strong>
                    ${episodes.episode}
                </p>
            </div>
        </article>
    `;
}
