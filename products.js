// Products page JavaScript - Clean implementation without imports

// --- Product Data ---
const allProducts = [
    { id: 1, name: 'Organic', price: 5.99, image: 'Gemini_Generated_Image_9v176i9v176i9v17.png', variety: 'Organic', quantityType: 'single' },
    { id: 2, name: 'Family Pack', price: 19.99, image: 'Gemini_Generated_Image_jxmzvujxmzvujxmz.png', variety: 'Standard', quantityType: 'pack' },
    { id: 3, name: 'Jumbo', price: 8.99, image: 'Gemini_Generated_Image_jvbntjvbntjvbntj.png', variety: 'Jumbo', quantityType: 'single' },
    { id: 4, name: 'Sweetest', price: 7.49, image: 'Gemini_Generated_Image_8ssjtg8ssjtg8ssj.png', variety: 'Sweetest', quantityType: 'single' },
    { id: 5, name: 'Organic Pack', price: 22.99, image: 'Gemini_Generated_Image_jvbntjvbntjvbntj (1).png', variety: 'Organic', quantityType: 'pack' },
    { id: 6, name: 'Jumbo Pack', price: 25.99, image: 'Gemini_Generated_Image_9v176i9v176i9v17 (1).png', variety: 'Jumbo', quantityType: 'pack' },
];

let cart = JSON.parse(localStorage.getItem('sithaphal-cart')) || [];

// --- Element Selectors ---
const productList = document.getElementById('product-list');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart-button');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const sortBy = document.getElementById('sort-by');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const varietyFilters = document.getElementById('variety-filters');
const quantityFilters = document.getElementById('quantity-filters');
const productSearch = document.getElementById('product-search');

