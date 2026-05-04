import { prisma } from "@/lib/prisma"
import { LookbookManager } from "@/components/admin/LookbookManager"

export default async function AdminLookbookPage() {
  let spreads: Awaited<ReturnType<typeof prisma.lookbookSpread.findMany>> = []
  try {
    spreads = await prisma.lookbookSpread.findMany({ orderBy: { order: "asc" } })
  } catch { /* DB not connected */ }

  return (
    <div className="p-8">
      <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] mb-2">Lookbook</h1>
      <p className="text-sm text-[#4A4540] mb-8">{spreads.length} editorial spreads</p>
      <LookbookManager initialSpreads={spreads} />
    </div>
  )
}
