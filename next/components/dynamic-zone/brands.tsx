import React from "react";

import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { AnimatePresence } from "framer-motion";
import { ImageCarousel } from "../image-carousel";
import { Logo } from "@/types/types";

export const Brands = ({
  heading,
  sub_heading,
  logos
}: {
  heading: string,
  sub_heading: string,
  logos: Logo[]
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
          <ImageCarousel
            images={logos.map(({ image }) => image)} 
            auto="scroll" 
            showArrows={true} 
            numPerPage={5}
            className="w-full md:h-20 md:w-60 h-10 w-40 object-contain filter"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
