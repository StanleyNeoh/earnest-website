import React, { Suspense } from 'react'

import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { generateMetadataObject } from '@/lib/shared/metadata';

import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { cn } from '@/lib/utils';
import fetchContentType from '@/lib/strapi/fetchContentType';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Default Global SEO for pages without them
export async function generateMetadata({
  params,
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const pageData = await fetchContentType(
    'global',
    {
      filters: { locale: params.locale },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const pageData = await fetchContentType('global', { filters: { locale } }, true);
  return (
    <div
      className={cn(
        inter.className,
        "bg-slate-100 antialiased h-full w-full"
      )}
    >
      <Navbar data={pageData.navbar} locale={locale} />
      <div className="pt-32 relative overflow-hidden w-full">
        {children}
      </div>
      <Footer data={pageData.footer} locale={locale} />
    </div>
  );
}