import '../css/style.css';
import 'flowbite';

let productosCarrito = JSON.parse(localStorage.getItem("carrito-productos")) || [];

const listaCarrito = document.getElementById("lista-carrito");
const totalPago = document.getElementById("total-compra");
const contadorNav = document.getElementById("carrito-count");
const btnPagar = document.getElementById("btn-pagar"); 

const actualizarContador = () => {
    if (contadorNav) {
        contadorNav.innerText = productosCarrito.length;
    }
};

const mostrarCarrito = () => {
    if (!listaCarrito) return;

    listaCarrito.innerHTML = "";
    let total = 0;

    if (productosCarrito.length === 0) {
        listaCarrito.innerHTML = `<div class="text-gray-500 text-center py-8 italic">Tu arsenal está vacío.</div>`;
    } else {
        productosCarrito.forEach((producto, index) => {
            total += parseFloat(producto.precio);
            
            listaCarrito.innerHTML += `
                <div class="flex justify-between items-center border-b border-gray-800 py-4 hover:bg-white/5 transition px-2 rounded-lg">
                    <div class="flex items-center gap-4">
                        <img src="${producto.imagen}" class="w-16 h-16 object-cover rounded-xl border border-gray-700">
                        <div>
                            <p class="font-bold text-white uppercase italic text-sm">${producto.nombre}</p>
                            <span class="text-orange-500 font-bold">$${producto.precio}</span>
                        </div>
                    </div>
                    <button data-index="${index}" class="btn-eliminar text-gray-500 hover:text-red-500 transition-transform hover:scale-110 p-2">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </div>
            `;
        });
    }

    if (totalPago) {
        totalPago.innerText = `$${total.toFixed(2)}`;
    }
};


if (listaCarrito) {
    listaCarrito.addEventListener("click", (e) => {
        const boton = e.target.closest(".btn-eliminar");
        if (boton) {
            const index = parseInt(boton.dataset.index);
            productosCarrito.splice(index, 1);
            localStorage.setItem("carrito-productos", JSON.stringify(productosCarrito));
            mostrarCarrito();
            actualizarContador();
        }
    });
}


const btnVaciar = document.getElementById("vaciar-carrito");
if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
        if(productosCarrito.length > 0 && confirm("¿Seguro que quieres vaciar todo tu arsenal?")){
            productosCarrito = [];
            localStorage.setItem("carrito-productos", JSON.stringify(productosCarrito));
            mostrarCarrito();
            actualizarContador();
        }
    });
}


if (btnPagar) {
    btnPagar.addEventListener("click", () => {
        if (productosCarrito.length === 0) {
            alert("Tu carrito está vacío. ¡Agrega productos primero!");
            return;
        }

        
        const textoOriginal = btnPagar.innerHTML;
        btnPagar.innerHTML = '<i class="bi bi-check-circle-fill"></i> Procesando...';
        btnPagar.classList.remove('bg-orange-500', 'text-black');
        btnPagar.classList.add('bg-green-500', 'text-white');

        setTimeout(() => {
            alert("¡Compra realizada con éxito!");
            
            
            productosCarrito = [];
            localStorage.setItem("carrito-productos", JSON.stringify(productosCarrito));
            
            mostrarCarrito();
            actualizarContador();

            
            btnPagar.innerHTML = textoOriginal;
            btnPagar.classList.add('bg-orange-500', 'text-black');
            btnPagar.classList.remove('bg-green-500', 'text-white');
        }, 1500);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    mostrarCarrito();
});