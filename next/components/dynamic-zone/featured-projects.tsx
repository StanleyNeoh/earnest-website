import React from "react";
import { Heading } from "../elements/heading";
import { Subheading } from "../elements/subheading";
import { ParagraphStory } from "../paragraph-story";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";

export const FeaturedProjects = ({ 
  header,
  sub_header,
  projects,
  locale,
}: {
  header?: string;
  sub_header?: string;
  projects: ParagraphStoryProps[];
  locale: string;
}) => {
  return (
    <div className="md:mx-20 my-10 max-w-8xl space-y-5">
      {
        header && (
          <Heading className="text-charcoal font-semibold">
            {header}
          </Heading>
        )
      }
      {
        sub_header && (
          <Subheading className="text-charcoal">
            {sub_header}
          </Subheading>
        )
      }
      {
        projects.map((project, i) => (
          <ParagraphStory
            key={i}
            locale={locale}
            className="md:px-20"
            {...project}
          />
        ))
      }
  </div>
  );
};
