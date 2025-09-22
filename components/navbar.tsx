"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui-tailwind/button"
import { CartIcon } from "@/components/cart-icon"
import { Logo } from "@/components/logo"

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header
      className="sticky z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hidden md:block"
      style={{
        width: "1499.3875732421875px",
        height: "45px",
        top: "0px",
        left: "0.4px",
      }}
    >
      {/* Desktop Layout */}
      <div className="flex h-full items-center justify-between px-4">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation Links */}
        <nav className="flex items-center space-x-20">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-secondary transition-colors">
            HOME
          </Link>
          <Link href="/bag" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">
            BAG
          </Link>
          <Link href="/sneakers" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">
            SNEAKERS
          </Link>
          <Link href="/belt" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">
            BELT
          </Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-secondary transition-colors">
            CONTACT
          </Link>
        </nav>

        {/* Cart */}
        <CartIcon />
      </div>

    </header>
  )
}
