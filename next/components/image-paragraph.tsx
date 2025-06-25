import React from "react";
import Link from "next/link";
import { Button } from "@/components/elements/button";
import { ImageParagraphProps } from "@/types/components/shared";
import { Heading } from "./elements/heading";
import { cn } from "@/lib/utils";
import { SafeImage } from "./safe-image";

export const ImageParagraph = ({
  paragraphs,
  image,
  locale,
  titleClassName,
  paragraphClassName,
}: ImageParagraphProps & {
  locale: string;
  titleClassName?: string;
  paragraphClassName?: string;
}) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-16 items-center justify-between`}>
      {
        image && (
          <div className="w-full lg:w-1/2">
            <SafeImage 
              src={image.url || ""}
              alt={image.alternativeText || ""}
              width={image.width || 0}
              height={image.height || 0}
              className="object-cover w-full h-auto"
            />
          </div>
        )
      }

      {/* Paragraphs */}
      <div className="flex flex-col gap-12 text-center w-full lg:w-1/2">
        {
          (() => {
            if (Array.isArray(paragraphs)) {
              return (
                paragraphs.map(({ title, text }, index) => {
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
                })
              )
            } else {
              return paragraphs;
            }
          })()
        }
      </div>
    </div>
  );
}
