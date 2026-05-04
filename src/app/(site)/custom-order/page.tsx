import type { Metadata } from "next"
import { CustomOrderForm } from "@/components/site/CustomOrderForm"

export const metadata: Metadata = {
  title: "Custom Orders",
  description: "Commission a bespoke bridal or formal piece crafted exactly to your vision at Vinzia Bridal Studio.",
}

export default function CustomOrderPage() {
  return (
    <div className="pt-20">
      <div className="py-20 px-6 text-center border-b border-[#EDE8E1] bg-[#EDE8E1]">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Bespoke Couture</p>
        <h1 className="font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#1A1A1A] mb-4">
          Custom Orders
        </h1>
        <p className="text-sm text-[#4A4540] max-w-lg mx-auto leading-relaxed">
          Every bride is unique. Tell us your vision and our atelier will craft a piece that is entirely, beautifully yours.
        </p>
      </div>

      {/* Process steps */}
      <div className="border-b border-[#EDE8E1]">
        <div className="max-w-4xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: "01", title: "Share Your Vision", desc: "Fill in the form with your occasion, timeline, and inspiration." },
            { step: "02", title: "Studio Consultation", desc: "We'll invite you in for a private consultation to discuss every detail." },
            { step: "03", title: "Crafted for You", desc: "Our artisans bring your dream to life over 6–14 weeks of careful craftsmanship." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <p className="font-[var(--font-cormorant)] text-5xl text-[#EDE8E1] mb-3">{item.step}</p>
              <p className="text-xs tracking-[0.3em] uppercase text-[#1A1A1A] mb-2">{item.title}</p>
              <p className="text-xs text-[#4A4540] leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        <CustomOrderForm />
      </div>
    </div>
  )
}
