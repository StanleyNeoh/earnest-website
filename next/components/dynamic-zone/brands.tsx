import React from "react";

import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { AnimatePresence } from "framer-motion";
import { ImageCarousel } from "../image-carousel";

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
    <div className="max-w-7xl mx-auto relative z-20 pb-10">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading className="max-w-3xl mx-auto">
        {sub_heading}
      </Subheading>

      <div className="flex gap-10 flex-wrap justify-center md:gap-40 relative h-full w-full mt-20">
                <div className="h-full absolute w-20 left-0 inset-y-0 z-30 bg-gradient-to-r from-slate-100 to-transparent" />
        <div className="h-full absolute w-20 right-0 inset-y-0 z-30 bg-gradient-to-l from-slate-100 to-transparent" />
        <AnimatePresence
          mode="popLayout"
        >
          <ImageCarousel
            images={logos.map(({ image }) => image)} 
            auto="scroll" 
            showArrows={false} 
            numPerPage={5}
            className="w-full md:h-20 md:w-60 h-10 w-40 object-contain filter"
          />
        </AnimatePresence>
      </div>
    </div>
  );
};
