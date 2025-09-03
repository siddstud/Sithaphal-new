'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function Footer() {
  return (
    <footer id="contact" className="bg-gray-800 text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Subscription and Contact Info */}
          <div className="md:col-span-1">
            <h3 className="font-bold text-lg mb-4">Subscribe to our emails</h3>
            <form className="flex max-w-sm mx-auto md:mx-0">
              <input 
                type="email" 
                placeholder="Email" 
                className="w-full bg-gray-700 border-gray-600 text-white rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button 
                type="submit" 
                className="bg-green-600 hover:bg-green-700 rounded-r-md px-4 py-2 transition-colors"
              >
                <ArrowRight className="h-6 w-6" />
              </button>
            </form>
            <p className="mt-4 text-sm text-gray-400">Email: sithaphal.fresh@example.com</p>
            <p className="text-sm text-gray-400">Contact Info: +1 (555) 123-4567</p>
          </div>

          {/* Social Media */}
          <div className="md:col-span-1 md:text-center">
            <h3 className="font-bold text-lg mb-4">Follow Us</h3>
            <Link 
              href="#" 
              className="inline-flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.07 4.85-.07z"/>
              </svg>
              <span>@sithaphal_royal</span>
            </Link>
          </div>

          {/* WhatsApp Button */}
          <div className="md:col-span-1 md:text-right flex items-center justify-center md:justify-end">
            <Link 
              href="https://wa.me/19084993370" 
              target="_blank"
              className="inline-flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.267.655 4.398 1.907 6.18l-1.299 4.745 4.833-1.276z"/>
              </svg>
              <span>Chat on WhatsApp</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-400">Secure Payments</p>
            <div className="flex justify-center space-x-4 mt-2 text-2xl">
              <span>💳</span> <span>🔒</span> <span>🅿️</span> <span>📦</span>
            </div>
          </div>
          <div className="text-center text-sm text-gray-400">
            <div className="space-x-4">
              <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Refund Policy</Link>
              <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
            </div>
            <p className="mt-4">&copy; 2024 Sithaphal. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
