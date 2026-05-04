"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export function AdminLogout() {
  const router = useRouter()

  async function handleLogout() {
    await fetch("/api/admin/login", { method: "DELETE" })
    router.push("/admin/login")
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-red-400/70 hover:text-red-400 transition-colors rounded"
    >
      <LogOut size={14} />
      Sign Out
    </button>
  )
}
