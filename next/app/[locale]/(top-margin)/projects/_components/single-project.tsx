"use client";
import React from "react";
import { Project } from "@/types/types";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Heading } from "../../../../../components/elements/heading";
import { BlurImage } from "../../../../../components/blur-image";
import { cn } from "@/lib/utils";
import { RichTextRenderer } from "@/components/rich-text";
import { ImageGallery } from "@/components/image-gallery";

export const SingleProject = ({
  project,
  locale,
  containerClassName,
}: {
  project: Project,
  locale: string,
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
            <BlurImage
              src={strapiImage(project.thumbnail.url)}
              alt={project.name}
              width={600}
              height={400}
              className="rounded-xl object-cover shadow-lg w-full h-56 lg:h-72"
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
      {project.images?.length > 0 && (
        <div className="max-w-7xl mx-auto">
          <ImageGallery 
            images={project.images}
            isStrapiImage={true}
          />
        </div>
      )}
    </div>
  );
}