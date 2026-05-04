"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function AdminLoginPage() {
  const router = useRouter()
  const params = useSearchParams()
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        setError("Incorrect password. Please try again.")
        return
      }
      const from = params.get("from") ?? "/admin"
      router.push(from)
      router.refresh()
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0EA] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] tracking-[0.2em] uppercase">Vinzia</p>
          <p className="text-[9px] tracking-[0.35em] uppercase text-[#C9A96E] mt-1">Admin Studio</p>
        </div>

        <div className="bg-white border border-[#EDE8E1] p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[9px] tracking-[0.3em] uppercase text-[#4A4540] mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
                className="w-full border-b border-[#8A8078] bg-transparent py-2.5 text-sm text-[#1A1A1A] outline-none focus:border-[#C9A96E] transition-colors"
                placeholder="Enter admin password"
              />
            </div>

            {error && (
              <p className="text-xs text-red-500">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1A1A1A] text-white text-[10px] tracking-[0.3em] uppercase py-3.5 hover:bg-[#C9A96E] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Enter Studio"}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
