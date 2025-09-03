// Using global THREE and supabase variables from CDN

// Example: Sign Up
async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
        console.error('Sign up error:', error.message);
        return null;
    }
    return data;
}

// Example: Sign In
async function signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
        console.error('Sign in error:', error.message);
        return null;
    }
    return data;
}

// Example: Fetch Products
async function fetchProducts() {
    const { data, error } = await supabase.from('products').select('*');
    if (error) {
        console.error('Fetch products error:', error.message);
        return [];
    }
    return data;
}

// --- 3D Scene Setup ---
const canvas = document.getElementById('sithaphal-canvas');
if (canvas) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Sithaphal Model with Texture
    const textureLoader = new THREE.TextureLoader();
    const sithaphalTexture = textureLoader.load('https://i.imgur.com/8L1pX3S.png');
    
    const geometry = new THREE.SphereGeometry(2.5, 64, 64);
    const material = new THREE.MeshStandardMaterial({ 
        map: sithaphalTexture,
        roughness: 0.8, 
        metalness: 0.1 
    });
    const sithaphal = new THREE.Mesh(geometry, material);
    scene.add(sithaphal);

    camera.position.z = 6;

    // Scroll Animation
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        scrollY = window.scrollY;
    });

    function animate() {
        requestAnimationFrame(animate);
        sithaphal.rotation.y += 0.005;
        sithaphal.rotation.x = scrollY * 0.001;
        renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// --- E-commerce Logic ---
const allProducts = [
    { id: 1, name: 'Organic', price: 5.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Organic', quantityType: 'single' },
    { id: 2, name: 'Family Pack', price: 19.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Standard', quantityType: 'pack' },
    { id: 3, name: 'Jumbo', price: 8.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Jumbo', quantityType: 'single' },
    { id: 4, name: 'Sweetest', price: 7.49, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Sweetest', quantityType: 'single' },
    { id: 5, name: 'Organic Pack', price: 22.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Organic', quantityType: 'pack' },
    { id: 6, name: 'Jumbo Pack', price: 25.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Jumbo', quantityType: 'pack' },
];

let cart = JSON.parse(localStorage.getItem('sithaphal-cart')) || [];
let isLoggedIn = false;
let lastPageBeforeAuth = 'main-content';

// --- Page Navigation ---
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        if (page.id === pageId) {
            page.classList.remove('hidden');
            if (pageId === 'products-page') {
                renderProducts(allProducts);
            }
        } else {
            page.classList.add('hidden');
        }
    });
}

// --- Auth UI & Logic ---
function updateProfileDropdown() {
    const profileDropdown = document.getElementById('profile-dropdown');
    const authButtons = document.getElementById('auth-buttons');
    const userEmail = document.getElementById('user-email');
    
    if (isLoggedIn) {
        if (profileDropdown) profileDropdown.classList.remove('hidden');
        if (authButtons) authButtons.classList.add('hidden');
        if (userEmail) userEmail.textContent = 'user@example.com'; // Replace with actual user email
    } else {
        if (profileDropdown) profileDropdown.classList.add('hidden');
        if (authButtons) authButtons.classList.remove('hidden');
    }
}

// Password visibility toggle
const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`;
const eyeClosedSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.024 3.52-5.442 6.837-6.168M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 2l20 20" /></svg>`;

// Toggle password visibility
function togglePasswordVisibility(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleButton = document.querySelector(`[onclick="togglePasswordVisibility('${inputId}')"]`);
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.innerHTML = eyeClosedSVG;
    } else {
        passwordInput.type = 'password';
        toggleButton.innerHTML = eyeOpenSVG;
    }
}

// --- Product Filtering and Rendering ---
function renderProducts(productsToRender) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = '';

    productsToRender.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="w-full h-48 object-cover">
            <div class="p-4">
                <h3 class="text-lg font-semibold text-gray-800">${product.name}</h3>
                <p class="text-green-600 font-bold mt-2">$${product.price.toFixed(2)}</p>
                <div class="mt-4 flex justify-between items-center">
                    <div class="flex items-center space-x-2">
                        <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded" onclick="updateQuantity(${product.id}, -1)">-</button>
                        <span class="w-8 text-center" id="quantity-${product.id}">1</span>
                        <button class="bg-gray-200 hover:bg-gray-300 text-gray-800 px-2 py-1 rounded" onclick="updateQuantity(${product.id}, 1)">+</button>
                    </div>
                    <button class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onclick="addToCart(${product.id})">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(productCard);
    });
}

