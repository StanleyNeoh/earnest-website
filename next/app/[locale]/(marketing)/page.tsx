import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Hero } from '@/components/simple/hero';
import { AboutUs } from '@/components/simple/about-us';
import { Brands } from '@/components/dynamic-zone/brands';
import { Testimonials } from '@/components/dynamic-zone/testimonials';
import util from 'util';
import { cache } from 'react';
import { FeaturedProjects } from '@/components/dynamic-zone/featured-projects';
import { Company, Project, Testimonial } from '@/types/types';

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
    projects,
  ]: [
    { data: Company[] }, 
    { data: Testimonial[] },
    { data: Project[] },
  ] = await Promise.all([
    fetchContentType("companies", { 
      populate: [],
      filters: {
        selected: true
      },
      cache: true,
    }),
    fetchContentType("testimonials", {
      populate: ['company', 'project', 'company.logo'], 
      cache: true,
    }),
    fetchContentType("projects", {
      populate: {},
      filters: {
        featured: {
          $notNull: true,
        }
      }
    }),
  ]);

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
      <FeaturedProjects 
        heading="Featured Projects"
        sub_heading="Explore our portfolio of successful projects that showcase our expertise and creativity."
        projects={projects.data.map((project) => project.featured!)}
        locale={params.locale}
      />
    </>
  );
}
