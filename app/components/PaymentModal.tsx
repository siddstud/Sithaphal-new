'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

export default function PaymentModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvc: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Payment successful! Thank you for your order.')
    setIsOpen(false)
    setFormData({ cardNumber: '', expiryMonth: '', expiryYear: '', cvc: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="p-6">
          <h4 className="text-2xl font-playfair text-green-800 mb-4">Secure Checkout</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                Card Number
              </label>
              <input
                type="text"
                id="card-number"
                value={formData.cardNumber}
                onChange={(e) => setFormData({...formData, cardNumber: e.target.value})}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                placeholder="•••• •••• •••• ••••"
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="expiry-month" className="block text-sm font-medium text-gray-700">
                  Month
                </label>
                <input
                  type="text"
                  id="expiry-month"
                  value={formData.expiryMonth}
                  onChange={(e) => setFormData({...formData, expiryMonth: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="MM"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <label htmlFor="expiry-year" className="block text-sm font-medium text-gray-700">
                  Year
                </label>
                <input
                  type="text"
                  id="expiry-year"
                  value={formData.expiryYear}
                  onChange={(e) => setFormData({...formData, expiryYear: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="YY"
                  maxLength={2}
                  required
                />
              </div>
              <div>
                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
                  CVC
                </label>
                <input
                  type="text"
                  id="cvc"
                  value={formData.cvc}
                  onChange={(e) => setFormData({...formData, cvc: e.target.value})}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500"
                  placeholder="•••"
                  maxLength={3}
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full btn-primary py-3 rounded-lg">
              Pay Now
            </button>
            <button 
              type="button" 
              onClick={() => setIsOpen(false)}
              className="w-full bg-gray-200 text-gray-800 py-3 rounded-lg mt-2 hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
