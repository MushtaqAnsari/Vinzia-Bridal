"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Trash2, Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"

interface Spread {
  id: string
  title: string
  season: string
  published: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  images: any
}

interface Props {
  initialSpreads: Spread[]
}

export function LookbookManager({ initialSpreads }: Props) {
  const router = useRouter()
  const [spreads, setSpreads] = useState<Spread[]>(
    initialSpreads.map((s) => ({
      ...s,
      images: (s.images as unknown as { url: string; caption?: string }[]) ?? [],
    }))
  )
  const [creating, setCreating] = useState(false)
  const [newTitle, setNewTitle] = useState("")
  const [newSeason, setNewSeason] = useState("")
  const [newImageUrl, setNewImageUrl] = useState("")
  const [newImages, setNewImages] = useState<{ url: string; caption?: string }[]>([])
  const [loading, setLoading] = useState(false)

  async function createSpread() {
    if (!newTitle.trim() || !newSeason.trim()) return
    setLoading(true)
    try {
      const res = await fetch("/api/lookbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle, season: newSeason, images: newImages }),
      })
      const spread = await res.json()
      setSpreads([...spreads, { ...spread, images: newImages }])
      setNewTitle("")
      setNewSeason("")
      setNewImages([])
      setCreating(false)
      router.refresh()
    } finally {
      setLoading(false)
    }
  }

  async function togglePublish(id: string, published: boolean) {
    await fetch(`/api/lookbook/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !published }),
    })
    setSpreads(spreads.map((s) => s.id === id ? { ...s, published: !published } : s))
  }

  async function deleteSpread(id: string) {
    if (!confirm("Delete this spread?")) return
    await fetch(`/api/lookbook/${id}`, { method: "DELETE" })
    setSpreads(spreads.filter((s) => s.id !== id))
  }

  function addNewImage() {
    if (!newImageUrl.trim()) return
    setNewImages([...newImages, { url: newImageUrl.trim() }])
    setNewImageUrl("")
  }

  return (
    <div>
      <button
        onClick={() => setCreating(!creating)}
        className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase px-5 py-3 hover:bg-[#C9A96E] transition-colors mb-6"
      >
        <Plus size={14} />
        New Spread
      </button>

      {creating && (
        <div className="bg-white border border-[#C9A96E] rounded p-6 mb-6 space-y-4">
          <h3 className="font-[var(--font-cormorant)] text-xl text-[#1A1A1A]">New Lookbook Spread</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Title" id="lb-title" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="e.g. Bridal 2025" />
            <Input label="Season Tag" id="lb-season" value={newSeason} onChange={(e) => setNewSeason(e.target.value)} placeholder="e.g. Spring/Summer 2025" />
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-[#4A4540] mb-2">Images</p>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="Cloudinary URL..."
                className="flex-1 border-b border-[#8A8078] bg-transparent py-2 text-sm outline-none focus:border-[#C9A96E] transition-colors"
              />
              <button type="button" onClick={addNewImage} className="text-[9px] tracking-widest uppercase border border-[#C9A96E] text-[#C9A96E] px-4 py-2 hover:bg-[#C9A96E] hover:text-white transition-colors">
                Add
              </button>
            </div>
            {newImages.map((img, i) => (
              <p key={i} className="text-xs text-[#4A4540] py-1 border-b border-[#EDE8E1] truncate">{img.url}</p>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={createSpread} disabled={loading} className="bg-[#1A1A1A] text-white text-[9px] tracking-widest uppercase px-6 py-2.5 hover:bg-[#C9A96E] transition-colors disabled:opacity-50">
              {loading ? "Creating..." : "Create"}
            </button>
            <button onClick={() => setCreating(false)} className="text-[9px] tracking-widest uppercase text-[#4A4540] hover:text-[#1A1A1A] transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}

      {spreads.length === 0 ? (
        <div className="bg-white border border-[#EDE8E1] rounded p-16 text-center">
          <p className="font-[var(--font-cormorant)] text-2xl text-[#4A4540]">No spreads yet</p>
        </div>
      ) : (
        <div className="space-y-3">
          {spreads.map((spread) => (
            <div key={spread.id} className="bg-white border border-[#EDE8E1] rounded p-5 flex items-center gap-4">
              <div className="flex-1">
                <p className="text-sm text-[#1A1A1A] font-medium">{spread.title}</p>
                <p className="text-xs text-[#4A4540]">{spread.season} · {spread.images.length} images</p>
              </div>
              <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${spread.published ? "bg-green-50 text-green-700" : "bg-gray-50 text-gray-500"}`}>
                {spread.published ? "Published" : "Draft"}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => togglePublish(spread.id, spread.published)} className="text-[#4A4540] hover:text-[#1A1A1A] transition-colors">
                  {spread.published ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                <button onClick={() => deleteSpread(spread.id)} className="text-red-300 hover:text-red-500 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
