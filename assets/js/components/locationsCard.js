export function locationsCard(location) {

    return `
        <article class="card">

            <div class="card-body">
                <h3>${location.name}</h3>
                <p>
                    <strong>Type:</strong>
                    ${location.type}
                </p>
                <p>
                    <strong>Dimension:</strong>
                    ${location.dimension}
                </p>
            </div>
        </article>
    `;
}