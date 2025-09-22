"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { ProductDetailModal } from "@/components/product-detail-modal"
import type { Product } from "@/lib/types"

interface MegaSaleProps {
  products: Product[]
}

export function MegaSale({ products }: MegaSaleProps) {
  const [showAll, setShowAll] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const displayProducts = showAll ? products : products.slice(0, 2)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }

  return (
    <div className="px-4 py-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Mega Sale</h2>
        <button 
          onClick={() => setShowAll(!showAll)}
          className="text-blue-500 font-medium"
        >
          {showAll ? "See Less" : "See More"}
        </button>
      </div>
      
      {/* Products Grid */}
      <div className={`grid ${showAll ? "grid-cols-1 space-y-4" : "grid-cols-2 gap-4"}`}>
        {displayProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleProductClick(product)}
          >
            {/* Product Image */}
            <div className="relative mb-3">
              <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
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
                <div className="w-full h-full flex items-center justify-center text-4xl hidden">
                  {product.category === 'sneakers' ? '👟' : 
                   product.category === 'bags' ? '👜' : '👔'}
                </div>
              </div>
              <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                <Heart className="w-4 h-4 text-gray-400" />
              </button>
            </div>
            
            {/* Product Info */}
            <div className="space-y-1">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                  ${product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.price}
                    </span>
                    <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded">
                      {product.discountPercent}% Off
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Full Screen Modal for See More */}
      {showAll && (
        <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
          <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Mega Sale Products</h2>
            <button 
              onClick={() => setShowAll(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            {products.map((product) => (
              <div 
                key={product.id} 
                className="bg-white rounded-xl p-4 border cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => handleProductClick(product)}
              >
                <div className="relative mb-3">
                  <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden mb-2">
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
                    <div className="w-full h-full flex items-center justify-center text-4xl hidden">
                      {product.category === 'sneakers' ? '👟' : 
                       product.category === 'bags' ? '👜' : '👔'}
                    </div>
                  </div>
                  <button className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-sm">
                    <Heart className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                    {product.name}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                      ${product.discountPrice || product.price}
                    </span>
                    {product.discountPrice && (
                      <>
                        <span className="text-xs text-gray-400 line-through">
                          ${product.price}
                        </span>
                        <span className="text-xs bg-green-100 text-green-600 px-1 py-0.5 rounded">
                          {product.discountPercent}% Off
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
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
    </div>
  )
}