// Payment page JavaScript functionality

// DOM Elements
const sameAsShippingCheckbox = document.getElementById('sameAsShipping');
const billingForm = document.getElementById('billingForm');
const cardNumberInput = document.getElementById('cardNumber');
const expiryDateInput = document.getElementById('expiryDate');
const cvvInput = document.getElementById('cvv');
const cardBrand = document.getElementById('cardBrand');
const shippingRadios = document.querySelectorAll('input[name="shipping"]');
const shippingCostElement = document.getElementById('shippingCost');
const totalAmountElement = document.getElementById('totalAmount');
const completeOrderButton = document.getElementById('completeOrder');
const orderConfirmationModal = document.getElementById('orderConfirmationModal');
const paymentMethodRadios = document.querySelectorAll('input[name="paymentMethod"]');
const cardForm = document.getElementById('cardForm');

// Shipping costs
const shippingCosts = {
    standard: 5.99,
    express: 12.99,
    overnight: 24.99
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentPage();
    loadCartFromStorage();
});

function initializePaymentPage() {
    setupEventListeners();
    updatePaymentMethodDisplay();
    updateOrderTotal();
    setupFormValidation();
}

function setupEventListeners() {
    // Billing address toggle
    if (sameAsShippingCheckbox) {
        sameAsShippingCheckbox.addEventListener('change', toggleBillingForm);
    }

    // Card number formatting and validation
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', formatCardNumber);
        cardNumberInput.addEventListener('input', detectCardBrand);
        cardNumberInput.classList.add('card-input');
    }

    // Expiry date formatting
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', formatExpiryDate);
    }

    // CVV validation
    if (cvvInput) {
        cvvInput.addEventListener('input', formatCVV);
    }

    // Shipping method change
    shippingRadios.forEach(radio => {
        radio.addEventListener('change', updateOrderTotal);
    });

    // Payment method change
    paymentMethodRadios.forEach(radio => {
        radio.addEventListener('change', updatePaymentMethodDisplay);
    });

    // Complete order with ripple effect
    if (completeOrderButton) {
        completeOrderButton.classList.add('btn-ripple');
        completeOrderButton.addEventListener('click', processOrderWithAnimation);
    }

    // Form validation on input with micro-interactions
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        input.addEventListener('focus', addFocusEffect);
        input.addEventListener('blur', removeFocusEffect);
    });

    // Add security badge pulse animation
    const securityBadges = document.querySelectorAll('.flex.items-center.space-x-2 img');
    securityBadges.forEach(badge => {
        badge.classList.add('security-badge');
    });

    // Add hover effects to payment method cards
    const paymentCards = document.querySelectorAll('.payment-method-card');
    paymentCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-2px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

function toggleBillingForm() {
    if (billingForm) {
        if (sameAsShippingCheckbox.checked) {
            billingForm.classList.add('hidden');
        } else {
            billingForm.classList.remove('hidden');
        }
    }
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    if (formattedValue.length > 19) {
        formattedValue = formattedValue.substring(0, 19);
    }
    
    e.target.value = formattedValue;
}

function detectCardBrand(e) {
    const value = e.target.value.replace(/\s+/g, '');
    let brand = '';
    
    if (/^4/.test(value)) {
        brand = 'visa';
        cardBrand.style.background = 'linear-gradient(45deg, #1a1f71, #0f3460)';
        cardBrand.innerHTML = '<span style="color: white; font-size: 10px; font-weight: bold;">VISA</span>';
    } else if (/^5[1-5]/.test(value) || /^2[2-7]/.test(value)) {
        brand = 'mastercard';
        cardBrand.style.background = 'linear-gradient(45deg, #eb001b, #f79e1b)';
        cardBrand.innerHTML = '<span style="color: white; font-size: 8px; font-weight: bold;">MC</span>';
    } else if (/^3[47]/.test(value)) {
        brand = 'amex';
        cardBrand.style.background = 'linear-gradient(45deg, #006fcf, #0077a6)';
        cardBrand.innerHTML = '<span style="color: white; font-size: 8px; font-weight: bold;">AMEX</span>';
    } else if (/^6/.test(value)) {
        brand = 'discover';
        cardBrand.style.background = 'linear-gradient(45deg, #ff6000, #ff9500)';
        cardBrand.innerHTML = '<span style="color: white; font-size: 7px; font-weight: bold;">DISC</span>';
    } else {
        cardBrand.style.background = '#e5e7eb';
        cardBrand.innerHTML = '';
    }
}

