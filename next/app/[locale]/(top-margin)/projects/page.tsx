import React from "react";
import { Metadata } from 'next';

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/app/[locale]/(top-margin)/projects/_components/project-items';
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { Project } from "@/types/types";

export const metadata: Metadata = {
  title: "Earnest | Projects",
  description: "Explore our diverse portfolio of projects, showcasing our expertise in design and build solutions for various industries.",
}

export default async function Projects({
  params,
}: {
  params: { locale: string };
}) {
  // Fetch the project-page and projects data
  const initialProjects = await fetchContentType('projects', {
    populate: ['thumbnail'],
    pagination: {
      page: 1,
      pageSize: 9,
    },
  });

  return (
    <>
      <Container className="space-y-8 py-4 px-8">
        <Breadcrumb
          crumbs={[
            { name: "Home", href: "/" },
            { name: "Projects", href: "/projects" },
          ]}
          className="mb-4"
        />
        <Heading as="h1" className="text-3xl font-bold text-gray-800">
          Our Projects
        </Heading>
      </Container>
      <ProjectItems
        initialProjects={initialProjects?.data || []}
        locale={params.locale}
      />
    </>
  );
}
