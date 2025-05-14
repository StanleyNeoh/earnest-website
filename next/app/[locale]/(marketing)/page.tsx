import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Hero } from '@/components/simple/hero';
import { AboutUs } from '@/components/simple/about-us';
import { Brands } from '@/components/dynamic-zone/brands';
import { FeaturedProjects } from '@/components/dynamic-zone/featured-projects';

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
  const companies = await fetchContentType('companies');
  return (
    <>
      <Hero companyStartDate={companyStartDate} />
      <AboutUs companyStartDate={companyStartDate} locale={params.locale} />
      <Brands
        heading="Trusted by Major Brands"
        sub_heading="Proudly trusted by leading companies across industries."
        companies={companies.data}
      />
    </>
  );
}
