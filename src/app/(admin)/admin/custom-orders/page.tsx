import type { CustomOrder } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { CustomOrderActions } from "@/components/admin/CustomOrderActions"

export default async function AdminCustomOrdersPage() {
  let orders: CustomOrder[] = []
  try {
    orders = await prisma.customOrder.findMany({ orderBy: { createdAt: "desc" } })
  } catch { /* DB not connected */ }

  return (
    <div className="p-8">
      <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] mb-2">Custom Orders</h1>
      <p className="text-sm text-[#4A4540] mb-8">{orders.length} total requests</p>

      {orders.length === 0 ? (
        <div className="bg-white border border-[#EDE8E1] rounded p-16 text-center">
          <p className="font-[var(--font-cormorant)] text-2xl text-[#4A4540]">No custom orders yet</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: CustomOrder) => (
            <div key={order.id} className="bg-white border border-[#EDE8E1] rounded p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                  <div>
                    <p className="text-[8px] tracking-[0.25em] uppercase text-[#4A4540] mb-1">Client</p>
                    <p className="text-sm text-[#1A1A1A] font-medium">{order.name}</p>
                    <a
                      href={`https://wa.me/${order.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-[#25D366] hover:underline"
                    >
                      {order.phone}
                    </a>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.25em] uppercase text-[#4A4540] mb-1">Occasion</p>
                    <p className="text-sm text-[#1A1A1A]">{order.occasion}</p>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.25em] uppercase text-[#4A4540] mb-1">Budget</p>
                    <p className="text-sm text-[#1A1A1A]">{order.budgetRange}</p>
                  </div>
                  <div>
                    <p className="text-[8px] tracking-[0.25em] uppercase text-[#4A4540] mb-1">Timeline</p>
                    <p className="text-sm text-[#1A1A1A]">{order.timeline}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                    order.status === "new" ? "bg-blue-50 text-blue-700" :
                    order.status === "accepted" ? "bg-green-50 text-green-700" :
                    order.status === "in_production" ? "bg-purple-50 text-purple-700" :
                    order.status === "completed" ? "bg-gray-100 text-gray-600" :
                    "bg-gray-50 text-gray-500"
                  }`}>
                    {order.status.replace("_", " ")}
                  </span>
                </div>
              </div>
              {order.description && (
                <div className="mt-4 pt-4 border-t border-[#EDE8E1]">
                  <p className="text-[8px] tracking-[0.25em] uppercase text-[#4A4540] mb-1">Vision</p>
                  <p className="text-sm text-[#4A4540] leading-relaxed">{order.description}</p>
                </div>
              )}
              <div className="mt-4 pt-4 border-t border-[#EDE8E1] flex justify-end">
                <CustomOrderActions id={order.id} currentStatus={order.status} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
