"use client";
import React from "react";
import { Heading } from "../../../../../components/elements/heading";
import { Subheading } from "../../../../../components/elements/subheading";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { Testimonial } from "@/types/types";
import { Container } from "@/components/container";
import { Locale } from "@/config";

const testimonialsLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      heading: "客户评价",
    };
  } else {
    return {
      heading: "What Our Clients Say",
    };
  }
}

export const Testimonials = ({
  testimonials,
  locale,
}: {
  testimonials: Testimonial[],
  locale: Locale,
}) => {
  const { heading } = testimonialsLocalised(locale);
  return (
    <div className="space-y-4">
      <Heading>{heading}</Heading>
      {testimonials && (
        <TestimonialsMarquee
          testimonials={testimonials}
          locale={locale}
        />
      )}
    </div>
  );
};
