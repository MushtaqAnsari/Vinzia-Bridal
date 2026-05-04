import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Vinzia Bridal Studio — where heritage craftsmanship meets the modern bride.",
}

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <div className="relative h-[60vh] min-h-[400px] bg-[#1A1A1A] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1600&q=80"
          alt="Vinzia Bridal"
          fill
          className="object-cover opacity-60"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex items-end">
          <div className="p-12 md:p-20">
            <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-4">Est. in Love</p>
            <h1 className="font-[var(--font-cormorant)] text-5xl md:text-7xl text-white leading-tight max-w-xl">
              The art of<br /><em className="italic text-[#C9A96E]">dressing</em> a bride
            </h1>
          </div>
        </div>
      </div>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-5">Our Philosophy</p>
          <h2 className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-6">
            Rooted in heritage, shaped by today
          </h2>
          <div className="w-12 h-px bg-[#C9A96E] mb-8" />
          <div className="space-y-4 text-sm text-[#4A4540] leading-relaxed">
            <p>
              Vinzia Bridal Studio was founded on a simple conviction: that a bride&apos;s dress should be an extension of who she is — not just what&apos;s trending. We draw deeply from Pakistan&apos;s unparalleled textile tradition while speaking the language of the contemporary woman.
            </p>
            <p>
              Every piece that leaves our atelier has passed through the hands of master craftswomen who have spent decades perfecting their art. From the first sketch to the final stitch, each garment is made with an intention — to make you feel extraordinary.
            </p>
            <p>
              We work with an intimate number of brides each season, because we believe that exclusivity and attention are not luxuries — they are the minimum standard for a bridal experience.
            </p>
          </div>
        </div>

        <div className="relative h-[400px] lg:h-auto min-h-[400px] bg-[#EDE8E1] overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=900&q=80"
            alt="Vinzia Bridal atelier craftsmanship"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute top-6 left-6 w-16 h-16 border-t border-l border-[#C9A96E]" />
          <div className="absolute bottom-6 right-6 w-16 h-16 border-b border-r border-[#C9A96E]" />
        </div>
      </section>

      {/* Values */}
      <section className="bg-[#1A1A1A] py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <p className="text-center text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-16">What We Believe</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Craftsmanship",
                body: "Every stitch is considered. Every bead is placed with intention. We do not rush art.",
              },
              {
                title: "Exclusivity",
                body: "We create limited pieces each season. Your dress will never be mass-produced.",
              },
              {
                title: "The Experience",
                body: "From consultation to delivery, we make the journey as beautiful as the destination.",
              },
            ].map((v) => (
              <div key={v.title} className="text-center">
                <p className="font-[var(--font-cormorant)] text-2xl text-white mb-4">{v.title}</p>
                <div className="w-8 h-px bg-[#C9A96E] mx-auto mb-4" />
                <p className="text-base text-white/90 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <p className="font-[var(--font-cormorant)] text-4xl md:text-5xl text-[#1A1A1A] mb-6">
          Begin your story with us
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/appointments"
            className="inline-flex items-center justify-center text-xs tracking-[0.25em] uppercase font-medium bg-[#1A1A1A] text-white px-10 py-4 hover:bg-[#C9A96E] transition-all duration-300"
          >
            Book a Consultation
          </Link>
          <Link
            href="/collections"
            className="inline-flex items-center justify-center text-xs tracking-[0.25em] uppercase font-medium border border-[#8A8078] text-[#4A4540] px-10 py-4 hover:border-[#1A1A1A] hover:text-[#1A1A1A] transition-all duration-300"
          >
            View Collections
          </Link>
        </div>
      </section>
    </div>
  )
}
