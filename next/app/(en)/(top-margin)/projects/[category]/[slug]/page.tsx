import { Metadata } from "next";

import { redirect } from "next/navigation";
import { Container } from "@/components/container";
import { SingleProject } from "@/app/_components/locale/(top-margin)/projects/[category]/_components/single-project";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

import fetchContentType from "@/lib/strapi/fetchContentType";
import { Locale } from "@/config";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/projects/constants";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string, category:string, slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
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
  params: Promise<{ slug: string, category: string }>;
}) {
  const locale = "en";
  const { slug, category } = await params;
  const project = await fetchContentType("projects", {
    filters: { slug },
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
          href: `/projects/${category}/${slug}`,
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
