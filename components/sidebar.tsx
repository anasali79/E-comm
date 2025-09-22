"use client"
import { useState, useRef, useEffect } from "react"
import { Slider } from "@/components/ui-tailwind/slider"
import { mockProducts } from "@/lib/mock-data"
import type { FilterState } from "@/lib/types"
import { X, RotateCcw } from "lucide-react"

interface SidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function Sidebar({ filters, onFiltersChange }: SidebarProps) {
  const [isMoreModalOpen, setIsMoreModalOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMoreModalOpen(false)
      }
    }

    if (isMoreModalOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMoreModalOpen])

  const handleClearAllFilters = () => {
    onFiltersChange({
      brands: [],
      colors: [],
      priceRange: [13, 500],
      categories: []
    })
    setIsMoreModalOpen(false)
  }
  const handleBrandFilter = (brand: string) => {
    onFiltersChange({ 
      ...filters, 
      brands: [brand],
      categories: []
    })
  }

  const handleColorChange = (color: string, checked: boolean) => {
    const newColors = checked ? [...filters.colors, color] : filters.colors.filter((c) => c !== color)
    onFiltersChange({ ...filters, colors: newColors })
  }

  const handlePriceRangeChange = (value: number[]) => {
    onFiltersChange({ ...filters, priceRange: [value[0], value[1]] })
  }

  const handleHotDealFilter = (filterType: string) => {
    switch (filterType) {
      case 'nike-air-max':
        onFiltersChange({ 
          ...filters, 
          brands: ['Nike'],
          categories: ['sneakers']
        })
        break
      case 'gucci-belts':
        onFiltersChange({ 
          ...filters, 
          brands: ['Gucci'],
          categories: ['belts']
        })
        break
      case 'louis-vuitton':
        onFiltersChange({ 
          ...filters, 
          brands: ['Louis Vuitton'],
          categories: []
        })
        break
      case 'chanel-bags':
        onFiltersChange({ 
          ...filters, 
          brands: ['Chanel'],
          categories: ['bags']
        })
        break
      case 'adidas-sneakers':
        onFiltersChange({ 
          ...filters, 
          brands: ['Adidas'],
          categories: ['sneakers']
        })
        break
      case 'luxury-bags':
        onFiltersChange({ 
          ...filters, 
          brands: ['Louis Vuitton', 'Gucci', 'Chanel'],
          categories: ['bags']
        })
        break
      case 'all-hot':
        const hotBrands = ['Nike', 'Gucci', 'Louis Vuitton', 'Chanel', 'Coach']
        onFiltersChange({ 
          ...filters, 
          brands: hotBrands,
          categories: []
        })
        break
      default:
        break
    }
  }

  const hotProducts = mockProducts.filter(p => p.isHot)
  const categorycounts = {
    sneakers: mockProducts.filter(p => p.category === 'sneakers').length,
    belts: mockProducts.filter(p => p.category === 'belts').length,
    bags: mockProducts.filter(p => p.category === 'bags').length,
  }
  
  const brandCounts = {
    Nike: mockProducts.filter(p => p.brand === 'Nike').length,
    Adidas: mockProducts.filter(p => p.brand === 'Adidas').length,
    Vans: mockProducts.filter(p => p.brand === 'Vans').length,
    Gucci: mockProducts.filter(p => p.brand === 'Gucci').length,
    'Louis Vuitton': mockProducts.filter(p => p.brand === 'Louis Vuitton').length,
    Coach: mockProducts.filter(p => p.brand === 'Coach').length,
    Puma: mockProducts.filter(p => p.brand === 'Puma').length,
  }

  return (
    <div className="w-full min-h-screen bg-white border-r border-gray-200 p-4 space-y-4 flex flex-col">

      <div className="bg-gray-50 rounded-lg p-3 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Hot Deals</h3>
        <div className="space-y-3">
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('nike-air-max')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Nike') && filters.categories.includes('sneakers') 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Nike') && filters.categories.includes('sneakers') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Nike Air Max
            </span>
            <span className={filters.brands.includes('Nike') && filters.categories.includes('sneakers') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => p.isHot && p.name.includes('Nike Air Max')).length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('gucci-belts')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Gucci') && filters.categories.includes('belts') 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Gucci') && filters.categories.includes('belts') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Gucci Belts
            </span>
            <span className={filters.brands.includes('Gucci') && filters.categories.includes('belts') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => p.isHot && p.brand === 'Gucci').length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('louis-vuitton')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Louis Vuitton') 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Louis Vuitton') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Louis Vuitton
            </span>
            <span className={filters.brands.includes('Louis Vuitton') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => p.isHot && p.brand === 'Louis Vuitton').length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('chanel-bags')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Chanel') && filters.categories.includes('bags') 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Chanel') && filters.categories.includes('bags') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Chanel Bags
            </span>
            <span className={filters.brands.includes('Chanel') && filters.categories.includes('bags') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => p.isHot && p.brand === 'Chanel').length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('adidas-sneakers')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Adidas') && filters.categories.includes('sneakers') 
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Adidas') && filters.categories.includes('sneakers') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Adidas Sneakers
            </span>
            <span className={filters.brands.includes('Adidas') && filters.categories.includes('sneakers') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => p.brand === 'Adidas' && p.category === 'sneakers').length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('luxury-bags')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Louis Vuitton') && filters.brands.includes('Gucci') && filters.categories.includes('bags')
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Louis Vuitton') && filters.brands.includes('Gucci') && filters.categories.includes('bags') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Luxury Bags
            </span>
            <span className={filters.brands.includes('Louis Vuitton') && filters.brands.includes('Gucci') && filters.categories.includes('bags') ? 'text-blue-500' : 'text-gray-500'}>
              {mockProducts.filter(p => ['Louis Vuitton', 'Gucci', 'Chanel'].includes(p.brand) && p.category === 'bags').length}
            </span>
          </button>
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleHotDealFilter('all-hot')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.length > 1 && filters.brands.includes('Nike') && filters.brands.includes('Gucci')
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.length > 1 && filters.brands.includes('Nike') && filters.brands.includes('Gucci') ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              All Hot Items
            </span>
            <span className={filters.brands.length > 1 && filters.brands.includes('Nike') && filters.brands.includes('Gucci') ? 'text-blue-500' : 'text-gray-500'}>
              {hotProducts.length}
            </span>
          </button>
        </div>
      </div>

      

      <div className="bg-gray-50 rounded-lg p-6 space-y-5">
        <h3 className="text-lg font-bold text-gray-900">PRICES</h3>
        <div className="text-base font-bold text-gray-800">
          <span className="font-bold">Range:</span> ${filters.priceRange[0]}.99 - ${filters.priceRange[1]}.99
        </div>
        <div className="pt-2">
          <Slider
            value={filters.priceRange}
            onValueChange={handlePriceRangeChange}
            max={500}
            min={13}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-6 space-y-5">
        <h3 className="text-lg font-bold text-gray-900">COLOR</h3>
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 min-w-max">
            <button
              onClick={() => handleColorChange("blue", !filters.colors.includes("blue"))}
              className={`w-8 h-8 rounded-full bg-blue-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("blue") 
                  ? "border-blue-700 ring-2 ring-blue-300" 
                  : "border-gray-300 hover:border-blue-400"
              }`}
              title="Blue"
            />
            <button
              onClick={() => handleColorChange("red", !filters.colors.includes("red"))}
              className={`w-8 h-8 rounded-full bg-red-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("red") 
                  ? "border-red-700 ring-2 ring-red-300" 
                  : "border-gray-300 hover:border-red-400"
              }`}
              title="Red"
            />
            <button
              onClick={() => handleColorChange("black", !filters.colors.includes("black"))}
              className={`w-8 h-8 rounded-full bg-black border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("black") 
                  ? "border-gray-800 ring-2 ring-gray-400" 
                  : "border-gray-300 hover:border-gray-600"
              }`}
              title="Black"
            />
            <button
              onClick={() => handleColorChange("yellow", !filters.colors.includes("yellow"))}
              className={`w-8 h-8 rounded-full bg-yellow-400 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("yellow") 
                  ? "border-yellow-600 ring-2 ring-yellow-300" 
                  : "border-gray-300 hover:border-yellow-500"
              }`}
              title="Yellow"
            />
            <button
              onClick={() => handleColorChange("pink", !filters.colors.includes("pink"))}
              className={`w-8 h-8 rounded-full bg-pink-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("pink") 
                  ? "border-pink-700 ring-2 ring-pink-300" 
                  : "border-gray-300 hover:border-pink-400"
              }`}
              title="Pink"
            />
            <button
              onClick={() => handleColorChange("beige", !filters.colors.includes("beige"))}
              className={`w-8 h-8 rounded-full bg-neutral-200 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("beige") 
                  ? "border-neutral-500 ring-2 ring-neutral-300" 
                  : "border-gray-300 hover:border-neutral-400"
              }`}
              title="Beige"
            />
            <button
              onClick={() => handleColorChange("green", !filters.colors.includes("green"))}
              className={`w-8 h-8 rounded-full bg-green-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("green") 
                  ? "border-green-700 ring-2 ring-green-300" 
                  : "border-gray-300 hover:border-green-400"
              }`}
              title="Green"
            />
            <button
              onClick={() => handleColorChange("purple", !filters.colors.includes("purple"))}
              className={`w-8 h-8 rounded-full bg-purple-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("purple") 
                  ? "border-purple-700 ring-2 ring-purple-300" 
                  : "border-gray-300 hover:border-purple-400"
              }`}
              title="Purple"
            />
            <button
              onClick={() => handleColorChange("orange", !filters.colors.includes("orange"))}
              className={`w-8 h-8 rounded-full bg-orange-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("orange") 
                  ? "border-orange-700 ring-2 ring-orange-300" 
                  : "border-gray-300 hover:border-orange-400"
              }`}
              title="Orange"
            />
            <button
              onClick={() => handleColorChange("gray", !filters.colors.includes("gray"))}
              className={`w-8 h-8 rounded-full bg-gray-500 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("gray") 
                  ? "border-gray-700 ring-2 ring-gray-300" 
                  : "border-gray-300 hover:border-gray-600"
              }`}
              title="Gray"
            />
            <button
              onClick={() => handleColorChange("white", !filters.colors.includes("white"))}
              className={`w-8 h-8 rounded-full bg-white border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("white") 
                  ? "border-gray-600 ring-2 ring-gray-300" 
                  : "border-gray-300 hover:border-gray-400"
              }`}
              title="White"
            />
            <button
              onClick={() => handleColorChange("brown", !filters.colors.includes("brown"))}
              className={`w-8 h-8 rounded-full bg-amber-700 border-3 transition-all hover:scale-110 flex-shrink-0 ${
                filters.colors.includes("brown") 
                  ? "border-amber-900 ring-2 ring-amber-300" 
                  : "border-gray-300 hover:border-amber-500"
              }`}
              title="Brown"
            />
          </div>
        </div>
        {filters.colors.length > 0 && (
          <div className="text-sm text-gray-600">
            <span className="font-medium">Selected:</span> {filters.colors.join(", ")}
          </div>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-4">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">BRAND</h3>
        <div className="space-y-3">
          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Nike')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Nike') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Nike') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Nike
            </span>
            <span className={filters.brands.includes('Nike') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts.Nike}
            </span>
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Adidas')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Adidas') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Adidas') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Adidas
            </span>
            <span className={filters.brands.includes('Adidas') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts.Adidas}
            </span>
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Vans')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Vans') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Vans') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Vans
            </span>
            <span className={filters.brands.includes('Vans') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts.Vans}
            </span>
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Gucci')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Gucci') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Gucci') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Gucci
            </span>
            <span className={filters.brands.includes('Gucci') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts.Gucci}
            </span>
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Louis Vuitton')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Louis Vuitton') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Louis Vuitton') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Louis Vuitton
            </span>
            <span className={filters.brands.includes('Louis Vuitton') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts['Louis Vuitton']}
            </span>
          </button>

          <button 
            onClick={(e) => {
              e.preventDefault()
              handleBrandFilter('Coach')
            }}
            className={`w-full flex items-center justify-between text-base p-2 rounded cursor-pointer transition-colors ${
              filters.brands.includes('Coach') && filters.brands.length === 1
                ? 'bg-blue-50 border border-blue-200' 
                : 'hover:bg-gray-100'
            }`}
          >
            <span className={filters.brands.includes('Coach') && filters.brands.length === 1 ? 'text-blue-500 font-medium' : 'text-gray-700'}>
              Coach
            </span>
            <span className={filters.brands.includes('Coach') && filters.brands.length === 1 ? 'text-blue-500' : 'text-gray-500'}>
              {brandCounts.Coach}
            </span>
          </button>
        </div>
      </div>

      <div className="relative" ref={dropdownRef}>
        <div className="bg-gray-100 rounded-lg py-3 px-20 flex items-center justify-center mt-6">
          <button 
            onClick={() => setIsMoreModalOpen(!isMoreModalOpen)}
            className="text-sm font-semibold text-gray-900 hover:text-blue-500 transition-colors cursor-pointer"
          >
            MORE
          </button>
        </div>

        {isMoreModalOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
            <div className="space-y-2 mb-4">
              <h4 className="font-semibold text-gray-900 text-sm">Active Filters:</h4>
              
              {filters.brands.length > 0 && (
                <div className="text-xs">
                  <span className="font-medium text-gray-600">Brands:</span>
                  <span className="ml-1 text-blue-500">{filters.brands.join(", ")}</span>
                </div>
              )}
              
              {filters.colors.length > 0 && (
                <div className="text-xs">
                  <span className="font-medium text-gray-600">Colors:</span>
                  <span className="ml-1 text-blue-500">{filters.colors.join(", ")}</span>
                </div>
              )}
              
              {filters.categories.length > 0 && (
                <div className="text-xs">
                  <span className="font-medium text-gray-600">Categories:</span>
                  <span className="ml-1 text-blue-500">{filters.categories.join(", ")}</span>
                </div>
              )}
              
              {filters.brands.length === 0 && filters.colors.length === 0 && filters.categories.length === 0 && (
                <p className="text-xs text-gray-500 italic">No filters applied</p>
              )}
            </div>
            
            <button
              onClick={handleClearAllFilters}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded text-sm transition-colors flex items-center justify-center space-x-1"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Clear All</span>
            </button>
          </div>
        )}
      </div>
    </div>
  )
}