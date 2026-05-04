"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface Props {
  id: string
  currentStatus: string
}

export function AppointmentActions({ id, currentStatus }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function updateStatus(status: string) {
    setLoading(true)
    await fetch(`/api/appointments/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2 justify-end">
      {currentStatus !== "confirmed" && (
        <button
          onClick={() => updateStatus("confirmed")}
          disabled={loading}
          className="text-[8px] tracking-[0.2em] uppercase text-green-700 hover:text-green-900 border border-green-200 px-2 py-1 hover:bg-green-50 transition-colors"
        >
          Confirm
        </button>
      )}
      {currentStatus !== "cancelled" && (
        <button
          onClick={() => updateStatus("cancelled")}
          disabled={loading}
          className="text-[8px] tracking-[0.2em] uppercase text-red-400 hover:text-red-600 border border-red-100 px-2 py-1 hover:bg-red-50 transition-colors"
        >
          Cancel
        </button>
      )}
    </div>
  )
}
