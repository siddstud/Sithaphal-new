'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function CartModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, cartTotal, updateQuantity, removeFromCart } = useCart()

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h4 className="text-2xl font-playfair text-green-800">Your Cart</h4>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-800 text-3xl leading-none"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="mt-6 max-h-64 overflow-y-auto">
            {cart.length === 0 ? (
              <p className="text-gray-600">Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center mb-4">
                  <div>
                    <h5 className="font-semibold">{item.name} Sithaphal</h5>
                    <p className="text-sm text-gray-600">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center"
                    >
                      +
                    </button>
                    <div className="font-semibold ml-4">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center font-bold text-lg">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button className="w-full btn-primary py-3 rounded-lg mt-6">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
