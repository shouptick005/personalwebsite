import type { Metadata, Viewport } from "next";
import { Instrument_Sans } from "next/font/google";
import Script from "next/script";
import { EMAIL, GTM_ID, LINKEDIN_URL, SITE_URL, WHATSAPP_NUMBER } from "@/lib/site";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
  variable: "--font-instrument",
});

const description =
  "I run Meta and Google ads for UAE real estate and wire the tracking behind them, so every WhatsApp enquiry and closed deal traces back to the ad that produced it. Free funnel teardown.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Md Mahimul Hoque | Paid ads, tracking and attribution for UAE real estate",
  description,
  icons: { icon: { url: "/assets/favicon.svg", type: "image/svg+xml" } },
  openGraph: {
    type: "website",
    title: "Know which ad sold the apartment | Md Mahimul Hoque",
    description:
      "Paid ads, tracking and attribution for UAE real estate. Ad click, WhatsApp reply, closed deal: every step measurable.",
    images: [{ url: "/assets/og.jpg", width: 1200, height: 630, alt: "Know which ad sold the apartment." }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Md Mahimul Hoque",
  jobTitle: "Paid ads, tracking and attribution specialist",
  description: "Meta and Google ads with conversion tracking and attribution for UAE real estate.",
  email: `mailto:${EMAIL}`,
  telephone: `+${WHATSAPP_NUMBER}`,
  sameAs: [LINKEDIN_URL],
  knowsAbout: [
    "Google Tag Manager",
    "Google Analytics 4",
    "Meta Conversions API",
    "WhatsApp conversion tracking",
    "Google Ads",
    "Meta Ads",
    "Conversion rate optimisation",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={instrumentSans.variable}>
      <body>
        {/* Google Tag Manager loads only when NEXT_PUBLIC_GTM_ID is set.
            The page pushes: whatsapp_click, email_click, linkedin_click, teardown_submit, self_check_complete */}
        {GTM_ID ? (
          <>
            <Script id="gtm" strategy="afterInteractive">
              {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
            </Script>
            <noscript>
              <iframe
                src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
                height="0"
                width="0"
                style={{ display: "none", visibility: "hidden" }}
                title="Google Tag Manager"
              />
            </noscript>
          </>
        ) : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
        />
        {children}
      </body>
    </html>
  );
}
