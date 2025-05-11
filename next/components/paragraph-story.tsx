import { BlurImage } from "@/components/blur-image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import React from "react";
import { ImageParagraph } from "./image-paragraph";


export const ParagraphStory = ({
  title, subtitle, sections, badges, locale
}: ParagraphStoryProps & {
  locale: string;
}) => {
  return (
    <div className="max-w-8xl bg-neutral-100 flex flex-col gap-4 lg:rounded-3xl shadow-lg md:px-20 py-10">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between">
        {title && (
          <div className="flex flex-col gap-2 mb-4 justify-center items-center lg:items-start">
            <h1 className="text-lg md:text-3xl lg:text-4xl text-charcoal font-bold mb-4">{title}</h1>
            {subtitle && (
              <p className="text-base md:text-lg text-charcoal mb-4">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {badges && (
          <div className="flex flex-row gap-2 mb-4">
            {badges.map((badge, index) => (
              <BlurImage
                key={index}
                src={strapiImage(badge?.url)}
                alt="Featured Project Logo"
                width={200}
                height={200}
                className="object-cover" />
            ))}
          </div>
        )}
      </div>

      {sections && sections.map((section, index) => {
        const { images, paragraphs, direction, display, CTAs } = section;
        return (
          <ImageParagraph
            key={index}
            images={images}
            paragraphs={paragraphs}
            direction={direction}
            display={display}
            CTAs={CTAs}
            locale={locale} />
        );
      })}
    </div>
  );
};
