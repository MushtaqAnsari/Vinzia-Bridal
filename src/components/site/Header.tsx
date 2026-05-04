"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getGeneralEnquiryUrl } from "@/lib/whatsapp"

const NAV_LINKS = [
  { label: "Collections", href: "/collections" },
  { label: "Lookbook", href: "/lookbook" },
  { label: "Custom Orders", href: "/custom-order" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
]

export function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const isHome = pathname === "/"

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [menuOpen])

  const transparent = isHome && !scrolled && !menuOpen

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          transparent
            ? "bg-transparent"
            : "bg-[#F8F4EF]/95 backdrop-blur-sm shadow-[0_1px_0_0_rgba(201,169,110,0.2)]"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={cn(
              "font-[var(--font-cormorant)] text-2xl tracking-[0.2em] uppercase transition-colors duration-300",
              transparent ? "text-white" : "text-[#1A1A1A]"
            )}
          >
            Vinzia
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-xs tracking-[0.2em] uppercase font-medium transition-colors duration-300 gold-underline",
                  transparent ? "text-white/90 hover:text-white" : "text-[#4A4540] hover:text-[#1A1A1A]",
                  pathname === link.href && !transparent && "text-[#C9A96E]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/appointments"
              className={cn(
                "text-xs tracking-[0.2em] uppercase font-medium border px-5 py-2.5 transition-all duration-300",
                transparent
                  ? "border-white/70 text-white hover:bg-white hover:text-[#1A1A1A]"
                  : "border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
              )}
            >
              Book Appointment
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={cn(
              "md:hidden p-1 transition-colors",
              transparent ? "text-white" : "text-[#1A1A1A]"
            )}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-[#F8F4EF] flex flex-col justify-center items-center gap-10 transition-all duration-500 md:hidden",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setMenuOpen(false)}
            className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] hover:text-[#C9A96E] transition-colors tracking-wide"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/appointments"
          onClick={() => setMenuOpen(false)}
          className="mt-4 text-[10px] tracking-[0.25em] uppercase font-medium border border-[#C9A96E] text-[#C9A96E] px-8 py-3"
        >
          Book Appointment
        </Link>
        <a
          href={getGeneralEnquiryUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.25em] uppercase text-[#4A4540]"
        >
          WhatsApp Us
        </a>
      </div>
    </>
  )
}
