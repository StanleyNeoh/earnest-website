import React from 'react'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Earnest",
  description: "Earnest is a leading design and build company specializing in creating inspiring workspaces that enhance productivity and well-being.",
  openGraph: {
    title: "Earnest",
    description: "Earnest is a leading design and build company specializing in creating inspiring workspaces that enhance productivity and well-being.",
  },
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <div
      className={cn(
        inter.className,
        "bg-neutral-100 antialiased h-full w-full"
      )}
    >
      <Navbar locale={locale} />
      <div className="relative overflow-hidden w-full">
        {children}
      </div>
      <Footer locale={locale} />
    </div>
  );
}