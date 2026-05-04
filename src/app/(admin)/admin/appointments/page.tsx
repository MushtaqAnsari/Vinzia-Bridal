import type { Appointment } from "@/generated/prisma/client"
import { prisma } from "@/lib/prisma"
import { AppointmentActions } from "@/components/admin/AppointmentActions"

export default async function AdminAppointmentsPage() {
  let appointments: Appointment[] = []
  try {
    appointments = await prisma.appointment.findMany({ orderBy: { createdAt: "desc" } })
  } catch { /* DB not connected */ }

  return (
    <div className="p-8">
      <h1 className="font-[var(--font-cormorant)] text-4xl text-[#1A1A1A] mb-2">Appointments</h1>
      <p className="text-sm text-[#4A4540] mb-8">{appointments.length} total</p>

      {appointments.length === 0 ? (
        <div className="bg-white border border-[#EDE8E1] rounded p-16 text-center">
          <p className="font-[var(--font-cormorant)] text-2xl text-[#4A4540]">No appointments yet</p>
        </div>
      ) : (
        <div className="bg-white border border-[#EDE8E1] rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead className="border-b border-[#EDE8E1]">
              <tr className="text-[9px] tracking-[0.25em] uppercase text-[#4A4540]">
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Date & Time</th>
                <th className="text-left px-6 py-4">Type</th>
                <th className="text-left px-6 py-4">Phone</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EDE8E1]">
              {appointments.map((apt: Appointment) => (
                <tr key={apt.id} className="hover:bg-[#F8F4EF] transition-colors">
                  <td className="px-6 py-4">
                    <p className="text-[#1A1A1A] font-medium">{apt.name}</p>
                    <p className="text-xs text-[#4A4540]">{apt.email}</p>
                  </td>
                  <td className="px-6 py-4 text-[#4A4540]">
                    {new Date(apt.date).toLocaleDateString("en-PK")} · {apt.timeSlot}
                  </td>
                  <td className="px-6 py-4 capitalize text-[#4A4540]">{apt.type}</td>
                  <td className="px-6 py-4">
                    <a
                      href={`https://wa.me/${apt.phone.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:underline text-xs"
                    >
                      {apt.phone}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[8px] tracking-[0.2em] uppercase px-2 py-1 ${
                      apt.status === "pending" ? "bg-amber-50 text-amber-700" :
                      apt.status === "confirmed" ? "bg-green-50 text-green-700" :
                      "bg-gray-50 text-gray-500"
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AppointmentActions id={apt.id} currentStatus={apt.status} />
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
