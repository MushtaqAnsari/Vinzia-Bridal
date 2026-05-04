"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  occasion: z.string().min(1, "Please select an occasion"),
  budgetRange: z.string().min(1, "Please select a budget range"),
  timeline: z.string().min(1, "Please select a timeline"),
  description: z.string().min(20, "Please describe your vision (at least 20 characters)"),
})

type FormData = z.infer<typeof schema>

const OCCASIONS = ["Barat", "Walima", "Engagement", "Formal Event", "Other"]
const BUDGETS = ["PKR 50,000 – 1,00,000", "PKR 1,00,000 – 2,50,000", "PKR 2,50,000 – 5,00,000", "PKR 5,00,000+"]
const TIMELINES = ["3 months", "6 months", "9 months", "12+ months"]

export function CustomOrderForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/custom-orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error()
      setSubmitted(true)
    } catch {
      setError("Something went wrong. Please try again or WhatsApp us directly.")
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="text-center py-16">
        <div className="w-12 h-px bg-[#C9A96E] mx-auto mb-8" />
        <p className="font-[var(--font-cormorant)] text-3xl text-[#1A1A1A] mb-3">
          Your request has been received
        </p>
        <p className="text-sm text-[#4A4540]">
          We will be in touch within 48 hours to schedule your consultation.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="name"
          placeholder="Your name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Phone Number"
          id="phone"
          placeholder="+92 300 0000000"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="your@email.com"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Occasion */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[#4A4540]">Occasion</label>
        <div className="flex flex-wrap gap-2">
          {OCCASIONS.map((o) => (
            <label key={o} className="cursor-pointer">
              <input type="radio" value={o} {...register("occasion")} className="sr-only peer" />
              <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] px-4 py-2.5 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] hover:border-[#8A8078] transition-colors cursor-pointer">
                {o}
              </span>
            </label>
          ))}
        </div>
        {errors.occasion && <p className="text-xs text-red-500">{errors.occasion.message}</p>}
      </div>

      {/* Budget */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[#4A4540]">Estimated Budget</label>
        <div className="flex flex-wrap gap-2">
          {BUDGETS.map((b) => (
            <label key={b} className="cursor-pointer">
              <input type="radio" value={b} {...register("budgetRange")} className="sr-only peer" />
              <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] px-4 py-2.5 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] hover:border-[#8A8078] transition-colors cursor-pointer">
                {b}
              </span>
            </label>
          ))}
        </div>
        {errors.budgetRange && <p className="text-xs text-red-500">{errors.budgetRange.message}</p>}
      </div>

      {/* Timeline */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[#4A4540]">Preferred Timeline</label>
        <div className="flex flex-wrap gap-2">
          {TIMELINES.map((t) => (
            <label key={t} className="cursor-pointer">
              <input type="radio" value={t} {...register("timeline")} className="sr-only peer" />
              <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] px-4 py-2.5 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] hover:border-[#8A8078] transition-colors cursor-pointer">
                {t}
              </span>
            </label>
          ))}
        </div>
        {errors.timeline && <p className="text-xs text-red-500">{errors.timeline.message}</p>}
      </div>

      <Textarea
        label="Describe Your Vision"
        id="description"
        placeholder="Tell us about your dream dress — the silhouette, colours, embroidery, fabrics, or any inspiration you have in mind..."
        rows={5}
        {...register("description")}
        error={errors.description?.message}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-[#C9A96E] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Submit Request"}
      </button>

      <p className="text-center text-xs text-[#4A4540]">
        We respond within 48 hours. Prefer to chat?{" "}
        <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] hover:underline">
          WhatsApp us directly
        </a>
      </p>
    </form>
  )
}
