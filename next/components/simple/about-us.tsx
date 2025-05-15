import React from "react";
import { ParagraphStoryProps } from "@/types/components/dynamic-zone";
import { Container } from "../container";
import { ParagraphStory } from "./paragraph-story";

import aboutUs1 from '@/public/about-us/acl-2017/1.jpg';
import aboutUs2 from '@/public/about-us/acl-2017/2.jpg';
import aboutUs3 from '@/public/about-us/acl-2017/3.jpg';
import aboutUs4 from '@/public/about-us/acl-2017/4.jpg';
import aboutUs5 from '@/public/about-us/acl-2017/5.jpg';
import aboutUs6 from '@/public/about-us/acl-2017/6.jpg';
const aboutUsImages = [ aboutUs1, aboutUs2, aboutUs3, aboutUs4, aboutUs5, aboutUs6];

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
        display: "carousel",
      }
    ],
    badges: [],
  }


  return (
    <Container className="bg-gradient-to-b from-neutral-100 via-white to-neutral-100 shadow-sm px-12 pt-12">
      <ParagraphStory
        {...about_us}
        locale={locale}
        containerClassName="bg-transparent"
      />
    </Container>
  )
}