"use client"

import { useState, useRef } from "react"
import { Upload, Copy, Check, ImageIcon } from "lucide-react"

interface UploadedImage {
  url: string
  name: string
}

export default function AdminUploadPage() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [uploading, setUploading] = useState(false)
  const [copied, setCopied] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  async function uploadFile(file: File) {
    const sigRes = await fetch("/api/upload", { method: "POST" })
    if (!sigRes.ok) {
      alert("Cloudinary is not configured yet. Add CLOUDINARY_* vars to .env first.")
      return
    }
    const { cloudName, apiKey, timestamp, signature, folder } = await sigRes.json()

    const form = new FormData()
    form.append("file", file)
    form.append("api_key", apiKey)
    form.append("timestamp", String(timestamp))
    form.append("signature", signature)
    form.append("folder", folder)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: form,
    })
    const data = await res.json()
    if (data.secure_url) {
      setImages((prev) => [{ url: data.secure_url, name: file.name }, ...prev])
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setUploading(true)
    try {
      for (const file of Array.from(files)) {
        if (!file.type.startsWith("image/")) continue
        await uploadFile(file)
      }
    } finally {
      setUploading(false)
    }
  }

  async function copyUrl(url: string) {
    await navigator.clipboard.writeText(url)
    setCopied(url)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A]">Image Uploader</h1>
        <p className="text-sm text-[#4A4540] mt-1">
          Upload photos here, then copy the URL into your Google Sheet.
        </p>
      </div>

      {/* Drop zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files) }}
        className={`border-2 border-dashed rounded-lg p-16 text-center cursor-pointer transition-colors mb-8 ${
          dragOver ? "border-[#C9A96E] bg-[#C9A96E]/5" : "border-[#C9A96E]/40 hover:border-[#C9A96E] hover:bg-[#C9A96E]/5"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        {uploading ? (
          <div className="space-y-3">
            <div className="w-8 h-8 border-2 border-[#C9A96E] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm text-[#4A4540]">Uploading…</p>
          </div>
        ) : (
          <div className="space-y-3">
            <Upload size={28} className="mx-auto text-[#C9A96E]" />
            <p className="text-sm text-[#1A1A1A] font-medium">Tap or drag photos here</p>
            <p className="text-xs text-[#4A4540]">JPG, PNG, WebP — multiple files at once</p>
          </div>
        )}
      </div>

      {/* Uploaded images */}
      {images.length > 0 && (
        <div className="space-y-3">
          <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4540]">{images.length} uploaded — click URL to copy</p>
          {images.map((img) => (
            <div key={img.url} className="bg-white border border-[#EDE8E1] rounded p-4 flex items-center gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.url} alt={img.name} className="w-14 h-14 object-cover rounded shrink-0 bg-[#EDE8E1]" />
              <div className="flex-1 min-w-0">
                <p className="text-xs text-[#4A4540] truncate mb-1">{img.name}</p>
                <p className="text-xs text-[#1A1A1A] font-mono truncate">{img.url}</p>
              </div>
              <button
                onClick={() => copyUrl(img.url)}
                className={`shrink-0 flex items-center gap-1.5 text-[9px] tracking-[0.2em] uppercase px-3 py-2 border transition-colors ${
                  copied === img.url
                    ? "border-green-400 text-green-600 bg-green-50"
                    : "border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E] hover:text-white"
                }`}
              >
                {copied === img.url ? <><Check size={11} /> Copied</> : <><Copy size={11} /> Copy URL</>}
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length === 0 && !uploading && (
        <div className="flex items-center gap-3 text-[#4A4540] text-sm">
          <ImageIcon size={16} />
          Uploaded images will appear here with their URLs ready to copy.
        </div>
      )}
    </div>
  )
}
