import type { Inquiry, Product } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"

type InquiryWithProduct = Inquiry & { product: Pick<Product, "name" | "slug"> | null }

export default async function AdminInquiriesPage() {
  let inquiries: InquiryWithProduct[] = []
  try {
    inquiries = await prisma.inquiry.findMany({
      include: { product: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    })
  } catch { /* DB not connected */ }

  return (
    <div className="p-8">
      <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] mb-2">Inquiries</h1>
      <p className="text-sm text-[#4A4540] mb-8">{inquiries.length} total WhatsApp enquiries tracked</p>

      {inquiries.length === 0 ? (
        <div className="bg-white border border-[#EDE8E1] rounded p-16 text-center">
          <p className="font-[var(--font-cormorant)] text-2xl text-[#4A4540]">No inquiries tracked yet</p>
          <p className="text-sm text-[#4A4540] mt-2">Inquiries are logged when customers click WhatsApp on a product page.</p>
        </div>
      ) : (
        <div className="bg-white border border-[#EDE8E1] rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#EDE8E1]">
              <tr className="text-[9px] tracking-[0.25em] uppercase text-[#4A4540]">
                <th className="text-left px-6 py-4">Product</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E1]">
              {inquiries.map((inq: InquiryWithProduct) => (
                <tr key={inq.id} className="hover:bg-[#F8F4EF] transition-colors">
                  <td className="px-6 py-4 text-[#4A4540]">
                    {inq.product ? inq.product.name : "General Inquiry"}
                  </td>
                  <td className="px-6 py-4 text-[#1A1A1A]">{inq.name ?? "—"}</td>
                  <td className="px-6 py-4">
                    {inq.phone ? (
                      <a
                        href={`https://wa.me/${inq.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#25D366] hover:underline"
                      >
                        {inq.phone}
                      </a>
                    ) : "—"}
                  </td>
                  <td className="px-6 py-4 text-[#4A4540] text-xs">
                    {new Date(inq.createdAt).toLocaleDateString("en-PK")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
