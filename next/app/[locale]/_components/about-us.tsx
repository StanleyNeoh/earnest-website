import React from "react";
import { Container } from "../../../components/container";

import aboutUs from '@/public/about-us.webp';
import { Locale } from "@/config";
import { Heading } from "@/components/elements/heading";
import { SafeImage } from "@/components/safe-image";

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
          title: "WHO WE ARE",
          text: `At Earnest, we specialize in creating workspaces that inspire. For over ${companyAge} years, we’ve helped companies across industries find the perfect balance between design, functionality, and cost-effectiveness.`,
        },
        {
          title: "OUR TEAM",
          text: "Our team combines deep industry expertise with a passion for innovation — delivering spaces that drive client engagement, employee productivity, and brand success.",
        },
        {
          title: "OUR VALUES",
          text: "Transparent communication, practical solutions, and quality craftsmanship are the values we live by.",
        },
        {
          title: "OUR MISSION",
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
  const image = {
    url: aboutUs.src,
    alternativeText: `About Us Image`,
    width: aboutUs.width,
    height: aboutUs.height,
  }

  return (
    <div className={`max-w-7xl flex flex-col justify-center lg:flex-row gap-16 items-center`}>
      <div className="w-full lg:w-2/5 h-full flex justify-center items-center">
        <SafeImage
          src={image.url || ""}
          alt={image.alternativeText || ""}
          width={image.width || 0}
          height={image.height || 0}
          className="object-cover w-auto h-full"
        />
      </div>

      {/* Paragraphs */}
      <div className="flex flex-col gap-8 w-full lg:w-3/5 text-left lg:text-left items-center lg:items-start">
        <Heading size="md" className="m-0 font-bold text-gray-800 text-center lg:text-left">
          {title}
        </Heading>
        {
          paragraphs.map(({ title, text }, index) => {
            // @TODO: Use markdown parser with custom react components for translation
            const chunks = text?.split(/(\r\n|\n|\r)/gm).filter((chunk) => chunk.trim() !== "") || [];
            return (
              <div key={index} className="flex flex-col gap-2 items-center lg:items-start">
                <Heading size="sm" className="mx-0 font-bold text-charcoal text-center lg:text-left">
                  {title}
                </Heading>
                {chunks.map((chunk, index) => (
                  <p key={index} className="text-base md:text-lg text-charcoal text-center lg:text-left">
                    {chunk}
                  </p>
                ))}
              </div>
            );
          })
        }
      </div>
    </div>
  )
}