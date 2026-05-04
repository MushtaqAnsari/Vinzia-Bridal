"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

const STATUSES = ["new", "in_review", "accepted", "in_production", "completed"]

interface Props {
  id: string
  currentStatus: string
}

export function CustomOrderActions({ id, currentStatus }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(status: string) {
    setLoading(true)
    await fetch(`/api/custom-orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-[9px] tracking-widest uppercase text-[#4A4540]">Move to:</span>
      <select
        value={currentStatus}
        onChange={(e) => updateStatus(e.target.value)}
        disabled={loading}
        className="text-[9px] tracking-[0.2em] uppercase border border-[#EDE8E1] bg-white text-[#4A4540] px-3 py-1.5 outline-none focus:border-[#C9A96E] transition-colors"
      >
        {STATUSES.map((s) => (
          <option key={s} value={s}>{s.replace("_", " ")}</option>
        ))}
      </select>
    </div>
  )
}
