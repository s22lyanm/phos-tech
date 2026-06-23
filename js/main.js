// ==================== PRODUCTOS ====================
const products = [
    { id: 1, name: "iPhone 16 Pro", price: 1299, category: "smartphone", image: "https://picsum.photos/id/20/400/300", rating: 4.9 },
    { id: 2, name: "MacBook Air M3", price: 1299, category: "laptop", image: "https://picsum.photos/id/201/400/300", rating: 4.8 },
    { id: 3, name: "Sony WH-1000XM5", price: 399, category: "audio", image: "https://picsum.photos/id/180/400/300", rating: 4.7 },
    { id: 4, name: "Samsung QLED 65\"", price: 899, category: "tv", image: "https://picsum.photos/id/251/400/300", rating: 4.6 },
    { id: 5, name: "Samsung Galaxy S25", price: 899, category: "smartphone", image: "https://picsum.photos/id/60/400/300", rating: 4.8 },
    { id: 6, name: "Dell XPS 14", price: 1499, category: "laptop", image: "https://picsum.photos/id/201/400/300", rating: 4.5 },
    { id: 7, name: "AirPods Max", price: 549, category: "audio", image: "https://picsum.photos/id/180/400/300", rating: 4.4 },
    { id: 8, name: "LG OLED 55\"", price: 1199, category: "tv", image: "https://picsum.photos/id/251/400/300", rating: 4.9 },
    { id: 9, name: "Google Pixel 9", price: 799, category: "smartphone", image: "https://picsum.photos/id/1015/400/300", rating: 4.6 },
    { id: 10, name: "Sony A7 IV Cámara", price: 2499, category: "audio", image: "https://picsum.photos/id/133/400/300", rating: 4.8 },
    { id: 11, name: "HP Pavilion Gaming", price: 899, category: "laptop", image: "https://picsum.photos/id/201/400/300", rating: 4.3 },
    { id: 12, name: "TCL 75\" 4K Smart TV", price: 699, category: "tv", image: "https://picsum.photos/id/251/400/300", rating: 4.5 }
];

let cart = JSON.parse(localStorage.getItem('phostech-cart')) || [];
let isDarkMode = localStorage.getItem('darkMode') === 'true';

// ==================== FUNCIONES ====================
function renderProducts(filteredProducts) {
    const container = document.getElementById('products-grid');
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card bg-white dark:bg-gray-800 rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-700';
        card.innerHTML = `
            <div class="relative">
                <img src="\( {product.image}" alt=" \){product.name}" class="w-full h-56 object-cover">
                <div class="absolute top-4 right-4 bg-white/95 dark:bg-gray-900 px-4 py-1.5 rounded-2xl text-lg font-bold shadow">
                    \[ {product.price}
                </div>
            </div>
            <div class="p-6">
                <h3 class="font-semibold text-xl">${product.name}</h3>
                <div class="flex items-center gap-1 mt-3 text-amber-400">
                    ${Array(5).fill().map((_, i) => `<i class="fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-gray-300'}"></i>`).join('')}
                </div>
                <button onclick="addToCart(${product.id})" class="mt-6 w-full py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl font-semibold transition">
                    Añadir al carrito
                </button>
            </div>
        `;
        container.appendChild(card);
    });
}

function addToCart(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('phostech-cart', JSON.stringify(cart));
    updateCartCount();
    showNotification(`${product.name} añadido al carrito`);
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('phostech-cart', JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById('cart-count').textContent = count;
}

function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';

    if (cart.length === 0) {
        container.innerHTML = `<div class="text-center py-20 text-gray-400"><i class="fas fa-shopping-cart text-6xl mb-4"></i><p>Tu carrito está vacío</p></div>`;
        document.getElementById('cart-total').textContent = '$0';
        return;
    }

    let total = 0;
    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = 'flex gap-5';
        div.innerHTML = `
            <img src="${item.image}" class="w-24 h-24 object-cover rounded-2xl">
            <div class="flex-1">
                <div class="flex justify-between">
                    <h4 class="font-semibold">${item.name}</h4>
                    <button onclick="removeFromCart(${index})" class="text-red-500"><i class="fas fa-trash"></i></button>
                </div>
                <p class="text-gray-500"> \]{item.price} × ${item.quantity}</p>
                <p class="font-bold text-lg">\[ {itemTotal}</p>
            </div>
        `;
        container.appendChild(div);
    });
    document.getElementById('cart-total').textContent = ` \]{total}`;
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
    if (!modal.classList.contains('hidden')) renderCart();
}

function checkout() {
    if (cart.length === 0) return;
    alert('🎉 ¡Gracias por tu compra en PHOS TECH!\n\n"En tu luz veremos la luz" - Salmos 36:9');
    cart = [];
    localStorage.setItem('phostech-cart', JSON.stringify(cart));
    toggleCart();
    updateCartCount();
}

function showNotification(message) {
    const notif = document.createElement('div');
    notif.style.cssText = `position:fixed;bottom:30px;right:30px;background:#111827;color:white;padding:16px 24px;border-radius:9999px;box-shadow:0 10px 15px -3px rgb(0 0 0 / 0.3);display:flex;align-items:center;gap:12px;z-index:200;`;
    notif.innerHTML = `<i class="fas fa-check-circle text-amber-400"></i> ${message}`;
    document.body.appendChild(notif);
    setTimeout(() => notif.remove(), 2800);
}

function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', (category === 'all' && btn.textContent === 'Todos') || btn.textContent.toLowerCase() === category);
    });
    let filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

function navigateToSection(section) {
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
}

function showLogin() {
    alert('🔑 Inicio de sesión simulado');
}

function toggleDarkMode() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', isDark);
    document.getElementById('theme-icon').classList.toggle('fa-moon', !isDark);
    document.getElementById('theme-icon').classList.toggle('fa-sun', isDark);
}

// ==================== INICIALIZACIÓN ====================
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCartCount();

    // Modo oscuro inicial
    if (localStorage.getItem('darkMode') === 'true') {
        document.documentElement.classList.add('dark');
        document.getElementById('theme-icon').classList.remove('fa-moon');
        document.getElementById('theme-icon').classList.add('fa-sun');
    }

    // Botón carrito
    document.getElementById('cart-btn').addEventListener('click', toggleCart);

    // Búsqueda
    document.getElementById('search-input').addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = products.filter(p => p.name.toLowerCase().includes(term));
        renderProducts(filtered);
    });

    // Formulario de contacto
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✅ ¡Mensaje recibido! Gracias por contactarnos. Te responderemos pronto.');
        e.target.reset();
    });

    // Navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.getAttribute('data-section');
            if (section) navigateToSection(section);
        });
    });
});

// Funciones globales
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.toggleCart = toggleCart;
window.checkout = checkout;
window.filterCategory = filterCategory;
window.navigateToSection = navigateToSection;
window.showLogin = showLogin;
window.toggleDarkMode = toggleDarkMode;
