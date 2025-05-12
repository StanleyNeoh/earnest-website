"use client";
import React from "react";
import { TestimonialsSlider } from "./slider";
import { FeatureIconContainer } from "../features/feature-icon-container";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { TbLocationBolt } from "react-icons/tb";
import { TestimonialsMarquee } from "./testimonials-marquee";
import { AmbientColor } from "../../decorations/ambient-color";
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
    <div>
      <div className="pb-12">
        <Heading className="pt-4">{heading}</Heading>
        <Subheading>
          {sub_heading}
        </Subheading>
      </div>
      {testimonials && (
        <TestimonialsMarquee testimonials={testimonials} />
      )}
    </div>
  );
};
