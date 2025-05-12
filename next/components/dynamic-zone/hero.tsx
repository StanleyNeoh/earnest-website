"use client";
import React from "react";
import Link from "next/link";

import { Heading } from "../elements/heading";
import { Button } from "../elements/button";
import { BlurImage } from "../blur-image";
import { Image } from "@/types/types";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Subheading } from "../elements/subheading";
import { Container } from "../container";

export const Hero = ({ 
  heading, 
  sub_heading, 
  CTAs, 
  image, 
  locale,
  company_start_date,
}: { 
  heading: string; 
  sub_heading: string; 
  CTAs: any[]; 
  image: Image; 
  locale: string;
  company_start_date: string;
}) => {
  const company_age = new Date().getFullYear() - new Date(company_start_date).getFullYear();
  heading = heading.replace(/{company_age}/g, company_age.toString());
  return (
    <Container className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-slate-100 py-16 rounded-md shadow-sm">
      <Heading
        as="h1"
        className="text-3xl md:text-5xl lg:text-7xl font-bold max-w-7xl mx-auto text-center relative z-10 text-gray-800"
      >
        {heading}
      </Heading>
      <Subheading className="text-center text-lg md:text-xl lg:text-2xl text-gray-600 max-w-5xl relative z-10 mt-4">
        {sub_heading}
      </Subheading>
      <BlurImage
        src={strapiImage(image?.url)}
        alt={image?.alternativeText}
        width={200}
        height={200}
        className="w-full h-full max-h-lvh object-cover mt-6 md:rounded-3xl md:w-2/3 md:h-2/3 lg:w-1/2 lg:h-1/2 shadow-lg"
      />
      <div className="flex flex-wrap justify-center space-x-4 items-center mt-8">
        {CTAs && CTAs.map((cta) => (
          <Button
            key={cta?.id}
            as={Link}
            href={`/${locale}${cta.URL}`}
            {...(cta.variant && { variant: cta.variant })}
            className="px-6 py-3 text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-all duration-300"
          >
            {cta.text}
          </Button>
        ))}
      </div>
    </Container>
  );
};
