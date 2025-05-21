import React from "react";

import { Heading } from "../../../../components/elements/heading";
import { Subheading } from "../../../../components/elements/subheading";
import { Company } from "@/types/types";
import { BrandsMarquee } from "./brands-marquee";
import { Container } from "@/components/container";

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
    <Container className="bg-transparent pt-12 max-w-max">
      <Heading className="pt-4">{heading}</Heading>
      <Subheading>
        {sub_heading}
      </Subheading>

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
