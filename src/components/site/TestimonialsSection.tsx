"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

const TESTIMONIALS = [
  {
    name: "Aisha Rahman",
    occasion: "Barat, Karachi 2024",
    quote:
      "I walked into Vinzia not knowing what I wanted, and walked out with a dress that felt like it was made for my soul. The attention to detail was unlike anything I had ever seen.",
  },
  {
    name: "Sana Malik",
    occasion: "Walima, Lahore 2024",
    quote:
      "Every woman in the room asked who made my outfit. The embroidery was so fine, so delicate — it was like wearing a piece of art. I will never forget how I felt that evening.",
  },
  {
    name: "Fatima Siddiqui",
    occasion: "Engagement, Islamabad 2024",
    quote:
      "From the first consultation to the final fitting, the entire experience was extraordinary. They understood my vision better than I did myself.",
  },
]

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % TESTIMONIALS.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-32 bg-[#1A1A1A] relative overflow-hidden">
      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />

      <div className="max-w-3xl mx-auto px-6 text-center">
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-12">
          Brides of Vinzia
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
          >
            <blockquote className="font-[var(--font-cormorant)] text-white text-2xl md:text-3xl lg:text-4xl leading-relaxed italic mb-10">
              &ldquo;{TESTIMONIALS[current].quote}&rdquo;
            </blockquote>
            <p className="text-[#C9A96E] text-sm tracking-[0.2em] uppercase">
              {TESTIMONIALS[current].name}
            </p>
            <p className="text-white/80 text-sm mt-1">
              {TESTIMONIALS[current].occasion}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="flex items-center justify-center gap-3 mt-12">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`transition-all duration-300 ${
                i === current
                  ? "w-8 h-px bg-[#C9A96E]"
                  : "w-3 h-px bg-white/20 hover:bg-white/40"
              }`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/40 to-transparent" />
    </section>
  )
}
