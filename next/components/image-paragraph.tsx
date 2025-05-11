import React from "react";
import Link from "next/link";
import { Button } from "@/components/elements/button";
import { ImageParagraphProps } from "@/types/components/shared";
import { ImageCarousel } from "@/components/image-carousel";
import { ImageGallery } from "./image-gallery";
import { Heading } from "./elements/heading";

export const ImageParagraph = ({
  images,
  paragraphs,
  direction,
  display,
  CTAs,
  locale,
}: ImageParagraphProps & {
  locale: string;
}) => {
  const flex_dir = direction === "img-on-left" ? "lg:flex-row" : "lg:flex-row-reverse";
  return (
    <div className={`flex flex-col ${flex_dir} gap-16 mb-8 items-center justify-between`}>
      <div className="w-full lg:w-1/2">
        {
          images && (
            display == "carousel" && <ImageCarousel images={images} auto="play" showArrows={false} />
          ) || (
            display == "tile" && <ImageGallery images={images} />
          )
        }
      </div>

      {/* Paragraphs */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between">
        <div className="flex flex-col gap-4 text-center px-5">
          {paragraphs && paragraphs.map(({ title, text }) => {
            // @TODO: Use markdown parser with custom react components for translation
            const chunks = text?.split(/(\r\n|\n|\r)/gm).filter((chunk) => chunk.trim() !== "") || [];
            return (
              <>
                {title && <Heading size="sm" className="text-charcoal font-semibold">{title}</Heading>}
                {chunks.map((chunk, index) => (
                  <p key={index} className="text-base md:text-lg text-charcoal mb-4">
                    {chunk}
                  </p>
                ))}
              </>
            );
          })}
        </div>
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
