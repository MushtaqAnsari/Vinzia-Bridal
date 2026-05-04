import Link from "next/link"
import { getProducts } from "@/lib/sheets"
import { ExternalLink, Upload, FileSpreadsheet } from "lucide-react"

export default async function AdminProductsPage() {
  const products = await getProducts()
  const sheetId = process.env.GOOGLE_SHEETS_ID
  const sheetUrl = sheetId
    ? `https://docs.google.com/spreadsheets/d/${sheetId}/edit`
    : null

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A]">Products</h1>
          <p className="text-sm text-[#4A4540] mt-1">{products.length} pieces in your Google Sheet</p>
        </div>
        <Link
          href="/admin/upload"
          className="flex items-center gap-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase px-5 py-3 hover:bg-[#C9A96E] transition-colors"
        >
          <Upload size={14} />
          Upload Photos
        </Link>
      </div>

      {/* Sheet link card */}
      <div className="bg-white border border-[#C9A96E]/30 rounded p-8 mb-6">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-[#C9A96E]/10 rounded flex items-center justify-center shrink-0">
            <FileSpreadsheet size={22} className="text-[#C9A96E]" />
          </div>
          <div className="flex-1">
            <h2 className="font-[var(--font-cormorant)] text-2xl text-[#1A1A1A] mb-1">Your Product Sheet</h2>
            <p className="text-sm text-[#4A4540] mb-4 max-w-lg">
              Add, edit, or remove products directly in Google Sheets. Changes appear on the website within 5 minutes.
            </p>
            {sheetUrl ? (
              <a
                href={sheetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1A1A1A] text-white text-[9px] tracking-[0.25em] uppercase px-6 py-3 hover:bg-[#C9A96E] transition-colors"
              >
                <ExternalLink size={13} />
                Open Google Sheet
              </a>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded px-4 py-3 text-sm text-amber-800 max-w-md">
                Add <code className="font-mono text-xs bg-amber-100 px-1 rounded">GOOGLE_SHEETS_ID</code> to your <code className="font-mono text-xs bg-amber-100 px-1 rounded">.env</code> file to link your sheet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sheet column guide */}
      <div className="bg-white border border-[#EDE8E1] rounded p-6 mb-6">
        <h3 className="text-[9px] tracking-[0.3em] uppercase text-[#4A4540] mb-4">Sheet Column Guide (row 1 = headers)</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-xs">
          {[
            { col: "A", name: "name", example: "Noor Bridal Lehenga" },
            { col: "B", name: "slug", example: "noor-bridal-lehenga" },
            { col: "C", name: "category", example: "bridal" },
            { col: "D", name: "price", example: "250000" },
            { col: "E", name: "description", example: "Hand-embroidered silk..." },
            { col: "F", name: "fabric", example: "Pure silk" },
            { col: "G", name: "embroidery", example: "Zardozi" },
            { col: "H", name: "stock", example: "available" },
            { col: "I", name: "featured", example: "TRUE" },
            { col: "J", name: "images", example: "url1,url2,url3" },
          ].map((c) => (
            <div key={c.col} className="bg-[#F8F4EF] rounded p-2.5">
              <span className="text-[#C9A96E] font-mono font-bold">{c.col}</span>
              <p className="text-[#1A1A1A] font-medium mt-0.5">{c.name}</p>
              <p className="text-[#4A4540] text-[10px] mt-0.5 truncate">{c.example}</p>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[#4A4540] mt-3">
          <strong>category</strong>: bridal / barat / walima / formals / pret &nbsp;·&nbsp;
          <strong>stock</strong>: available / limited / sold_out &nbsp;·&nbsp;
          <strong>images</strong>: comma-separated Cloudinary URLs (use Upload Photos above)
        </p>
      </div>

      {/* Live product list (read-only preview) */}
      {products.length > 0 && (
        <div className="bg-white border border-[#EDE8E1] rounded overflow-hidden">
          <div className="px-6 py-4 border-b border-[#EDE8E1]">
            <p className="text-[9px] tracking-[0.3em] uppercase text-[#4A4540]">Live Preview — edit these in your Sheet</p>
          </div>
          <table className="w-full text-sm">
            <thead className="border-b border-[#EDE8E1]">
              <tr className="text-[9px] tracking-[0.25em] uppercase text-[#4A4540]">
                <th className="text-left px-6 py-3">Name</th>
                <th className="text-left px-6 py-3">Category</th>
                <th className="text-left px-6 py-3">Price</th>
                <th className="text-left px-6 py-3">Stock</th>
                <th className="text-left px-6 py-3">Featured</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E1]">
              {products.map((p) => (
                <tr key={p.slug} className="hover:bg-[#F8F4EF]">
                  <td className="px-6 py-3 text-[#1A1A1A] font-medium">{p.name}</td>
                  <td className="px-6 py-3 capitalize text-[#4A4540]">{p.category}</td>
                  <td className="px-6 py-3 text-[#4A4540]">PKR {p.price.toLocaleString()}</td>
                  <td className="px-6 py-3">
                    <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                      p.stock === "available" ? "bg-green-50 text-green-700" :
                      p.stock === "limited" ? "bg-amber-50 text-amber-700" :
                      "bg-red-50 text-red-700"
                    }`}>
                      {p.stock}
                    </span>
                  </td>
                  <td className="px-6 py-3">
                    {p.featured
                      ? <span className="text-[#C9A96E] text-[9px] tracking-widest uppercase">Yes</span>
                      : <span className="text-[#4A4540] text-[9px]">—</span>}
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
