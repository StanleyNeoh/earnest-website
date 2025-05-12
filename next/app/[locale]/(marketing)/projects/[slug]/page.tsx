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
  }, true);

  if (!project) {
    redirect("/projects");
  }

  return (
    <Container className="space-y-8 bg-gradient-to-b from-white via-slate-100 to-white rounded-md shadow-sm p-8">
      <SingleProject
        project={project}
        locale={params.locale}
        containerClassName="bg-transparent lg:mx-5"
      />
    </Container>
  );
}
