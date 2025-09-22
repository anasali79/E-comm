"use client"

import { useState } from "react"
import { Filter, X, Heart } from "lucide-react"
import { Sidebar } from "@/components/sidebar"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { mockProducts } from "@/lib/mock-data"
import type { FilterState, Product } from "@/lib/types"

interface ProductSliderProps {
  onFilterOpen: () => void
}

export function ProductSlider({ onFilterOpen }: ProductSliderProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    brands: [],
    colors: [],
    priceRange: [0, 15000],
    categories: []
  })

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleFilterClick = () => {
    setIsFilterOpen(true)
    onFilterOpen()
  }

  const applyFilters = () => {
    // Filter products based on selected filters
    const filtered = mockProducts.filter((product) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const colorMatch = filters.colors.length === 0 || product.colors.some((color) => filters.colors.includes(color))
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return categoryMatch && brandMatch && colorMatch && priceMatch
    })

    setFilteredProducts(filtered)
    setIsFilterOpen(false)
    setIsResultsOpen(true)
  }

  return (
    <>
      <div className="px-4 py-4">
        {/* Compact Product Slider */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-700">Featured Products</h3>
            <button 
              onClick={handleFilterClick}
              className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
          
          {/* Mini Product Slider */}
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            {mockProducts.slice(0, 5).map((product) => (
              <div 
                key={product.id} 
                className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedProduct(product)}
              >
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="w-full h-full flex items-center justify-center text-2xl hidden">
                  {product.category === 'sneakers' ? '👟' : 
                   product.category === 'bags' ? '👜' : '👔'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter Modal for Mobile */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Filters</h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <Sidebar 
                filters={filters} 
                onFiltersChange={handleFiltersChange}
              />
            </div>
            <div className="p-4 border-t">
              <button 
                onClick={applyFilters}
                className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Apply Filters ({filters.brands.length + filters.colors.length + filters.categories.length} selected)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filtered Products Results Modal */}
      {isResultsOpen && (
        <div className="fixed inset-0 z-50 bg-white">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between shadow-sm">
            <div>
              <h2 className="text-lg font-bold">Filtered Products</h2>
              <p className="text-sm text-gray-500">{filteredProducts.length} products found</p>
            </div>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg text-sm"
              >
                <Filter className="w-4 h-4" />
                <span>Edit</span>
              </button>
              <button 
                onClick={() => setIsResultsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Applied Filters Display */}
          <div className="p-4 bg-gray-50 border-b">
            <div className="flex flex-wrap gap-2">
              {filters.brands.map((brand) => (
                <span key={brand} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                  {brand}
                </span>
              ))}
              {filters.colors.map((color) => (
                <span key={color} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                  {color}
                </span>
              ))}
              {filters.categories.map((category) => (
                <span key={category} className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                  {category}
                </span>
              ))}
              {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 15000) && (
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                  ${filters.priceRange[0]} - ${filters.priceRange[1]}
                </span>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters to find more products</p>
                <button 
                  onClick={() => {
                    setFilters({
                      brands: [],
                      colors: [],
                      priceRange: [0, 15000],
                      categories: []
                    })
                    setFilteredProducts(mockProducts)
                  }}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {filteredProducts.map((product) => (
                  <div 
                    key={product.id} 
                    className="bg-white rounded-xl p-3 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => setSelectedProduct(product)}
                  >
                    <div className="relative mb-3">
                      <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                        <img 
                          src={product.imageUrl} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            target.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                        <div className="w-full h-full flex items-center justify-center text-3xl hidden">
                          {product.category === 'sneakers' ? '👟' : 
                           product.category === 'bags' ? '👜' : '👔'}
                        </div>
                      </div>
                      <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                        <Heart className="w-3 h-3 text-gray-400" />
                      </button>
                      {product.isHot && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          Hot
                        </span>
                      )}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                        {product.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                          ${product.discountPrice || product.price}
                        </span>
                        {product.discountPrice && (
                          <>
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price}
                            </span>
                            <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
                              {product.discountPercent}% Off
                            </span>
                          </>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <span 
                              key={i} 
                              className={`text-xs ${
                                i < Math.floor(product.ratingValue) 
                                  ? 'text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500">({product.ratingCount})</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal 
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}