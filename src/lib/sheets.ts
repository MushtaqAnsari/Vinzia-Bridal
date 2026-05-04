export interface SheetProduct {
  id: string        // slug used as stable ID
  name: string
  slug: string
  category: string
  price: number
  description: string
  fabric?: string
  embroidery?: string
  stock: string
  featured: boolean
  images: string[]
}

function parseRow(row: string[]): SheetProduct | null {
  const [name, slug, category, priceStr, description, fabric, embroidery, stock, featuredStr, imagesStr] = row
  if (!name?.trim() || !slug?.trim()) return null

  return {
    id: slug.trim(),
    name: name.trim(),
    slug: slug.trim(),
    category: (category ?? "").trim().toLowerCase(),
    price: parseInt(priceStr ?? "0", 10) || 0,
    description: (description ?? "").trim(),
    fabric: fabric?.trim() || undefined,
    embroidery: embroidery?.trim() || undefined,
    stock: (stock ?? "available").trim().toLowerCase(),
    featured: (featuredStr ?? "").trim().toUpperCase() === "TRUE",
    images: (imagesStr ?? "")
      .split(",")
      .map((u) => u.trim())
      .filter(Boolean),
  }
}

async function fetchAllProducts(): Promise<SheetProduct[]> {
  const id = process.env.GOOGLE_SHEETS_ID
  const key = process.env.GOOGLE_SHEETS_API_KEY

  if (!id || !key) return []

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/Sheet1!A2:J500?key=${key}`

  const res = await fetch(url, {
    next: { revalidate: 300 }, // cache 5 minutes
  })

  if (!res.ok) return []

  const data = await res.json()
  const rows: string[][] = data.values ?? []
  return rows.map(parseRow).filter((p): p is SheetProduct => p !== null)
}

export async function getProducts(category?: string): Promise<SheetProduct[]> {
  const all = await fetchAllProducts()
  const active = all.filter((p) => p.name)
  if (!category) return active.sort((a, b) => Number(b.featured) - Number(a.featured))
  return active
    .filter((p) => p.category === category.toLowerCase())
    .sort((a, b) => Number(b.featured) - Number(a.featured))
}

export async function getProductBySlug(slug: string): Promise<SheetProduct | null> {
  const all = await fetchAllProducts()
  return all.find((p) => p.slug === slug) ?? null
}

export async function getFeaturedProducts(): Promise<SheetProduct[]> {
  const all = await fetchAllProducts()
  return all.filter((p) => p.featured)
}
