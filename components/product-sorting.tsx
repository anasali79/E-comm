"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-tailwind/select"
import { Grid, List } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import type { SortOption } from "@/lib/types"

interface ProductSortingProps {
  sortBy: SortOption
  onSortChange: (sort: SortOption) => void
  totalItems?: number
}

export function ProductSorting({ sortBy, onSortChange, totalItems = 13 }: ProductSortingProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showCount, setShowCount] = useState('12')

  return (
    <div className="flex justify-center w-full">
      <div className="bg-gray-100 rounded-lg py-3 px-52 flex items-center w-full max-w-7xl">
        {/* Far Left - Items count at the very beginning */}
        <div className="text-sm text-gray-700 font-medium">{totalItems} Items</div>

        {/* Middle section - Sort By and Show with proper gaps */}
        <div className="flex items-center gap-8 mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">Sort By</span>
            <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-40 h-9 text-sm border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-700 font-medium">Show</span>
            <Select value={showCount} onValueChange={setShowCount}>
              <SelectTrigger className="w-20 h-9 text-sm border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12">12</SelectItem>
                <SelectItem value="24">24</SelectItem>
                <SelectItem value="48">48</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Far Right - Grid/list icons stuck to the very end */}
        <div className="flex items-center gap-2 ml-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-10 w-10 p-0 transition-all duration-200 hover:scale-105 hover:bg-gray-200 ${
              viewMode === 'grid' 
                ? 'bg-gray-300 text-gray-700' 
                : 'text-gray-600'
            }`}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <Grid className="h-5 w-5" />
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className={`h-10 w-10 p-0 transition-all duration-200 hover:scale-105 hover:bg-gray-200 ${
              viewMode === 'list' 
                ? 'bg-gray-300 text-gray-700' 
                : 'text-gray-600'
            }`}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <List className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
