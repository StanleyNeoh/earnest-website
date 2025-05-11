import React from "react";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { ParagraphStory } from "../paragraph-story";

export const AboutUs = ({
  locale,
  about_us,
}: {
  about_us: ParagraphStoryProps;
  locale: string;
}) => {
  return (
    <div className="max-w-8xl py-10 md:px-20 lg:px-8 ">
      <ParagraphStory
        {...about_us}
        locale={locale}
        className="md:px-20"
      />
    </div>
  )
}