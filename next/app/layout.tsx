import type { Viewport } from "next";
import { Locale, locales } from '@/config'
import Link from 'next/link';
import Script from 'next/script';
// import { SpeedInsights } from "@vercel/speed-insights/next"

import whatsappIcon from '@/public/whatsapp.svg';
import favicon from '@/public/favicon.ico';
import "./globals.css";
import { SafeImage } from "@/components/safe-image";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#06b6d4" },
    { media: "(prefers-color-scheme: dark)", color: "#06b6d4" },
  ],
};

export async function generateStaticParams() {
  return locales.map(locale => ({ lang: locale }))
}

function GTMScript({
  GTM_ID
}: {
  GTM_ID?: string;
}) {
  if (!GTM_ID) {
    console.warn('GTM_ID is not set. Skipping Google Tag Manager script (Script).');
    return null;
  }
  return (
    <Script id="gtm-script" strategy="beforeInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${GTM_ID}');
      `}
    </Script>
  );
}

function GTMNoScript({
  GTM_ID
}: {
  GTM_ID?: string;  
}) {
  if (!GTM_ID) {
    console.warn('GTM_ID is not set. Skipping Google Tag Manager script (NoScript).');
    return null;
  }
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      ></iframe>
    </noscript>
  );
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ lang?: Locale }>
}) {
  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;
  const resolvedParams = await params;
  const lang = resolvedParams?.lang || 'en';
  
  return (
    <html lang={lang} suppressHydrationWarning>
      <head>
        <GTMScript GTM_ID={GTM_ID} />
        <link rel="icon" href={favicon.src} type="image/svg+xml" />
      </head>
      <body suppressHydrationWarning>
        <GTMNoScript GTM_ID={GTM_ID} />
        {children}
        <Link href={process.env.NEXT_PUBLIC_WHATSAPP_URL || '#'}>
          <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#25D366',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            zIndex: 1000
          }}>
            <SafeImage src={whatsappIcon} alt="WhatsApp" width={50} height={50} />
          </div>
        </Link>
      </body>
    </html>
  );
}
