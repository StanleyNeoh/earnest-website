import React from "react";

import { Heading } from "../../../../components/elements/heading";
import { Subheading } from "../../../../components/elements/subheading";
import { Company } from "@/types/types";
import { BrandsMarquee } from "./brands-marquee";
import { Container } from "@/components/container";

export const Brands = ({
  heading,
  companies,
}: {
  heading: string,
  companies: Company[]
}) => {
  return (
    <Container className="bg-transparent pt-12 max-w-max">
      <Heading className="p-4">{heading}</Heading>

      {
        companies && (
          <BrandsMarquee
            companies={companies}
            className="bg-white py-4"
          />
        )
      }
    </Container>
  );
};
