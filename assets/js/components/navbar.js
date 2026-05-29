/**
 * Navbar Component
 */

export async function loadNavbar() {
    const navbar = document.getElementById('navbar');

    navbar.innerHTML = `
        <nav class="navbar">
            <a href="/"data-link>Home</a>
            <a href="/episodes" data-link >Episodes</a>
            <a href="/locations"data-link> Locations</a>
            <a href="/contacts" data-link>Contacts</a>
            <a href="/about" data-link> Who we are</a>
            <a href="/feedback" data-link>FeedBack</a>
        </nav>
    `;
    setActiveLink();
}

export function setActiveLink() {
    const currentPath = window.location.pathname;
    const links = document.querySelectorAll('.navbar a');

    links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });
}