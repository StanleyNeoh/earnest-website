import type { Viewport } from "next";
import { Locale, i18n } from '@/i18n.config'
import Link from 'next/link';
import Image from 'next/image';
import whatsappIcon from '@/blob/whatsapp.svg';

import "./globals.css";

import { SlugProvider } from "./context/SlugContext";

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
  return (
    <html lang={params.lang} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <SlugProvider>
          {children}
        </SlugProvider>
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
      </body>
    </html>
  );
}
