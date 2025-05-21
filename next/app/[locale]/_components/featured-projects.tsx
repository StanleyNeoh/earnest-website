import { Heading } from "../../../components/elements/heading";
import { Subheading } from "../../../components/elements/subheading";
import { Container } from "../../../components/container";
import { Project } from "@/types/types";
import { ImageCarousel } from "@/components/image-carousel";
import { RichTextRenderer } from "@/components/rich-text";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Button } from "@/components/elements/button";

export const FeaturedProjects = ({ 
  projects,
  locale,
}: {
  projects: Project[];
  locale: string;
}) => {
  return (
    <Container className="bg-transparent py-10 space-y-2">
      <Heading>
        Our Recent Award-Winning Project
      </Heading>
      <Subheading>
        Explore the project that redefines the future of workplace interiors
      </Subheading>
      {
        projects.map((project, i) => (
          <FeaturedProject key={i} {...project} />
        ))
      }
    </Container>
  );
};

const FeaturedProject = ({
  featured,
}: Project) => {
  if (!featured) {
    return null;
  }
  const { title, description, images, badge } = featured || {};
  const hasBadge = badge !== undefined;
  return (
    <div className="bg-white rounded-lg shadow p-6 mb-8">
      {/* Header */}
      <div className={hasBadge ? "flex items-center justify-between mb-6" : "flex justify-center mb-6"}>
        <h2 className={hasBadge ? "text-3xl font-bold text-gray-800" : "text-3xl font-bold text-gray-800 text-center w-full"}>{title}</h2>
        {hasBadge && (
          <Image
            src={strapiImage(badge.url)}
            alt={badge.alternativeText || "Project badge"}
            width={200}
            height={200}
            className="object-cover"
          />
        )}
      </div>
      {/* Body: Responsive flex-col on mobile, flex-row on md+ */}
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/2 h-full">
          <ImageCarousel 
            images={images || []} 
            isStrapiImage={true} 
            auto="play"
            showArrows={false}
            imageClassName="h-[24rem] md:mt-8"
          />
        </div>
        <div className="w-full md:w-1/2 flex flex-col h-full">
          <RichTextRenderer 
            content={description || []}
            heading1ClassName="text-2xl mb-8 text-center"
            paragraphClassName="text-center"
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