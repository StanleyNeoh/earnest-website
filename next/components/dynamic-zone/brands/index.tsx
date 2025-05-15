import React from "react";

import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
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
    <Container className="bg-gradient-to-b from-neutral-100 via-white to-neutral-100 pt-12">
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