function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    e.target.value = value;
}

function formatCVV(e) {
    let value = e.target.value.replace(/\D/g, '');
    e.target.value = value.substring(0, 4);
}

function updatePaymentMethodDisplay() {
    const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    // Update payment method card styling
    document.querySelectorAll('.payment-method-card').forEach(card => {
        const input = card.querySelector('input[type="radio"]');
        if (input.checked) {
            card.classList.add('border-green-500', 'bg-green-50');
            card.classList.remove('border-gray-200');
        } else {
            card.classList.remove('border-green-500', 'bg-green-50');
            card.classList.add('border-gray-200');
        }
    });

    // Show/hide card form
    if (cardForm) {
        if (selectedMethod === 'card') {
            cardForm.classList.remove('hidden');
        } else {
            cardForm.classList.add('hidden');
        }
    }
}

function updateOrderTotal() {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
    const shippingCost = shippingCosts[selectedShipping];
    
    // Get current subtotal from UI
    const subtotalElement = document.querySelector('.space-y-3 .flex:first-child span:last-child');
    const subtotal = subtotalElement ? parseFloat(subtotalElement.textContent.replace('$', '')) : 34.97;
    
    const tax = subtotal * 0.0875; // 8.75% tax rate
    
    // Check if there's a discount applied
    const discountRow = document.querySelector('.discount-row');
    let discountAmount = 0;
    if (discountRow) {
        const discountText = discountRow.querySelector('span:last-child').textContent;
        discountAmount = parseFloat(discountText.replace('-$', ''));
    }
    
    const total = subtotal + shippingCost + tax - discountAmount;

    if (shippingCostElement) {
        shippingCostElement.textContent = `$${shippingCost.toFixed(2)}`;
    }
    
    // Update tax display
    const taxElement = document.querySelector('.space-y-3 .flex:nth-child(3) span:last-child');
    if (taxElement) {
        taxElement.textContent = `$${tax.toFixed(2)}`;
    }
    
    if (totalAmountElement) {
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
    }
}

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    
    // Remove existing error styling
    clearFieldError(e);
    
    // Validate required fields
    if (field.hasAttribute('required') && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Card number validation
    if (field.id === 'cardNumber' && value) {
        const cardNumber = value.replace(/\s/g, '');
        if (cardNumber.length < 13 || cardNumber.length > 19) {
            showFieldError(field, 'Please enter a valid card number');
            return false;
        }
        
        // Luhn algorithm validation
        if (!isValidCardNumber(cardNumber)) {
            showFieldError(field, 'Please enter a valid card number');
            return false;
        }
    }
    
    // Expiry date validation
    if (field.id === 'expiryDate' && value) {
        const [month, year] = value.split('/');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear() % 100;
        const currentMonth = currentDate.getMonth() + 1;
        
        if (!month || !year || month < 1 || month > 12) {
            showFieldError(field, 'Please enter a valid expiry date');
            return false;
        }
        
        if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
            showFieldError(field, 'Card has expired');
            return false;
        }
    }
    
    // CVV validation
    if (field.id === 'cvv' && value) {
        if (value.length < 3 || value.length > 4) {
            showFieldError(field, 'Please enter a valid CVV');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.classList.add('border-red-500', 'bg-red-50');
    field.classList.remove('border-gray-300');
    
    // Remove existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    field.parentNode.appendChild(errorDiv);
}

function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('border-red-500', 'bg-red-50');
    field.classList.add('border-gray-300');
    
    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

function isValidCardNumber(cardNumber) {
    // Luhn algorithm
    let sum = 0;
    let alternate = false;
    
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let n = parseInt(cardNumber.charAt(i), 10);
        
        if (alternate) {
            n *= 2;
            if (n > 9) {
                n = (n % 10) + 1;
            }
        }
        
        sum += n;
        alternate = !alternate;
    }
    
    return (sum % 10) === 0;
}

