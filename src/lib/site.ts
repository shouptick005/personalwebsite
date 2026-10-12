export const WHATSAPP_NUMBER = "8801740564322";
export const WHATSAPP_DISPLAY = "+880 1740-564322";
export const EMAIL = "mahimulkuet21@gmail.com";
export const LINKEDIN_URL = "https://www.linkedin.com/in/mdmahimulhoque/";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export function whatsappUrl(text?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}
