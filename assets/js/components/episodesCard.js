/**
 * Character Card Component
 */

export function episodesCard(episode) {

    return `
        <article class="card">

            <div class="card-body">
                <h3>${episode.name}</h3>
                <p>
                    <strong>Air data:</strong>
                    ${episode.air_date}
                </p>
                <p>
                    <strong>Number episode:</strong>
                    ${episode.episode}
                </p>
            </div>
        </article>
    `;
}
