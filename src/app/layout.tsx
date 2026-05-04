import type { Metadata } from "next"
import { Cormorant_Garamond, Montserrat } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-montserrat",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Vinzia Bridal Studio | Luxury Bridal Wear Pakistan",
    template: "%s | Vinzia Bridal Studio",
  },
  description:
    "Discover Vinzia Bridal Studio's exquisite collection of handcrafted bridal and formal wear. Each piece is a testament to Pakistan's rich embroidery heritage, reimagined for the modern bride.",
  keywords: [
    "Pakistani bridal wear",
    "luxury bridal dresses",
    "bridal studio Lahore",
    "custom bridal wear",
    "barat dress",
    "walima dress",
    "Pakistani designer bridal",
  ],
  openGraph: {
    type: "website",
    locale: "en_PK",
    siteName: "Vinzia Bridal Studio",
    title: "Vinzia Bridal Studio | Luxury Bridal Wear Pakistan",
    description:
      "Handcrafted bridal and formal wear rooted in Pakistan's embroidery heritage.",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="min-h-screen bg-[#F8F4EF] text-[#1A1A1A]">
        {children}
      </body>
    </html>
  )
}
