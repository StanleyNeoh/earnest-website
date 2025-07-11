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
    <div className="space-y-4">
      <Heading>{heading}</Heading>
      {
        companies && (
          <BrandsMarquee
            companies={companies}
            className="bg-white py-4"
          />
        )
      }
    </div>
  );
};
