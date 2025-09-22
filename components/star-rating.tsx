import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  rating: number
  maxRating?: number
  size?: "sm" | "md" | "lg"
  showValue?: boolean
}

export function StarRating({ rating, maxRating = 5, size = "sm", showValue = false }: StarRatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center gap-4">
        {Array.from({ length: maxRating }, (_, index) => {
          const starValue = index + 1
          const isFilled = starValue <= Math.floor(rating)
          const isHalfFilled = starValue === Math.ceil(rating) && rating % 1 !== 0

          return (
            <Star
              key={index}
              className={cn(
                sizeClasses[size],
                "transition-colors",
                isFilled || isHalfFilled ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200",
              )}
            />
          )
        })}
      </div>
      {showValue && <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>}
    </div>
  )
}
