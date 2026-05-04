import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, date, timeSlot, type, message } = body

    const appointment = await prisma.appointment.create({
      data: {
        name,
        phone,
        email,
        date: new Date(date),
        timeSlot,
        type,
        message: message ?? null,
      },
    })

    // Fire-and-forget email notification
    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Vinzia Bridal Studio <noreply@vinziabridal.com>",
        to: process.env.OWNER_EMAIL ?? "",
        subject: `New Appointment Request — ${name}`,
        text: `New appointment from ${name}\nPhone: ${phone}\nDate: ${date} at ${timeSlot}\nType: ${type}\nMessage: ${message ?? "None"}`,
      }).catch(() => {})
    }

    return NextResponse.json(appointment, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 })
  }
}
