import { Metadata } from "next";

import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { AmbientColor } from "@/components/decorations/ambient-color";
import { SingleProject } from "@/components/projects/single-project";
import DynamicZoneManager from '@/components/dynamic-zone/manager'
import { generateMetadataObject } from '@/lib/shared/metadata';

import fetchContentType from "@/lib/strapi/fetchContentType";

export async function generateMetadata({
  params,
}: {
  params: { locale: string, slug: string };
}): Promise<Metadata> {

  const pageData = await fetchContentType("projects", {
    filters: { slug: params.slug },
    populate: "seo.metaImage",
  }, true)

  const seo = pageData?.seo;
  const metadata = generateMetadataObject(seo);
  return metadata;
}

export default async function SingleProjectPage({
  params,
}: {
  params: { slug: string, locale: string };
}) {

  const project = await fetchContentType("projects", {
    filters: { slug: params.slug },
  }, true)

  if (!project) {
    redirect("/projects");
  }

  return (
    <Container>
      <AmbientColor />
      <SingleProject project={project} locale={params.locale} />
    </Container>
  );
}
