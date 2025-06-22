import { Metadata } from "next";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import fetchContentType from "@/lib/strapi/fetchContentType";

import { TestimonialItems } from "./_components/testimonial-items";
import { Locale } from "@/config";
import { breadcrumbLocalized } from "./constants";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Hear from our clients about their experience with Earnest.",
  openGraph: {
    title: "Testimonials | Earnest",
    description: "Hear from our clients about their experience with Earnest.",
    url: "/testimonials",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Testimonials | Earnest",
    description: "Hear from our clients about their experience with Earnest.",
  },
};

function testimonialsLocalised(locale: Locale) {
  if (locale === "zh") {
    return {
      header: "客户感言",
    };
  } else {
    return {
      header: "Testimonials",
    };
  }
}

export default async function TestimonialsPage({ params }: { params: { locale: Locale } }) {
  const { header } = testimonialsLocalised(params.locale);

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
        crumbs={breadcrumbLocalized(params.locale)}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">
        {header}
      </h1>
      <TestimonialItems
        initialTestimonials={initialTestimonials?.data || []}
        pageSize={pageSize}
        locale={params.locale}
      />
    </Container>
  );
}
