import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { Hero } from '@/app/[locale]/_components/hero';
import { AboutUs } from '@/app/[locale]/_components/about-us';
import { Brands } from '@/app/[locale]/_components/brands';
import { Testimonials } from '@/app/[locale]/_components/testimonials';
import { FeaturedProjects } from '@/app/[locale]/_components/featured-projects';
import { Locale } from '@/config';

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

export default async function HomePage({ params }: { params: { locale: Locale } }) {
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
      filters: {
        featured: {
          $eq: true,
        },
      }
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
      <Hero locale={params.locale} />
      <AboutUs companyStartDate={companyStartDate} locale={params.locale} />
      <Brands companies={companies?.data || []} locale={params.locale} />
      <Testimonials
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
