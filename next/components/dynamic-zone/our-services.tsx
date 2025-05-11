import React from "react";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { ParagraphStory } from "../paragraph-story";

export const OurServices = ({
  locale,
  services,
}: {
  services: ParagraphStoryProps;
  locale: string;
}) => {
  console.log("OurServices", services);
  return (
    <div className="max-w-8xl py-10 md:px-20 lg:px-8 ">
      <ParagraphStory
        {...services}
        locale={locale}
        className="md:px-20"
      />
    </div>
  )
}