function validateForm() {
    const requiredFields = document.querySelectorAll('input[required]:not([style*="display: none"]):not(.hidden input)');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!validateField({ target: field })) {
            isValid = false;
        }
    });
    
    // Validate payment method specific fields
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    
    if (selectedPaymentMethod === 'card') {
        const cardFields = ['cardNumber', 'expiryDate', 'cvv', 'cardholderName'];
        cardFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && !validateField({ target: field })) {
                isValid = false;
            }
        });
    }
    
    return isValid;
}

function processOrder(e) {
    e.preventDefault();
    
    // Show loading state
    completeOrderButton.disabled = true;
    completeOrderButton.innerHTML = `
        <span class="flex items-center justify-center space-x-2">
            <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Processing...</span>
        </span>
    `;
    
    // Validate form
    if (!validateForm()) {
        // Reset button
        resetOrderButton();
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Simulate payment processing
    setTimeout(() => {
        // Reset button
        resetOrderButton();
        
        // Show success modal
        showOrderConfirmation();
        
        // Store order in localStorage (for demo purposes)
        const orderData = {
            orderId: 'SP-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
            date: new Date().toISOString(),
            total: totalAmountElement.textContent,
            items: [
                { name: 'Sweetest Sithaphal', quantity: 2, price: 14.98 },
                { name: 'Family Pack', quantity: 1, price: 19.99 }
            ]
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
    }, 2000);
}

function resetOrderButton() {
    completeOrderButton.disabled = false;
    completeOrderButton.innerHTML = `
        <span class="relative flex items-center justify-center space-x-2">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
            <span>Complete Order</span>
        </span>
    `;
}

function showOrderConfirmation() {
    if (orderConfirmationModal) {
        orderConfirmationModal.classList.remove('hidden');
        
        // Add animation
        const modalContent = orderConfirmationModal.querySelector('div > div');
        setTimeout(() => {
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
        }, 10);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            closeOrderConfirmation();
        }, 10000);
    }
}

