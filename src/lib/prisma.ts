import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "@/generated/prisma/client"

function createPrismaClient(): PrismaClient {
  const connectionString = process.env.DATABASE_URL

  if (connectionString) {
    try {
      const adapter = new PrismaPg({ connectionString })
      return new PrismaClient({ adapter })
    } catch {
      // fall through to stub
    }
  }

  // No DB configured — return a stub so the build succeeds.
  // All callers wrap queries in try/catch and show empty state.
  return new Proxy({} as PrismaClient, {
    get(_, prop) {
      if (prop === "then") return undefined // prevent Promise confusion
      return () => Promise.reject(new Error("Database not configured"))
    },
  })
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma: PrismaClient =
  globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
