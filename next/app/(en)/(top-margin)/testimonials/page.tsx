import { Metadata } from "next";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import fetchContentType from "@/lib/strapi/fetchContentType";

import seoJson from "@/seo.json";
import { TestimonialItems } from "@/app/_components/locale/(top-margin)/testimonials/_components/testimonial-items";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/testimonials/constants";
export const metadata: Metadata = seoJson.main.testimonials;

function testimonialsLocalised() {
  return {
    header: "Testimonials",
  };
}

export default async function TestimonialsPage() {
  const locale = "en";
  const { header } = testimonialsLocalised();

  const pageSize = 100
  const initialTestimonials = await fetchContentType("testimonials", {
    populate: ["project", "project.thumbnail", "company"],
    pagination: {
      page: 1,
      pageSize,
    },
    filters: {
      featured: {
        $ne: true,
      },
    },
    sort: "order:desc",
  }, { requestor: "TestimonialsPage" });

  return (
    <Container className="py-4 px-4 md:px-8">
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale)}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        {header}
      </h1>
      <TestimonialItems
        initialTestimonials={initialTestimonials?.data || []}
        pageSize={pageSize}
        locale={locale}
      />
    </Container>
  );
}
