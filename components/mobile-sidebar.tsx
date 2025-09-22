"use client"

import { useState } from "react"
import { Filter } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import { Sidebar } from "@/components/sidebar"
import type { FilterState } from "@/lib/types"

interface MobileSidebarProps {
  filters: FilterState
  onFiltersChange: (filters: FilterState) => void
}

export function MobileSidebar({ filters, onFiltersChange }: MobileSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      <Button 
        variant="outline" 
        size="sm" 
        className="bg-transparent"
        onClick={() => setIsOpen(true)}
      >
        <Filter className="h-4 w-4 mr-2" />
        Filters
      </Button>
      
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-80 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-lg font-semibold">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-auto p-6">
                <Sidebar filters={filters} onFiltersChange={onFiltersChange} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
