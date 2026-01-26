import '../css/style.css';

// --- 1. FUNCIÓN SCROLL REVEAL (Exportada para usarla en productos) ---
export function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => observer.observe(element));
}

// --- 2. EFECTO NAVBAR ---
function initNavbar() {
    const nav = document.getElementById('navbar');
    if (nav) {
        window.onscroll = () => {
            if (window.scrollY > 50) {
                nav.classList.add('nav-active');
            } else {
                nav.classList.remove('nav-active');
            }
        };
    }
}

// --- 3. PLACEHOLDER CARRITO (Para que no de error el botón) ---
window.abrirCarrito = function() {
    // Intencionalmente vacío
};

// --- 4. INICIALIZACIÓN AUTOMÁTICA ---
// Esto se ejecuta en cuanto importas este archivo
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    
    // Agregamos la clase 'reveal' a elementos comunes para que se animen
    const heroElements = document.querySelectorAll('h1, h2, h3, section p, .grid > div, article, form, .space-y-12');
    heroElements.forEach(el => el.classList.add('reveal'));
    
    initScrollReveal();
});