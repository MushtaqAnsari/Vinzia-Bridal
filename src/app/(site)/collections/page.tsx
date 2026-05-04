import { Suspense } from "react"
import type { Metadata } from "next"
import { getProducts } from "@/lib/sheets"
import { ProductCard } from "@/components/site/ProductCard"

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse Vinzia Bridal Studio's full collection of handcrafted bridal, formal, and pret wear.",
}

const CATEGORIES = [
  { label: "All", value: "" },
  { label: "Bridal", value: "bridal" },
  { label: "Barat", value: "barat" },
  { label: "Walima", value: "walima" },
  { label: "Formals", value: "formals" },
  { label: "Pret", value: "pret" },
]

async function ProductGrid({ category }: { category: string }) {
  const products = await getProducts(category || undefined)

  if (products.length === 0) {
    return (
      <div className="col-span-3 text-center py-24">
        <p className="font-[var(--font-cormorant)] text-3xl text-[#4A4540]">Coming Soon</p>
        <p className="text-sm text-[#4A4540] mt-2">New pieces are being added to this collection.</p>
      </div>
    )
  }

  return (
    <>
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} index={i} />
      ))}
    </>
  )
}

interface CollectionsPageProps {
  searchParams: Promise<{ category?: string }>
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const { category = "" } = await searchParams

  return (
    <div className="pt-20">
      <div className="py-20 px-6 text-center border-b border-[#EDE8E1]">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Vinzia Bridal Studio</p>
        <h1 className="font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#1A1A1A]">Collections</h1>
      </div>

      <div className="flex items-center justify-center gap-1 py-8 px-6 overflow-x-auto">
        {CATEGORIES.map((cat) => (
          <a
            key={cat.value}
            href={cat.value ? `/collections?category=${cat.value}` : "/collections"}
            className={`shrink-0 px-5 py-2 text-[9px] tracking-[0.3em] uppercase transition-all duration-200 ${
              category === cat.value
                ? "bg-[#1A1A1A] text-white"
                : "text-[#4A4540] hover:text-[#1A1A1A] border border-transparent hover:border-[#EDE8E1]"
            }`}
          >
            {cat.label}
          </a>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <Suspense
            fallback={
              <>
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-[3/4] bg-[#EDE8E1] animate-pulse" />
                ))}
              </>
            }
          >
            <ProductGrid category={category} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
