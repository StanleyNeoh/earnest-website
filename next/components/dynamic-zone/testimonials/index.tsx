"use client";
import React from "react";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { Testimonial } from "@/types/types";
import { Container } from "@/components/container";

export const Testimonials = ({
  heading,
  sub_heading,
  testimonials,
  locale,
}: {
  heading: string,
  sub_heading: string,
  testimonials: Testimonial[],
  locale: string,
}) => {
  return (
    <Container className="bg-gradient-to-b from-neutral-100 via-white to-neutral-100 pt-12">
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
