/**
 * Navbar Component
 */

export async function loadNavbar() {

    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar">
            <a href="/"data-link>Home</a>
            <a href="/episodes">Episodes</a>
            <a href="/locations"data-link> Locations</a>
            <a href="/contacts" data-link>Contactos</a>
            <a href="/about" data-link> Quiénes Somos</a>
        </nav>
    `;
}