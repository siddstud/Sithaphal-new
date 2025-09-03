'use client'

interface ProductFiltersProps {
  sortBy: string
  setSortBy: (value: string) => void
  priceRange: number
  setPriceRange: (value: number) => void
  selectedVarieties: string[]
  setSelectedVarieties: (varieties: string[]) => void
  selectedQuantities: string[]
  setSelectedQuantities: (quantities: string[]) => void
}

export default function ProductFilters({
  sortBy,
  setSortBy,
  priceRange,
  setPriceRange,
  selectedVarieties,
  setSelectedVarieties,
  selectedQuantities,
  setSelectedQuantities
}: ProductFiltersProps) {
  const varieties = ['Organic', 'Standard', 'Jumbo', 'Sweetest']
  const quantities = ['single', 'pack']

  const handleVarietyChange = (variety: string) => {
    if (selectedVarieties.includes(variety)) {
      setSelectedVarieties(selectedVarieties.filter(v => v !== variety))
    } else {
      setSelectedVarieties([...selectedVarieties, variety])
    }
  }

  const handleQuantityChange = (quantity: string) => {
    if (selectedQuantities.includes(quantity)) {
      setSelectedQuantities(selectedQuantities.filter(q => q !== quantity))
    } else {
      setSelectedQuantities([...selectedQuantities, quantity])
    }
  }

  return (
    <aside className="lg:col-span-1 bg-gray-50 p-6 rounded-lg shadow-md h-fit">
      <h3 className="text-2xl font-playfair text-green-800 mb-6">Filters</h3>
      
      {/* Sort By */}
      <div className="mb-6">
        <label htmlFor="sort-by" className="block text-sm font-medium text-gray-700 mb-2">
          Sort by
        </label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border-gray-300 rounded-md shadow-sm focus:border-green-500 focus:ring-green-500"
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <input
          type="range"
          id="price-range"
          min="0"
          max="30"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-600 mt-2">
          <span>$0</span>
          <span>${priceRange}</span>
        </div>
      </div>

      {/* Varieties */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Varieties</h4>
        <div className="space-y-2">
          {varieties.map((variety) => (
            <div key={variety} className="flex items-center">
              <input
                id={`var-${variety}`}
                type="checkbox"
                checked={selectedVarieties.includes(variety)}
                onChange={() => handleVarietyChange(variety)}
                className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
              />
              <label htmlFor={`var-${variety}`} className="ml-3 text-sm text-gray-600">
                {variety}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Quantity */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Quantity</h4>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="qty-single"
              type="checkbox"
              checked={selectedQuantities.includes('single')}
              onChange={() => handleQuantityChange('single')}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="qty-single" className="ml-3 text-sm text-gray-600">
              Single Fruit
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="qty-pack"
              type="checkbox"
              checked={selectedQuantities.includes('pack')}
              onChange={() => handleQuantityChange('pack')}
              className="h-4 w-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label htmlFor="qty-pack" className="ml-3 text-sm text-gray-600">
              Pack (3+)
            </label>
          </div>
        </div>
      </div>
    </aside>
  )
}
