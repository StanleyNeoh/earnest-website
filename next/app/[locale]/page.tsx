import { Metadata } from 'next';

import fetchContentType from '@/lib/strapi/fetchContentType';
import { Hero } from '@/app/[locale]/_components/hero';
import { AboutUs } from '@/app/[locale]/_components/about-us';
import { Brands } from '@/app/[locale]/_components/brands';
import { Testimonials } from '@/app/[locale]/_components/testimonials';
import { FeaturedProjects } from '@/app/[locale]/_components/featured-projects';
import { Locale } from '@/config';

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
    }, { requestor: "/[locale]/page.tsx" }),
    fetchContentType("testimonials", {
      populate: ['company', 'project', 'company.logo'],
      filters: {
        featured: {
          $eq: true,
        },
      }
    }, { requestor: "/[locale]/page.tsx" }),
    fetchContentType("projects", {
      populate: {
        company: {
          populate: ["logo"],
        },
        featured: {
          populate: "*",
        }
      },
      filters: {
        featured: {
          $notNull: true,
        },
      }
    }, { requestor: "HomePage" }),
  ]);

  return (
    <>
      <Hero locale={params.locale} />
      <div className="max-w-7xl w-full mx-auto flex flex-col gap-16 pt-16 px-8">
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
      </div>
    </>
  );
}
