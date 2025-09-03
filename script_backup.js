import * as THREE from 'three';

// --- Supabase Client Initialization ---
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = 'https://njljzwkgsijqqgurxgpw.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5qbGp6d2tnc2lqcXFndXJ4Z3B3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4ODIzMjEsImV4cCI6MjA3MTQ1ODMyMX0.MrZRLrpvH3oG1yn1TETVlo5Vy1-IIUit7guqgWw0hyM'; // Replace with your Supabase anon key
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

// --- Element Selectors ---
const allPages = document.querySelectorAll('.page');
const productList = document.getElementById('product-list');
const cartButton = document.getElementById('cart-button');
const cartModal = document.getElementById('cart-modal');
const closeCartButton = document.getElementById('close-cart-button');
const cartItemsContainer = document.getElementById('cart-items');
const cartCount = document.getElementById('cart-count');
const cartTotal = document.getElementById('cart-total');
const checkoutButton = document.getElementById('checkout-button');
const paymentModal = document.getElementById('payment-modal');
const cancelPaymentButton = document.getElementById('cancel-payment-button');
const paymentForm = document.getElementById('payment-form');
// DOM Elements
const homeLink = document.getElementById('home-link');
const homeLinkNav = document.getElementById('home-link-nav');
const productsLink = document.getElementById('products-link');
const sortBy = document.getElementById('sort-by');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const varietyFiltersContainer = document.getElementById('variety-filters');
const quantityFilters = document.getElementById('quantity-filters');
const getRecipesBtn = document.getElementById('get-recipes-btn');
const recipeModal = document.getElementById('recipe-modal');
const recipeContent = document.getElementById('recipe-content');
const closeRecipeBtn = document.getElementById('close-recipe-button');
const profileButton = document.getElementById('profile-button');
const profileDropdown = document.getElementById('profile-dropdown');
const signinTab = document.getElementById('signin-tab');
const signupTab = document.getElementById('signup-tab');
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');

// --- Page Navigation ---
function showPage(pageId) {
    allPages.forEach(page => page.classList.add('hidden'));
    const pageToShow = document.getElementById(pageId);
    if(pageToShow) {
        pageToShow.classList.remove('hidden');
        window.scrollTo(0, 0);
        // Render products when products page is shown
        if(pageId === 'products-page') {
            renderProducts(allProducts);
            setupFilters();
        }
    }
}

// --- Auth UI & Logic ---
function updateProfileDropdown() {
    if (!profileDropdown) return;
    profileDropdown.innerHTML = '';
    if (isLoggedIn) {
        profileDropdown.innerHTML = `
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">My Account</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Order History</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Track Your Order</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Return & Replacement</a>
            <hr class="my-1">
            <a href="#" id="signout-button" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign Out</a>
        `;
        document.getElementById('signout-button').addEventListener('click', (e) => {
            e.preventDefault();
            isLoggedIn = false;
            updateProfileDropdown();
            profileDropdown.classList.add('hidden');
        });
    } else {
        profileDropdown.innerHTML = `
            <a href="#" id="signin-link" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign In</a>
        `;
        document.getElementById('signin-link').addEventListener('click', (e) => {
            e.preventDefault();
            const currentPage = document.querySelector('.page:not(.hidden)');
            lastPageBeforeAuth = currentPage ? currentPage.id : 'main-content';
            showPage('auth-page');
            profileDropdown.classList.add('hidden');
        });
    }
}

// Password visibility toggle
const eyeOpenSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>`;
const eyeClosedSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7 .946-3.024 3.52-5.442 6.837-6.168M15 10a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 2l20 20" /></svg>`;

document.querySelectorAll('.password-toggle').forEach(toggle => {
    toggle.innerHTML = eyeClosedSVG;
    toggle.addEventListener('click', () => {
        const targetInput = document.getElementById(toggle.dataset.target);
        if (targetInput.type === 'password') {
            targetInput.type = 'text';
            toggle.innerHTML = eyeOpenSVG;
        } else {
            targetInput.type = 'password';
            toggle.innerHTML = eyeClosedSVG;
        }
    });
});

