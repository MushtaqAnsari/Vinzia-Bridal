import type { Metadata } from "next"
import { Mail, MapPin, Clock } from "lucide-react"
import { getGeneralEnquiryUrl } from "@/lib/whatsapp"

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Vinzia Bridal Studio — we would love to hear from you.",
}

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"

  return (
    <div className="pt-20">
      <div className="py-20 px-6 text-center border-b border-[#EDE8E1]">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Reach Out</p>
        <h1 className="font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#1A1A1A]">
          Contact Us
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Contact info */}
        <div className="space-y-12">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-6">The Quickest Way</p>
            <a
              href={getGeneralEnquiryUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-5 p-6 border border-[#EDE8E1] hover:border-[#C9A96E] transition-colors duration-300"
            >
              <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center shrink-0">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-[#1A1A1A] mb-1">WhatsApp</p>
                <p className="text-sm text-[#4A4540]">+{whatsappNumber}</p>
                <p className="text-xs text-[#C9A96E] mt-1 group-hover:underline">Chat with us →</p>
              </div>
            </a>
          </div>

          <div className="space-y-6">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E]">Studio Details</p>
            <div className="flex items-start gap-4">
              <MapPin size={16} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#1A1A1A]">Vinzia Bridal Studio</p>
                <p className="text-sm text-[#4A4540]">Lahore, Pakistan</p>
                <p className="text-xs text-[#4A4540] mt-1">Exact address shared upon confirmation of appointment</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={16} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#1A1A1A]">Mon – Sat: 11:00 AM – 7:00 PM</p>
                <p className="text-sm text-[#4A4540]">Sunday by appointment only</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-[#C9A96E] shrink-0 mt-0.5"><InstagramIcon size={16} /></span>
              <a
                href="https://www.instagram.com/vinzia_bridal_studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#4A4540] hover:text-[#C9A96E] transition-colors"
              >
                @vinzia_bridal_studio
              </a>
            </div>
            <div className="flex items-start gap-4">
              <Mail size={16} className="text-[#C9A96E] shrink-0 mt-0.5" />
              <a
                href="mailto:hello@vinziabridal.com"
                className="text-sm text-[#4A4540] hover:text-[#C9A96E] transition-colors"
              >
                hello@vinziabridal.com
              </a>
            </div>
          </div>
        </div>

        {/* Map placeholder + note */}
        <div>
          <div className="w-full h-80 bg-[#EDE8E1] flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin size={24} className="text-[#C9A96E] mx-auto mb-2" />
              <p className="text-xs text-[#4A4540]">Studio location shared upon booking</p>
            </div>
          </div>
          <div className="border border-[#EDE8E1] p-6">
            <p className="font-[var(--font-cormorant)] text-xl text-[#1A1A1A] mb-2">Ready to visit?</p>
            <p className="text-xs text-[#4A4540] leading-relaxed mb-4">
              Our studio is by-appointment only. Book a consultation and we&apos;ll confirm your time and share the exact address.
            </p>
            <a
              href="/appointments"
              className="inline-flex items-center text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] hover:text-[#A8864F] transition-colors"
            >
              Book Appointment →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
