import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import React from "react";
import { ImageParagraph } from "./image-paragraph";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { cn } from "@/lib/utils";
import Image from "next/image";


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
  const headerJustify = badges.length > 0 ? "justify-between": "justify-center";
  const titleJustify = badges.length > 0 ? "text-center lg:text-start": "text-center";
  return (
    <div className={cn("max-w-7xl flex flex-col bg-white gap-8", containerClassName)}>
      <div className={cn("flex flex-col-reverse lg:flex-row items-center gap-8", headerJustify, headerClassName)}>
        {title && (
          <div className={cn("flex flex-col flex-grow gap-4", headerLeftClassName)}>
            <Heading size="md" className={cn("m-0 text-gray-800 max-w-7xl", titleJustify, titleClassName)}>
              {title}
            </Heading>
            {subtitle && (
              <Subheading className={cn("text-base md:text-lg text-gray-600 m-0 max-w-7xl", titleJustify, subtitleClassName)}>
                {subtitle}
              </Subheading>
            )}
          </div>
        )}
        {badges && (
          <div className={cn("flex flex-row gap-4", headerRightClassName)}>
            {badges.map((badge, index) => (
              <Image
                key={index}
                src={badge.url}
                alt={badge.alternativeText}
                width={badge.width}
                height={badge.height}
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
