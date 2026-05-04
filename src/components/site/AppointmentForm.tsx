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
  date: z.string().min(1, "Please select a date"),
  timeSlot: z.string().min(1, "Please select a time slot"),
  type: z.string().min(1, "Please select an appointment type"),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

const TIME_SLOTS = ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM"]
const TYPES = [
  { value: "bridal", label: "Bridal Consultation" },
  { value: "selection", label: "Outfit Selection" },
  { value: "custom", label: "Custom Order Discussion" },
]

export function AppointmentForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  // Calculate min date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split("T")[0]

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/appointments", {
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
          Appointment Request Received
        </p>
        <p className="text-sm text-[#4A4540] max-w-xs mx-auto">
          We will confirm your appointment within 24 hours with the studio address and any other details.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Full Name"
          id="apt-name"
          placeholder="Your name"
          {...register("name")}
          error={errors.name?.message}
        />
        <Input
          label="Phone Number"
          id="apt-phone"
          placeholder="+92 300 0000000"
          {...register("phone")}
          error={errors.phone?.message}
        />
      </div>

      <Input
        label="Email Address"
        id="apt-email"
        type="email"
        placeholder="your@email.com"
        {...register("email")}
        error={errors.email?.message}
      />

      {/* Appointment type */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs tracking-widest uppercase text-[#4A4540]">Appointment Type</label>
        <div className="flex flex-wrap gap-2">
          {TYPES.map((t) => (
            <label key={t.value} className="cursor-pointer">
              <input type="radio" value={t.value} {...register("type")} className="sr-only peer" />
              <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] px-4 py-2.5 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] hover:border-[#8A8078] transition-colors cursor-pointer">
                {t.label}
              </span>
            </label>
          ))}
        </div>
        {errors.type && <p className="text-xs text-red-500">{errors.type.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Preferred Date"
          id="apt-date"
          type="date"
          min={minDate}
          {...register("date")}
          error={errors.date?.message}
        />

        {/* Time slot */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs tracking-widest uppercase text-[#4A4540]">Preferred Time</label>
          <select
            {...register("timeSlot")}
            className="border-b border-[#8A8078] bg-transparent py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#C9A96E] transition-colors"
          >
            <option value="">Select a time</option>
            {TIME_SLOTS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          {errors.timeSlot && <p className="text-xs text-red-500">{errors.timeSlot.message}</p>}
        </div>
      </div>

      <Textarea
        label="Any Additional Notes"
        id="apt-message"
        placeholder="Tell us anything that would help us prepare for your consultation..."
        {...register("message")}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase py-4 hover:bg-[#C9A96E] transition-all duration-300 disabled:opacity-50"
      >
        {loading ? "Submitting..." : "Request Appointment"}
      </button>

      <p className="text-center text-xs text-[#4A4540]">
        Appointments are confirmed within 24 hours.
      </p>
    </form>
  )
}
