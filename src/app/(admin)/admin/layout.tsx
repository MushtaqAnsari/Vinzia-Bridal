import Link from "next/link"
import { LayoutDashboard, Package, Calendar, Sparkles, FileText, BookOpen, Upload, LogOut } from "lucide-react"
import { AdminLogout } from "@/components/admin/AdminLogout"

const NAV = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Upload Photos", href: "/admin/upload", icon: Upload },
  { label: "Lookbook", href: "/admin/lookbook", icon: BookOpen },
  { label: "Appointments", href: "/admin/appointments", icon: Calendar },
  { label: "Custom Orders", href: "/admin/custom-orders", icon: Sparkles },
  { label: "Inquiries", href: "/admin/inquiries", icon: FileText },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F4EF] flex">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-[#1A1A1A] flex flex-col">
        <div className="px-8 py-8 border-b border-white/10">
          <Link href="/admin">
            <p className="font-[var(--font-cormorant)] text-white text-2xl tracking-[0.2em] uppercase">Vinzia</p>
            <p className="text-[8px] tracking-[0.3em] uppercase text-[#C9A96E] mt-0.5">Admin Studio</p>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1">
          {NAV.map(({ label, href, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors"
            >
              <Icon size={14} />
              {label}
            </Link>
          ))}
        </nav>
        <div className="px-4 py-6 border-t border-white/10 space-y-1">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white/70 transition-colors rounded"
          >
            <LogOut size={14} />
            View Site
          </Link>
          <AdminLogout />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}
