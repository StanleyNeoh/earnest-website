import React from "react";
import { Heading } from "@/components/elements/heading";
import { Subheading } from "@/components/elements/subheading";
import { ParagraphProps } from "@/types/components/shared";
import { Image } from "@/types/types";
import { ImageCarousel } from "./image-carousel";

export const AboutUs = ({
  title,
  subtitle,
  what_we_do,
  our_team,
  our_values,
  images,
}: {
  title?: string,
  subtitle?: string,
  what_we_do?: ParagraphProps,
  our_team?: ParagraphProps,
  our_values?: ParagraphProps,
  images?: Image[]
}) => {
  return (
    <div className="max-w-8xl py-10 md:px-20 lg:px-8 ">
      <Heading className="text-charcoal font-semibold text-5xl lg:text-6xl mb-4">
        {title}
      </Heading>
      <Subheading className="text-charcoal font-semibold">
        {subtitle}
      </Subheading>
      <div className="flex flex-col-reverse lg:flex-row gap-4 items-center text-center lg:text-left">
        <div className="flex flex-col gap-4 lg:w-1/2 p-4 items-center">
          { images && <ImageCarousel images={images} /> }
        </div>
        <div className="flex flex-col gap-4 lg:w-1/2 p-4">
          <h2 className="text-4xl text-charcoal font-semibold mb-4">
            {what_we_do?.title}
          </h2>
          <p className="text-base md:text-lg text-charcoal font-normal mb-4">
            {what_we_do?.text}
          </p>

          <h2 className="text-4xl text-charcoal font-semibold mb-4">
            {our_team?.title}
          </h2>
          <p className="text-base md:text-lg text-charcoal font-normal mb-4">
            {our_team?.text}
          </p>

          <h2 className="text-4xl text-charcoal font-semibold mb-4">
            {our_values?.title}
          </h2>
          <p className="text-base md:text-lg text-charcoal font-normal mb-4">
            {our_values?.text}
          </p>
        </div>
      </div>
    </div>
  )
}