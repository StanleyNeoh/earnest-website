"use client";
import React from "react";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { Testimonial } from "@/types/types";

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
    <div className="max-w-7xl mx-auto relative z-20 pb-10">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading>
        {sub_heading}
      </Subheading>
      {testimonials && (
        <TestimonialsMarquee testimonials={testimonials} />
      )}
    </div>
  );
};
