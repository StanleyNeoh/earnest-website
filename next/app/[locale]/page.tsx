import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { Hero } from '@/app/[locale]/_components/hero';
import { AboutUs } from '@/app/[locale]/_components/about-us';
import { Brands } from '@/app/[locale]/_components/brands';
import { Testimonials } from '@/app/[locale]/_components/testimonials';
import { FeaturedProjects } from '@/app/[locale]/_components/featured-projects';
import { Company, Project, Testimonial } from '@/types/types';
import { features } from 'process';

export const metadata: Metadata = {
  title: "Earnest | Home",
  description: "Earnest is a leading design and build company specializing in creating inspiring workspaces that enhance productivity and well-being.",
  openGraph: {
    title: "Earnest | Home",
    description: "Earnest is a leading design and build company specializing in creating inspiring workspaces that enhance productivity and well-being.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Earnest | Home",
    description: "Earnest is a leading design and build company specializing in creating inspiring workspaces that enhance productivity and well-being.",
  },
};

export default async function HomePage({ params }: { params: { locale: string } }) {
  const companyStartDate = "2007-01-01";
  const [
    companies,
    testimonials,
    projects,
  ] = await Promise.all([
    fetchContentType("companies", {
      populate: [],
      filters: {
        selected: true
      },
    }),
    fetchContentType("testimonials", {
      populate: ['company', 'project', 'company.logo'],
    }),
    fetchContentType("projects", {
      populate: {
        featured: {
          populate: "*",
        }
      },
      filters: {
        featured: {
          $notNull: true,
        },
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
        companies={companies?.data || []}
      />
      <Testimonials
        heading="What Our Clients Say"
        sub_heading="Hear from our satisfied users who have experienced the benefits of our service firsthand."
        testimonials={testimonials?.data || []}
        locale={params.locale}
      />
      <FeaturedProjects
        projects={projects?.data || []}
        locale={params.locale}
      />
    </>
  );
}
