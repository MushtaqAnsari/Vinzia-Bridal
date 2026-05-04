import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, phone, email, occasion, budgetRange, timeline, description } = body

    const order = await prisma.customOrder.create({
      data: { name, phone, email, occasion, budgetRange, timeline, description },
    })

    if (process.env.RESEND_API_KEY) {
      const { Resend } = await import("resend")
      const resend = new Resend(process.env.RESEND_API_KEY)
      await resend.emails.send({
        from: "Vinzia Bridal Studio <noreply@vinziabridal.com>",
        to: process.env.OWNER_EMAIL ?? "",
        subject: `New Custom Order Request — ${name}`,
        text: `New custom order from ${name}\nPhone: ${phone}\nOccasion: ${occasion}\nBudget: ${budgetRange}\nTimeline: ${timeline}\n\nVision:\n${description}`,
      }).catch(() => {})
    }

    return NextResponse.json(order, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed to create custom order" }, { status: 500 })
  }
}
