import './animaciones.js'; 

function initContactForm() {
    const contactForm = document.querySelector('form');
    if (contactForm) {
        const btn = contactForm.querySelector('button');
        
        if(btn) {
            btn.addEventListener('click', () => {
                const originalText = btn.innerHTML;
                
                
                btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enviado';
                btn.classList.remove('bg-orange-500', 'text-black');
                btn.classList.add('bg-green-500', 'text-white');
                
                setTimeout(() => {
                    contactForm.reset();
                    btn.innerHTML = originalText;
                    btn.classList.add('bg-orange-500', 'text-black');
                    btn.classList.remove('bg-green-500', 'text-white');
                }, 2000);
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
});