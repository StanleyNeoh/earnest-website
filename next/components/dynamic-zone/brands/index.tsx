import React from "react";

import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { AnimatePresence } from "framer-motion";
import { ImageCarousel } from "../../image-carousel";
import { Company } from "@/types/types";
import { BrandsMarquee } from "./brands-marquee";

export const Brands = ({
  heading,
  sub_heading,
  companies,
}: {
  heading: string,
  sub_heading: string,
  companies: Company[]
}) => {
  return (
    <div className="max-w-7xl mx-auto relative z-20 pb-10">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading>
        {sub_heading}
      </Subheading>

      {
        companies && (
          <BrandsMarquee
            companies={companies}
          />
        )
      }
    </div>
  );
};
