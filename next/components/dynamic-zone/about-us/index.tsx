import React from "react";
import { Heading } from "@/components/elements/heading";
import { Subheading } from "@/components/elements/subheading";
import { ParagaraphStoryProps, ParagraphProps } from "@/types/components/shared";
import { ImageCarousel } from "./image-carousel";

export const AboutUs = ({
  title,
  subtitle,
  sections,
}: {
  title?: string,
  subtitle?: string,
  sections?: ParagaraphStoryProps[],
}) => {
  return (
    <div className="max-w-8xl py-10 md:px-20 lg:px-8 ">
      <Heading className="text-charcoal font-semibold text-5xl lg:text-6xl mb-4">
        {title}
      </Heading>
      <Subheading className="text-charcoal font-semibold">
        {subtitle}
      </Subheading>
      {
        sections?.map(({ paragraphs, images, direction }, index) => {
          const flex_dir = direction === "img-on-left" ? "lg:flex-row":  "lg:flex-row-reverse";
          return (
            <div key={index} className={`flex flex-col-reverse ${flex_dir} gap-4 items-center text-center lg:text-left`}>
              <div className="flex flex-col gap-4 lg:w-1/2 p-4 items-center">
                {images && <ImageCarousel images={images} />}
              </div>
              <div className="flex flex-col gap-4 lg:w-1/2 p-4">
                {
                  paragraphs?.map((paragraph: ParagraphProps, i: number) => (
                    <div key={i} className="flex flex-col gap-4">
                      <h2 className="text-4xl text-charcoal font-semibold mb-4">
                        {paragraph?.title}
                      </h2>
                      <p className="text-base md:text-lg text-charcoal font-normal mb-4">
                        {paragraph?.text}
                      </p>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}