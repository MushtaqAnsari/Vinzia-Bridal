import { NextResponse } from "next/server"
import { getProducts } from "@/lib/sheets"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const category = searchParams.get("category") ?? undefined
  const products = await getProducts(category)
  return NextResponse.json(products)
}
