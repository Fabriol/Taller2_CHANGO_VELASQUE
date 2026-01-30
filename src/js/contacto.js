import '../css/style.css';
import 'flowbite';
import './animaciones.js'; 

const formulario = document.getElementById("contactForm");
const inputs = {
    nombre: document.getElementById("nombre"),
    email: document.getElementById("email"),
    telefono: document.getElementById("telefono"),
    ciudad: document.getElementById("ciudad"),
    mensaje: document.getElementById("mensaje")
};


const patrones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{3,16}$/, 
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    telefono: /^\+?\d{7,10}$/, 
    ciudad: /^[a-zA-ZÀ-ÿ\s]{3,20}$/
};


const mostrarError = (input, idError, mensaje) => {
    const etiquetaError = document.getElementById(idError);
    if (etiquetaError) {
        etiquetaError.classList.remove("hidden");
        etiquetaError.innerText = mensaje;
    }
    input.classList.add("border-red-500", "text-red-500");
    input.classList.remove("border-gray-800");
};

const eliminarError = (input, idError) => {
    const etiquetaError = document.getElementById(idError);
    if (etiquetaError) etiquetaError.classList.add("hidden");

    input.classList.remove("border-red-500", "text-red-500");
    input.classList.add("border-gray-800");
};


if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();
        let valido = true;

        //  Validar Nombre
        if (!patrones.nombre.test(inputs.nombre.value)) {
            mostrarError(inputs.nombre, "error-nombre", "Ingresa un nombre válido (min 3 letras)");
            valido = false;
        } else { eliminarError(inputs.nombre, "error-nombre"); }

        // Validar Email
        if (!patrones.email.test(inputs.email.value)) {
            mostrarError(inputs.email, "error-email", "Correo electrónico inválido");
            valido = false;
        } else { eliminarError(inputs.email, "error-email"); }

        // Validar Teléfono
        if (!patrones.telefono.test(inputs.telefono.value)) {
            mostrarError(inputs.telefono, "error-telefono", "Número inválido");
            valido = false;
        } else { eliminarError(inputs.telefono, "error-telefono"); }

        // Validar Ciudad
        if (!patrones.ciudad.test(inputs.ciudad.value)) {
            mostrarError(inputs.ciudad, "error-ciudad", "Campo requerido");
            valido = false;
        } else { eliminarError(inputs.ciudad, "error-ciudad"); }

        // Validar Mensaje 
        if (inputs.mensaje.value.trim().length < 10) {
            mostrarError(inputs.mensaje, "error-mensaje", "El mensaje es muy corto");
            valido = false;
        } else { eliminarError(inputs.mensaje, "error-mensaje"); }

        // Si todo está bien
        if (valido) {
            const btn = formulario.querySelector('button[type="submit"]');
            const textoOriginal = btn.innerHTML;

            btn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡ENVIADO!';
            btn.classList.remove('bg-orange-500');
            btn.classList.add('bg-green-500', 'text-white');

            setTimeout(() => {
                alert("Gracias por contactar a Peak Performance.");
                formulario.reset();
                btn.innerHTML = textoOriginal;
                btn.classList.add('bg-orange-500');
                btn.classList.remove('bg-green-500');
            }, 1500);
        }
    });
}