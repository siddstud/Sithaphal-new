'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, User, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { cartCount } = useCart()

  return (
    <header className="fixed top-0 left-0 w-full bg-white bg-opacity-80 backdrop-blur-md z-50 shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-3xl font-playfair text-green-800 flex-shrink-0">
          Sithaphal
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8 ml-auto">
          <Link href="/" className="text-gray-600 hover:text-green-800 transition-colors">
            Home
          </Link>
          <Link href="/products" className="text-gray-600 hover:text-green-800 transition-colors">
            Products
          </Link>
          <Link href="/#about" className="text-gray-600 hover:text-green-800 transition-colors">
            About
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-green-800 transition-colors">
            Blog
          </Link>
          <Link href="/#contact" className="text-gray-600 hover:text-green-800 transition-colors">
            Contact
          </Link>
          
          {/* Cart Button */}
          <button className="relative p-2">
            <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-green-800 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          
          {/* Profile Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="p-2"
            >
              <User className="h-7 w-7 text-gray-600 hover:text-green-800 transition-colors" />
            </button>
            
            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-xl z-20">
                <Link href="/auth" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-gray-600" />
          ) : (
            <Menu className="h-6 w-6 text-gray-600" />
          )}
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden">
            <div className="px-6 py-4 space-y-4">
              <Link href="/" className="block text-gray-600 hover:text-green-800">
                Home
              </Link>
              <Link href="/products" className="block text-gray-600 hover:text-green-800">
                Products
              </Link>
              <Link href="/#about" className="block text-gray-600 hover:text-green-800">
                About
              </Link>
              <Link href="/blog" className="block text-gray-600 hover:text-green-800">
                Blog
              </Link>
              <Link href="/#contact" className="block text-gray-600 hover:text-green-800">
                Contact
              </Link>
              <Link href="/auth" className="block text-gray-600 hover:text-green-800">
                Sign In
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
