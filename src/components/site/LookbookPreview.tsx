"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const PREVIEW_IMAGES = [
  { src: "https://images.unsplash.com/photo-1610047614256-023d7c028d0b?auto=format&fit=crop&w=600&q=80", alt: "Bridal editorial" },
  { src: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=600&q=80", alt: "Bridal editorial" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80", alt: "Bridal editorial" },
]

export function LookbookPreview() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4"
      >
        <div>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Editorial</p>
          <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A]">
            The Lookbook
          </h2>
        </div>
        <Link
          href="/lookbook"
          className="inline-flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[#4A4540] hover:text-[#1A1A1A] transition-colors font-medium shrink-0"
        >
          View All
          <span className="w-8 h-px bg-current" />
        </Link>
      </motion.div>

      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {PREVIEW_IMAGES.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <Link href="/lookbook" className="group block relative overflow-hidden bg-[#EDE8E1]">
              <div className={`relative ${i === 1 ? "h-96 md:h-[520px]" : "h-64 md:h-[380px]"}`}>
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="33vw"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
