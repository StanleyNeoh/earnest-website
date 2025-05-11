import { BlurImage } from "@/components/blur-image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import React from "react";
import { ImageParagraph } from "./image-paragraph";
import { Heading } from "./elements/heading";
import { Subheading } from "./elements/subheading";
import { cn } from "@/lib/utils";


export const ParagraphStory = ({
  title, subtitle, sections, badges, locale,
  className
}: ParagraphStoryProps & {
  locale: string;
  className?: string;
}) => {
  const titleJustify = badges ? "justify-between": "justify-center"; ;
  return (
    <div className={cn("max-w-8xl flex flex-col gap-4", className)}>
      <div className={`flex flex-col-reverse lg:flex-row items-center ${titleJustify}`}>
        {title && (
          <div className="flex flex-col gap-2 mb-4 justify-items-start items-start">
            <Heading size="md" className="text-charcoal font-bold m-0">{title}</Heading>
            {subtitle && (
              <Subheading className="text-base md:text-lg text-charcoal m-0">
                {subtitle}
              </Subheading>
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
