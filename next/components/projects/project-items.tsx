import React from "react";
import { Project } from "@/types/types";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const ProjectItems = ({
  projects,
  locale,
}: {
  projects: Project[];
  locale: string
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-20 mt-10">
      {
        projects.map((project) => (
          <ProjectItem
            key={"project-item" + project.slug}
            project={project}
            locale={locale}
          />
        ))
      }
    </div>
  );
};

const ProjectItem = ({ project, locale }: { project: Project, locale: string }) => {
  return (
    <Link 
      href={`/${locale}/projects/${project.slug}` as never} 
      className="group relative block bg-neutral-100 rounded-md p-4 shadow-lg hover:shadow-xl transition duration-200"
      prefetch={true}
    >
      <div className="relative border border-neutral-900 rounded-md overflow-hidden">
        {
          project?.thumbnail && (
            <Image
              src={strapiImage(project?.thumbnail.url)}
              alt={project.name + " image"} 
              width={600}
              height={600}
              className="h-full w-full object-cover group-hover:scale-105 transition duration-200"
            />
          )
        }
      </div>
      <div className="mt-4 items-center flex flex-col gap-2">
        <div className="text-charcoal text-lg font-medium">
          {project.name}
        </div>
        <div className="text-charcoal text-base font-small">
          {project.description}
        </div>
      </div>
    </Link>
  );
};
