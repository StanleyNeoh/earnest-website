import React from "react";
import { Heading } from "../../elements/heading";
import { Subheading } from "../../elements/subheading";
import { FeaturedProjectProps } from "@/types/components/shared";
import { FeaturedProject } from "./featured-project";

export const FeaturedProjects = ({ 
  header,
  sub_header,
  featured_projects,
  locale,
}: {
  header?: string;
  sub_header?: string;
  featured_projects: FeaturedProjectProps[];
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
        featured_projects.map((featured_projects, i) => (
          <FeaturedProject
            key={i}
            locale={locale}
            {...featured_projects}
          />
        ))
      }
  </div>
  );
};
