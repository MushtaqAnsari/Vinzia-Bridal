import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { getProductBySlug, getProducts } from "@/lib/sheets"
import { formatPKR } from "@/lib/utils"
import { getProductEnquiryUrl } from "@/lib/whatsapp"
import { ProductGallery } from "@/components/site/ProductGallery"
import { ProductCard } from "@/components/site/ProductCard"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return {}
  return { title: product.name, description: product.description }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const all = await getProducts(product.category)
  const related = all.filter((p) => p.slug !== product.slug).slice(0, 3)

  const whatsappUrl = getProductEnquiryUrl(product.name)
  const isAvailable = product.stock !== "sold_out"

  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs tracking-widest uppercase text-[#4A4540] mb-10">
          <Link href="/" className="hover:text-[#C9A96E] transition-colors">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:text-[#C9A96E] transition-colors">Collections</Link>
          <span>/</span>
          <Link href={`/collections?category=${product.category}`} className="hover:text-[#C9A96E] transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#1A1A1A]">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ProductGallery images={product.images} name={product.name} />

          <div className="lg:sticky lg:top-28 lg:self-start">
            <p className="text-xs tracking-[0.3em] uppercase text-[#C9A96E] mb-3">{product.category}</p>
            <h1 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              {product.name}
            </h1>
            <p className="text-xl text-[#4A4540] mb-6">{formatPKR(product.price)}</p>

            <div className="w-12 h-px bg-[#C9A96E] mb-8" />

            <p className="text-sm text-[#4A4540] leading-relaxed mb-8">{product.description}</p>

            {(product.fabric || product.embroidery) && (
              <div className="space-y-3 mb-8 border-t border-b border-[#EDE8E1] py-6">
                {product.fabric && (
                  <div className="flex gap-4 text-sm">
                    <span className="text-xs tracking-[0.25em] uppercase text-[#4A4540] w-24 shrink-0 pt-0.5">Fabric</span>
                    <span className="text-[#1A1A1A]">{product.fabric}</span>
                  </div>
                )}
                {product.embroidery && (
                  <div className="flex gap-4 text-sm">
                    <span className="text-xs tracking-[0.25em] uppercase text-[#4A4540] w-24 shrink-0 pt-0.5">Embroidery</span>
                    <span className="text-[#1A1A1A]">{product.embroidery}</span>
                  </div>
                )}
                <div className="flex gap-4 text-sm">
                  <span className="text-xs tracking-[0.25em] uppercase text-[#4A4540] w-24 shrink-0 pt-0.5">Availability</span>
                  <span className={product.stock === "available" ? "text-emerald-700" : product.stock === "limited" ? "text-amber-700" : "text-[#4A4540]"}>
                    {product.stock === "available" ? "In Stock" : product.stock === "limited" ? "Limited Pieces" : "Sold Out"}
                  </span>
                </div>
              </div>
            )}

            {isAvailable ? (
              <div className="flex flex-col gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white text-xs tracking-[0.3em] uppercase py-4 hover:bg-[#C9A96E] transition-all duration-300"
                >
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enquire on WhatsApp
                </a>
                <Link
                  href={`/custom-order?product=${encodeURIComponent(product.name)}`}
                  className="flex items-center justify-center border border-[#8A8078] text-[#4A4540] text-xs tracking-[0.3em] uppercase py-4 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300"
                >
                  Request Custom Version
                </Link>
                <Link
                  href="/appointments"
                  className="flex items-center justify-center text-xs tracking-[0.25em] uppercase text-[#C9A96E] hover:text-[#A8864F] transition-colors"
                >
                  Book a fitting appointment
                </Link>
              </div>
            ) : (
              <div className="border border-[#EDE8E1] py-4 text-center">
                <p className="text-xs tracking-[0.25em] uppercase text-[#4A4540]">Sold Out</p>
                <Link href="/custom-order" className="text-xs text-[#C9A96E] mt-1 block hover:text-[#A8864F] transition-colors">
                  Request a similar piece →
                </Link>
              </div>
            )}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24 pt-12 border-t border-[#EDE8E1]">
            <h2 className="font-[var(--font-cormorant)] text-3xl text-[#1A1A1A] mb-10 text-center">
              You may also love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
