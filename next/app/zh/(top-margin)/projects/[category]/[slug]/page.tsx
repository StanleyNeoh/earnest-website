import { Metadata } from "next";

import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SingleProject } from "@/app/_components/locale/(top-margin)/projects/[category]/_components/single-project";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

import fetchContentType from "@/lib/strapi/fetchContentType";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/projects/constants";
export function generateMetadata({
  params,
}: {
  params: { locale: string, category:string, slug: string };
}): Metadata {
  const { slug } = params;
  const {
    title,
    description,
  } = slug in seoJson.projects
      ? (seoJson.projects as Record<string, typeof seoJson.projects[keyof typeof seoJson.projects]>)[slug]
      : {
          title: "Earnest Project",
          description: "Explore our projects",
        };
  return {
    title: title, 
    description: description,
  };
}

export default async function SingleProjectPage({
  params,
}: {
  params: { slug: string, category: string };
}) {
  const locale = "zh";
  const { slug, category } = params;
  const project = await fetchContentType("projects", {
    filters: { slug: params.slug },
    populate: ["thumbnail", "images"],
  }, {
    spreadData: true,
    requestor: "SingleProjectPage",
  });

  if (!project) {
    redirect("/projects");
  }

  return (
    <Container className="space-y-8 p-8">
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale, {
          name: project?.name || "Project",
          href: `/${locale}/projects/${category}/${slug}`,
        })}
        className="mb-4"
      />
      <SingleProject
        project={project}
        containerClassName="bg-transparent lg:mx-5"
      />
    </Container>
  );
}
