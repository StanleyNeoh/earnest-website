import React from "react";
import { Metadata } from 'next';

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/components/projects/project-items'; 
import { Subheading } from "@/components/elements/subheading";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';

import ClientSlugHandler from '../ClientSlugHandler';
import { MultiSelect } from '@/components/ui/multi-select';

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType("project-page", {
    filters: {
      locale: params.locale,
    },
    populate: "seo.metaImage",
  }, true)

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function Projects({
  params,
}: {
  params: { locale: string };
}) {

  // Fetch the project-page and projects data
  const projectPage = await fetchContentType('project-page', {
    filters: {
      locale: params.locale,
    },
  }, true);
  const projects = await fetchContentType('projects');

  const localizedSlugs = projectPage.localizations?.reduce(
    (acc: Record<string, string>, localization: any) => {
      acc[localization.locale] = "projects";
      return acc;
    },
    { [params.locale]: "projects" }
  );

  return (
    <Container className="space-y-8 bg-gradient-to-b from-white to-slate-100 rounded-md shadow-sm p-8">
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      {
        projectPage.heading && (
        <Heading as="h1" className="text-3xl font-bold text-gray-800">
          {projectPage.heading}
        </Heading>
        )
      }
      {
        projectPage.sub_heading && (
        <Subheading className="max-w-3xl mx-auto text-lg text-gray-600">
          {projectPage.sub_heading}
        </Subheading>
        )
      }
      <ProjectItems projects={projects?.data} locale={params.locale} className="grid grid-cols-1 md:grid-cols-2 gap-6" />
    </Container>
  );
}
