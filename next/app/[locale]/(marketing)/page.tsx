import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Hero } from '@/components/simple/hero';
import { AboutUs } from '@/components/simple/about-us';

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
  return (
    <div className="flex flex-col gap-8 items-center">
      <Hero companyStartDate={companyStartDate} />
      <AboutUs locale={params.locale} />
    </div>
  );
}
