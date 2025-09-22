"use client"

import { useState } from "react"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import { Badge } from "@/components/ui-tailwind/badge"
import { Card, CardContent } from "@/components/ui-tailwind/card"
import { StarRating } from "@/components/star-rating"
import { DesktopProductDetailModal } from "@/components/desktop-product-detail-modal"
import { useCart } from "@/contexts/cart-context"
import { cn } from "@/lib/utils"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
  selectedColors: string[]
}

export function ProductCard({ product, selectedColors }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const { addToCart } = useCart()

  const getCardBackgroundColor = () => {
    if (selectedColors.length === 0) return ""

    const matchingColor = product.colors.find((color) => selectedColors.includes(color))
    if (!matchingColor) return ""

    const colorMap: Record<string, string> = {
      black: "bg-gray-900/10",
      white: "bg-gray-100",
      red: "bg-red-50",
      blue: "bg-blue-50",
      green: "bg-green-50",
      yellow: "bg-yellow-50",
      gray: "bg-gray-50",
      beige: "bg-amber-50",
      brown: "bg-amber-100",
    }

    return colorMap[matchingColor] || ""
  }

  const handleAddToCart = () => {
    addToCart(product)
    console.log(`Added ${product.name} to cart`)
  }

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    console.log(`${isWishlisted ? "Removed from" : "Added to"} wishlist: ${product.name}`)
  }

  const handleQuickView = () => {
    setIsDetailModalOpen(true)
  }

  return (
    <>
    <Card
      className={cn(
        "group relative overflow-hidden transition-all duration-300 hover:shadow-lg focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 w-full max-w-sm mx-auto cursor-pointer",
        getCardBackgroundColor(),
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsDetailModalOpen(true)}
      role="article"
      aria-labelledby={`product-${product.id}-name`}
    >
      <CardContent className="p-0">
        <div className="relative h-56 overflow-hidden bg-card flex items-center justify-center">
          {product.isHot && (
            <Badge className="absolute top-3 left-3 z-10 bg-destructive text-destructive-foreground">HOT</Badge>
          )}

          <div
            className={cn(
              "absolute top-3 right-3 z-10 flex flex-col gap-2 transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleToggleWishlist()
              }}
              aria-label={`${isWishlisted ? "Remove from" : "Add to"} wishlist`}
            >
              <Heart className={cn("h-4 w-4", isWishlisted && "fill-current text-red-500")} />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              className="h-8 w-8 p-0 rounded-full"
              onClick={(e) => {
                e.stopPropagation()
                handleQuickView()
              }}
              aria-label="Quick view product"
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          <img
            src={product.imageUrl || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />

          <div
            className={cn(
              "absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0",
            )}
          >
            <Button 
              className="w-full" 
              size="sm" 
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart()
              }} 
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-3 text-center">
          <h3
            id={`product-${product.id}-name`}
            className="font-medium text-card-foreground mb-2 line-clamp-2 text-balance text-sm text-center"
          >
            {product.name}
          </h3>

          <div className="flex items-center justify-center gap-1 mb-3">
            <StarRating rating={product.ratingValue} />
          </div>

          <div className="flex items-center justify-center gap-2">
            <span className="text-lg font-bold" style={{color: '#40BFFF'}}>${product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <>
                <span className="text-sm text-gray-400 line-through">${product.price}</span>
                <span className="text-sm font-medium text-red-500">{product.discountPercent}% Off</span>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>

    <DesktopProductDetailModal 
      product={product}
      isOpen={isDetailModalOpen}
      onClose={() => setIsDetailModalOpen(false)}
    />
  </>
  )
}
