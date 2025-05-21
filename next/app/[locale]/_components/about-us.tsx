import React from "react";
import { ParagraphStoryProps } from "@/types/components/simple";
import { Container } from "../../../components/container";
import { ParagraphStory } from "../../../components/paragraph-story";

import aboutUs from '@/public/about-us.jpeg';
const aboutUsImages = [ aboutUs ];

export const AboutUs = ({
  companyStartDate,
  locale,
}: {
  companyStartDate: string;
  locale: string;
}) => {
  const companyAge = new Date().getFullYear() - new Date(companyStartDate).getFullYear();
  const about_us: ParagraphStoryProps = {
    title: "About Earnest",
    sections: [
      {
        images: aboutUsImages.map((image, i) => ({
          url: image.src,
          alternativeText: `About Us Image ${i + 1}`,
          width: image.width,
          height: image.height,
        })),
        paragraphs: [
          {
            title: "Who We Are",
            text: `At Earnest, we specialize in creating workspaces that inspire. For over ${companyAge} years, we’ve helped companies across industries find the perfect balance between design, functionality, and cost-effectiveness.`,
          },
          {
            title: "Our Team",
            text: "Our team combines deep industry expertise with a passion for innovation — delivering spaces that drive client engagement, employee productivity, and brand success.",
          },
          {
            title: "Our Values",
            text: "Transparent communication, practical solutions, and quality craftsmanship are the values we live by.",
          },
        ],
        CTAs: [],
        direction: "img-on-left",
        display: "tile",
      }
    ],
    badges: [],
  }


  return (
    <Container className="bg-transparent pt-12">
      <ParagraphStory
        {...about_us}
        locale={locale}
        containerClassName="bg-transparent gap-12"
      />
    </Container>
  )
}