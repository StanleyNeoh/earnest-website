import { Metadata } from 'next';

import { Container } from "@/components/container";
import { FeatureIconContainer } from "@/components/dynamic-zone/features/feature-icon-container";
import { Heading } from "@/components/elements/heading";
import { ProjectItems } from '@/components/projects/project-items'; 
import { Subheading } from "@/components/elements/subheading";
import { IconShoppingCartUp } from "@tabler/icons-react";
import fetchContentType from "@/lib/strapi/fetchContentType";
import { generateMetadataObject } from '@/lib/shared/metadata';

import ClientSlugHandler from '../ClientSlugHandler';

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
    <Container>
      <ClientSlugHandler localizedSlugs={localizedSlugs} />
      {
        projectPage.heading && (
        <Heading as="h1">
          {projectPage.heading}
        </Heading>
        )
      }
      {
        projectPage.sub_heading && (
        <Subheading className="max-w-3xl mx-auto">
          {projectPage.sub_heading}
        </Subheading>
        )
      }
      <ProjectItems projects={projects?.data} locale={params.locale} />
    </Container>
  );
}
