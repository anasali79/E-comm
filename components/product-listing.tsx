"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Sidebar } from "@/components/sidebar"
import { MobileSidebar } from "@/components/mobile-sidebar"
import { ProductGrid } from "@/components/product-grid"
import { ProductSorting } from "@/components/product-sorting"
import { Pagination } from "@/components/pagination"
import { ProductSidebar } from "@/components/product-sidebar"
import { mockProducts } from "@/lib/mock-data"
import type { FilterState, SortOption } from "@/lib/types"

interface ProductListingProps {
  showSidebarOnly?: boolean
  showMainContentOnly?: boolean
  filters?: FilterState
  onFiltersChange?: (filters: FilterState) => void
  sortBy?: SortOption
  onSortChange?: (sortBy: SortOption) => void
  currentPage?: number
  onPageChange?: (page: number) => void
}

export function ProductListing({ 
  showSidebarOnly = false, 
  showMainContentOnly = false,
  filters: externalFilters,
  onFiltersChange: externalOnFiltersChange,
  sortBy: externalSortBy,
  onSortChange: externalOnSortChange,
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange
}: ProductListingProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [internalFilters, setInternalFilters] = useState<FilterState>(() => {
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

  const [internalSortBy, setInternalSortBy] = useState<SortOption>(() => {
    return (searchParams.get("sort") as SortOption) || "name"
  })

  const [internalCurrentPage, setInternalCurrentPage] = useState(() => {
    return Number.parseInt(searchParams.get("page") || "1")
  })

  useEffect(() => {
    const page = Number.parseInt(searchParams.get("page") || "1")
    setInternalCurrentPage(page)
  }, [searchParams])

  const filters = externalFilters || internalFilters
  const setFilters = externalOnFiltersChange || setInternalFilters
  const sortBy = externalSortBy || internalSortBy
  const setSortBy = externalOnSortChange || setInternalSortBy
  const currentPage = externalCurrentPage || internalCurrentPage
  const setCurrentPage = externalOnPageChange || setInternalCurrentPage

  const itemsPerPage = 6

  useEffect(() => {
    const params = new URLSearchParams()

    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","))
    if (filters.colors.length > 0) params.set("colors", filters.colors.join(","))
    if (filters.categories.length > 0) params.set("categories", filters.categories.join(","))
    if (filters.priceRange[0] !== 0) params.set("minPrice", filters.priceRange[0].toString())
    if (filters.priceRange[1] !== 500) params.set("maxPrice", filters.priceRange[1].toString())
    if (sortBy !== "name") params.set("sort", sortBy)
    if (currentPage !== 1) params.set("page", currentPage.toString())

    const newUrl = params.toString() ? `?${params.toString()}` : "/"
    router.replace(newUrl, { scroll: false })
  }, [filters, sortBy, currentPage, router])

  const { filteredProducts, sortedProducts, paginatedProducts, totalPages } = useMemo(() => {
    const filtered = mockProducts.filter((product) => {
      const categoryMatch = filters.categories.length === 0 || filters.categories.includes(product.category)
      const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand)
      const colorMatch = filters.colors.length === 0 || product.colors.some((color) => filters.colors.includes(color))
      const priceMatch = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]

      return categoryMatch && brandMatch && colorMatch && priceMatch
    })

    const sorted = [...filtered].sort((a, b) => {
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

    const total = Math.ceil(sorted.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginated = sorted.slice(startIndex, startIndex + itemsPerPage)

    return {
      filteredProducts: filtered,
      sortedProducts: sorted,
      paginatedProducts: paginated,
      totalPages: total
    }
  }, [filters, sortBy, currentPage, itemsPerPage])


  if (showSidebarOnly) {
    return (
      <div className="min-h-screen">
        <Sidebar filters={filters} onFiltersChange={setFilters} />
      </div>
    )
  }

  if (showMainContentOnly) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 lg:hidden">
          <div className="flex items-center gap-4">
            <MobileSidebar filters={filters} onFiltersChange={setFilters} />
            <p className="text-sm text-muted-foreground">
              {filteredProducts.length} Item{filteredProducts.length !== 1 ? "s" : ""}
            </p>
          </div>
          <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <div className="hidden lg:flex items-center justify-between gap-2  mb-6">
          <p className="text-sm text-muted-foreground">
          </p>
          <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />
        </div>

        <ProductGrid products={paginatedProducts} selectedColors={filters.colors} />

        <div className="flex items-center gap-4 mt-8">
          

          {totalPages > 1 && (
            <div className="w-full">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <MobileSidebar filters={filters} onFiltersChange={setFilters} />
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} Item{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>
            <ProductSorting sortBy={sortBy} onSortChange={setSortBy} />
          </div>

          {/* Product Grid */}
          <ProductGrid products={paginatedProducts} selectedColors={filters.colors} />

          <ProductSidebar filters={filters} onFiltersChange={setFilters} />

          <div className="flex items-center gap-4 mt-8">
            <div className="bg-gray-100 rounded-lg py-4 px-24 flex items-center justify-center absolute left-4">
              <button className="text-sm font-semibold text-gray-900">MORE</button>
            </div>

            {totalPages > 1 && (
              <div className="w-full">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}