// --- Search Logic ---
const productSearch = document.getElementById('product-search');
if (productSearch) {
    productSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredProducts = allProducts.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        renderProducts(filteredProducts);
    });
}

// Update applyFilters function to accept initial products
function applyFilters(initialProducts = allProducts) {
    const sortBy = document.getElementById('sort-by');
    const priceRange = document.getElementById('price-range');
    const varietyFilters = document.querySelectorAll('input[name="variety"]:checked');
    const quantityType = document.querySelector('input[name="quantity-type"]:checked');

    let filteredProducts = [...initialProducts];

    // Apply variety filter
    if (varietyFilters.length > 0) {
        const selectedVarieties = Array.from(varietyFilters).map(checkbox => checkbox.value);
        filteredProducts = filteredProducts.filter(product => 
            selectedVarieties.includes(product.variety)
        );
    }

    // Apply quantity type filter
    if (quantityType) {
        filteredProducts = filteredProducts.filter(product => 
            product.quantityType === quantityType.value
        );
    }

    // Apply price filter
    if (priceRange) {
        const maxPrice = parseFloat(priceRange.value);
        filteredProducts = filteredProducts.filter(product => product.price <= maxPrice);
    }

    // Apply sorting
    if (sortBy) {
        filteredProducts.sort((a, b) => {
            if (sortBy.value === 'price-asc') return a.price - b.price;
            if (sortBy.value === 'price-desc') return b.price - a.price;
            if (sortBy.value === 'name-asc') return a.name.localeCompare(b.name);
            return b.name.localeCompare(a.name);
        });
    }

    renderProducts(filteredProducts);
}

// Set up filter event listeners
function setupFilters() {
    const filterInputs = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
    const sortBy = document.getElementById('sort-by');
    const priceRange = document.getElementById('price-range');
    
    filterInputs.forEach(input => {
        input.addEventListener('change', () => applyFilters());
    });
    
    if (sortBy) sortBy.addEventListener('change', () => applyFilters());
    if (priceRange) priceRange.addEventListener('input', () => {
        const priceValue = document.getElementById('price-value');
        if (priceValue) priceValue.textContent = `$${priceRange.value}`;
        applyFilters();
    });
}

