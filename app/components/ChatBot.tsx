'use client'

import { useState } from 'react'
import { MessageCircle, X, Send } from 'lucide-react'

interface Message {
  id: number
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: 'Hello! Welcome to Sithaphal. How can I help you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    // Simulate bot response - replace with actual AI integration
    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: getBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsLoading(false)
    }, 1000)
  }

  const getBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase()
    
    if (input.includes('price') || input.includes('cost')) {
      return 'Our Sithaphal prices range from $5.99 for single organic fruits to $25.99 for jumbo packs. Would you like to see our full product catalog?'
    } else if (input.includes('delivery') || input.includes('shipping')) {
      return 'We offer same-day delivery to ensure maximum freshness! Delivery is free for orders over $20.'
    } else if (input.includes('organic')) {
      return 'Yes! We offer premium organic Sithaphal that are naturally grown without pesticides. They\'re available in single fruits ($5.99) or family packs ($22.99).'
    } else if (input.includes('recipe') || input.includes('cook')) {
      return 'Sithaphal is delicious in smoothies, ice cream, and milkshakes! Try our AI recipe generator for creative ideas.'
    } else if (input.includes('nutrition') || input.includes('health')) {
      return 'Sithaphal is rich in antioxidants, provides natural energy, and supports heart health. Each 100g contains 94 calories, 2.1g protein, and 23.6g carbs.'
    } else {
      return 'Thank you for your question! Our Sithaphal are hand-picked for premium quality. Is there anything specific you\'d like to know about our products or services?'
    }
  }

  return (
    <>
      {/* Chat Icon */}
      <div className="chat-icon">
        <button
          onClick={() => setIsOpen(true)}
          className="cursor-pointer bg-green-600 p-3 rounded-full shadow-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle className="h-8 w-8 text-white" />
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window bg-white rounded-lg shadow-xl flex flex-col">
          <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h5 className="font-bold text-lg flex items-center gap-2">
              ✨ Sithaphal AI Assistant
            </h5>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto max-h-64">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-3 p-3 rounded-lg max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-green-100 ml-auto text-right'
                    : 'bg-gray-200 mr-auto'
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            ))}
            {isLoading && (
              <div className="bg-gray-200 mr-auto p-3 rounded-lg max-w-[80%]">
                <div className="loader"></div>
              </div>
            )}
          </div>
          
          <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question..."
              className="flex-1 border rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white rounded-r-md px-4 py-2 transition-colors"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
