import React from "react";
import { Metadata } from 'next';

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/app/_components/locale/(top-margin)/projects/[category]/_components/project-items';
import fetchContentType from "@/lib/strapi/fetchContentType";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { Locale } from "@/config";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/projects/constants";
export const metadata: Metadata = seoJson.main.projects

const projectsLocalised = () => {
  return {
    title: "项目",
  };
}

export default async function Projects() {
  const locale = "zh";
  const pageSize = 100;
  const { title } = projectsLocalised();
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
          crumbs={breadcrumbLocalized(locale)}
          className="mb-4"
        />
        <Heading as="h1" className="text-3xl font-bold text-gray-800">
          {title}
        </Heading>
      </Container>
      <ProjectItems
        pageSize={pageSize}
        initialProjects={initialProjects?.data || []}
        locale={locale}
      />
    </>
  );
}
