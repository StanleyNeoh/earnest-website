import type { Viewport } from "next";
import { Locale, i18n } from '@/i18n.config'
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

import whatsappIcon from '@/public/whatsapp.svg';
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return i18n.locales.map(locale => ({ lang: locale }))
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { lang: Locale }
}) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `}
        </Script>
      </head>
      <body suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        {children}
        <Link href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}>
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            zIndex: 1000
          }}>
            <Image src={whatsappIcon} alt="WhatsApp" width={24} height={24} />
          </div>
        </Link>
        <SpeedInsights />
      </body>
    </html>
  );
}
