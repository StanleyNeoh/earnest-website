import React from "react";

import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { AnimatePresence } from "framer-motion";
import { ImageCarousel } from "./image-carousel";

export const Brands = ({
  heading,
  sub_heading,
  logos
}: {
  heading: string,
  sub_heading: string,
  logos: any[]
}) => {
  return (
    <div className="relative z-20 pb-10">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading className="max-w-3xl mx-auto">
        {sub_heading}
      </Subheading>

      <div className="flex gap-10 flex-wrap justify-center md:gap-40 relative h-full w-full mt-20">
        <AnimatePresence
          mode="popLayout"
        >
          <ImageCarousel logos={logos} />
        </AnimatePresence>
      </div>
    </div>
  );
};
