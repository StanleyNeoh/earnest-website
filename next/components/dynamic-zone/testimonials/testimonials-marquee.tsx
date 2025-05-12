"use client";
import { cn } from "@/lib/utils";
import React from "react";
import Marquee from "react-fast-marquee";
import { Testimonial } from "@/types/types";
import Link from "next/link";

export const TestimonialsMarquee = ({
  testimonials
}: {
  testimonials: Testimonial[]
}) => {
  const levelOne = testimonials.slice(0, 8);
  const levelTwo = testimonials.slice(8, 16);
  return (
    <div className="max-w-7xl mx-auto">
      <TestimonialLevel level={levelOne} speed={20} direction="left" />
      <TestimonialLevel level={levelTwo} speed={20} direction="right" className="mt-8"/>
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
        "block p-8 rounded-xl border border-[rgba(255,255,255,0.10)] bg-[rgba(200,200,200,0.30)] shadow-[2px_4px_16px_0px_rgba(248,248,248,0.06)_inset] group",
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
      {children}
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
}: {
  level: Testimonial[];
  speed: number;
  direction: "left" | "right";
  className?: string;
}) => {
  return <div className={cn("flex h-full relative", className)}>
    <div className="h-full absolute w-20 left-0 inset-y-0 z-30 bg-gradient-to-r from-slate-100 to-transparent" />
    <div className="h-full absolute w-20 right-0 inset-y-0 z-30 bg-gradient-to-l from-slate-100 to-transparent" />
    <Marquee speed={speed} direction={direction}>
      {
        level.map((testimonial: Testimonial, index: any) => {
          return (
            <Card
              href={`/projects/${testimonial.project?.slug}`}
              key={`testimonial-${index}`}
              className="max-w-xl w-96 h-60 mx-4"
            >
              <Quote>{testimonial.remarks}</Quote>
              <div className="flex gap-2 items-center mt-8">
                <div className="flex flex-col">
                  <QuoteDescription className="text-neutral-800">
                    {testimonial.representative_name}
                  </QuoteDescription>
                  <QuoteDescription className="text-neutral-900">
                    {testimonial.representative_role}
                  </QuoteDescription>
                </div>
              </div>
            </Card>
          );
        })
      }
    </Marquee>
  </div>;
}

