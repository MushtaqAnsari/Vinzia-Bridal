export function getWhatsAppUrl(message: string): string {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "923001234567"
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

export function getProductEnquiryUrl(productName: string): string {
  return getWhatsAppUrl(
    `Hello Vinzia Bridal Studio! I'm interested in "${productName}". Could you please share more details about availability and pricing?`
  )
}

export function getGeneralEnquiryUrl(): string {
  return getWhatsAppUrl(
    "Hello Vinzia Bridal Studio! I'd like to enquire about your bridal collections."
  )
}
