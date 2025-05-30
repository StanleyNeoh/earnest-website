import React from "react";
import { ParagraphStoryProps } from "@/types/components/simple";
import { Container } from "../../../components/container";
import { ParagraphStory } from "../../../components/paragraph-story";

import aboutUs from '@/public/about-us.jpeg';
import { Locale } from "@/config";
const aboutUsImages = [aboutUs];

const aboutUsLocalised = (companyAge: number, locale: Locale) => {
  if (locale === "zh") {
    return {
      title: "公司介绍",
      paragraphs: [
        {
          title: "关于我们",
          text: `我们致力于为企业打造兼具美学、功能与效率的办公空间。${companyAge}年设计沉淀，跨足多个行业，我们相信，每一个空间，都能激发创意、提升效率，并在美感与预算之间实现最优解。`,
        },
        {
          title: "我们的团队",
          text: "我们的团队汇聚深厚的行业经验与创新热情，致力于打造能够提升客户参与度、员工效率及品牌价值的优质空间。",
        },
        {
          title: "我们的价值观",
          text: "我们坚持透明沟通，打造信任的合作关系、务实方案与精湛工艺，是我们始终坚守的核心价值。",
        },
        {
          title: "我们的宗旨",
          text: "以坚定的信念、诚信和热情，打造兼具功能性与灵感的办公空间。",
        },
      ]
    }
  } else {
    return {
      title: "About Us",
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
        {
          title: "Our Mission",
          text: "With determination, integrity, and passion, we build workspaces that are both functional and inspiring.",
        },
      ]
    }
  }
};

export const AboutUs = ({
  companyStartDate,
  locale,
}: {
  companyStartDate: string;
  locale: Locale;
}) => {
  const companyAge = new Date().getFullYear() - new Date(companyStartDate).getFullYear();
  const { title, paragraphs } = aboutUsLocalised(companyAge, locale);
  const about_us: ParagraphStoryProps = {
    title,
    sections: [
      {
        images: aboutUsImages.map((image, i) => ({
          url: image.src,
          alternativeText: `About Us Image ${i + 1}`,
          width: image.width,
          height: image.height,
        })),
        paragraphs,
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