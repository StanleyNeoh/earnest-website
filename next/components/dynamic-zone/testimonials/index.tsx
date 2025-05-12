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
  testimonials 
}: { 
  heading: string, 
  sub_heading: string, 
  testimonials: Testimonial[],
}) => {
  return (
    <Container className="bg-gradient-to-b from-slate-100 to-white rounded-md shadow-sm py-20">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading>
        {sub_heading}
      </Subheading>
      {testimonials && (
        <TestimonialsMarquee testimonials={testimonials} />
      )}
    </Container>
  );
};
