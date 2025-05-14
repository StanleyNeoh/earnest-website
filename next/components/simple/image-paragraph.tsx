import React from "react";
import Link from "next/link";
import { Button } from "@/components/elements/button";
import { ImageParagraphProps } from "@/types/components/shared";
import { ImageCarousel } from "./image-carousel";
import { ImageGallery } from "./image-gallery";
import { Heading } from "../elements/heading";
import { cn } from "@/lib/utils";

export const ImageParagraph = ({
  images = [],
  paragraphs,
  direction,
  display,
  CTAs,
  locale,
  titleClassName,
  paragraphClassName,
}: ImageParagraphProps & {
  locale: string;
  titleClassName?: string;
  paragraphClassName?: string;
}) => {
  const flex_dir = direction === "img-on-left" 
    ? "flex-col lg:flex-row" 
    : direction === "img-on-right"
    ? "flex-col lg:flex-row-reverse"
    : direction === "img-on-top"
    ? "flex-col"
    : "flex-col-reverse";
  const paragraph_width = images?.length > 0 ? "w-full lg:w-1/2" : "w-full";
  return (
    <div className={`flex ${flex_dir} gap-16 items-center justify-between`}>
      {
        images && (
          <div className="w-full lg:w-1/2">
            {display == "carousel" && <ImageCarousel images={images} auto="play" showArrows={false} />}
            {display == "tile" && <ImageGallery images={images} />}
          </div>
        )
      }

      {/* Paragraphs */}
      <div className={cn("flex flex-col gap-4 text-center", paragraph_width)}>
        {paragraphs && paragraphs.map(({ title, text }, index) => {
          // @TODO: Use markdown parser with custom react components for translation
          const chunks = text?.split(/(\r\n|\n|\r)/gm).filter((chunk) => chunk.trim() !== "") || [];
          return (
            <div key={index} className="flex flex-col gap-4">
              {
                title && (
                  <Heading size="sm" className={cn("text-charcoal font-semibold", titleClassName)}>
                    {title}
                  </Heading>
                )
              }
              {chunks.map((chunk, index) => (
                <p key={index} className={cn("text-base md:text-lg text-charcoal", paragraphClassName)}>
                  {chunk}
                </p>
              ))}
            </div>
          );
        })}
        {
          CTAs?.length > 0 && (
            <div className="flex flex-row gap-2 mt-4 justify-center">
              {CTAs.map((cta, i) => {
                cta.URL = cta.URL?.trimStart().startsWith("/") ? `/${locale}${cta.URL}` : cta.URL;
                return (
                  <Button
                    className="md:py-2 md:px-4 md:text-lg lg:py-4 lg:px-8 lg:text-xl"
                    key={i}
                    as={Link}
                    href={cta.URL}
                    {...(cta.variant && { variant: cta.variant })}
                  >
                    {cta.text}
                  </Button>
                );
              })}
            </div>
          )
        }
      </div>
    </div>
  );
}