// --- Product Filtering and Rendering ---
function renderProducts(productsToRender) {
    if (!productList) return;
    productList.innerHTML = '';
    if (productsToRender.length === 0) {
        productList.innerHTML = '<p class="col-span-full text-center text-gray-500">No products match your filters.</p>';
        return;
    }
    productsToRender.forEach(product => {
        const productCardHTML = `
            <div class="product-container text-center transform hover:-translate-y-2 transition-all duration-300">
                <div class="product-card product-image-container relative group bg-white rounded-xl shadow-lg overflow-hidden">
                    <div class="aspect-w-1 aspect-h-1 overflow-hidden">
                        <img src="${product.image}" alt="${product.name} Sithaphal" class="product-image w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500">
                    </div>
                    <button class="wishlist-btn absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-50">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 hover:text-red-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
                <div class="p-6 bg-white rounded-b-xl">
                    <h4 class="text-2xl font-playfair text-gray-800 mb-2">${product.name} Sithaphal</h4>
                    <div class="flex items-center justify-center mb-2">
                        <div class="flex text-yellow-400">
                            ${"★".repeat(4)}${"☆".repeat(1)}
                        </div>
                        <span class="text-sm text-gray-600 ml-2">(4.0)</span>
                    </div>
                    <p class="text-2xl font-semibold text-green-600 mb-3">$${product.price.toFixed(2)}</p>
                    <div class="bg-gray-50 rounded-lg p-3 mb-4">
                        <p class="text-sm font-medium text-gray-700 mb-2">Nutritional Value (per 100g):</p>
                        <div class="grid grid-cols-3 gap-2 text-sm text-gray-600">
                            <div class="bg-white p-2 rounded">
                                <span class="block font-semibold">94</span>
                                Calories
                            </div>
                            <div class="bg-white p-2 rounded">
                                <span class="block font-semibold">2.1g</span>
                                Protein
                            </div>
                            <div class="bg-white p-2 rounded">
                                <span class="block font-semibold">23.6g</span>
                                Carbs
                            </div>
                        </div>
                    </div>
                    <div class="cart-controls" data-id="${product.id}">
                        ${cart.find(item => item.id === product.id) ? `
                            <div class="flex items-center justify-center space-x-4">
                                <button class="quantity-btn minus-btn bg-green-100 hover:bg-green-200 text-green-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                                <span class="quantity-display text-xl font-semibold text-gray-800">${cart.find(item => item.id === product.id).quantity}</span>
                                <button class="quantity-btn plus-btn bg-green-100 hover:bg-green-200 text-green-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </div>
                        ` : `
                            <button class="add-to-cart-btn w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300">
                                Add to Cart
                            </button>
                        `}
                    </div>
                </div>
            </div>
        `;
        productList.innerHTML += productCardHTML;
    });
}

// --- Search Logic ---
const productSearch = document.getElementById('product-search');
if (productSearch) {
    productSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        let filteredProducts = allProducts;
        
        if (searchTerm) {
            filteredProducts = allProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm) ||
                product.variety.toLowerCase().includes(searchTerm)
            );
        }
        
        applyFilters(filteredProducts);
    });
}

