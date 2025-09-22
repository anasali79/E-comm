"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Filter, X, Heart } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { ProductGrid } from "@/components/product-grid"
import { ProductSorting } from "@/components/product-sorting"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { Pagination } from "@/components/pagination"
import { ProductDetailModal } from "@/components/product-detail-modal"
import { mockProducts } from "@/lib/mock-data"
import type { SortOption, FilterState, Product } from "@/lib/types"
import { Briefcase, MapPin, Plane, Globe, Camera } from "lucide-react"

export default function BagPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isResultsOpen, setIsResultsOpen] = useState(false)
  const [mobileFilteredProducts, setMobileFilteredProducts] = useState<Product[]>([])

  const [filters, setFilters] = useState<FilterState>(() => {
    const brands = searchParams.get("brands")?.split(",").filter(Boolean) || []
    const colors = searchParams.get("colors")?.split(",").filter(Boolean) || []
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || []
    const minPrice = Number.parseInt(searchParams.get("minPrice") || "0")
    const maxPrice = Number.parseInt(searchParams.get("maxPrice") || "500")

    return {
      categories,
      brands,
      colors,
      priceRange: [minPrice, maxPrice],
    }
  })

  const [sortBy, setSortBy] = useState<SortOption>(() => {
    return (searchParams.get("sort") as SortOption) || "name"
  })

  const [currentPage, setCurrentPage] = useState(() => {
    return Number.parseInt(searchParams.get("page") || "1")
  })

  const itemsPerPage = 6

  const handleMobileFiltersChange = (newFilters: FilterState) => {
    setFilters({ ...newFilters, categories: ['bags'] })
  }

  const handleFilterClick = () => {
    setIsFilterOpen(true)
  }

  const applyMobileFilters = () => {
    const filtered = bagProducts.filter((product) => {
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const colorMatch = filters.colors.length === 0 || product.colors.some((color) => filters.colors.includes(color))
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return brandMatch && colorMatch && priceMatch
    })

    setMobileFilteredProducts(filtered)
    setIsFilterOpen(false)
    setIsResultsOpen(true)
  }

  useEffect(() => {
    setIsVisible(true)
    setFilters({
      brands: [],
      colors: [],
      priceRange: [0, 15000],
      categories: []
    })
    
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","))
    if (filters.colors.length > 0) params.set("colors", filters.colors.join(","))
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","))
    if (filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] !== 500) params.set("maxPrice", filters.priceRange[1].toString())
    if (sortBy !== "name") params.set("sort", sortBy)
    if (currentPage !== 1) params.set("page", currentPage.toString())

    const newUrl = params.toString() ? `?${params.toString()}` : "/bag"
    router.replace(newUrl, { scroll: false })
  }, [filters, sortBy, currentPage, router])

  const bagProducts = mockProducts.filter(product => 
    product.category?.toLowerCase() === 'bags'
  )

  const filteredProducts = bagProducts.filter((product) => {
    const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
    const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
    const colorMatch = filters.colors.length === 0 || product.colors.some((color) => filters.colors.includes(color))
    const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

    return categoryMatch && brandMatch && colorMatch && priceMatch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price
      case "price-desc":
        return b.price - a.price
      case "rating":
        return b.ratingValue - a.ratingValue
      case "name":
      default:
        return a.name.localeCompare(b.name)
    }
  })

  useEffect(() => {
    if (currentPage > 1) {
      setCurrentPage(1)
    }
  }, [filters, sortBy])

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = sortedProducts.slice(startIndex, startIndex + itemsPerPage)

  const handleFiltersChange = (newFilters: FilterState) => {
    setFilters(newFilters)
  }

  const handleSortChange = (sort: SortOption) => {
    setSortBy(sort)
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileNavbar />
        
        {/* Mobile Hero Section */}
        <div className="bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white py-12">
          <div className="px-4 text-center">
            <h1 className="text-2xl font-bold mb-2">Designer Travel Bags</h1>
            <p className="text-sm">Discover premium bags for every journey</p>
          </div>
        </div>

        {/* Mobile Product Slider with Filter */}
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-medium text-gray-700">Bags Collection</h3>
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
              {bagProducts.slice(0, 5).map((product) => (
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
                    👜
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All Bags Grid */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <h3 className="text-sm font-medium text-gray-700 mb-4">All Bags</h3>
            <div className="grid grid-cols-2 gap-4">
              {bagProducts.map((product) => (
                <div 
                  key={product.id} 
                  className="bg-gray-50 rounded-xl p-3 border cursor-pointer hover:shadow-md transition-shadow"
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
                        👜
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
          </div>
        </div>

        {/* Filter Modal for Mobile */}
        {isFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50">
            <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Bags Filters</h2>
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
                  onFiltersChange={handleMobileFiltersChange}
                />
              </div>
              <div className="p-4 border-t">
                <button 
                  onClick={applyMobileFilters}
                  className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
                >
                  Apply Filters ({filters.brands.length + filters.colors.length} selected)
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
                <h2 className="text-lg font-bold">Filtered Bags</h2>
                <p className="text-sm text-gray-500">{mobileFilteredProducts.length} products found</p>
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
                {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 15000) && (
                  <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs">
                    ${filters.priceRange[0]} - ${filters.priceRange[1]}
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              {mobileFilteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">👜</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No bags found</h3>
                  <p className="text-gray-500">Try adjusting your filters to find more bags</p>
                  <button 
                    onClick={() => {
                      setFilters({
                        brands: [],
                        colors: [],
                        priceRange: [0, 15000],
                        categories: ['bags']
                      })
                      setMobileFilteredProducts(bagProducts)
                    }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
                  >
                    Clear Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {mobileFilteredProducts.map((product) => (
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
                            👜
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
        
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Layout with scrollable sidebar - Same as Home Page */}
      <div className="flex pt-8 mt-4">
        {/* Sidebar - scrolls with content */}
        <div className={`w-80 flex-shrink-0 pl-4 transition-all duration-700 delay-300 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}>
          <Sidebar 
            filters={filters} 
            onFiltersChange={handleFiltersChange} 
          />
        </div>

        {/* Main content area with hero banner and products */}
        <div className={`flex-1 pr-4 transition-all duration-700 delay-500 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
        }`}>
          {/* Travel & Lifestyle Bag Hero Section */}
          <div className="relative overflow-hidden bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 text-white">
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-6 left-6 w-20 h-8 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '0s', animationDuration: '4s' }}></div>
              <div className="absolute top-8 right-12 w-12 h-12 bg-white/15 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '3s' }}></div>
              <div className="absolute bottom-8 left-1/4 w-16 h-4 bg-white/10 rounded-full animate-pulse" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
              
              {/* Floating Travel/Lifestyle Icons */}
              <div className="absolute top-6 left-1/3 text-2xl opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '6s' }}>✈️</div>
              <div className="absolute bottom-6 right-1/3 text-xl opacity-25 animate-pulse" style={{ animationDelay: '3s', animationDuration: '4s' }}>🌍</div>
              <div className="absolute top-1/2 left-10 text-lg opacity-15 animate-bounce" style={{ animationDelay: '4s', animationDuration: '7s' }}>💼</div>
              <div className="absolute bottom-1/3 right-10 text-lg opacity-20 animate-pulse" style={{ animationDelay: '5s', animationDuration: '3s' }}>📷</div>
            </div>
            
            <div className="px-8 py-12">
              <div className={`flex items-center justify-between mt-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <div className="max-w-lg mt-4">
                  {/* Travel Badge */}
                  <div className="inline-flex items-center space-x-2 mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                    <Plane className="w-4 h-4 text-blue-300 animate-pulse" />
                    <span className="text-xs font-medium">Travel & Lifestyle</span>
                  </div>
                  
                  <h1 className="text-4xl font-bold mb-4 text-white leading-tight">
                    Designer Travel
                    <br />
                    Bags Collection
                  </h1>
                  <p className="text-white/90 mb-6 text-base">Discover premium bags for every journey and lifestyle adventure.</p>
                  <div className="inline-block">
                    <span className="text-white font-medium text-sm underline cursor-pointer hover:no-underline">
                      EXPLORE COLLECTION
                    </span>
                  </div>
                </div>

                <div className="hidden md:block mt-4 relative">
                  {/* Stats Section - Travel Theme */}
                  <div className="flex gap-4 mb-4">
                    {[
                      { icon: Globe, label: 'Global', value: '50+', color: 'text-blue-300' },
                      { icon: Heart, label: 'Loved', value: '10k+', color: 'text-pink-300' },
                      { icon: Camera, label: 'Styles', value: '100+', color: 'text-purple-300' }
                    ].map((stat, index) => {
                      const Icon = stat.icon
                      return (
                        <div 
                          key={index}
                          className={`bg-white/10 backdrop-blur-sm rounded-lg p-3 transition-all duration-300 hover:scale-105 hover:bg-white/20 cursor-pointer ${
                            hoveredStat === index ? 'shadow-2xl -rotate-2' : 'hover:shadow-lg'
                          }`}
                          onMouseEnter={() => setHoveredStat(index)}
                          onMouseLeave={() => setHoveredStat(null)}
                        >
                          <Icon className={`w-5 h-5 ${stat.color} mb-2 mx-auto ${hoveredStat === index ? 'animate-pulse' : ''}`} />
                          <div className="text-lg font-bold mb-1 text-center">{stat.value}</div>
                          <div className="text-xs text-blue-100 text-center">{stat.label}</div>
                        </div>
                      )
                    })}
                  </div>
                  
                  {/* Travel Bag Visual */}
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-2 text-4xl opacity-80">
                      <span className="animate-bounce" style={{ animationDuration: '2s' }}>🎒</span>
                      <span className="animate-pulse" style={{ animationDuration: '3s' }}>👜</span>
                    </div>
                    <div className="text-xs text-blue-100 mt-2">Travel in Style</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Content Section */}
          <div className="container mx-auto px-4 py-8">
            {/* Product Sorting */}
            <div className="hidden lg:flex items-center justify-between gap-2 mb-6">
              <p className="text-sm text-muted-foreground">
              </p>
              <ProductSorting sortBy={sortBy} onSortChange={handleSortChange} />
            </div>
            
            {/* Product Grid */}
            <ProductGrid products={paginatedProducts} selectedColors={filters.colors} />
            
            {/* Results Summary */}
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground">
                Showing {Math.min(startIndex + 1, sortedProducts.length)} - {Math.min(startIndex + itemsPerPage, sortedProducts.length)} of {sortedProducts.length} designer bags
              </p>
            </div>
            
            {/* Enhanced Pagination Section with MORE and Pagination side by side */}
            <div className="flex items-center gap-4 mt-8">

            

              {/* Pagination Container - stretched with reduced vertical padding */}
              <div className="bg-gray-100 rounded-lg py-1 px-2 w-full max-w-6xl gap-4 flex items-center justify-center">
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={Math.max(totalPages, 1)} 
                  onPageChange={setCurrentPage} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}