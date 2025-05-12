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
    <Container className="bg-gradient-to-b from-slate-100 via-white to-slate-100 rounded-md shadow-sm">
      <ParagraphStory
        {...about_us}
        locale={locale}
        containerClassName="bg-transparent"
      />
    </Container>
  )
}