import '../css/style.css';

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


window.abrirCarrito = function() {

};


document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    
    const heroElements = document.querySelectorAll('h1, h2, h3, section p, .grid > div, article, form, .space-y-12');
    heroElements.forEach(el => el.classList.add('reveal'));
    
    initScrollReveal();
});