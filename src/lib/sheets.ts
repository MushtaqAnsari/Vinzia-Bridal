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

const SAMPLE_PRODUCTS: SheetProduct[] = [
  {
    id: "noor-bridal-lehenga",
    name: "Noor Bridal Lehenga",
    slug: "noor-bridal-lehenga",
    category: "bridal",
    price: 285000,
    description: "A timeless hand-embroidered bridal lehenga in ivory and gold, crafted with layers of pure silk and intricate zardozi work. Designed for the bride who wants to feel like royalty on her most special day.",
    fabric: "Pure silk organza",
    embroidery: "Zardozi & dabka",
    stock: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800",
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    ],
  },
  {
    id: "zara-walima-gown",
    name: "Zara Walima Gown",
    slug: "zara-walima-gown",
    category: "walima",
    price: 165000,
    description: "An ethereal walima gown in blush pink with delicate thread work and pearl embellishments. The floor-length silhouette is tailored to perfection for an unforgettable walima look.",
    fabric: "Chiffon & net",
    embroidery: "Thread work & pearls",
    stock: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
    ],
  },
  {
    id: "rania-barat-ensemble",
    name: "Rania Barat Ensemble",
    slug: "rania-barat-ensemble",
    category: "barat",
    price: 210000,
    description: "A rich crimson barat ensemble featuring heavy kamdani embroidery on pure velvet. Includes a matching dupatta with four-sided border work — a statement piece for the barat night.",
    fabric: "Pure velvet",
    embroidery: "Kamdani & gota",
    stock: "available",
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1622495966027-e96b8ce0c4e7?w=800",
    ],
  },
  {
    id: "layla-formal-suit",
    name: "Layla Formal Suit",
    slug: "layla-formal-suit",
    category: "formals",
    price: 78000,
    description: "A sophisticated formal suit in sage green with subtle resham embroidery at the neckline and cuffs. Versatile enough for mehndi functions, family gatherings, or formal dinners.",
    fabric: "Raw silk",
    embroidery: "Resham",
    stock: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1594938298603-c8148c4b4a8a?w=800",
    ],
  },
  {
    id: "sana-pret-kurta",
    name: "Sana Pret Kurta",
    slug: "sana-pret-kurta",
    category: "pret",
    price: 18500,
    description: "A graceful everyday kurta in soft lavender lawn with minimal block print detailing. Easy to wear, easy to love — perfect for everyday elegance.",
    fabric: "Lawn",
    embroidery: "Block print",
    stock: "available",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1551803091-e20673f15770?w=800",
    ],
  },
  {
    id: "mehreen-bridal-sharara",
    name: "Mehreen Bridal Sharara",
    slug: "mehreen-bridal-sharara",
    category: "bridal",
    price: 320000,
    description: "A classic bridal sharara set in deep ruby with all-over silver tilla embroidery. The wide-leg silhouette and heavily embellished dupatta make this a show-stopping bridal choice.",
    fabric: "Silk & net",
    embroidery: "Tilla & zardozi",
    stock: "limited",
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800",
    ],
  },
]

async function fetchAllProducts(): Promise<SheetProduct[]> {
  const id = process.env.GOOGLE_SHEETS_ID
  const key = process.env.GOOGLE_SHEETS_API_KEY

  if (!id || !key) return SAMPLE_PRODUCTS

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