// Update applyFilters function to accept initial products
function applyFilters(initialProducts = allProducts) {
    let filteredProducts = [...initialProducts];

    if (priceRange) {
        const maxPrice = parseFloat(priceRange.value);
        filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }

    if (varietyFiltersContainer) {
        const selectedVarieties = Array.from(varietyFiltersContainer.querySelectorAll('input:checked')).map(el => el.value);
        if (selectedVarieties.length > 0) {
            filteredProducts = filteredProducts.filter(p => selectedVarieties.includes(p.variety));
        }
    }
    
    if (quantityFilters) {
        const selectedQuantities = Array.from(quantityFilters.querySelectorAll('input:checked')).map(el => el.value);
        if (selectedQuantities.length > 0) {
             filteredProducts = filteredProducts.filter(p => selectedQuantities.includes(p.quantityType));
        }
    }

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

function setupFilters() {
    if (varietyFiltersContainer) {
        const varieties = [...new Set(allProducts.map(p => p.variety))];
        varietyFiltersContainer.innerHTML = '';
        varieties.forEach(variety => {
            varietyFiltersContainer.innerHTML += `
                <div class="flex items-center">
                   <input id="var-${variety}" name="variety" type="checkbox" value="${variety}" class="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500">
                   <label for="var-${variety}" class="ml-3 text-sm text-gray-600">${variety}</label>
               </div>
            `;
        });
    }
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
    // Persist cart
    try {
        localStorage.setItem('sithaphal-cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('Unable to persist cart to localStorage', e);
    }
}

// Load cart from localStorage on init
try {
    const storedCart = localStorage.getItem('sithaphal-cart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
} catch (e) {
    console.warn('Unable to load cart from localStorage', e);
}

// --- AI Chatbot Configuration ---
const chatModal = document.getElementById('chat-modal');
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const chatIcon = document.getElementById('chat-icon');
const closeChat = document.getElementById('close-chat');
const chatWindow = document.getElementById('chat-window');

// Gemini API Configuration
const apiKey = 'YOUR_GEMINI_API_KEY'; // Replace with your actual API key
const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`;
let chatHistory = [];

// Initialize chat when DOM is loaded
if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', initializeChat);
}

// --- AI Chatbot Logic ---
function addMessage(message, sender) {
    if (!chatMessages) return null;
    
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    
    // Add message content with line breaks
    const messageContent = document.createElement('div');
    messageContent.innerHTML = message.replace(/\n/g, '<br>');
    messageElement.appendChild(messageContent);
    
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.classList.add('timestamp');
    timestamp.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    messageElement.appendChild(timestamp);
    
    // Add to chat
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    return messageElement;
}

function addLoadingIndicator() {
    if (!chatMessages) return null;
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingIndicator;
}

function removeLoadingIndicator(typingIndicator) {
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Initialize chat functionality
function initializeChat() {
    if (!chatIcon || !chatModal || !chatForm || !chatInput) return;
    
    // Toggle chat modal
    chatIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        chatModal.classList.toggle('visible');
        if (chatModal.classList.contains('visible')) {
            chatInput.focus();
        }
    });
    
    // Close chat button
    if (closeChat) {
        closeChat.addEventListener('click', (e) => {
            e.stopPropagation();
            chatModal.classList.remove('visible');
        });
    }
    
    // Handle form submission
    chatForm.addEventListener('submit', handleChatSubmit);
    
    // Close chat when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatModal.contains(e.target) && !chatIcon.contains(e.target)) {
            chatModal.classList.remove('visible');
        }
    });
    
    // Prevent clicks inside chat from closing it
    chatModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Handle chat form submission
async function handleChatSubmit(e) {
    e.preventDefault();
    
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    
    // Clear input
    chatInput.value = '';
    
    // Add user message to chat
    addMessage(userMessage, 'user');
    
    // Show typing indicator
    const typingIndicator = addLoadingIndicator();
    
    try {
        // Add user message to chat history
        chatHistory.push({
            role: 'user',
            parts: [{ text: userMessage }]
        });
        
        // Call Gemini API
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    role: 'user',
                    parts: [{ text: userMessage }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40
                }
            })
        });
        
        // Remove typing indicator
        removeLoadingIndicator(typingIndicator);
        
        if (!response.ok) {
            throw new Error(`API request failed with status ${response.status}`);
        }
        
        const data = await response.json();
        const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                         "I'm sorry, I couldn't process your request. Please try again.";
        
        // Add bot response to chat
        addMessage(botResponse, 'bot');
        
        // Add to chat history
        chatHistory.push({
            role: 'model',
            parts: [{ text: botResponse }]
        });
        
    } catch (error) {
        console.error('Chat error:', error);
        removeLoadingIndicator(typingIndicator);
        addMessage("I'm having trouble connecting to the server. Please try again later.", 'bot');
    }
}
            chatHistory.push({ role: "model", parts: [{ text: botResponse }] });
        } else {
            addMessage("Sorry, I couldn't get a response. Please try again.", 'bot');
        }
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        removeLoadingIndicator(typingIndicator);
        addMessage("Sorry, something went wrong. Please check the console for details.", 'bot');
    }
}

function addLoadingIndicator() {
    if (!chatMessages) return;
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'typing-indicator';
    typingIndicator.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return typingIndicator;
}

function removeLoadingIndicator(typingIndicator) {
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// --- Recipe Generator Logic ---
async function handleRecipeGeneration() {
    if (!recipeModal || !recipeContent) return;
    recipeModal.classList.remove('hidden');
    recipeContent.innerHTML = '<div class="flex justify-center items-center h-full"><div class="loader"></div></div>';
    
    const prompt = "Generate 3 unique and delicious recipes using custard apple (Sithaphal). For each recipe, provide a name, a list of ingredients, and step-by-step instructions.";
    const schema = {
        type: "ARRAY",
        items: {
            type: "OBJECT",
            properties: {
                recipe_name: { type: "STRING" },
                ingredients: { type: "ARRAY", items: { type: "STRING" } },
                instructions: { type: "ARRAY", items: { type: "STRING" } }
            },
            required: ["recipe_name", "ingredients", "instructions"]
        }
    };
    
    const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
            responseMimeType: "application/json",
            responseSchema: schema
        }
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });
        const result = await response.json();
        
        if (result.candidates && result.candidates.length > 0) {
            const recipesJson = result.candidates[0].content.parts[0].text;
            const recipes = JSON.parse(recipesJson);
            displayRecipes(recipes);
        } else {
            recipeContent.innerHTML = '<p>Sorry, could not generate recipes at this time. Please try again later.</p>';
        }
    } catch (error) {
        console.error("Error generating recipes:", error);
        recipeContent.innerHTML = '<p>An error occurred. Please check the console for details.</p>';
    }
}

function displayRecipes(recipes) {
    if (!recipeContent) return;
    recipeContent.innerHTML = '';
    recipes.forEach(recipe => {
        const recipeEl = document.createElement('div');
        recipeEl.classList.add('mb-8');
        
        const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
        const instructionsList = recipe.instructions.map(step => `<li>${step}</li>`).join('');

        recipeEl.innerHTML = `
            <h5 class="text-2xl font-playfair text-green-700 mb-3">${recipe.recipe_name}</h5>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h6 class="font-bold text-lg mb-2">Ingredients:</h6>
                    <ul class="list-disc list-inside text-gray-700">${ingredientsList}</ul>
                </div>
                <div>
                    <h6 class="font-bold text-lg mb-2">Instructions:</h6>
                    <ol class="list-decimal list-inside text-gray-700 space-y-1">${instructionsList}</ol>
                </div>
            </div>
        `;
        recipeContent.appendChild(recipeEl);
    });
}

// --- Event Listeners Setup ---
function setupEventListeners() {
    if (homeLink) homeLink.addEventListener('click', (e) => { e.preventDefault(); showPage('main-content'); });
    if (homeLinkNav) homeLinkNav.addEventListener('click', (e) => { e.preventDefault(); showPage('main-content'); });
    if (productsLink) productsLink.addEventListener('click', (e) => { e.preventDefault(); showPage('products-page'); });
    if (sortBy) sortBy.addEventListener('change', applyFilters);
    if (priceRange) priceRange.addEventListener('input', () => {
        if(priceValue) priceValue.textContent = `$${priceRange.value}`;
        applyFilters();
    });
    if (varietyFiltersContainer) varietyFiltersContainer.addEventListener('change', applyFilters);
    if (quantityFilters) quantityFilters.addEventListener('change', applyFilters);
    if (productList) productList.addEventListener('click', (e) => {
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
            renderProducts(allProducts);
        } else if (minusBtn || plusBtn) {
            const productId = parseInt(e.target.closest('.cart-controls').dataset.id);
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                cartItem.quantity += plusBtn ? 1 : -1;
                if (cartItem.quantity <= 0) {
                    cart = cart.filter(item => item.id !== productId);
                }
                updateCart();
                renderProducts(allProducts);
            }
        }
    });
    if (profileButton) profileButton.addEventListener('click', () => profileDropdown.classList.toggle('hidden'));
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (profileButton && profileDropdown && !profileButton.contains(e.target) && !profileDropdown.contains(e.target)) {
            profileDropdown.classList.add('hidden');
        }
    });
    
    // Auth form tabs
    if (signinTab) signinTab.addEventListener('click', () => {
        signinTab.classList.add('text-green-600', 'border-b-2', 'border-green-600');
        signinTab.classList.remove('text-gray-500');
        signupTab.classList.add('text-gray-500');
        signupTab.classList.remove('text-green-600', 'border-b-2', 'border-green-600');
        signinForm.classList.remove('hidden');
        signupForm.classList.add('hidden');
    });
    
    if (signupTab) signupTab.addEventListener('click', () => {
        signupTab.classList.add('text-green-600', 'border-b-2', 'border-green-600');
        signupTab.classList.remove('text-gray-500');
        signinTab.classList.add('text-gray-500');
        signinTab.classList.remove('text-green-600', 'border-b-2', 'border-green-600');
        signupForm.classList.remove('hidden');
        signinForm.classList.add('hidden');
    });
    
    // Auth form submissions
    if (signinForm) signinForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate successful login
        isLoggedIn = true;
        updateProfileDropdown();
        showPage(lastPageBeforeAuth);
    });
    
    if (signupForm) signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Simulate successful signup
        isLoggedIn = true;
        updateProfileDropdown();
        showPage(lastPageBeforeAuth);
    });
    if (cartButton) cartButton.addEventListener('click', () => cartModal.classList.remove('hidden'));
    if (closeCartButton) closeCartButton.addEventListener('click', () => cartModal.classList.add('hidden'));
    if (checkoutButton) checkoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (cart.length > 0) {
            try { localStorage.setItem('sithaphal-cart', JSON.stringify(cart)); } catch {}
            window.location.href = 'payment.html';
        }
    });
    if (cancelPaymentButton) cancelPaymentButton.addEventListener('click', () => paymentModal.classList.add('hidden'));
    if (paymentForm) paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Payment successful! Thank you for your order.');
        paymentModal.classList.add('hidden');
        cart = [];
        updateCart();
    });
    if (chatIcon) chatIcon.addEventListener('click', () => {
        chatWindow.classList.toggle('hidden');
        if (chatMessages && chatMessages.children.length === 0) {
             addMessage('Hello! Welcome to Sithaphal. How can I help you today?', 'bot');
        }
    });
    if (closeChat) closeChat.addEventListener('click', () => chatWindow.classList.add('hidden'));
    if (chatForm) chatForm.addEventListener('submit', handleChatSubmit);
    if (getRecipesBtn) getRecipesBtn.addEventListener('click', handleRecipeGeneration);
    if (closeRecipeBtn) closeRecipeBtn.addEventListener('click', () => recipeModal.classList.add('hidden'));
}

// --- Initial Page Load ---
function initializeApp() {
    updateCart();
    updateProfileDropdown();
    setupEventListeners();
    applyFilters();
    
    // Initialize chat functionality
    if (chatIcon && chatModal && closeChat && chatForm) {
        // Toggle chat modal
        chatIcon.addEventListener('click', () => {
            chatModal.classList.toggle('hidden');
        });
        
        // Close chat
        closeChat.addEventListener('click', () => {
            chatModal.classList.add('hidden');
        });
        
        // Handle chat form submission
        chatForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const userMessage = chatInput.value.trim();
            if (!userMessage) return;
            
            // Add user message to chat
            addMessage(userMessage, 'user');
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.id = 'typing-indicator';
            typingIndicator.className = 'flex space-x-1 p-2';
            typingIndicator.innerHTML = `
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            try {
                // Add user message to chat history
                chatHistory.push({
                    role: 'user',
                    parts: [{ text: userMessage }]
                });
                
                // Call Gemini API
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            role: 'user',
                            parts: [{ text: userMessage }]
                        }]
                    })
                });
                
                // Remove typing indicator
                const indicator = document.getElementById('typing-indicator');
                if (indicator) indicator.remove();
                
                if (!response.ok) {
                    throw new Error('Failed to get response from AI');
                }
                
                const data = await response.json();
                const botResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process your request. Please try again.";
                
                // Add bot response to chat
                addMessage(botResponse, 'bot');
                
                // Add to chat history
                chatHistory.push({
                    role: 'model',
                    parts: [{ text: botResponse }]
                });
                
            } catch (error) {
                console.error('Chat error:', error);
                // Remove typing indicator on error
                const indicator = document.getElementById('typing-indicator');
                if (indicator) indicator.remove();
                
                // Show error message
                addMessage("I'm having trouble connecting to the server. Please try again later.", 'bot');
            }
        });
    }    updateCart();
    showPage('main-content'); // Start on the home page
}

