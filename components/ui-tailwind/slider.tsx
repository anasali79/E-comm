import * as React from "react"
import { cn } from "@/lib/utils"

interface SliderProps {
  value: number[]
  onValueChange?: (value: number[]) => void
  max?: number
  min?: number
  step?: number
  className?: string
  disabled?: boolean
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ value, onValueChange, max = 100, min = 0, step = 1, className, disabled = false }, ref) => {
    const [isDragging, setIsDragging] = React.useState<number | null>(null)
    const trackRef = React.useRef<HTMLDivElement>(null)

    const handleMouseDown = (index: number) => (e: React.MouseEvent) => {
      if (disabled) return
      e.preventDefault()
      setIsDragging(index)
    }

    const handleTouchStart = (index: number) => (e: React.TouchEvent) => {
      if (disabled) return
      e.preventDefault()
      setIsDragging(index)
    }

    const handleMouseMove = React.useCallback(
      (e: MouseEvent) => {
        if (isDragging === null || !trackRef.current || disabled) return

        const rect = trackRef.current.getBoundingClientRect()
        const percentage = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
        const newValue = min + percentage * (max - min)
        const steppedValue = Math.round(newValue / step) * step

        const newValues = [...value]
        newValues[isDragging] = Math.max(min, Math.min(max, steppedValue))

        // Ensure proper ordering
        if (isDragging === 0 && newValues.length > 1) {
          newValues[0] = Math.min(newValues[0], newValues[1])
        } else if (isDragging === 1) {
          newValues[1] = Math.max(newValues[0], newValues[1])
        }

        onValueChange?.(newValues)
      },
      [isDragging, min, max, step, value, onValueChange, disabled]
    )

    const handleTouchMove = React.useCallback(
      (e: TouchEvent) => {
        if (isDragging === null || !trackRef.current || disabled) return

        const rect = trackRef.current.getBoundingClientRect()
        const touch = e.touches[0]
        const percentage = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width))
        const newValue = min + percentage * (max - min)
        const steppedValue = Math.round(newValue / step) * step

        const newValues = [...value]
        newValues[isDragging] = Math.max(min, Math.min(max, steppedValue))

        // Ensure proper ordering
        if (isDragging === 0 && newValues.length > 1) {
          newValues[0] = Math.min(newValues[0], newValues[1])
        } else if (isDragging === 1) {
          newValues[1] = Math.max(newValues[0], newValues[1])
        }

        onValueChange?.(newValues)
      },
      [isDragging, min, max, step, value, onValueChange, disabled]
    )

    const handleMouseUp = React.useCallback(() => {
      setIsDragging(null)
    }, [])

    const handleTouchEnd = React.useCallback(() => {
      setIsDragging(null)
    }, [])

    React.useEffect(() => {
      if (isDragging !== null) {
        document.addEventListener("mousemove", handleMouseMove)
        document.addEventListener("mouseup", handleMouseUp)
        document.addEventListener("touchmove", handleTouchMove)
        document.addEventListener("touchend", handleTouchEnd)
        return () => {
          document.removeEventListener("mousemove", handleMouseMove)
          document.removeEventListener("mouseup", handleMouseUp)
          document.removeEventListener("touchmove", handleTouchMove)
          document.removeEventListener("touchend", handleTouchEnd)
        }
      }
    }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd])

    const getPercentage = (val: number) => ((val - min) / (max - min)) * 100

    return (
      <div
        ref={ref}
        className={cn("relative flex w-full touch-none items-center py-2", className)}
      >
        <div
          ref={trackRef}
          className={cn(
            "relative h-2 w-full grow overflow-hidden rounded-full bg-gray-200 cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {/* Track filled portion */}
          {value.length > 1 ? (
            <div
              className="absolute h-full bg-blue-500 rounded-full"
              style={{
                left: `${getPercentage(value[0])}%`,
                width: `${getPercentage(value[1]) - getPercentage(value[0])}%`,
              }}
            />
          ) : (
            <div
              className="absolute h-full bg-blue-500 rounded-full"
              style={{
                width: `${getPercentage(value[0])}%`,
              }}
            />
          )}

          {/* Handles */}
          {value.map((val, index) => (
            <div
              key={index}
              className={cn(
                "absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-blue-500 shadow-md cursor-grab focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 transition-all z-10",
                isDragging === index && "cursor-grabbing scale-110 shadow-lg",
                disabled && "cursor-not-allowed"
              )}
              style={{
                left: `${getPercentage(val)}%`,
              }}
              onMouseDown={handleMouseDown(index)}
              onTouchStart={handleTouchStart(index)}
              tabIndex={disabled ? -1 : 0}
              role="slider"
              aria-valuenow={val}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-disabled={disabled}
            />
          ))}
        </div>
      </div>
    )
  }
)
Slider.displayName = "Slider"

export { Slider }