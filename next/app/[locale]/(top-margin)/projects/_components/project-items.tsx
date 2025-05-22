"use client"
import React, { useEffect } from "react";
import { Project } from "@/types/types";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import Link from "next/link";
import fetchContentType from "@/lib/strapi/fetchContentTypeClient";
import { useLoadManager } from "../../../../../hooks/hooks";

export const ProjectItems = ({
  initialProjects,
  pageSize = 9,
  locale,
  className,
}: {
  initialProjects: Project[];
  locale: string;
  className?: string;
  pageSize?: number;
}) => {
  const { items: projects, loading, loadTriggerRef } = useLoadManager<Project>(
    async (start: number) => {
      const newProjects = await fetchContentType('projects', {
        populate: ['thumbnail'],
        pagination: {
          start,
          limit: pageSize,
        },
      });
      return {
        data: newProjects?.data || [],
        total: newProjects?.meta.pagination.total || 0,
      };
    },
    initialProjects,
    'earnest_projects',
    1000 * 60 * 15,
  );

  return (
    <div className="relative">
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-6 max-w-[96rem] m-auto ${className || ''}`}>
        {projects.map((project) => (
          <ProjectItem
            key={"project-item" + project.slug}
            project={project}
            locale={locale}
          />
        ))}
      </div>
      <div className="w-full flex justify-center mt-8" ref={loadTriggerRef}>
        {loading && <div className="loader">Loading...</div>}
      </div>
    </div>
  );
};

const ProjectItem = ({ project, locale }: { project: Project, locale: string }) => {
  const category = project.category == 'office-interior'
    ? 'Office Interior'
    : project.category == 'industrial'
      ? 'Industrial'
      : null;

  // @TODO: Find a better way to get the first 100 characters of the description
  const descSummary = project.description?.[0].children?.[0].text?.slice(0, 100);

  return (
    <Link
      href={`/${locale}/projects/${project.slug}` as never}
      className="group relative block rounded-[5rem] overflow-hidden shadow-lg border border-gray-200 bg-white hover:shadow-2xl transition-all duration-300"
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
            <h3 className="text-white text-base  tracking-tight drop-shadow-lg">
              {descSummary ? descSummary + "..." : project.name}
            </h3>
          </div>
        </div>
      </div>
      {/* Always show title below image for accessibility and mobile */}
      <div className="text-center py-2">
        <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 transition-colors duration-200">
          {project.name}
        </h3>
      </div>
    </Link>
  );
};
