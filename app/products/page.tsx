'use client'

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import ProductFilters from '../components/ProductFilters'
import CartModal from '../components/CartModal'
import { Product } from '../context/CartContext'

const allProducts: Product[] = [
  { id: 1, name: 'Organic', price: 5.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Organic', quantityType: 'single' },
  { id: 2, name: 'Family Pack', price: 19.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Standard', quantityType: 'pack' },
  { id: 3, name: 'Jumbo', price: 8.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Jumbo', quantityType: 'single' },
  { id: 4, name: 'Sweetest', price: 7.49, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Sweetest', quantityType: 'single' },
  { id: 5, name: 'Organic Pack', price: 22.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Organic', quantityType: 'pack' },
  { id: 6, name: 'Jumbo Pack', price: 25.99, image: 'https://i.imgur.com/8L1pX3S.png', variety: 'Jumbo', quantityType: 'pack' },
]

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [priceRange, setPriceRange] = useState(30)
  const [selectedVarieties, setSelectedVarieties] = useState<string[]>([])
  const [selectedQuantities, setSelectedQuantities] = useState<string[]>([])

  useEffect(() => {
    let filtered = [...allProducts]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.variety.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Price filter
    filtered = filtered.filter(product => product.price <= priceRange)

    // Variety filter
    if (selectedVarieties.length > 0) {
      filtered = filtered.filter(product => selectedVarieties.includes(product.variety))
    }

    // Quantity filter
    if (selectedQuantities.length > 0) {
      filtered = filtered.filter(product => selectedQuantities.includes(product.quantityType))
    }

    // Sort
    if (sortBy === 'price-asc') {
      filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-desc') {
      filtered.sort((a, b) => b.price - a.price)
    }

    setFilteredProducts(filtered)
  }, [searchTerm, sortBy, priceRange, selectedVarieties, selectedQuantities])

  return (
    <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-4xl font-playfair text-green-800">
                Our Premium Sithaphal Collection
              </h1>
              <div className="relative w-64">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                <svg 
                  className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              <ProductFilters
                sortBy={sortBy}
                setSortBy={setSortBy}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                selectedVarieties={selectedVarieties}
                setSelectedVarieties={setSelectedVarieties}
                selectedQuantities={selectedQuantities}
                setSelectedQuantities={setSelectedQuantities}
              />
              
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredProducts.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500">
                      No products match your filters.
                    </p>
                  ) : (
                    filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
        <CartModal />
      </div>
  )
}
