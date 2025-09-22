"use client"

import { Button } from "@/components/ui-tailwind/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push("...")
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push("...")
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push("...")
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <div className="flex justify-center w-full">
      <div className="bg-gray-100 rounded-lg py-3 px-52 flex items-center justify-center gap-4 w-full max-w-7xl">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="w-10 h-10 flex items-center justify-center text-gray-500">...</span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={`w-10 h-10 flex items-center justify-center rounded text-sm font-medium transition-colors ${
                  currentPage === page 
                    ? 'text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
                style={currentPage === page ? {backgroundColor: '#40BFFF'} : {}}
              >
                {page}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}