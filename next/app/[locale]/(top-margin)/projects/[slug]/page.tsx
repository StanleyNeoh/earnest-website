import { Metadata } from "next";

import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SingleProject } from "@/app/[locale]/(top-margin)/projects/_components/single-project";
import { generateMetadataObject } from '@/lib/shared/metadata';
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

import fetchContentType from "@/lib/strapi/fetchContentType";
import { breadcrumbLocalized } from "../constants";
import { Locale } from "@/config";

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
  params: { slug: string, locale: Locale };
}) {
  const { slug, locale } = params;
  const project = await fetchContentType("projects", {
    filters: { slug: params.slug },
    populate: ["thumbnail", "images"],
    locale: params.locale,
  }, true);

  if (!project) {
    redirect("/projects");
  }

  return (
    <Container className="space-y-8 p-8">
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale, {
          name: project?.name || "Project",
          href: `/${locale}/projects/${slug}`,
        })}
        className="mb-4"
      />
      <SingleProject
        project={project}
        locale={params.locale}
        containerClassName="bg-transparent lg:mx-5"
      />
    </Container>
  );
}
