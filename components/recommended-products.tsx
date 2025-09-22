"use client"

import { useState } from "react"
import { Heart, Star } from "lucide-react"
import { ProductDetailModal } from "@/components/product-detail-modal"
import type { Product } from "@/lib/types"

interface RecommendedProductsProps {
  products: Product[]
}

export function RecommendedProducts({ products }: RecommendedProductsProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product)
  }
  return (
    <div className="px-4 py-6">
      {/* Hero Section */}
      <div className="relative mb-6 mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-4 right-4 w-12 h-12 border-2 border-white rounded-lg rotate-45"></div>
          <div className="absolute top-1/3 right-8 w-8 h-8 bg-white rounded-full"></div>
        </div>
        
        <div className="relative z-10 p-6">
          <h2 className="text-xl font-bold mb-2">Recommended</h2>
          <h3 className="text-lg font-semibold mb-2">Product</h3>
          <p className="text-sm text-gray-300">We recommend the best for you</p>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => (
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
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                {product.name}
              </h3>
              
              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-3 h-3 ${
                      i < Math.floor(product.ratingValue) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              
              {/* Price */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-bold" style={{ color: '#40BFFF' }}>
                  ${product.discountPrice || product.price}
                </span>
                {product.discountPrice && (
                  <>
                    <span className="text-xs text-gray-400 line-through">
                      ${product.price}
                    </span>
                    <span className="text-xs bg-orange-100 text-orange-600 px-1 py-0.5 rounded">
                      {product.discountPercent}% Off
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      
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