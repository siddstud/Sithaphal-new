'use client'

import Image from 'next/image'
import { Heart, Plus, Minus } from 'lucide-react'
import { useCart, Product } from '../context/CartContext'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart, addToCart, updateQuantity } = useCart()
  const cartItem = cart.find(item => item.id === product.id)

  return (
    <div className="product-container text-center transform hover:-translate-y-2 transition-all duration-300">
      <div className="product-card relative group bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="aspect-w-1 aspect-h-1 overflow-hidden h-64">
          <Image
            src={product.image}
            alt={`${product.name} Sithaphal`}
            width={400}
            height={300}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <button className="wishlist-btn absolute top-4 right-4 p-2.5 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-green-50">
          <Heart className="h-6 w-6 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </div>
      
      <div className="p-6 bg-white rounded-b-xl">
        <h4 className="text-2xl font-playfair text-gray-800 mb-2">
          {product.name} Sithaphal
        </h4>
        <div className="flex items-center justify-center mb-2">
          <div className="flex text-yellow-400">
            ★★★★☆
          </div>
          <span className="text-sm text-gray-600 ml-2">(4.0)</span>
        </div>
        <p className="text-2xl font-semibold text-green-600 mb-3">
          ${product.price.toFixed(2)}
        </p>
        
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Nutritional Value (per 100g):
          </p>
          <div className="grid grid-cols-3 gap-2 text-sm text-gray-600">
            <div className="bg-white p-2 rounded">
              <span className="block font-semibold">94</span>
              Calories
            </div>
            <div className="bg-white p-2 rounded">
              <span className="block font-semibold">2.1g</span>
              Protein
            </div>
            <div className="bg-white p-2 rounded">
              <span className="block font-semibold">23.6g</span>
              Carbs
            </div>
          </div>
        </div>
        
        <div className="cart-controls">
          {cartItem ? (
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity - 1)}
                className="bg-green-100 hover:bg-green-200 text-green-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Minus className="h-5 w-5" />
              </button>
              <span className="text-xl font-semibold text-gray-800">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, cartItem.quantity + 1)}
                className="bg-green-100 hover:bg-green-200 text-green-800 w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-300"
              >
                <Plus className="h-5 w-5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => addToCart(product)}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
