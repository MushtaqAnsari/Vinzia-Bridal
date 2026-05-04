import Link from "next/link"
import { getGeneralEnquiryUrl } from "@/lib/whatsapp"

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white/90">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div className="md:col-span-2">
          <p className="font-[var(--font-cormorant)] text-white text-3xl tracking-[0.2em] uppercase mb-4">
            Vinzia
          </p>
          <p className="text-sm leading-relaxed text-white/85 max-w-xs">
            Crafting dreams into reality — one bride at a time. Every piece tells a story of heritage, artistry, and love.
          </p>
          <div className="flex items-center gap-4 mt-6">
            <a
              href="https://www.instagram.com/vinzia_bridal_studio/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-[#C9A96E] transition-colors"
              aria-label="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={getGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-white/80 hover:text-[#C9A96E] transition-colors tracking-widest uppercase"
            >
              WhatsApp
            </a>
          </div>
        </div>

        {/* Collections */}
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-5">Collections</p>
          <ul className="space-y-3">
            {["Bridal", "Barat", "Walima", "Formals", "Pret"].map((cat) => (
              <li key={cat}>
                <Link
                  href={`/collections?category=${cat.toLowerCase()}`}
                  className="text-sm text-white/85 hover:text-white transition-colors"
                >
                  {cat}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio */}
        <div>
          <p className="text-xs tracking-[0.25em] uppercase text-[#C9A96E] mb-5">Studio</p>
          <ul className="space-y-3 text-sm text-white/85">
            <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
            <li><Link href="/lookbook" className="hover:text-white transition-colors">Lookbook</Link></li>
            <li><Link href="/custom-order" className="hover:text-white transition-colors">Custom Orders</Link></li>
            <li><Link href="/appointments" className="hover:text-white transition-colors">Book Appointment</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-white/70 tracking-wider">
          <p>© {new Date().getFullYear()} Vinzia Bridal Studio. All rights reserved.</p>
          <p>Made with love in Pakistan</p>
        </div>
      </div>
    </footer>
  )
}
