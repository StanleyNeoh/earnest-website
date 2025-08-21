"use client";
import React from "react";
import { Project } from "@/types/types";
import { Heading } from "../../../../../../../components/elements/heading";
import { cn } from "@/lib/utils";
import { RichTextRenderer } from "@/components/rich-text";
import { StrapiImageGallery } from "@/components/image-gallery";
import { StrapiImage } from "@/components/safe-image";

export const SingleProject = ({
  project,
  containerClassName,
}: {
  project: Project,
  containerClassName?: string,
}) => {
  return (
    <div className={cn(containerClassName, "space-y-12")}> 
      {/* Header: Title left, Thumbnail right */}
      <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20">
        <div className="flex-1 w-full">
          <Heading className="text-3xl font-bold text-gray-800 mb-2 text-left">
            {project.name}
          </Heading>
        </div>
        {project.thumbnail && (
          <div className="flex-shrink-0 w-full max-w-xs lg:max-w-md">
            <StrapiImage 
              strapiImg={project.thumbnail}
              strapiSize="small"
              className="object-cover shadow-lg w-full h-56 lg:h-72"
            />
          </div>
        )}
      </div>
      {/* Description */}
      {project.description && (
        <div className="prose max-w-7xl mx-auto text-lg text-gray-700">
          <RichTextRenderer content={project.description} />
        </div>
      )}
      {/* Gallery */}
      {project?.images?.length && (
        <div className="max-w-7xl mx-auto">
          <StrapiImageGallery images={project.images} size="small" />
        </div>
      )}
    </div>
  );
}