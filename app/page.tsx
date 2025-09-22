"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { MobileNavbar } from "@/components/mobile-navbar"
import { HeroSlider } from "@/components/hero-slider"
import { CategorySection } from "@/components/category-section"
import { ProductSlider } from "@/components/product-slider"
import { FlashSale } from "@/components/flash-sale"
import { MegaSale } from "@/components/mega-sale"
import { RecommendedProducts } from "@/components/recommended-products"
import { Footer } from "@/components/footer"
import { HeroBanner } from "@/components/hero-banner"
import { ProductListing } from "@/components/product-listing"
import { mockProducts } from "@/lib/mock-data"
import type { FilterState, SortOption } from "@/lib/types"

export default function HomePage() {
  const router = useRouter()
  const [searchParams, setSearchParams] = useState<URLSearchParams | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])

  const [filters, setFilters] = useState<FilterState>(() => {
    if (typeof window === 'undefined') {
      return {
        categories: [],
        brands: [],
        colors: [],
        priceRange: [0, 500],
      }
    }
    
    // We'll initialize this properly in useEffect
    return {
      categories: [],
      brands: [],
      colors: [],
      priceRange: [0, 500],
    }
  })

  const [sortBy, setSortBy] = useState<SortOption>(() => {
    if (typeof window === 'undefined') return "name"
    return "name"
  })

  const [currentPage, setCurrentPage] = useState(() => {
    if (typeof window === 'undefined') return 1
    return 1
  })

  useEffect(() => {
    // Initialize searchParams and filters after mount
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      setSearchParams(params)
      
      const brands = params.get("brands")?.split(",").filter(Boolean) || []
      const colors = params.get("colors")?.split(",").filter(Boolean) || []
      const categories = params.get("categories")?.split(",").filter(Boolean) || []
      const minPrice = Number.parseInt(params.get("minPrice") || "0")
      const maxPrice = Number.parseInt(params.get("maxPrice") || "500")
      const sort = (params.get("sort") as SortOption) || "name"
      const page = Number.parseInt(params.get("page") || "1")

      setFilters({
        categories,
        brands,
        colors,
        priceRange: [minPrice, maxPrice],
      })
      
      setSortBy(sort)
      setCurrentPage(page)
    }
  }, [])

  const updateFilters = (newFilters: FilterState) => {
    setFilters(newFilters)
    
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams()
    
    if (newFilters.brands.length > 0) params.set("brands", newFilters.brands.join(","))
    if (newFilters.colors.length > 0) params.set("colors", newFilters.colors.join(","))
    if (newFilters.categories.length > 0) params.set("categories", newFilters.categories.join(","))
    if (newFilters.priceRange[0] !== 0) params.set("minPrice", newFilters.priceRange[0].toString())
    if (newFilters.priceRange[1] !== 500) params.set("maxPrice", newFilters.priceRange[1].toString())
    if (sortBy !== "name") params.set("sort", sortBy)
    if (currentPage !== 1) params.set("page", currentPage.toString())
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/"
    router.replace(newUrl, { scroll: false })
  }

  const updateSortBy = (newSortBy: SortOption) => {
    setSortBy(newSortBy)
    
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams()
    
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","))
    if (filters.colors.length > 0) params.set("colors", filters.colors.join(","))
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","))
    if (filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] !== 500) params.set("maxPrice", filters.priceRange[1].toString())
    if (newSortBy !== "name") params.set("sort", newSortBy)
    if (currentPage !== 1) params.set("page", currentPage.toString())
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/"
    router.replace(newUrl, { scroll: false })
  }

  const updateCurrentPage = (newPage: number) => {
    setCurrentPage(newPage)
    
    if (typeof window === 'undefined') return
    
    const params = new URLSearchParams()
    
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","))
    if (filters.colors.length > 0) params.set("colors", filters.colors.join(","))
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","))
    if (filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] !== 500) params.set("maxPrice", filters.priceRange[1].toString())
    if (sortBy !== "name") params.set("sort", sortBy)
    if (newPage !== 1) params.set("page", newPage.toString())
    
    const newUrl = params.toString() ? `?${params.toString()}` : "/"
    router.replace(newUrl, { scroll: false })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkIsMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }
      
      checkIsMobile()
      window.addEventListener('resize', checkIsMobile)
      
      return () => window.removeEventListener('resize', checkIsMobile)
    }
  }, [])

  const handleCategoryClick = (category: string) => {
    let filtered: any[] = []
    
    switch (category) {
      case 'hot-deals':
        filtered = mockProducts.filter(product => 
          product.isHot || product.discountPrice || product.discountPercent
        )
        break
      case 'flash-sale':
        filtered = mockProducts.filter(product => 
          product.discountPercent && product.discountPercent >= 30
        )
        break
      case 'new-arrivals':
        filtered = mockProducts.slice(0, 8)
        break
      case 'top-rated':
        filtered = mockProducts.filter(product => 
          product.ratingValue >= 4.5
        )
        break
      default:
        filtered = []
    }
    
    setFilteredProducts(filtered)
    setSelectedCategory(category)
  }

  const closeCategoryView = () => {
    setSelectedCategory(null)
    setFilteredProducts([])
  }

  if (isMobile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <MobileNavbar />
        
        <HeroSlider />
        
        <div className="px-4 py-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold animate-bounce" style={{ color: '#40BFFF' }}>5k+</div>
                <div className="text-xs text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold animate-pulse" style={{ color: '#40BFFF' }}>24/7</div>
                <div className="text-xs text-gray-600">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold animate-ping" style={{ color: '#40BFFF' }}>Fast</div>
                <div className="text-xs text-gray-600">Delivery</div>
              </div>
            </div>
          </div>
        </div>
        
        <CategorySection />
        
        <div className="px-4 py-4">
          <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
            <button 
              onClick={() => handleCategoryClick('hot-deals')}
              className="flex-shrink-0 bg-gradient-to-r from-pink-400 to-red-400 rounded-2xl p-4 text-white min-w-32 transform hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95"
            >
              <div className="text-2xl mb-1">🔥</div>
              <div className="text-xs font-medium">Hot Deals</div>
            </button>
            <button 
              onClick={() => handleCategoryClick('flash-sale')}
              className="flex-shrink-0 bg-gradient-to-r from-green-400 to-blue-400 rounded-2xl p-4 text-white min-w-32 transform hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95"
            >
              <div className="text-2xl mb-1">⚡</div>
              <div className="text-xs font-medium">Flash Sale</div>
            </button>
            <button 
              onClick={() => handleCategoryClick('new-arrivals')}
              className="flex-shrink-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl p-4 text-white min-w-32 transform hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95"
            >
              <div className="text-2xl mb-1">🆕</div>
              <div className="text-xs font-medium">New Arrivals</div>
            </button>
            <button 
              onClick={() => handleCategoryClick('top-rated')}
              className="flex-shrink-0 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl p-4 text-white min-w-32 transform hover:scale-105 transition-transform duration-300 shadow-lg active:scale-95"
            >
              <div className="text-2xl mb-1">⭐</div>
              <div className="text-xs font-medium">Top Rated</div>
            </button>
          </div>
        </div>
        
        <ProductSlider onFilterOpen={() => setIsFilterOpen(true)} />
        
        <div className="px-4 py-4">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-lg font-bold mb-1">Premium Quality</div>
                  <div className="text-sm opacity-90">Guaranteed authentic products</div>
                </div>
                <div className="text-3xl animate-spin" style={{ animationDuration: '3s' }}>✨</div>
              </div>
            </div>
            <div className="absolute -right-4 -top-4 w-16 h-16 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
            <div className="absolute -left-2 -bottom-2 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        <FlashSale products={mockProducts.slice(0, 6)} />
        
        <div className="px-4 py-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Today's Progress</span>
              <span className="text-xs text-gray-500">78%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  background: 'linear-gradient(90deg, #40BFFF 0%, #00c0f0 100%)',
                  width: '78%',
                  animation: 'slideIn 2s ease-out'
                }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">Great! You're almost there!</div>
          </div>
        </div>
        
        <MegaSale products={mockProducts.slice(6, 12)} />
        
        <div className="px-4 py-4">
          <div className="text-center mb-4">
            <h3 className="text-lg font-bold text-gray-800">What Our Customers Say</h3>
          </div>
          <div className="flex space-x-4 overflow-x-auto scrollbar-hide">
            <div className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm min-w-64 transform hover:rotate-1 transition-transform duration-300">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Sarah M.</div>
                  <div className="flex text-xs text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-xs text-gray-600">"Amazing quality and fast delivery! Highly recommended."</p>
            </div>
            <div className="flex-shrink-0 bg-white rounded-xl p-4 shadow-sm min-w-64 transform hover:-rotate-1 transition-transform duration-300">
              <div className="flex items-center mb-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm">👤</span>
                </div>
                <div>
                  <div className="text-sm font-medium">John D.</div>
                  <div className="flex text-xs text-yellow-400">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="text-xs text-gray-600">"Perfect fit and great style. Will definitely shop again!"</p>
            </div>
          </div>
        </div>
        
        <RecommendedProducts products={mockProducts.slice(12, 16)} />
        
        <Footer />
        
        {selectedCategory && (
          <div className="fixed inset-0 z-50 bg-white">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between shadow-sm">
              <div>
                <h2 className="text-lg font-bold capitalize">
                  {selectedCategory === 'hot-deals' && '🔥 Hot Deals'}
                  {selectedCategory === 'flash-sale' && '⚡ Flash Sale'}
                  {selectedCategory === 'new-arrivals' && '🆕 New Arrivals'}
                  {selectedCategory === 'top-rated' && '⭐ Top Rated'}
                </h2>
                <p className="text-sm text-gray-500">{filteredProducts.length} products found</p>
              </div>
              <button 
                onClick={closeCategoryView}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">
                    {selectedCategory === 'hot-deals' && '🔥'}
                    {selectedCategory === 'flash-sale' && '⚡'}
                    {selectedCategory === 'new-arrivals' && '🆕'}
                    {selectedCategory === 'top-rated' && '⭐'}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                  <p className="text-gray-500">Check back later for new items</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProducts.map((product) => (
                    <div 
                      key={product.id} 
                      className="bg-white rounded-xl p-3 shadow-sm border cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <div className="relative mb-3">
                        <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                              target.nextElementSibling?.classList.remove('hidden');
                            }}
                          />
                          <div className="w-full h-full flex items-center justify-center text-3xl hidden">
                            {product.category === 'sneakers' ? '👟' : 
                             product.category === 'bags' ? '👜' : '🔗'}
                          </div>
                        </div>
                        <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                          <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                        {product.isHot && (
                          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            Hot
                          </span>
                        )}
                        {product.discountPercent && (
                          <span className="absolute bottom-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                            -{product.discountPercent}%
                          </span>
                        )}
                      </div>
                      <div className="space-y-1 text-center">
                        <h3 className="text-xs font-medium text-gray-800 line-clamp-2">
                          {product.name}
                        </h3>
                        <div className="flex items-center justify-center space-x-1">
                          <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                            ${product.discountPrice || product.price}
                          </span>
                          {product.discountPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-center space-x-1">
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
                        <button 
                          className="w-full text-white text-xs py-2 rounded-lg font-medium hover:opacity-90 transition-opacity mt-2"
                          style={{ backgroundColor: '#40BFFF' }}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
        
        <style jsx>{`
          @keyframes slideIn {
            from {
              width: 0%;
            }
            to {
              width: 78%;
            }
          }
          
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex pt-8 mt-4">
        <div className="w-80 flex-shrink-0 pl-4">
          <ProductListing 
            showSidebarOnly={true} 
            filters={filters}
            onFiltersChange={updateFilters}
            sortBy={sortBy}
            onSortChange={updateSortBy}
          />
        </div>

        <div className="flex-1 pr-4">
          <HeroBanner />
          <ProductListing 
            showMainContentOnly={true} 
            filters={filters}
            onFiltersChange={updateFilters}
            sortBy={sortBy}
            onSortChange={updateSortBy}
            currentPage={currentPage}
            onPageChange={updateCurrentPage}
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}