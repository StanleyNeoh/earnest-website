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
    <Container>
      <ParagraphStory
        {...services}
        locale={locale}
        className="md:px-20"
      />
    </Container>
  )
}