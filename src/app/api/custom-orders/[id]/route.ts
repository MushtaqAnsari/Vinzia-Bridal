import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const { status } = await req.json()
  const updated = await prisma.customOrder.update({ where: { id }, data: { status } })
  return NextResponse.json(updated)
}
