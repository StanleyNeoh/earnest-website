import React from 'react';

import { Inter } from 'next/font/google';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { Locale } from '@/config';
import seoJson from '@/seo.json'

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = seoJson.main[''];

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = "zh";
  return (
    <div className="bg-neutral-100 antialiased h-full w-full">
      <Navbar locale={locale} />
      <div className="relative overflow-hidden w-full">
        {children}
      </div>
      <Footer locale={locale} />
    </div>
  );
}