import Link from "next/link"
import type { Appointment, CustomOrder } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { getProducts } from "@/lib/sheets"
import { Package, Calendar, Sparkles, FileText, AlertCircle } from "lucide-react"

export default async function AdminDashboard() {
  let appointmentCount = 0
  let customOrderCount = 0
  let inquiryCount = 0
  let recentAppointments: Appointment[] = []
  let recentOrders: CustomOrder[] = []
  let dbConnected = true

  try {
    const results = await Promise.all([
      prisma.appointment.count({ where: { status: "pending" } }),
      prisma.customOrder.count({ where: { status: "new" } }),
      prisma.inquiry.count(),
      prisma.appointment.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
      prisma.customOrder.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ])
    ;[appointmentCount, customOrderCount, inquiryCount, recentAppointments, recentOrders] = results
  } catch {
    dbConnected = false
  }

  const products = await getProducts()

  const stats = [
    { label: "Total Products", value: products.length, icon: Package, href: "/admin/products", color: "text-[#C9A96E]" },
    { label: "Pending Appointments", value: appointmentCount, icon: Calendar, href: "/admin/appointments", color: "text-amber-600" },
    { label: "New Custom Orders", value: customOrderCount, icon: Sparkles, href: "/admin/custom-orders", color: "text-purple-600" },
    { label: "Total Inquiries", value: inquiryCount, icon: FileText, href: "/admin/inquiries", color: "text-blue-600" },
  ]

  return (
    <div className="p-8">
      <div className="mb-10">
        <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A]">Dashboard</h1>
        <p className="text-sm text-[#4A4540] mt-1">Welcome back to Vinzia Bridal Studio admin.</p>
      </div>

      {!dbConnected && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded px-5 py-4 mb-8 text-sm text-amber-800">
          <AlertCircle size={16} className="shrink-0" />
          Database not connected — appointments and custom orders need a Supabase <code className="font-mono text-xs bg-amber-100 px-1 rounded">DATABASE_URL</code>.
        </div>
      )}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-white p-6 rounded border border-[#EDE8E1] hover:border-[#C9A96E] transition-colors group"
          >
            <div className="flex items-start justify-between mb-4">
              <stat.icon size={18} className={stat.color} />
            </div>
            <p className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] mb-1">{stat.value}</p>
            <p className="text-[9px] tracking-[0.2em] uppercase text-[#4A4540]">{stat.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded border border-[#EDE8E1] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[var(--font-cormorant)] text-xl text-[#1A1A1A]">Recent Appointments</h2>
            <Link href="/admin/appointments" className="text-[9px] tracking-[0.2em] uppercase text-[#C9A96E] hover:text-[#A8864F]">
              View All
            </Link>
          </div>
          {recentAppointments.length === 0 ? (
            <p className="text-sm text-[#4A4540]">No appointments yet.</p>
          ) : (
            <div className="space-y-3">
              {recentAppointments.map((apt: Appointment) => (
                <div key={apt.id} className="flex items-center justify-between py-2 border-b border-[#EDE8E1] last:border-0">
                  <div>
                    <p className="text-sm text-[#1A1A1A]">{apt.name}</p>
                    <p className="text-xs text-[#4A4540]">{new Date(apt.date).toLocaleDateString("en-PK")} · {apt.timeSlot}</p>
                  </div>
                  <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                    apt.status === "pending" ? "bg-amber-50 text-amber-700" :
                    apt.status === "confirmed" ? "bg-green-50 text-green-700" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    {apt.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded border border-[#EDE8E1] p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-[var(--font-cormorant)] text-xl text-[#1A1A1A]">Recent Custom Orders</h2>
            <Link href="/admin/custom-orders" className="text-[9px] tracking-[0.2em] uppercase text-[#C9A96E] hover:text-[#A8864F]">
              View All
            </Link>
          </div>
          {recentOrders.length === 0 ? (
            <p className="text-sm text-[#4A4540]">No custom orders yet.</p>
          ) : (
            <div className="space-y-3">
              {recentOrders.map((order: CustomOrder) => (
                <div key={order.id} className="flex items-center justify-between py-2 border-b border-[#EDE8E1] last:border-0">
                  <div>
                    <p className="text-sm text-[#1A1A1A]">{order.name}</p>
                    <p className="text-xs text-[#4A4540]">{order.occasion} · {order.timeline}</p>
                  </div>
                  <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                    order.status === "new" ? "bg-blue-50 text-blue-700" :
                    order.status === "accepted" ? "bg-green-50 text-green-700" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