initializeApp();

// --- Parallax Scroll Effect for Sithaphal ---
function initParallax() {
    const parallaxSithaphal = document.getElementById('parallax-sithaphal');
    
    if (!parallaxSithaphal) {
        console.log('Parallax element not found, retrying...');
        setTimeout(initParallax, 100);
        return;
    }
    
    console.log('Parallax element found, initializing...');
    
    function updateParallax() {
        const scrollY = window.scrollY;
        
        // Calculate rotation based on scroll position
        const rotation = scrollY * 0.3; // Rotation speed
        const scale = 1 + (scrollY * 0.0003); // Scale effect
        const translateY = scrollY * 0.2; // Parallax movement
        
        // Apply transformations with proper CSS
        parallaxSithaphal.style.transform = `translateY(${translateY}px) rotate(${rotation}deg) scale(${scale})`;
        parallaxSithaphal.style.transformOrigin = 'center center';
        
        console.log(`Scroll: ${scrollY}, Rotation: ${rotation}deg`);
    }

    // Throttled scroll event for better performance
    let ticking = false;
    function handleScroll() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    }

    window.addEventListener('scroll', handleScroll);
    updateParallax(); // Initialize
}

// Initialize parallax after DOM is ready
document.addEventListener('DOMContentLoaded', initParallax);
// Also try immediate initialization
initParallax();

// Add parallax effect to Sithaphal image
function addParallaxEffect() {
    const sithaphalImage = document.getElementById('sithaphal-image');
    if (!sithaphalImage) return;

    let ticking = false;
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        const scale = 1 + (scrolled * 0.0005);
        
        sithaphalImage.style.transform = `translateY(${parallax}px) scale(${scale})`;
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick);
}

// Animated Counter Function
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;

            // Lower inc to slow and higher to slow
            const inc = target / speed;

            // Check if target is reached
            if (count < target) {
                // Add inc to count and output in counter
                counter.innerText = Math.ceil(count + inc);
                // Call function every ms
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    });
}

// Initialize animations and features when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Initialize parallax effect if function exists
    if (typeof addParallaxEffect === 'function') {
        addParallaxEffect();
    }
    
    // Initialize counters if function exists
    if (typeof animateCounters === 'function') {
        animateCounters();
    }
    
    // Initialize chat
    initializeChat();
});
