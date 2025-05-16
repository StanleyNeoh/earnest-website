import React from "react";
import { Metadata } from 'next';

import { Container } from "@/components/container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/app/[locale]/(top-margin)/projects/_components/project-items'; 
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';
import util from "util";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

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
  const projects = await fetchContentType('projects');
  return (
    <Container className="space-y-8 bg-gradient-to-b from-white to-slate-100 rounded-md shadow-sm py-4 px-8">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
        ]}
        className="mb-4"
      />
      <Heading as="h1" className="text-3xl font-bold text-gray-800">
        Our projects
      </Heading>
      <ProjectItems projects={projects?.data} locale={params.locale} className="grid grid-cols-1 md:grid-cols-2 gap-6" />
    </Container>
  );
}
