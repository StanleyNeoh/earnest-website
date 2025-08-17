import type { Viewport } from "next";
import { Locale, locales } from '@/config'
import Script from 'next/script';
// import { SpeedInsights } from "@vercel/speed-insights/next"

import favicon from '@/public/favicon.ico';
import "./globals.css";
import { Overlay } from "./_components/shared/Overlay";

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
    <Script id="gtm-script" strategy="afterInteractive">
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
        <link rel="icon" href={favicon.src} type="image/svg+xml" />
        <GTMScript />
      </head>
      <body suppressHydrationWarning>
        <GTMNoScript GTM_ID={GTM_ID} />
        {children}
        <Overlay />
        {/* <SpeedInsights /> */}
      </body>
    </html>
  );
}
