import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  const { title, season, images } = await req.json()
  const count = await prisma.lookbookSpread.count()
  const spread = await prisma.lookbookSpread.create({
    data: { title, season, images: images ?? [], order: count },
  })
  return NextResponse.json(spread, { status: 201 })
}
