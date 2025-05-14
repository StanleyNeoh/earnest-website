"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Marquee from "react-fast-marquee";
import { Company } from "@/types/types";
import Link from "next/link";
import { BlurImage } from "@/components/blur-image";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const BrandsMarquee = ({
  companies
}: {
  companies: Company[]
}) => {
  const levelOne = companies.slice(0, 8);
  const levelTwo = companies.slice(8, 16);
  return (
    <div className="max-w-7xl mx-auto">
      <BrandLevel level={levelOne} speed={80} direction="left" />
      <BrandLevel level={levelTwo} speed={80} direction="right" className="mt-8" />
    </div>
  );
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
                alt={logo?.alternativeText}
                width={400}
                height={400}
                draggable={false}
                className="rounded-lg shadow-sm border border-gray-200 mx-4"
              />
            );
          })
        }
      </Marquee>
    </div>
  )
}

