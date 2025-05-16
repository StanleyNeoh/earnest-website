import React from "react";
import { Project } from "@/types/types";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Link from "next/link";
import { RichTextRenderer } from "@/components/rich-text";

export const ProjectItems = ({
  projects,
  locale,
  className,
}: {
  projects: Project[];
  locale: string;
  className?: string;
}) => {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mt-10 ${className || ''}`}>
      {projects.map((project) => (
        <ProjectItem
          key={"project-item" + project.slug}
          project={project}
          locale={locale}
        />
      ))}
    </div>
  );
};

const ProjectItem = ({ project, locale }: { project: Project, locale: string }) => {
  return (
    <Link
      href={`/${locale}/projects/${project.slug}` as never}
      className="group relative block rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
      prefetch={true}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        {project?.thumbnail && (
          <Image
            src={strapiImage(project?.thumbnail.url)}
            alt={project.name + " image"}
            fill
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        {/* Slide-up overlay on hover */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-full transition-all duration-300">
          <div className="w-full p-6 text-center">
            <h3 className="text-white text-xl font-bold tracking-tight drop-shadow-lg">
              {project.name}
            </h3>
          </div>
        </div>
      </div>
      {/* Always show title below image for accessibility and mobile */}
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
          {project.name}
        </h3>
      </div>
    </Link>
  );
};
