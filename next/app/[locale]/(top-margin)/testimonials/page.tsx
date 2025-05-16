import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Button } from "@/components/elements/button";
import { strapiImage } from "@/lib/strapi/strapiImage";

import earnestLogo from "@/public/earnest-black-logo.svg";

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
  const testimonials = await fetchContentType("testimonials", {
    populate: ["project", "project.thumbnail"],
  });
  return (
    <Container className="bg-gradient-to-b from-white via-neutral-100 to-white shadow-sm rounded-md py-4 px-4 md:px-8">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Testimonials", href: "/testimonials" },
        ]}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Testimonials</h1>
      <div className="space-y-16">
        {testimonials?.data?.map((testimonial: any, idx: number) => {
          const project = testimonial.project;
          const company = testimonial.company;
          const thumbnail = project?.thumbnail;
          return (
            <div
              key={testimonial.id}
              className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="flex-shrink-0 w-full md:w-1/2">
                <Image
                    src={thumbnail?.url ? strapiImage(thumbnail.url) : earnestLogo.src }
                    alt={project?.name || "Project thumbnail"}
                    width={500}
                    height={320}
                    className="rounded-lg shadow-md object-cover w-full h-64 md:h-80"
                />
              </div>
              <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">{company?.name}</h2>
                <p className="text-lg text-gray-600 mb-4">{`"${testimonial.remarks}"`}</p>
                <div className="text-base text-gray-500 mb-4">
                  <span className="font-semibold">{testimonial.representative_name}</span>
                  {testimonial.representative_role && (
                    <span className="ml-2">/ {testimonial.representative_role}</span>
                  )}
                </div>
                {project?.slug && (
                  <Button
                    as={Link}
                    href={`/projects/${project.slug}`}
                    variant="primary"
                    className="mt-2"
                  >
                    View Project
                  </Button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
