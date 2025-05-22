"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Marquee from "react-fast-marquee";
import { Company } from "@/types/types";
import Link from "next/link";
import { BlurImage } from "@/components/blur-image";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const BrandsMarquee = ({
  companies,
  className,
}: {
  companies: Company[]
  className?: string;
}) => {
  return (
    <div className={cn("max-w-7xl mx-auto", className)}>
      <BrandLevel level={companies} speed={80} direction="left" />
    </div>
  );
  // const levelOne = companies.slice(0, companies.length / 2);
  // const levelTwo = companies.slice(companies.length / 2, companies.length);
  // return (
  //   <div className={cn("max-w-7xl mx-auto", className)}>
  //     <BrandLevel level={levelOne} speed={80} direction="left" />
  //     <BrandLevel level={levelTwo} speed={80} direction="right" className="mt-2" />
  //   </div>
  // );
};

const BrandLevel = ({
  level,
  speed,
  direction,
  className,
}: {
  level: Company[];
  speed: number;
  direction: "left" | "right";
  className?: string;
}) => {
  if (!level) return null;

  return (
    <div className={cn("flex h-full relative", className)}>
      <div className="h-full absolute w-20 left-0 inset-y-0 z-30 bg-gradient-to-r from-white to-transparent" />
      <div className="h-full absolute w-20 right-0 inset-y-0 z-30 bg-gradient-to-l from-white to-transparent" />
      <Marquee speed={speed} direction={direction}>
        {
          level.map((company: Company, index: any) => {
            const { logo } = company;
            return (
              <BlurImage
                key={index}
                src={strapiImage(logo?.url)}
                alt={logo?.alternativeText || "Company logo"}
                width={logo?.width}
                height={logo?.height}
                draggable={false}
                className="w-32 h-auto mx-8"
              />
            );
          })
        }
      </Marquee>
    </div>
  )
}

