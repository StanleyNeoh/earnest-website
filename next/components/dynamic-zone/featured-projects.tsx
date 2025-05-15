import React from "react";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { ParagraphStory } from "../paragraph-story";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { Container } from "../container";

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
    <Container className="bg-gradient-to-b from-slate-100 via-white to-slate-100 rounded-md shaodow-sm py-10 space-y-5">
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