// --- Cart Logic ---
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const cartItems = document.getElementById('cart-items');
    
    if (!cartCount || !cartTotal || !cartItems) return;
    
    // Calculate total items and total price
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => {
        const product = allProducts.find(p => p.id === item.id);
        return sum + (product ? product.price * item.quantity : 0);
    }, 0);
    
    // Update UI
    cartCount.textContent = totalItems;
    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
    
    // Update cart items list
    cartItems.innerHTML = '';
    cart.forEach(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (!product) return;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'flex justify-between items-center p-2 border-b';
        cartItem.innerHTML = `
            <div class="flex items-center space-x-4">
                <img src="${product.image}" alt="${product.name}" class="w-12 h-12 object-cover rounded">
                <div>
                    <h4 class="font-medium">${product.name}</h4>
                    <p class="text-sm text-gray-600">$${product.price.toFixed(2)} × ${item.quantity}</p>
                </div>
            </div>
            <div class="flex items-center space-x-2">
                <button class="text-gray-500 hover:text-red-500" onclick="removeFromCart(${product.id})">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });
    
    // Save to localStorage
    localStorage.setItem('sithaphal-cart', JSON.stringify(cart));
}

// Load cart from localStorage on init
try {
    const storedCart = localStorage.getItem('sithaphal-cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }
} catch (e) {
    console.error('Error loading cart from localStorage:', e);
    localStorage.removeItem('sithaphal-cart');
    cart = [];
}

// --- Recipe Generator Logic ---
async function handleRecipeGeneration() {
    const recipeInput = document.getElementById('recipe-input');
    const recipeResults = document.getElementById('recipe-results');
    const generateBtn = document.getElementById('generate-recipe');
    
    if (!recipeInput || !recipeResults || !generateBtn) return;
    
    const ingredients = recipeInput.value.trim();
    if (!ingredients) return;
    
    generateBtn.disabled = true;
    generateBtn.innerHTML = 'Generating...';
    recipeResults.innerHTML = '<p class="text-center py-4">Generating recipe ideas...</p>';
    
    try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Mock response (replace with actual API call)
        const mockRecipes = [
            {
                title: 'Sithaphal Smoothie',
                ingredients: ['1 Sithaphal (custard apple)', '1 banana', '1 cup milk', '1 tsp honey', 'Ice cubes'],
                instructions: '1. Scoop out the Sithaphal pulp\n2. Blend all ingredients until smooth\n3. Serve chilled with ice cubes'
            },
            {
                title: 'Sithaphal Ice Cream',
                ingredients: ['2 Sithaphal (pulp)', '1 cup heavy cream', '1/2 cup condensed milk', '1 tsp vanilla extract'],
                instructions: '1. Whip the cream until stiff peaks form\n2. Fold in Sithaphal pulp and condensed milk\n3. Add vanilla extract and mix well\n4. Freeze for 6 hours or overnight'
            }
        ];
        
        displayRecipes(mockRecipes);
    } catch (error) {
        console.error('Error generating recipes:', error);
        recipeResults.innerHTML = '<p class="text-center py-4 text-red-500">Failed to generate recipes. Please try again.</p>';
    } finally {
        generateBtn.disabled = false;
        generateBtn.textContent = 'Generate Recipe';
    }
}

function displayRecipes(recipes) {
    const recipeResults = document.getElementById('recipe-results');
    if (!recipeResults) return;
    
    if (!recipes || recipes.length === 0) {
        recipeResults.innerHTML = '<p class="text-center py-4">No recipes found. Try different ingredients.</p>';
        return;
    }
    
    recipeResults.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'bg-white rounded-lg shadow-md p-6 mb-6';
        
        const ingredientsList = recipe.ingredients
            .map(ingredient => `<li class="flex items-start">
                <span class="inline-block w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2"></span>
                <span>${ingredient}</span>
            </li>`)
            .join('');
            
        recipeCard.innerHTML = `
            <h3 class="text-xl font-bold text-green-700 mb-4">${recipe.title}</h3>
            <div class="grid md:grid-cols-2 gap-6">
                <div>
                    <h4 class="font-semibold mb-2">Ingredients:</h4>
                    <ul class="space-y-1">
                        ${ingredientsList}
                    </ul>
                </div>
                <div>
                    <h4 class="font-semibold mb-2">Instructions:</h4>
                    <div class="whitespace-pre-line">${recipe.instructions}</div>
                </div>
            </div>
        `;
        recipeResults.appendChild(recipeCard);
    });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    // Navigation
    const homeLink = document.getElementById('home-link');
    const homeLinkNav = document.getElementById('home-link-nav');
    const productsLink = document.getElementById('products-link');
    const cartButton = document.getElementById('cart-button');
    const closeCart = document.getElementById('close-cart');
    const cartModal = document.getElementById('cart-modal');
    const checkoutBtn = document.getElementById('checkout-btn');
    const clearCartBtn = document.getElementById('clear-cart');
    const recipeModal = document.getElementById('recipe-modal');
    const closeRecipeBtn = document.getElementById('close-recipe');
    const getRecipesBtn = document.getElementById('get-recipes');
    
    // Navigation links
    if (homeLink) homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('main-content');
    });
    
    if (homeLinkNav) homeLinkNav.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('main-content');
    });
    
    if (productsLink) productsLink.addEventListener('click', (e) => {
        e.preventDefault();
        showPage('products-page');
    });
    
    // Cart functionality
    if (cartButton) cartButton.addEventListener('click', () => {
        if (cartModal) cartModal.classList.remove('hidden');
    });
    
    if (closeCart) closeCart.addEventListener('click', () => {
        if (cartModal) cartModal.classList.add('hidden');
    });
    
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => {
        // In a real app, this would redirect to checkout
        alert('Proceeding to checkout!');
    });
    
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        if (confirm('Are you sure you want to clear your cart?')) {
            cart = [];
            updateCart();
            if (cartModal) cartModal.classList.add('hidden');
        }
    });
    
    // Recipe modal
    if (getRecipesBtn) getRecipesBtn.addEventListener('click', () => {
        if (recipeModal) recipeModal.classList.remove('hidden');
    });
    
    if (closeRecipeBtn) closeRecipeBtn.addEventListener('click', () => {
        if (recipeModal) recipeModal.classList.add('hidden');
    });
    
    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (cartModal && e.target === cartModal) {
            cartModal.classList.add('hidden');
        }
        if (recipeModal && e.target === recipeModal) {
            recipeModal.classList.add('hidden');
        }
    });
    
    // Initialize filters
    setupFilters();
}

// --- Initial Page Load ---
function initializeApp() {
    updateCart();
    updateProfileDropdown();
    setupEventListeners();
    applyFilters();
    showPage('main-content'); // Start on the home page
}

// --- Parallax Scroll Effect for Sithaphal ---
function initParallax() {
    const parallaxSithaphal = document.getElementById('parallax-sithaphal');
    
    if (!parallaxSithaphal) {
        console.log('Parallax element not found, retrying...');
        setTimeout(initParallax, 100);
        return;
    }
    
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        parallaxSithaphal.style.transform = `translateY(${scrollPosition * 0.4}px)`;
    });
}

// Add parallax effect to Sithaphal image
function addParallaxEffect() {
    const sithaphalImage = document.querySelector('.parallax-sithaphal');
    if (!sithaphalImage) return;
    
    window.addEventListener('mousemove', (e) => {
        const x = (window.innerWidth - e.pageX * 0.5) / 50;
        const y = (window.innerHeight - e.pageY * 0.5) / 50;
        
        sithaphalImage.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
}

// Animated Counter Function
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Initialize animations and features when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize the app
    initializeApp();
    
    // Initialize parallax effect if function exists
    if (typeof addParallaxEffect === 'function') {
        addParallaxEffect();
    }
    
    // Initialize counters if function exists
    if (typeof animateCounters === 'function') {
        animateCounters();
    }
    
    // Initialize recipe form
    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', (e) => {
            e.preventDefault();
            handleRecipeGeneration();
        });
    }
});

// Global functions for HTML onclick handlers
function addToCart(productId) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    const quantity = quantityInput ? parseInt(quantityInput.textContent) : 1;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ id: productId, quantity });
    }
    
    updateCart();
    
    // Show added to cart feedback
    const addToCartBtn = document.querySelector(`[onclick="addToCart(${productId})"]`);
    if (addToCartBtn) {
        const originalText = addToCartBtn.textContent;
        addToCartBtn.textContent = 'Added!';
        addToCartBtn.classList.add('bg-green-500');
        
        setTimeout(() => {
            addToCartBtn.textContent = originalText;
            addToCartBtn.classList.remove('bg-green-500');
        }, 1000);
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateQuantity(productId, change) {
    const quantityInput = document.getElementById(`quantity-${productId}`);
    if (!quantityInput) return;
    
    let quantity = parseInt(quantityInput.textContent) + change;
    if (quantity < 1) quantity = 1;
    
    quantityInput.textContent = quantity;
}

// Initialize parallax after DOM is ready
document.addEventListener('DOMContentLoaded', initParallax);
// Also try immediate initialization
initParallax();
