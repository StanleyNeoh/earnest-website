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
  containerClassName, 
  headerClassName, 
  headerLeftClassName, headerRightClassName,
  titleClassName, subtitleClassName,
  imgParaTitleClassName, imgParaParagraphClassName
}: ParagraphStoryProps & {
  locale: string;
  containerClassName?: string;
  headerClassName?: string;
  headerLeftClassName?: string;
  headerRightClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  imgParaTitleClassName?: string;
  imgParaParagraphClassName?: string;
}) => {
  const headerJustify = badges ? "justify-between": "justify-center";
  const titleJustify = badges ? "text-center lg:text-start": "text-center";
  return (
    <div className={cn("max-w-7xl flex flex-col gap-4", containerClassName)}>
      <div className={cn("flex flex-col-reverse lg:flex-row items-center", headerJustify, headerClassName)}>
        {title && (
          <div className={cn("flex flex-col gap-2 mb-4 mt-10 lg:mt-0", headerLeftClassName)}>
            <Heading size="md" className={cn("m-0", titleJustify, titleClassName)}>
              {title}
            </Heading>
            {subtitle && (
              <Subheading className={cn("text-base md:text-lg text-charcoal m-0", titleJustify, subtitleClassName)}>
                {subtitle}
              </Subheading>
            )}
          </div>
        )}
        {badges && (
          <div className={cn("flex flex-row gap-2 mb-4", headerRightClassName)}>
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
            locale={locale}
            titleClassName={imgParaTitleClassName}
            paragraphClassName={imgParaParagraphClassName}
          />
        );
      })}
    </div>
  );
};
