import React from "react";
import { Metadata } from 'next';

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/app/[locale]/(top-margin)/projects/[category]/_components/project-items';
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { breadcrumbLocalized } from "./constants";
import { Locale } from "@/config";

export const metadata: Metadata = {
  title: "Earnest | Projects",
  description: "Explore our diverse portfolio of projects, showcasing our expertise in design and build solutions for various industries.",
}

const projectsLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      title: "项目",
    };
  } else {
    return {
      title: "Our Projects",
    };
  }
}

export default async function Projects({
  params,
}: {
  params: { locale: Locale };
}) {
  const pageSize = 100;
  const { title } = projectsLocalised(params.locale);
  const initialProjects = await fetchContentType('projects', {
    populate: ['thumbnail'],
    pagination: {
      page: 1,
      pageSize,
    },
    sort: "order:desc",
  }, { requestor: "ProjectsPage" });

  return (
    <>
      <Container className="space-y-8 py-4 px-8">
        <Breadcrumb
          crumbs={breadcrumbLocalized(params.locale)}
          className="mb-4"
        />
        <Heading as="h1" className="text-3xl font-bold text-gray-800">
          {title}
        </Heading>
      </Container>
      <ProjectItems
        pageSize={pageSize}
        initialProjects={initialProjects?.data || []}
        locale={params.locale}
      />
    </>
  );
}
