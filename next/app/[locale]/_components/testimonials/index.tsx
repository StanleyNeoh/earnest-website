"use client";
import React from "react";
import { Heading } from "../../../../components/elements/heading";
import { Subheading } from "../../../../components/elements/subheading";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { Testimonial } from "@/types/types";
import { Container } from "@/components/container";
import { Locale } from "@/config";

const testimonialsLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      heading: "客户评价",
      sub_heading: "倾听来自我们客户满意的声音，了解他们亲身体验我们的服务带来的价值与成果。",
    };
  } else {
    return {
      heading: "What Our Clients Say",
      sub_heading: "Hear from our satisfied users who have experienced the benefits of our service firsthand.",
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
  const { heading, sub_heading } = testimonialsLocalised(locale);
  return (
    <Container className="bg-transparent pt-12">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading>
        {sub_heading}
      </Subheading>
      {testimonials && (
        <TestimonialsMarquee
          testimonials={testimonials}
          locale={locale}
        />
      )}
    </Container>
  );
};
