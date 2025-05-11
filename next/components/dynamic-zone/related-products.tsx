"use client";
import React from "react";

import { ProjectItems } from "@/components/projects/project-items";

export const RelatedProducts = ({ heading, sub_heading, products, locale }: { heading: string; sub_heading: string; products: any[], locale: string }) => {
  return (
    <div className="mt-10">
      <ProjectItems heading={heading} sub_heading={sub_heading} products={products} locale={locale} />
    </div>
  );
};
