import { Heading } from "../../../components/elements/heading";
import { Project } from "@/types/types";
import { StrapiImageCarousel } from "@/components/image-carousel";
import { RichTextRenderer } from "@/components/rich-text";
import { Button } from "@/components/elements/button";
import { Locale } from "@/config";
import { StrapiImage } from "@/components/safe-image";

const featuredProjectsLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      title: "我们获奖的项目",
    };
  } else {
    return {
      title: "Our Recent Award-Winning Project",
    };
  }
}

export const FeaturedProjects = ({
  projects,
  locale,
}: {
  projects: Project[];
  locale: Locale;
}) => {
  const { title } = featuredProjectsLocalised(locale);
  return (
    <div className="space-y-4">
      <Heading>
        {title}
      </Heading>
      {
        projects.map((project, i) => (
          <FeaturedProject key={i} {...project} />
        ))
      }
    </div>
  );
};

const FeaturedProject = ({
  company,
  featured,
}: Project) => {
  if (!featured) {
    return null;
  }

  const { title, description, images, badge } = featured || {};
  const hasBadge = badge !== undefined;
  return (
    <div className="bg-white rounded-lg shadow p-6">
      {/* Header */}
      <div className={hasBadge ? "flex items-center justify-between" : "flex justify-center"}>
        {
          company?.logo && (
            <StrapiImage
              strapiImg={company.logo}
              strapiSize="small"
              className="object-cover w-72 h-auto"
            />
          )
        }
        {hasBadge && (
          <StrapiImage
            strapiImg={badge}
            strapiSize="small"
            className="object-cover w-32 h-auto"
          />
        )}
      </div>
      {/* Body: Responsive flex-col on mobile, flex-row on md+ */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 h-full">
          <StrapiImageCarousel
            images={images || []}
            strapiImgSize="small"
            auto="play"
            showArrows={false}
            imageClassName="h-[24rem] md:mt-8"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col h-full">
          <RichTextRenderer
            content={description || []}
            heading1ClassName="text-2xl mb-8 text-center md:text-left"
            paragraphClassName="text-center md:text-left"
          />
          {featured?.CTAs && featured.CTAs.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              {featured.CTAs.map((cta, idx) => (
                <Button
                  key={idx}
                  variant={cta.variant}
                  as={cta.URL ? "a" : "button"}
                  href={cta.URL}
                  className="min-w-[120px]"
                >
                  {cta.text}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};