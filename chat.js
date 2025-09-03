// Chat functionality for Sithaphal website

// DOM Elements
let chatIcon, chatModal, closeChat, chatForm, chatInput, chatMessages;

// Initialize chat elements
function initChatElements() {
    // Get DOM elements
    chatIcon = document.getElementById('chat-icon');
    chatModal = document.getElementById('chat-modal');
    closeChat = document.getElementById('close-chat');
    chatForm = document.getElementById('chat-form');
    chatInput = document.getElementById('chat-input');
    chatMessages = document.getElementById('chat-messages');
    
    // Check if all required elements exist
    if (!chatIcon || !chatModal || !closeChat || !chatForm || !chatInput || !chatMessages) {
        console.error('One or more chat elements not found');
        return false;
    }
    return true;
}

// Initialize chat when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    if (!initChatElements()) {
        console.error('Failed to initialize chat elements');
        return;
    }
    
    // Add welcome message if chat is empty
    if (chatMessages.children.length === 0) {
        addMessage('Hello! How can I help you with Sithaphal today?', 'bot');
    }
    
    // Toggle chat modal
    chatIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        chatModal.classList.toggle('hidden');
        chatModal.classList.toggle('visible');
        if (!chatModal.classList.contains('hidden')) {
            chatInput.focus();
        }
    });
    
    // Close chat modal
    closeChat.addEventListener('click', (e) => {
        e.stopPropagation();
        chatModal.classList.add('hidden');
        chatModal.classList.remove('visible');
    });
    
    // Close modal when clicking outside
    document.addEventListener('click', (e) => {
        if (!chatModal.contains(e.target) && !chatIcon.contains(e.target)) {
            chatModal.classList.add('hidden');
        }
    });

    // Prevent clicks inside modal from closing it
    chatModal.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Add a new message to the chat
    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        
        // Auto-scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
    
    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return typingDiv;
    }
    
    // Remove typing indicator
    function removeTypingIndicator(indicator) {
        if (indicator && indicator.parentNode === chatMessages) {
            chatMessages.removeChild(indicator);
        }
    }
    
    // Handle chat form submission
    async function handleChatSubmit(e) {
        e.preventDefault();
        const message = chatInput.value.trim();
        if (!message) return;
        
        // Add user message
        addMessage(message, 'user');
        chatInput.value = '';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();
        
        try {
            // Simulate bot response (replace with actual API call)
            setTimeout(() => {
                removeTypingIndicator(typingIndicator);
                const responses = [
                    "I'm here to help with all things Sithaphal! What would you like to know?",
                    "That's a great question! Let me find that information for you.",
                    "Thanks for your message! How can I assist you with Sithaphal today?",
                    "I'm happy to help! Could you tell me more about what you're looking for?"
                ];
                const randomResponse = responses[Math.floor(Math.random() * responses.length)];
                addMessage(randomResponse, 'bot');
            }, 1000 + Math.random() * 2000);
        } catch (error) {
            console.error('Error:', error);
            removeTypingIndicator(typingIndicator);
            addMessage("I'm sorry, I encountered an error. Please try again.", 'bot');
        }
    }

    // Add form submission handler
    chatForm.addEventListener('submit', handleChatSubmit);
});
