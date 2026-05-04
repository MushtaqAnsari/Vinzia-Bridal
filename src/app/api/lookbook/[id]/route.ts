import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const data = await req.json()
  const spread = await prisma.lookbookSpread.update({ where: { id }, data })
  return NextResponse.json(spread)
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  await prisma.lookbookSpread.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
