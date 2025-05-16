import React from "react";
import { Heading } from "../../../components/elements/heading";
import { Subheading } from "../../../components/elements/subheading";
import { ParagraphStory } from "../../../components/paragraph-story";
import { ParagraphStoryProps } from "@/types/components/simple";
import { Container } from "../../../components/container";

export const FeaturedProjects = ({ 
  heading,
  sub_heading,
  projects,
  locale,
}: {
  heading?: string;
  sub_heading?: string;
  projects: ParagraphStoryProps[];
  locale: string;
}) => {
  return (
    <Container className="bg-gradient-to-b from-neutral-100 via-white to-neutral-100 rounded-md shaodow-sm py-10 space-y-5">
      {
        heading && (
          <Heading className="text-charcoal font-semibold">
            {heading}
          </Heading>
        )
      }
      {
        sub_heading && (
          <Subheading className="text-charcoal">
            {sub_heading}
          </Subheading>
        )
      }
      {
        projects.map((project, i) => (
          <ParagraphStory
            key={i}
            locale={locale}
            containerClassName="bg-transparent lg:mx-5"
            {...project}
          />
        ))
      }
    </Container>
  );
};
