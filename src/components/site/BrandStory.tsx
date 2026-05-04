"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export function BrandStory() {
  return (
    <section className="py-24 bg-[#EDE8E1]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative h-[500px] lg:h-[640px] overflow-hidden"
        >
          <Image
            src="https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=900&q=80"
            alt="Vinzia Bridal Studio Atelier"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Gold corner accent */}
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#C9A96E]" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#C9A96E]" />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-5">Our Story</p>
          <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-6">
            Where tradition meets the modern bride
          </h2>
          <div className="w-12 h-px bg-[#C9A96E] mb-8" />
          <p className="text-sm leading-relaxed text-[#4A4540] mb-5">
            Vinzia Bridal Studio was born from a love of Pakistan&apos;s rich textile heritage and the belief that every bride deserves to feel extraordinary. Each piece is a conversation between centuries-old craftsmanship and contemporary elegance.
          </p>
          <p className="text-sm leading-relaxed text-[#4A4540] mb-10">
            From the intricate hand-embroidered chikan to the weight of a perfectly draped dupatta — we obsess over every detail so you can simply be present in the moment.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#1A1A1A] hover:text-[#C9A96E] transition-colors font-medium"
          >
            Our Atelier
            <span className="w-8 h-px bg-current" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
