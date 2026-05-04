"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const CATEGORIES = [
  {
    label: "Bridal",
    slug: "bridal",
    description: "Bespoke bridal couture crafted for your most sacred day",
    image: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1200&q=80",
    span: "md:col-span-2",
  },
  {
    label: "Formals",
    slug: "formals",
    description: "Elevated formal wear for every celebration",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80",
    span: "",
  },
  {
    label: "Pret",
    slug: "pret",
    description: "Refined ready-to-wear for the modern woman",
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80",
    span: "",
  },
]

export function FeaturedCategories() {
  return (
    <section className="py-24 px-6 lg:px-12 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14"
      >
        <p className="text-[10px] tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Curated for You</p>
        <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A]">
          The Collections
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            className={cat.span}
          >
            <Link href={`/collections?category=${cat.slug}`} className="group block relative overflow-hidden">
              <div className="relative h-[480px] md:h-[560px] img-zoom bg-[#EDE8E1]">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <p className="font-[var(--font-cormorant)] text-white text-3xl mb-1">{cat.label}</p>
                  <p className="text-white/85 text-sm tracking-wide">{cat.description}</p>
                  <div className="mt-4 w-8 h-px bg-[#C9A96E] group-hover:w-16 transition-all duration-400" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