function closeOrderConfirmation() {
    if (orderConfirmationModal) {
        const modalContent = orderConfirmationModal.querySelector('div > div');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        setTimeout(() => {
            orderConfirmationModal.classList.add('hidden');
        }, 300);
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
    
    if (type === 'error') {
        notification.classList.add('bg-red-500', 'text-white');
    } else if (type === 'success') {
        notification.classList.add('bg-green-500', 'text-white');
    } else {
        notification.classList.add('bg-blue-500', 'text-white');
    }
    
    notification.innerHTML = `
        <div class="flex items-center space-x-2">
            <span>${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-white hover:text-gray-200">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.classList.remove('translate-x-full');
    }, 10);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.add('translate-x-full');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

// Setup form validation
function setupFormValidation() {
    const form = document.querySelector('form') || document.body;
    
    // Prevent form submission on Enter key in input fields
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const nextInput = getNextInput(input);
                if (nextInput) {
                    nextInput.focus();
                } else {
                    completeOrderButton.click();
                }
            }
        });
    });
}

function getNextInput(currentInput) {
    const inputs = Array.from(document.querySelectorAll('input:not([type="hidden"]):not([disabled])'));
    const currentIndex = inputs.indexOf(currentInput);
    return inputs[currentIndex + 1] || null;
}

// Add focus effects for micro-interactions
function addFocusEffect(e) {
    const field = e.target;
    const container = field.closest('.form-field-container') || field.parentNode;
    
    // Add container class if it doesn't exist
    if (!container.classList.contains('form-field-container')) {
        container.classList.add('form-field-container');
    }
    
    container.classList.add('focused');
    
    // Add subtle scale animation
    field.style.transform = 'translateY(-1px)';
    field.style.boxShadow = '0 4px 12px rgba(16, 185, 129, 0.15)';
}

function removeFocusEffect(e) {
    const field = e.target;
    const container = field.closest('.form-field-container') || field.parentNode;
    
    container.classList.remove('focused');
    
    // Reset transform
    field.style.transform = '';
    field.style.boxShadow = '';
}

// Enhanced order processing with better animations
function processOrderWithAnimation(e) {
    e.preventDefault();
    
    // Add progress step animation
    const progressSteps = document.querySelectorAll('.progress-step');
    progressSteps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('completed');
        }, index * 200);
    });
    
    // Enhanced loading state with skeleton
    completeOrderButton.disabled = true;
    completeOrderButton.innerHTML = `
        <span class="flex items-center justify-center space-x-2">
            <div class="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Processing Payment...</span>
        </span>
    `;
    
    // Add loading skeleton to order summary
    const orderSummary = document.querySelector('.bg-white.rounded-xl.shadow-lg');
    if (orderSummary) {
        orderSummary.style.opacity = '0.7';
        orderSummary.style.pointerEvents = 'none';
    }
    
    // Validate form
    if (!validateForm()) {
        resetOrderButton();
        if (orderSummary) {
            orderSummary.style.opacity = '1';
            orderSummary.style.pointerEvents = 'auto';
        }
        showNotification('Please fill in all required fields correctly.', 'error');
        return;
    }
    
    // Simulate payment processing with realistic timing
    setTimeout(() => {
        // Reset button and order summary
        resetOrderButton();
        if (orderSummary) {
            orderSummary.style.opacity = '1';
            orderSummary.style.pointerEvents = 'auto';
        }
        
        // Show success modal with animation
        showOrderConfirmationWithAnimation();
        
        // Store order data
        const orderData = {
            orderId: 'SP-2024-' + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
            date: new Date().toISOString(),
            total: totalAmountElement.textContent,
            items: getCartItemsFromUI()
        };
        
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        
    }, 2500); // More realistic processing time
}

function showOrderConfirmationWithAnimation() {
    if (orderConfirmationModal) {
        orderConfirmationModal.classList.remove('hidden');
        
        // Enhanced modal animation
        const modalContent = orderConfirmationModal.querySelector('div > div');
        modalContent.style.transform = 'scale(0.8) translateY(20px)';
        modalContent.style.opacity = '0';
        
        setTimeout(() => {
            modalContent.style.transform = 'scale(1) translateY(0)';
            modalContent.style.opacity = '1';
            modalContent.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Add success checkmark animation
            const checkmark = modalContent.querySelector('.text-green-600');
            if (checkmark) {
                checkmark.classList.add('success-checkmark');
            }
        }, 50);
        
        // Auto-close with countdown
        let countdown = 10;
        const countdownElement = document.createElement('div');
        countdownElement.className = 'text-sm text-gray-500 mt-2 text-center';
        countdownElement.textContent = `Auto-closing in ${countdown} seconds...`;
        modalContent.appendChild(countdownElement);
        
        const countdownInterval = setInterval(() => {
            countdown--;
            countdownElement.textContent = `Auto-closing in ${countdown} seconds...`;
            
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                closeOrderConfirmation();
            }
        }, 1000);
    }
}

function getCartItemsFromUI() {
    const cartItems = [];
    const itemElements = document.querySelectorAll('.space-y-4 > div');
    
    itemElements.forEach(item => {
        const name = item.querySelector('h4')?.textContent || '';
        const qtyText = item.querySelector('p')?.textContent || '';
        const quantity = parseInt(qtyText.replace('Qty: ', '')) || 1;
        const priceText = item.querySelector('span:last-child')?.textContent || '$0.00';
        const price = parseFloat(priceText.replace('$', '')) || 0;
        
        if (name) {
            cartItems.push({ name, quantity, price: price / quantity });
        }
    });
    
    return cartItems;
}

// Close modal when clicking outside
document.addEventListener('click', function(e) {
    if (e.target === orderConfirmationModal) {
        closeOrderConfirmation();
    }
});

// Promo code functionality
document.addEventListener('DOMContentLoaded', function() {
    const promoCodeInput = document.getElementById('promoCode');
    const applyPromoButton = promoCodeInput?.nextElementSibling;
    
    if (applyPromoButton) {
        applyPromoButton.addEventListener('click', function() {
            const code = promoCodeInput.value.trim().toUpperCase();
            
            if (code === 'SITHAPHAL10') {
                showNotification('Promo code applied! 10% discount added.', 'success');
                // Update totals with discount
                updateOrderTotalWithDiscount(0.1);
            } else if (code === 'WELCOME5') {
                showNotification('Welcome discount applied! $5 off your order.', 'success');
                updateOrderTotalWithDiscount(5, true);
            } else if (code) {
                showNotification('Invalid promo code. Please try again.', 'error');
            }
        });
    }
});

// Load cart data from localStorage and update UI
function loadCartFromStorage() {
    const savedCart = localStorage.getItem('sithaphal-cart');
    if (savedCart) {
        try {
            const cartData = JSON.parse(savedCart);
            updateOrderSummaryFromCart(cartData);
        } catch (error) {
            console.error('Error loading cart data:', error);
            // Use default cart items if localStorage is corrupted
            updateOrderSummaryFromCart([]);
        }
    }
}

function updateOrderSummaryFromCart(cartItems) {
    const cartItemsContainer = document.querySelector('.space-y-4');
    const checkoutBtn = document.getElementById('completeOrder');
    
    if (!cartItemsContainer) return;
    
    // Enable checkout button by default
    if (checkoutBtn) {
        checkoutBtn.disabled = false;
        checkoutBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
    
    // Clear existing items
    cartItemsContainer.innerHTML = '';
    
    let subtotal = 0;
    
    if (cartItems.length === 0) {
        // Show empty cart message
        cartItemsContainer.innerHTML = `
            <div class="text-center py-8">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Your cart is empty</h3>
                <p class="mt-1 text-sm text-gray-500">Add some items to your cart before checking out.</p>
                <div class="mt-6">
                    <a href="index.html" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                        </svg>
                        Continue Shopping
                    </a>
                </div>
            </div>
        `;
        
        // Disable checkout button if cart is empty
        const checkoutBtn = document.getElementById('completeOrder');
        if (checkoutBtn) {
            checkoutBtn.disabled = true;
            checkoutBtn.classList.add('opacity-50', 'cursor-not-allowed');
        }
        
        return;
    } else {
        // Render actual cart items
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            subtotal += itemTotal;
            
            cartItemsContainer.innerHTML += `
                <div class="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <img src="${item.image || 'Gemini_Generated_Image_8ssjtg8ssjtg8ssj.png'}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg">
                    <div class="flex-1">
                        <h4 class="font-medium text-gray-900">${item.name}</h4>
                        <p class="text-sm text-gray-600">Qty: ${item.quantity}</p>
                        <p class="text-xs text-gray-500">$${item.price.toFixed(2)} each</p>
                    </div>
                    <span class="font-medium text-gray-900">$${itemTotal.toFixed(2)}</span>
                </div>
            `;
        });
    }
    
    // Update subtotal in the order totals
    const subtotalElement = document.querySelector('.space-y-3 .flex:first-child span:last-child');
    if (subtotalElement) {
        subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    }
    
    // Recalculate total
    updateOrderTotal();
}

function updateOrderTotalWithDiscount(discount, isFixed = false) {
    const selectedShipping = document.querySelector('input[name="shipping"]:checked')?.value || 'standard';
    const shippingCost = shippingCosts[selectedShipping];
    
    // Get current subtotal from UI
    const subtotalElement = document.querySelector('.space-y-3 .flex:first-child span:last-child');
    const subtotal = subtotalElement ? parseFloat(subtotalElement.textContent.replace('$', '')) : 34.97;
    
    const tax = subtotal * 0.0875; // 8.75% tax rate
    
    let discountAmount = isFixed ? discount : subtotal * discount;
    const total = subtotal + shippingCost + tax - discountAmount;
    
    // Update tax display
    const taxElement = document.querySelector('.space-y-3 .flex:nth-child(3) span:last-child');
    if (taxElement) {
        taxElement.textContent = `$${tax.toFixed(2)}`;
    }
    
    // Add discount row if not exists
    const orderTotals = document.querySelector('.space-y-3');
    let discountRow = orderTotals.querySelector('.discount-row');
    
    if (!discountRow) {
        discountRow = document.createElement('div');
        discountRow.className = 'discount-row flex justify-between text-sm text-green-600';
        discountRow.innerHTML = `
            <span>Discount</span>
            <span>-$${discountAmount.toFixed(2)}</span>
        `;
        orderTotals.insertBefore(discountRow, orderTotals.querySelector('.border-t'));
    } else {
        discountRow.querySelector('span:last-child').textContent = `-$${discountAmount.toFixed(2)}`;
    }
    
    if (totalAmountElement) {
        totalAmountElement.textContent = `$${total.toFixed(2)}`;
    }
}
