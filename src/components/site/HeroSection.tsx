"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { getGeneralEnquiryUrl } from "@/lib/whatsapp"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden bg-[#1A1A1A]">
      {/* Background — replace src with Cloudinary video/image once configured */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1920&q=80')" }}
      >
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
      </div>

      {/* Floating tagline */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pb-24 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="text-[#C9A96E] text-xs tracking-[0.4em] uppercase mb-5">
            Bridal Couture · Pakistan
          </p>
          <h1 className="font-[var(--font-cormorant)] text-white text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8 max-w-3xl">
            Dressed for the{" "}
            <em className="italic text-[#C9A96E]">moment</em>{" "}
            you&apos;ve dreamed of
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/collections"
              className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-medium bg-white text-[#1A1A1A] px-8 py-4 hover:bg-[#C9A96E] hover:text-white transition-all duration-300"
            >
              Explore Collections
            </Link>
            <a
              href={getGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-medium border border-white/80 text-white px-8 py-4 hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all duration-300"
            >
              WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-12 hidden md:flex flex-col items-center gap-2 text-white/60"
      >
        <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/40" />
        <p className="text-[8px] tracking-[0.3em] uppercase rotate-90 translate-y-4">Scroll</p>
      </motion.div>
    </section>
  )
}
