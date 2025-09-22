export interface Product {
  id: string
  name: string
  price: number
  discountPrice?: number
  discountPercent?: number
  ratingValue: number
  ratingCount: number
  isHot: boolean
  colors: string[]
  category: string
  brand: string
  imageUrl: string
}

export interface FilterState {
  categories: string[]
  brands: string[]
  colors: string[]
  priceRange: [number, number]
}

export type SortOption = "name" | "price-asc" | "price-desc" | "rating"

export interface CategoryItem {
  name: string
  count: number
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
}

export interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}
