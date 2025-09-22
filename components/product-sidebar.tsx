"use client"

import { Sidebar } from "@/components/sidebar"
import type { FilterState } from "@/lib/types"

interface ProductSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function ProductSidebar({ filters, onFiltersChange }: ProductSidebarProps) {
  return (
    <div className="w-full">
      <div className="hidden lg:block lg:w-64 flex-shrink-0 mt-8">
        <Sidebar filters={filters} onFiltersChange={onFiltersChange} />
      </div>
    </div>
  )
}