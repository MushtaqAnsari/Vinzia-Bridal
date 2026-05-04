import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productId, name, phone } = body
    const inquiry = await prisma.inquiry.create({
      data: { productId: productId ?? null, name: name ?? null, phone: phone ?? null },
    })
    return NextResponse.json(inquiry, { status: 201 })
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 })
  }
}
