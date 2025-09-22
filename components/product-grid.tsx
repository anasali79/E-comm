"use client"

import { ProductCard } from "@/components/product-card"
import type { Product } from "@/lib/types"

interface ProductGridProps {
  products: Product[]
  selectedColors: string[]
}

export function ProductGrid({ products, selectedColors }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="text-6xl mb-4">🔍</div>
        <h3 className="text-lg font-semibold mb-2">No products found</h3>
        <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} selectedColors={selectedColors} />
      ))}
    </div>
  )
}
