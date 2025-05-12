import React from "react";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { ParagraphStory } from "../paragraph-story";
import { Container } from "../container";

export const OurServices = ({
  locale,
  services,
}: {
  services: ParagraphStoryProps;
  locale: string;
}) => {
  return (
    <Container className="bg-gradient-to-b from-white via-slate-100 to-white shadow-sm rounded-md">
      <ParagraphStory
        {...services}
        locale={locale}
        containerClassName="bg-transparent lg:py-10 lg:px-20"
      />
    </Container>
  )
}