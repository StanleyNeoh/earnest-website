import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Hero } from '@/components/simple/hero';
import { AboutUs } from '@/components/simple/about-us';
import { Brands } from '@/components/dynamic-zone/brands';
import { Testimonials } from '@/components/dynamic-zone/testimonials';
import util from 'util';
import { cache } from 'react';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType(
    'pages',
    {
      filters: {
        slug: "homepage",
        locale: params.locale,
      },
      populate: "seo.metaImage",
    },
    true
  );

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const companyStartDate = "2007-01-01";
  const [
    companies, 
    testimonials,
  ] = await Promise.all([
    fetchContentType("companies", { 
      populate: [],
      filters: {
        featured: true
      },
      cache: true,
    }),
    fetchContentType("testimonials", {
      populate: ['company', 'project', 'company.logo'], 
      filters: {
        featured: true
      },
      cache: true,
    }),
  ]);
  // console.log("companies", companies);
  console.log("testimonials", util.inspect(testimonials, { depth: null, colors: true }));

  return (
    <>
      <Hero companyStartDate={companyStartDate} />
      <AboutUs companyStartDate={companyStartDate} locale={params.locale} />
      <Brands
        heading="Trusted by Major Brands"
        sub_heading="Proudly trusted by leading companies across industries."
        companies={companies.data}
      />
      <Testimonials
        heading="What Our Clients Say"
        sub_heading="Hear from our satisfied users who have experienced the benefits of our service firsthand."
        testimonials={testimonials.data}
        locale={params.locale}
      />
    </>
  );
}
