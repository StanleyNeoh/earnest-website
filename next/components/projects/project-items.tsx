import React from "react";
import { Project } from "@/types/types";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const ProjectItems = ({
  heading,
  sub_heading,
  projects,
  locale,
}: {
  heading?: string;
  sub_heading?: string;
  projects: Project[];
  locale: string
}) => {
  return (
    <div className="py-20">
      <h2 className="text-2xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-white to-white mb-2">
        {heading}
      </h2>
      <p className="text-neutral-500 text-lg mt-4 mb-10">
        {sub_heading}
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-20">
        {projects.map((project) => (
          <ProjectItem
            key={"regular-product-item" + project.slug}
            project={project}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
};

const ProjectItem = ({ project, locale }: { project: Project, locale: string }) => {
  const img = project?.story[0]?.sections[0]?.images[0];
  return (
    <Link 
      href={`/${locale}/projects/${project.slug}` as never} 
      className="group relative block bg-neutral-200 rounded-md p-4 shadow-lg hover:shadow-xl transition duration-200"
      prefetch={true}
    >
      <div className="relative border border-neutral-900 rounded-md overflow-hidden">
        {
          project?.story[0]?.sections[0]?.images && (
            <Image
              src={strapiImage(img?.url)}
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
