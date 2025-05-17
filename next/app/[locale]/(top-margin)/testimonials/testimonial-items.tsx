"use client";
import { Testimonial } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import fetchContentType from "@/lib/strapi/fetchContentTypeClient";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { strapiImage } from "@/lib/strapi/strapiImage";

import earnestLogo from "@/public/earnest-black-logo.svg";
import { Button } from "@/components/elements/button";
import Link from "next/link";

export const TestimonialItems = ({
  initialTestimonials,
  pageSize = 2,
  locale,
}: {
  initialTestimonials: Testimonial[];
  pageSize?: number;
  locale: string;
}) => {
  const loadTriggerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [hasMoreTestimonials, setHasMoreTestimonials] = useState(true);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (loading) return;
        if (!hasMoreTestimonials || entries[0].intersectionRatio <= 0) return;

        setLoading(true);
        try {
          const newTestimonials = await fetchContentType("testimonials", {
            populate: ["project", "project.thumbnail"],
            pagination: {
              start: testimonials.length,
              limit: pageSize,
            },
            locale: locale,
          });
          const _testimonials = [...testimonials, ...(newTestimonials?.data || [])];
          setTestimonials(_testimonials);
          setHasMoreTestimonials(_testimonials.length < newTestimonials.meta.pagination.total);
        } catch (error) {
          console.error("Error fetching more testimonials:", error);
        }
        setLoading(false);
      },
      { threshold: 0.1 }
    );

    if (!loadTriggerRef.current) return;
    observer.observe(loadTriggerRef.current!);
    return () => {
      observer.disconnect();
    };
  }, [loading, hasMoreTestimonials, locale, pageSize, testimonials]);

  return (
    <div className="space-y-16">
      {
        testimonials?.map((testimonial: any, idx: number) => {
          return (
            <TestimonialItem
              key={testimonial.id}
              testimonial={testimonial}
              direction={idx % 2 === 0 ? "left" : "right"} />
          );
        })
      }
      <div
        ref={loadTriggerRef}
        className="h-10 w-full flex justify-center items-center"
      >
        {loading && <span className="text-gray-500">Loading...</span>}
      </div>
    </div>
  );
};

const TestimonialItem = ({
  testimonial,
  direction,
}: {
  testimonial: Testimonial;
  direction: "left" | "right";
}) => {
  const dirClass = direction === "left" ? "md:flex-row" : "md:flex-row-reverse";
  const project = testimonial.project;
  const company = testimonial.company;
  const thumbnail = project?.thumbnail;
  return (
    <div className={cn("flex flex-col items-center gap-8", dirClass)}>
      <div className="flex-shrink-0 w-full md:w-1/2">
        <Image
          src={thumbnail?.url ? strapiImage(thumbnail.url) : earnestLogo.src}
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
}