// --- Product Rendering ---
function renderProducts(productsToRender) {
    if (!productList) return;
    productList.innerHTML = '';
    
    if (productsToRender.length === 0) {
        productList.innerHTML = '<p class="col-span-full text-center text-gray-500">No products match your filters.</p>';
        return;
    }
    
    productsToRender.forEach((product, index) => {
        const cartItem = cart.find(item => item.id === product.id);
        const gradients = [
            'from-emerald-400 via-green-500 to-teal-600',
            'from-green-400 via-emerald-500 to-cyan-600', 
            'from-teal-400 via-green-500 to-emerald-600',
            'from-lime-400 via-green-500 to-emerald-600',
            'from-green-500 via-emerald-600 to-teal-700',
            'from-emerald-500 via-teal-600 to-cyan-700'
        ];
        const gradient = gradients[index % gradients.length];
        
        const productCardHTML = `
            <div class="product-container text-center transform hover:-translate-y-4 hover:rotate-1 transition-all duration-500 hover:z-10 relative group">
                <div class="product-card relative bg-gradient-to-br ${gradient} rounded-2xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-500 border-2 border-white/20">
                    <!-- Decorative Elements -->
                    <div class="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-700"></div>
                    <div class="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-8 -translate-x-8 group-hover:scale-125 transition-transform duration-700"></div>
                    
                    <!-- Image Container -->
                    <div class="relative overflow-hidden h-64 bg-white/10 backdrop-blur-sm">
                        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                        <img src="${product.image}" alt="${product.name} Sithaphal" class="product-image w-full h-full object-cover transform group-hover:scale-125 group-hover:rotate-3 transition-all duration-700 filter group-hover:brightness-110">
                        
                        <!-- Premium Badge -->
                        <div class="absolute top-4 left-4 z-20">
                            <div class="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold shadow-lg animate-pulse">
                                ⭐ PREMIUM
                            </div>
                        </div>
                        
                    </div>
                    <!-- Content Section -->
                    <div class="p-6 bg-white/95 backdrop-blur-sm relative">
                        <!-- Floating Price Tag -->
                        <div class="absolute -top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                            <span class="text-lg font-bold">$${product.price.toFixed(2)}</span>
                        </div>
                        
                        <div class="pt-4">
                            <h4 class="text-2xl font-playfair text-gray-800 mb-3 group-hover:text-green-700 transition-colors">${product.name} Sithaphal</h4>
                            
                            <!-- Enhanced Rating -->
                            <div class="flex items-center justify-center mb-4">
                                <div class="flex text-yellow-400 text-lg">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span class="text-sm text-gray-600 ml-2 bg-gray-100 px-2 py-1 rounded-full">(4.8) • 127 reviews</span>
                            </div>
                            
                            <!-- Enhanced Nutritional Info -->
                            <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-100">
                                <div class="flex items-center mb-3">
                                    <div class="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-2">
                                        <span class="text-white text-xs font-bold">💚</span>
                                    </div>
                                    <p class="text-sm font-semibold text-gray-700">Nutritional Powerhouse (per 100g)</p>
                                </div>
                                <div class="grid grid-cols-3 gap-3 text-sm">
                                    <div class="bg-white p-3 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                                        <span class="block text-xl font-bold text-green-600">94</span>
                                        <span class="text-gray-600">Calories</span>
                                    </div>
                                    <div class="bg-white p-3 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                                        <span class="block text-xl font-bold text-blue-600">2.1g</span>
                                        <span class="text-gray-600">Protein</span>
                                    </div>
                                    <div class="bg-white p-3 rounded-lg shadow-sm border border-green-100 hover:shadow-md transition-shadow">
                                        <span class="block text-xl font-bold text-orange-600">23.6g</span>
                                        <span class="text-gray-600">Carbs</span>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Benefits Tags -->
                            <div class="flex flex-wrap gap-2 mb-4 justify-center">
                                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">🌿 Organic</span>
                                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">💪 High Fiber</span>
                                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-medium">🛡️ Antioxidants</span>
                            </div>
                            <!-- Enhanced Cart Controls -->
                            <div class="cart-controls" data-id="${product.id}">
                                ${cartItem ? `
                                    <div class="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200">
                                        <div class="flex items-center justify-center space-x-6">
                                            <button class="quantity-btn minus-btn bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                            <div class="text-center">
                                                <span class="quantity-display block text-2xl font-bold text-gray-800">${cartItem.quantity}</span>
                                                <span class="text-xs text-gray-600">in cart</span>
                                            </div>
                                            <button class="quantity-btn plus-btn bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ` : `
                                    <button class="add-to-cart-btn w-full bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 hover:from-green-600 hover:via-emerald-700 hover:to-teal-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl relative overflow-hidden group">
                                        <span class="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                        <span class="relative flex items-center justify-center space-x-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                            <span>Add to Cart</span>
                                        </span>
                                    </button>
                                `}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCardHTML;
    });
}

// --- Search and Filter Logic ---
function applyFilters() {
    let filteredProducts = [...allProducts];

    // Search filter
    const searchTerm = productSearch ? productSearch.value.toLowerCase() : '';
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.variety.toLowerCase().includes(searchTerm)
        );
    }

    // Price filter
    if (priceRange) {
        const maxPrice = parseFloat(priceRange.value);
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    // Variety filter
    if (varietyFilters) {
        const selectedVarieties = Array.from(varietyFilters.querySelectorAll('input:checked')).map(el => el.value);
        if (selectedVarieties.length > 0) {
            filteredProducts = filteredProducts.filter(p => selectedVarieties.includes(p.variety));
        }
    }
    
    // Quantity filter
    if (quantityFilters) {
        const selectedQuantities = Array.from(quantityFilters.querySelectorAll('input:checked')).map(el => el.value);
        if (selectedQuantities.length > 0) {
             filteredProducts = filteredProducts.filter(p => selectedQuantities.includes(p.quantityType));
        }
    }

    // Sort
    if (sortBy) {
        const sortValue = sortBy.value;
        if (sortValue === 'price-asc') {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'price-desc') {
            filteredProducts.sort((a, b) => b.price - a.price);
        }
    }

    renderProducts(filteredProducts);
}

// --- Cart Logic ---
function updateCart() {
    if (!cartItemsContainer || !cartTotal || !cartCount) return;
    
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-600">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const cartItemHTML = `
                <div class="flex justify-between items-center mb-4">
                    <div>
                        <h5 class="font-semibold">${item.name} Sithaphal</h5>
                        <p class="text-sm text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                    </div>
                    <div class="font-semibold">$${(item.price * item.quantity).toFixed(2)}</div>
                </div>
            `;
            cartItemsContainer.innerHTML += cartItemHTML;
            total += item.price * item.quantity;
        });
    }
    
    cartTotal.textContent = `$${total.toFixed(2)}`;
    const totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCount.textContent = totalQuantity;
    cartCount.classList.toggle('hidden', totalQuantity === 0);
    
    // Save to localStorage
    localStorage.setItem('sithaphal-cart', JSON.stringify(cart));
}

// --- Event Listeners ---
function setupEventListeners() {
    // Search
    if (productSearch) {
        productSearch.addEventListener('input', applyFilters);
    }
    
    // Filters
    if (sortBy) sortBy.addEventListener('change', applyFilters);
    if (priceRange) {
        priceRange.addEventListener('input', () => {
            if (priceValue) priceValue.textContent = `$${priceRange.value}`;
            applyFilters();
        });
    }
    if (varietyFilters) varietyFilters.addEventListener('change', applyFilters);
    if (quantityFilters) quantityFilters.addEventListener('change', applyFilters);
    
    // Product interactions
    if (productList) {
        productList.addEventListener('click', (e) => {
            const addToCartBtn = e.target.closest('.add-to-cart-btn');
            const minusBtn = e.target.closest('.minus-btn');
            const plusBtn = e.target.closest('.plus-btn');
            
            if (addToCartBtn) {
                const productId = parseInt(addToCartBtn.closest('.cart-controls').dataset.id);
                const product = allProducts.find(p => p.id === productId);
                const cartItem = cart.find(item => item.id === productId);
                
                if (cartItem) {
                    cartItem.quantity++;
                } else {
                    cart.push({ ...product, quantity: 1 });
                }
                updateCart();
                applyFilters(); // Re-render to show updated cart controls
                
            } else if (minusBtn || plusBtn) {
                const productId = parseInt(e.target.closest('.cart-controls').dataset.id);
                const cartItem = cart.find(item => item.id === productId);
                
                if (cartItem) {
                    cartItem.quantity += plusBtn ? 1 : -1;
                    if (cartItem.quantity <= 0) {
                        cart = cart.filter(item => item.id !== productId);
                    }
                    updateCart();
                    applyFilters(); // Re-render to show updated cart controls
                }
            }
        });
    }
    
    // Cart modal
    if (cartButton) cartButton.addEventListener('click', () => cartModal.classList.remove('hidden'));
    if (closeCartButton) closeCartButton.addEventListener('click', () => cartModal.classList.add('hidden'));
    if (checkoutButton) {
        checkoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (cart.length > 0) {
                try { localStorage.setItem('sithaphal-cart', JSON.stringify(cart)); } catch {}
                window.location.href = 'payment.html';
            }
        });
    }
    
    // Close modal when clicking outside
    if (cartModal) {
        cartModal.addEventListener('click', (e) => {
            if (e.target === cartModal) {
                cartModal.classList.add('hidden');
            }
        });
    }
}

// --- Initialize ---
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(allProducts);
    updateCart();
    setupEventListeners();
});
