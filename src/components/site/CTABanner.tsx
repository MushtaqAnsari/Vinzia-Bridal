"use client"

import Link from "next/link"
import { motion } from "framer-motion"

export function CTABanner() {
  return (
    <section className="py-28 px-6 bg-[#F8F4EF] border-t border-[#EDE8E1]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-4">Begin Your Journey</p>
        <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-6">
          Your bridal story starts with a conversation
        </h2>
        <p className="text-sm text-[#4A4540] leading-relaxed mb-10 max-w-md mx-auto">
          Book a private consultation at our studio and let us help you find the dress that makes your heart stop.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-medium bg-[#1A1A1A] text-white px-10 py-4 hover:bg-[#C9A96E] transition-all duration-300"
          >
            Book a Consultation
          </Link>
          <Link
            href="/custom-order"
            className="inline-flex items-center justify-center text-xs tracking-[0.2em] uppercase font-medium border border-[#8A8078] text-[#4A4540] px-10 py-4 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300"
          >
            Custom Orders
          </Link>
        </div>
      </motion.div>
    </section>
  )
}
