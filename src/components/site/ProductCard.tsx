"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { formatPKR } from "@/lib/utils"
import { getProductEnquiryUrl } from "@/lib/whatsapp"

interface ProductCardProps {
  product: {
    id: string
    name: string
    slug: string
    category: string
    price: number
    images: string[]
    stock: string
  }
  index?: number
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const isAvailable = product.stock !== "sold_out"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
    >
      <div className="group">
        <Link href={`/products/${product.slug}`} className="block relative overflow-hidden bg-[#EDE8E1]">
          <div className="relative aspect-[3/4]">
            {product.images[0] && (
              <Image
                src={product.images[0]}
                alt={product.name}
                fill
                className="object-cover transition-all duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            )}
            {product.images[1] && (
              <Image
                src={product.images[1]}
                alt={product.name}
                fill
                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            )}
          </div>

          {/* Stock badge */}
          {product.stock === "limited" && (
            <div className="absolute top-3 left-3 bg-[#C9A96E] text-white text-[10px] tracking-widest uppercase px-2.5 py-1">
              Limited
            </div>
          )}
          {product.stock === "sold_out" && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <span className="text-xs tracking-[0.3em] uppercase text-[#4A4540]">Sold Out</span>
            </div>
          )}

          {/* Quick enquire overlay */}
          {isAvailable && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
              <a
                href={getProductEnquiryUrl(product.name)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="block w-full text-center text-xs tracking-[0.2em] uppercase text-white border border-white/70 py-2.5 hover:bg-white hover:text-[#1A1A1A] transition-colors duration-200"
              >
                Enquire on WhatsApp
              </a>
            </div>
          )}
        </Link>

        <div className="mt-4">
          <p className="text-[10px] tracking-[0.25em] uppercase text-[#C9A96E] mb-1">
            {product.category}
          </p>
          <Link href={`/products/${product.slug}`}>
            <h3 className="font-[var(--font-cormorant)] text-lg text-[#1A1A1A] hover:text-[#C9A96E] transition-colors">
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-[#4A4540] mt-1">{formatPKR(product.price)}</p>
        </div>
      </div>
    </motion.div>
  )
}
