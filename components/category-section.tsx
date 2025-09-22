"use client"

import Link from "next/link"

export function CategorySection() {
  const categories = [
    {
      name: "Sneakers",
      icon: "👟",
      href: "/sneakers",
      color: "bg-blue-100"
    },
    {
      name: "Belts", 
      icon: "👔",
      href: "/belt",
      color: "bg-pink-100"
    },
    {
      name: "Bags",
      icon: "👜",
      href: "/bag", 
      color: "bg-purple-100"
    }
  ]

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-bold text-gray-800">Category</h2>
      </div>
      
      {/* Category Grid - 3 columns for 3 categories */}
      <div className="grid grid-cols-3 gap-4">
        {categories.map((category, index) => (
          <Link
            key={index}
            href={category.href}
            className="flex flex-col items-center p-4 rounded-xl hover:scale-105 transition-transform duration-200"
          >
            <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-2`}>
              <span className="text-2xl">{category.icon}</span>
            </div>
            <span className="text-xs text-gray-600 text-center leading-tight">
              {category.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}