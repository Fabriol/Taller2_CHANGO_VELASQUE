import '../css/style.css';
import 'flowbite';
import { initScrollReveal } from './animaciones.js';

const contenedor = document.getElementById("product-container");
const contadorNavbar = document.getElementById("carrito-count");

let productosGlobales = []; 
let carrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];

const actualizarContador = () => {
    if (contadorNavbar) {
        contadorNavbar.innerText = carrito.length;
        contadorNavbar.classList.add('scale-125');
        setTimeout(() => contadorNavbar.classList.remove('scale-125'), 200);
    }
};

const renderProducts = (lista) => {
    if (!contenedor) return;
    contenedor.innerHTML = "";

    lista.forEach((producto, index) => {
        contenedor.innerHTML += `
            <article class="bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-custom group shadow-2xl reveal flex flex-col h-full" style="transition-delay: ${index * 50}ms">
                <div class="h-64 overflow-hidden relative">
                    <img src="${producto.imagen}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                        <span class="text-orange-500 text-[10px] font-black uppercase tracking-widest">${producto.categoria}</span>
                    </div>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-black text-white uppercase italic leading-tight">${producto.nombre}</h3>
                        <span class="text-orange-500 font-black italic text-xl">$${producto.precio}</span>
                    </div>
                    <p class="text-gray-500 text-xs mt-3 font-light leading-relaxed mb-6 flex-grow">${producto.desc}</p>
                    
                    <button 
                        class="btn-agregar w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-500 transition-custom uppercase text-xs italic shadow-lg hover:shadow-orange-500/20 active:scale-95 cursor-pointer"
                        data-id="${producto.id}"
                        data-nombre="${producto.nombre}"
                        data-precio="${producto.precio}"
                        data-imagen="${producto.imagen}">
                        Añadir al Carrito <i class="bi bi-cart-plus-fill ml-2 pointer-events-none"></i>
                    </button>
                </div>
            </article>
        `;
    });
    initScrollReveal();
};

const cargarTienda = async () => {
    try {
        const respuesta = await fetch("/data/productos.json");
        if (!respuesta.ok) throw new Error("Error al cargar productos");
        
        const datos = await respuesta.json();
        productosGlobales = datos; 
        renderProducts(productosGlobales);
        
    } catch (error) {
        console.error(error);
        contenedor.innerHTML = `<p class="text-center text-red-500 col-span-full">Error de conexión. Intenta recargar.</p>`;
    }
};

window.filterProducts = (categoria) => {
    const botones = document.querySelectorAll('button[onclick^="filterProducts"]');
    botones.forEach(btn => {
        if (btn.textContent.toLowerCase().includes(categoria.toLowerCase()) || (categoria === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('bg-orange-500', 'text-black', 'border-orange-500');
            btn.classList.remove('text-gray-400', 'border-gray-700');
        } else {
            btn.classList.remove('bg-orange-500', 'text-black', 'border-orange-500');
            btn.classList.add('text-gray-400', 'border-gray-700');
        }
    });

    if (categoria === 'all') {
        renderProducts(productosGlobales);
    } else {
        const filtrados = productosGlobales.filter(p => p.categoria === categoria);
        renderProducts(filtrados);
    }
};

if (contenedor) {
    contenedor.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-agregar");
        
        if (boton) {
            const productoNuevo = {
                id: boton.dataset.id,
                nombre: boton.dataset.nombre,
                precio: boton.dataset.precio,
                imagen: boton.dataset.imagen
            };

            carrito.push(productoNuevo);
            localStorage.setItem("carrito-productos", JSON.stringify(carrito));
            actualizarContador();

            const textoOriginal = boton.innerHTML;
            boton.innerHTML = "¡LISTO!";
            boton.classList.add("bg-green-500", "text-white");
            
            setTimeout(() => {
                boton.innerHTML = textoOriginal;
                boton.classList.remove("bg-green-500", "text-white");
            }, 1000);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    cargarTienda();
    actualizarContador();
});