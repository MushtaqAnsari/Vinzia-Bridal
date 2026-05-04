"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ZoomIn } from "lucide-react"

interface ProductGalleryProps {
  images: string[]
  name: string
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (images.length === 0) {
    return <div className="aspect-[3/4] bg-[#EDE8E1]" />
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {/* Main image */}
        <div
          className="relative aspect-[3/4] overflow-hidden bg-[#EDE8E1] cursor-zoom-in group"
          onClick={() => setLightboxOpen(true)}
        >
          <Image
            src={images[activeIndex]}
            alt={name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white/80 p-2 rounded-full">
              <ZoomIn size={16} className="text-[#1A1A1A]" />
            </div>
          </div>
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative shrink-0 w-20 h-24 overflow-hidden transition-all duration-200 ${
                  i === activeIndex ? "ring-1 ring-[#C9A96E]" : "opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={img} alt={`${name} ${i + 1}`} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 text-white/60 hover:text-white"
          >
            <X size={28} />
          </button>
          <div className="relative w-full max-w-2xl max-h-[90vh] aspect-[3/4]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
          {images.length > 1 && (
            <div className="absolute bottom-6 flex gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => { e.stopPropagation(); setActiveIndex(i) }}
                  className={`w-2 h-2 rounded-full transition-all ${i === activeIndex ? "bg-[#C9A96E]" : "bg-white/30"}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}
