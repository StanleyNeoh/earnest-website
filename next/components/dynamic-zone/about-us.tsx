import React from "react";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { ParagraphStory } from "../paragraph-story";
import { Container } from "../container";

export const AboutUs = ({
  locale,
  about_us,
}: {
  about_us: ParagraphStoryProps;
  locale: string;
}) => {
  return (
    <Container>
      <ParagraphStory
        {...about_us}
        locale={locale}
      />
    </Container>
  )
}