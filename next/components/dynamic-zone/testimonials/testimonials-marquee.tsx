"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Marquee from "react-fast-marquee";
import { Testimonial } from "@/types/types";
import Link from "next/link";
import { Logo } from "@/components/simple/logo";

export const TestimonialsMarquee = ({
  testimonials,
  locale,
}: {
  testimonials: Testimonial[]
  locale: string;
}) => {
  const levelOne = testimonials.slice(0, 8);
  const levelTwo = testimonials.slice(8, 16);
  return (
    <div className="max-w-7xl mx-auto">
      <TestimonialLevel level={levelOne} speed={20} direction="left" locale={locale} />
      <TestimonialLevel level={levelTwo} speed={20} direction="right" className="mt-8" locale={locale} />
    </div>
  );
};

export const Card = ({
  href,
  className,
  children,
}: {
  href?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <Link
      href={href || "/projects"}
      className={cn(
        "block p-8 rounded-xl bg-slate-100 border border-gray-400 group hover:bg-slate-200 hover:border-gray-500 transition-all duration-300 ease-in-out",
        className
      )}
    >
      {children}
    </Link>
  );
};

export const Quote = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h3 className={cn("text-base font-semibold text-charcoal py-2", className)}>
      {`"${children}"`}
    </h3>
  );
};

export const QuoteDescription = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <p
      className={cn("text-sm font-normal text-neutral-400 max-w-sm", className)}
    >
      {children}
    </p>
  );
};

const TestimonialLevel = ({
  level,
  speed,
  direction,
  className,
  locale,
}: {
  level: Testimonial[];
  speed: number;
  direction: "left" | "right";
  className?: string;
  locale: string;
}) => {
  return <div className={cn("flex h-full relative", className)}>
    <div className="h-full absolute w-20 left-0 inset-y-0 z-30 bg-gradient-to-r from-white to-transparent" />
    <div className="h-full absolute w-20 right-0 inset-y-0 z-30 bg-gradient-to-l from-white to-transparent" />
    <Marquee speed={speed} direction={direction}>
      {
        level.map((testimonial: Testimonial, index: any) => {
          return (
            <Card
              href={`/projects/${testimonial.project?.slug || ""}`}
              key={`testimonial-${index}`}
              className="max-w-xl mx-4"
            >
              <Quote>{testimonial.remarks}</Quote>
              <div className="flex gap-2 items-center mt-8 justify-between">
                <div className="flex flex-col">
                  <QuoteDescription className="text-neutral-900">
                    {testimonial.representative_name}
                  </QuoteDescription>
                  <QuoteDescription className="text-neutral-900">
                    {testimonial.representative_role}
                  </QuoteDescription>
                </div>
                {
                  testimonial.company?.logo && (
                    <Logo
                      logoUrl={testimonial.company?.logo.url}
                      width={100}
                      height={100}
                      locale={locale}
                      isStrapiImage={true}
                    />
                  )
                }
              </div>
            </Card>
          );
        })
      }
    </Marquee>
  </div>;
}

