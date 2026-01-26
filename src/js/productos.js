import './animaciones.js'; 
import { initScrollReveal } from './animaciones.js'; 


const productsData = [
    { id: 1, name: "Speed 2.0 Pro", category: "Calzado", price: 129, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070", desc: "Máxima reactividad para velocidad explosiva." },
    { id: 2, name: "Elite Dumbbells", category: "Fuerza", price: 85, image: "https://i.postimg.cc/mhxvg2y4/fitness_center_1259300_1280.jpg", desc: "Agarre ergonómico y peso ajustable." },
    { id: 3, name: "Vantage Watch", category: "Tech", price: 199, image: "https://i.postimg.cc/xqrw1T3Y/smartwatch_8300238_1280.jpg", desc: "Monitoreo cardíaco y GPS integrado." },
    { id: 4, name: "Armor Dry-Fit", category: "Ropa", price: 35, image: "https://i.postimg.cc/QVGMZDBj/camiseta-fitness-for-men-negro-verde.jpg", desc: "Tejido ultra transpirable dry-fit." },
    { id: 5, name: "Elite Match Ball", category: "Equipo", price: 45, image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80", desc: "Costuras termoselladas profesionales." },
    { id: 6, name: "Pro Grip Mat", category: "Wellness", price: 30, image: "https://i.postimg.cc/nVNjRHr1/kurma-yoga-mat-geco-group-4-colors-swirl-LR-768x768.jpg", desc: "Superficie antideslizante de 6mm." },
    { id: 7, name: "Endurance Duffel", category: "Accesorios", price: 55, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80", desc: "Compartimento aislado y materiales resistentes." },
    { id: 8, name: "Sonic Beats Pro", category: "Tech", price: 89, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80", desc: "Cancelación de ruido activa." },
    { id: 9, name: "Trail Hunter X", category: "Ciclismo", price: 750, image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&q=80", desc: "Cuadro de carbono ligero." },
    { id: 10, name: "Whey Isolate", category: "Nutrición", price: 42, image: "https://i.postimg.cc/wxnyf6MV/01-136-013-02-Whey-isolate-1kg-chocolate-Warriorlab-web.jpg", desc: "25g de proteína pura por servicio." },
    { id: 11, name: "Strike Gloves", category: "Combate", price: 65, image: "https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?auto=format&fit=crop&q=80", desc: "Cuero genuino y acolchado triple capa." },
    { id: 12, name: "Deep Muscle Roller", category: "Recuperación", price: 32, image: "https://images.unsplash.com/photo-1600881333168-2ef49b341f30?auto=format&fit=crop&q=80", desc: "Liberación miofascial profunda." }
];


function renderProducts(filter = 'all') {
    const container = document.getElementById('product-container');
    if (!container) return; 

    container.innerHTML = ''; 

    const filtered = filter === 'all' 
        ? productsData 
        : productsData.filter(p => p.category === filter);

    filtered.forEach((product, index) => {
        const cardHTML = `
            <article class="bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-custom group shadow-2xl reveal flex flex-col h-full" style="transition-delay: ${index * 50}ms">
                <div class="h-64 overflow-hidden relative">
                    <img src="${product.image}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                    <div class="absolute top-4 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-gray-700">
                        <span class="text-orange-500 text-[10px] font-black uppercase tracking-widest">${product.category}</span>
                    </div>
                </div>
                <div class="p-8 flex flex-col flex-grow">
                    <div class="flex justify-between items-start mb-2">
                        <h3 class="text-xl font-black text-white uppercase italic leading-tight">${product.name}</h3>
                        <span class="text-orange-500 font-black italic text-xl">$${product.price}</span>
                    </div>
                    <p class="text-gray-500 text-xs mt-3 font-light leading-relaxed mb-6 flex-grow">${product.desc}</p>
                    <button class="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-500 transition-custom uppercase text-xs italic shadow-lg hover:shadow-orange-500/20 active:scale-95 cursor-pointer">
                        Añadir al Carrito <i class="bi bi-cart-plus-fill ml-2"></i>
                    </button>
                </div>
            </article>
        `;
        container.innerHTML += cardHTML;
    });
    
    
    initScrollReveal();
}


window.filterProducts = (category) => {
    const buttons = document.querySelectorAll('button[onclick^="filterProducts"]');
    buttons.forEach(btn => {
        if(btn.textContent.toLowerCase().includes(category.toLowerCase()) || (category === 'all' && btn.textContent === 'Todos')) {
            btn.classList.add('active-filter');
            btn.classList.remove('text-gray-400', 'border-gray-700');
            btn.classList.add('text-black', 'border-orange-500', 'bg-orange-500');
        } else {
            btn.classList.remove('active-filter', 'bg-orange-500', 'text-black', 'border-orange-500');
            btn.classList.add('text-gray-400', 'border-gray-700');
        }
    });
    renderProducts(category);
};


document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('product-container')) {
        renderProducts();
    }
});