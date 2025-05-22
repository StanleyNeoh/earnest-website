import { Metadata } from "next";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import fetchContentType from "@/lib/strapi/fetchContentType";

import { TestimonialItems } from "./_components/testimonial-items";

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

export default async function TestimonialsPage({ params }: { params: { locale: string } }) {
  const initialTestimonials = await fetchContentType("testimonials", {
    populate: ["project", "project.thumbnail"],
    pagination: {
      page: 1,
      pageSize: 4,
    },
    sort: "order:desc",
    locale: params.locale,
  });

  return (
    <Container className="py-4 px-4 md:px-8">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Testimonials", href: "/testimonials" },
        ]}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Testimonials</h1>
      <TestimonialItems 
        initialTestimonials={initialTestimonials?.data || []}
        pageSize={3} 
        locale={params.locale}
      />
    </Container>
  );
}
