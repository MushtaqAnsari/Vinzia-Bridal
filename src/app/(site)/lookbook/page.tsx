import type { Metadata } from "next"
import Image from "next/image"
import type { LookbookSpread } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

export const metadata: Metadata = {
  title: "Lookbook",
  description: "Explore Vinzia Bridal Studio's editorial lookbook — a visual celebration of bridal elegance.",
}

const PLACEHOLDER_SPREADS = [
  {
    id: "p1",
    title: "Bridal 2025",
    season: "Spring / Summer 2025",
    images: [
      { url: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1200&q=80", caption: "The Ivory Edit" },
      { url: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=800&q=80", caption: "Handwoven dreams" },
      { url: "https://images.unsplash.com/photo-1610047614256-023d7c028d0b?auto=format&fit=crop&w=800&q=80", caption: "Chikan artistry" },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80", caption: "A moment, forever" },
    ],
  },
  {
    id: "p2",
    title: "Festive Edit",
    season: "Festive 2024",
    images: [
      { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=80", caption: "Glistening in gold" },
      { url: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80", caption: "Modern grace" },
      { url: "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&w=800&q=80", caption: "The atelier touch" },
    ],
  },
]

export default async function LookbookPage() {
  let spreads: LookbookSpread[] = []
  let usePlaceholders = false

  try {
    spreads = await prisma.lookbookSpread.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    })
  } catch {
    usePlaceholders = true
  }

  const displaySpreads = usePlaceholders || spreads.length === 0
    ? PLACEHOLDER_SPREADS
    : spreads.map((s) => ({ ...s, images: s.images as { url: string; caption?: string }[] }))

  return (
    <div className="pt-20">
      <div className="py-20 px-6 text-center border-b border-[#EDE8E1]">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Editorial</p>
        <h1 className="font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#1A1A1A]">Lookbook</h1>
        <p className="text-sm text-[#4A4540] mt-4 max-w-md mx-auto">
          A curated vision of bridal beauty — each season, a new story.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 space-y-24">
        {displaySpreads.map((spread, si) => {
          const images = spread.images as { url: string; caption?: string }[]
          return (
            <div key={spread.id}>
              <div className={`flex flex-col md:flex-row ${si % 2 === 1 ? "md:flex-row-reverse" : ""} gap-6 items-center mb-6`}>
                <div className="md:w-1/2">
                  <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-2">{spread.season}</p>
                  <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A]">
                    {spread.title}
                  </h2>
                </div>
                {images[0] && (
                  <div className="md:w-1/2 relative h-[420px] md:h-[560px] overflow-hidden bg-[#EDE8E1]">
                    <Image
                      src={images[0].url}
                      alt={spread.title}
                      fill
                      className="object-cover"
                      sizes="50vw"
                    />
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {images.slice(1).map((img, i) => (
                    <div key={i} className="relative aspect-[3/4] overflow-hidden bg-[#EDE8E1]">
                      <Image
                        src={img.url}
                        alt={img.caption ?? spread.title}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                      {img.caption && (
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white text-xs">{img.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
