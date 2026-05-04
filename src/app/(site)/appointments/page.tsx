import type { Metadata } from "next"
import { AppointmentForm } from "@/components/site/AppointmentForm"

export const metadata: Metadata = {
  title: "Book an Appointment",
  description: "Schedule a private bridal consultation at Vinzia Bridal Studio.",
}

export default function AppointmentsPage() {
  return (
    <div className="pt-20">
      <div className="py-20 px-6 text-center border-b border-[#EDE8E1]">
        <p className="text-xs tracking-[0.4em] uppercase text-[#C9A96E] mb-3">Private Consultation</p>
        <h1 className="font-[var(--font-cormorant)] text-5xl md:text-6xl text-[#1A1A1A] mb-4">
          Book an Appointment
        </h1>
        <p className="text-sm text-[#4A4540] max-w-md mx-auto leading-relaxed">
          Visit our studio for an intimate, unhurried consultation. We dedicate our full attention to you and your vision.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-5 gap-16">
        {/* Sidebar info */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-3">Studio Hours</p>
            <div className="space-y-1.5 text-sm text-[#4A4540]">
              <p>Monday – Saturday</p>
              <p className="text-[#1A1A1A]">11:00 AM – 7:00 PM</p>
              <p className="mt-3">Sunday — By appointment only</p>
            </div>
          </div>
          <div className="w-full h-px bg-[#EDE8E1]" />
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-3">Consultation Types</p>
            <div className="space-y-4 text-sm">
              {[
                { title: "Bridal Consultation", desc: "Comprehensive appointment to explore the full bridal journey. 60–90 minutes." },
                { title: "Outfit Selection", desc: "For formals, pret, or a specific event. 45 minutes." },
                { title: "Custom Order Discussion", desc: "Deep dive into bespoke requirements. 60 minutes." },
              ].map((t) => (
                <div key={t.title}>
                  <p className="text-[#1A1A1A] font-medium">{t.title}</p>
                  <p className="text-[#4A4540] text-xs leading-relaxed mt-0.5">{t.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-[#EDE8E1]" />
          <div>
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#C9A96E] mb-3">Location</p>
            <p className="text-sm text-[#4A4540]">
              Vinzia Bridal Studio<br />
              Lahore, Pakistan
            </p>
            <p className="text-xs text-[#4A4540] mt-2">
              Exact address shared upon confirmation.
            </p>
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-3">
          <AppointmentForm />
        </div>
      </div>
    </div>
  )
}
