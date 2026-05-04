"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { slugify } from "@/lib/utils"
import { Trash2 } from "lucide-react"

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  category: z.string().min(1),
  price: z.number().positive(),
  description: z.string().min(10),
  fabric: z.string().optional(),
  embroidery: z.string().optional(),
  stock: z.string().default("available"),
  featured: z.boolean().default(false),
  images: z.array(z.string()).default([]),
})

type FormData = z.infer<typeof schema>

interface ProductFormProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initialData?: any
}

const CATEGORIES = ["bridal", "barat", "walima", "formals", "pret"]
const STOCKS = ["available", "limited", "sold_out"]

export function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(initialData?.images ?? [])
  const [newImageUrl, setNewImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema) as any,
    defaultValues: {
      ...initialData,
      images: initialData?.images ?? [],
      featured: initialData?.featured ?? false,
    },
  })

  const nameValue = watch("name")

  function handleNameBlur() {
    if (!initialData?.slug && nameValue) {
      setValue("slug", slugify(nameValue))
    }
  }

  function addImage() {
    if (!newImageUrl.trim()) return
    const updated = [...images, newImageUrl.trim()]
    setImages(updated)
    setValue("images", updated)
    setNewImageUrl("")
  }

  function removeImage(index: number) {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    setValue("images", updated)
  }

  async function onSubmit(data: FormData) {
    setLoading(true)
    setError("")
    try {
      const url = initialData?.id ? `/api/products/${initialData.id}` : "/api/products"
      const method = initialData?.id ? "PUT" : "POST"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, images }),
      })
      if (!res.ok) throw new Error()
      router.push("/admin/products")
      router.refresh()
    } catch {
      setError("Failed to save product. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    if (!initialData?.id || !confirm("Delete this product? This cannot be undone.")) return
    setLoading(true)
    try {
      await fetch(`/api/products/${initialData.id}`, { method: "DELETE" })
      router.push("/admin/products")
      router.refresh()
    } catch {
      setError("Failed to delete.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input
          label="Product Name"
          id="prod-name"
          {...register("name")}
          onBlur={handleNameBlur}
          error={errors.name?.message}
        />
        <Input
          label="Slug (URL)"
          id="prod-slug"
          {...register("slug")}
          error={errors.slug?.message}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES.map((cat) => (
          <label key={cat} className="cursor-pointer">
            <input type="radio" value={cat} {...register("category")} className="sr-only peer" />
            <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] text-center px-3 py-2.5 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] hover:border-[#8A8078] transition-colors capitalize cursor-pointer">
              {cat}
            </span>
          </label>
        ))}
      </div>
      {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}

      <Input
        label="Price (PKR)"
        id="prod-price"
        type="number"
        {...register("price", { valueAsNumber: true })}
        error={errors.price?.message}
      />

      <Textarea
        label="Description"
        id="prod-description"
        {...register("description")}
        error={errors.description?.message}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Input label="Fabric" id="prod-fabric" {...register("fabric")} />
        <Input label="Embroidery" id="prod-embroidery" {...register("embroidery")} />
      </div>

      {/* Stock */}
      <div>
        <p className="text-xs tracking-widest uppercase text-[#4A4540] mb-2">Stock Status</p>
        <div className="flex gap-2">
          {STOCKS.map((s) => (
            <label key={s} className="cursor-pointer">
              <input type="radio" value={s} {...register("stock")} className="sr-only peer" />
              <span className="block text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] px-4 py-2 peer-checked:border-[#C9A96E] peer-checked:text-[#C9A96E] text-[#4A4540] capitalize cursor-pointer transition-colors">
                {s.replace("_", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Featured */}
      <label className="flex items-center gap-3 cursor-pointer">
        <input type="checkbox" {...register("featured")} className="w-4 h-4 accent-[#C9A96E]" />
        <span className="text-xs tracking-widest uppercase text-[#4A4540]">Featured on homepage</span>
      </label>

      {/* Images */}
      <div>
        <p className="text-xs tracking-widest uppercase text-[#4A4540] mb-3">Product Images (Cloudinary URLs)</p>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="Paste Cloudinary URL..."
            className="flex-1 border-b border-[#8A8078] bg-transparent py-2 text-sm text-[#1A1A1A] placeholder:text-[#C5BEBC] outline-none focus:border-[#C9A96E] transition-colors"
          />
          <button
            type="button"
            onClick={addImage}
            className="text-[9px] tracking-[0.2em] uppercase border border-[#C9A96E] text-[#C9A96E] px-4 py-2 hover:bg-[#C9A96E] hover:text-white transition-colors"
          >
            Add
          </button>
        </div>
        {images.length > 0 && (
          <div className="space-y-2">
            {images.map((url, i) => (
              <div key={i} className="flex items-center gap-3 p-2 bg-[#EDE8E1] rounded text-xs">
                <span className="flex-1 truncate text-[#4A4540]">{url}</span>
                <button type="button" onClick={() => removeImage(i)} className="text-red-400 hover:text-red-600">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      <div className="flex items-center gap-4 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#1A1A1A] text-white text-[10px] tracking-[0.25em] uppercase px-8 py-3 hover:bg-[#C9A96E] transition-colors disabled:opacity-50"
        >
          {loading ? "Saving..." : initialData?.id ? "Update Product" : "Create Product"}
        </button>
        {initialData?.id && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={loading}
            className="flex items-center gap-2 text-[9px] tracking-[0.2em] uppercase text-red-400 hover:text-red-600 transition-colors"
          >
            <Trash2 size={13} />
            Delete
          </button>
        )}
      </div>
    </form>
  )
}
