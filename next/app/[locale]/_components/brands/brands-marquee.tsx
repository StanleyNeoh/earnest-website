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
  if (companies.length < 8) {
    return (
      <div className={cn("max-w-7xl mx-auto", className)}>
        <BrandLevel level={companies} speed={80} direction="left" />
      </div>
    );
  } else {
    const levelOne = companies.slice(0, companies.length / 2);
    const levelTwo = companies.slice(companies.length / 2, companies.length);
    return (
      <div className={cn("max-w-7xl mx-auto", className)}>
        <BrandLevel level={levelOne} speed={80} direction="left" />
        <BrandLevel level={levelTwo} speed={80} direction="right" className="mt-2" />
      </div>
    );
  }
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
      <Marquee speed={speed} direction={direction}>
        {
          level.map((company: Company, index: any) => {
            const { logo } = company;
            return (
              <BlurImage
                key={index}
                src={strapiImage(logo?.url)}
                alt={logo?.alternativeText}
                width={100}
                height={50}
                draggable={false}
                className="mx-4"
              />
            );
          })
        }
      </Marquee>
    </div>
  )
}

