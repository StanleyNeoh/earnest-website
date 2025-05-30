import React from "react";

import { Heading } from "../../../../components/elements/heading";
import { Company } from "@/types/types";
import { BrandsMarquee } from "./brands-marquee";
import { Container } from "@/components/container";
import { Locale } from "@/config";

const brandsLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      heading: "众多知名品牌的信赖选择",
    };
  } else {
    return {
      heading: "Trusted by Major Brands"
    };
  }
}

export const Brands = ({
  companies,
  locale,
}: {
  companies: Company[]
  locale: Locale,
}) => {
  const { heading } = brandsLocalised(locale);
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
