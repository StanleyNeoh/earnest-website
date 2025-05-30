import Link from "next/link";
import Image from "next/image";
import designConsultancyImg from "@/public/about-us/acl-2017/2.jpg";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service - Design Consultancy | Earnest",
  description: "End-to-end office design and build solutions for companies seeking seamless, innovative, and cost-transparent workspace transformations.",
};

function designConsultancyLocalised(locale: string) {
  if (locale === "zh") {
    return {
      title: "服务 - 设计顾问服务",
      subtitle: "赋能每一个设计决策，助您自信前行，灵感不断",
      description: [
        "我们的设计顾问服务以“协作共创”为核心理念。我们与客户紧密合作，深入理解您的目标与愿景，打造真正体现企业品牌个性与文化的办公空间。",
        "从最初构思到最终材料选择，我们全程陪伴您走过每一个阶段，确保项目始终保持清晰的方向、一致的设计语言与充满创意的表达。"
      ],
      whoForTitle: "服务对象",
      whoFor: [
        "在新加坡设立区域总部的跨国企业（MNCs）",
        "设计需求分阶段、结构复杂的项目",
        "大型或高端定制装修项目",
        "需要将“设计”与“施工”明确分离的企业",
        "希望在全球多个地区保持品牌一致性的国际客户"
      ],
      processTitle: "服务流程",
      processSubtitle: "七步设计顾问流程",
      processSteps: [
        { title: "空间规划 - 明确需求", text: "我们将从了解贵团队的功能性需求开始，例如办公位、会议区、服务器间等。如尚未选定办公地点，我们也可推荐可靠的租赁顾问。" },
        { title: "现场勘查 - 精准评估", text: "我们的设计师将亲临现场进行详细测量，并协助获取现有竣工图（As-Built Drawings）与楼宇装修规范。此阶段，我们也会为您规划完整的项目时间线。" },
        { title: "概念设计 - 塑造全球品牌形象", text: "凭借为多个国际品牌服务的经验，我们将为您构思既符合品牌调性又兼具实用性与美感的办公空间概念。" },
        { title: "招标准备 - 明确设计范围", text: "我们将提供详尽的招标图纸与说明文档，清晰定义设计规范，最大限度减少后期的设计变更与执行偏差。" },
        { title: "招标评估 - 客观中立建议", text: "作为独立顾问，我们将协助您进行公平、公正的投标评估，并提供全面的分析报告，支持您做出明智选择。" },
        { title: "项目管理 - 全程协作监管", text: "在施工阶段，我们与承包商密切配合，确保项目高效推进、严守工期、按计划完工，严格把控施工品质。" },
        { title: "项目交付 - 启程新旅程", text: "当施工与品质验收完成后，您的新办公室将整装待发，迎接团队迈向新阶段。" }
      ],
      CTA: "欢迎联系我们，免费获取项目咨询"
    };
  } else {
    return {
      title: "Services - Design Consultancy",
      subtitle: "Empowering you to make confident, inspired design decisions.",
      description: [
        "At Earnest, our design consultancy service is rooted in close collaboration. We work hand-in-hand with you to define your objectives, understand your aspirations, and create a space that reflects your company’s vision with authenticity and finesse.",
        "From initial ideation to final material selection, we guide you through every step—ensuring clarity, creativity, and consistency throughout your project."
      ],
      whoForTitle: "Who is this service for?",
      whoFor: [
        "MNCs establishing a Regional HQ in Singapore",
        "Projects with phased or complex design requirements",
        "Large-scale or bespoke high-end fit-outs",
        "Companies seeking clear separation between design and construction phases",
        "Global firms requiring consistent brand representation across regions"
      ],
      processTitle: "How It Works",
      processSubtitle: "Design Consultancy Process",
      processSteps: [
        { title: "SPACE – Understanding Your Requirements", text: "We begin by identifying team-specific needs—such as workstations, meeting areas, or server rooms. We can connect you with our trusted leasing agents." },
        { title: "SURVEY – Site Assessment", text: "An Earnest designer conducts an on-site survey, capturing detailed measurements. We also assist in acquiring As-Built Drawings and building fit-out guidelines. You’ll receive a clear project timeline at this stage." },
        { title: "DESIGN – Crafting Your Global Image", text: "Drawing from our experience designing for international brands, we create office concepts that balance functionality, aesthetics, and your brand’s unique DNA." },
        { title: "TENDER – Defining the Scope", text: "Our detailed tender drawings and documentation outline all design specifications—minimizing variation orders and ensuring smoother execution post-award." },
        { title: "AWARD – Unbiased Tender Evaluation", text: "As your independent consultant, we provide fair assessments and a comprehensive evaluation report—supporting your decision-making process with objectivity." },
        { title: "MANAGE – Project Oversight", text: "Throughout the build, we collaborate with your appointed contractor to ensure smooth delivery, strict timelines, and professional execution." },
        { title: "MOVE – Welcome to Your New Office", text: "With construction and QA complete, it's time to move in. Your new workspace is ready to support your team's next chapter." }
      ],
      CTA: "Contact us for a free consultation"
    };
  }
}

export default function DesignConsultancyPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const {
    title,
    subtitle,
    description,
    whoForTitle,
    whoFor,
    processTitle,
    processSubtitle,
    processSteps,
    CTA,
  } = designConsultancyLocalised(locale);
  return (
    <Container className="py-16 px-4 md:px-8">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: title, href: "/services/design-consultancy" },
        ]}
        className="mb-4"
      />
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {title}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {subtitle}
          </h2>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={designConsultancyImg}
            alt="Design Consultancy Service"
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
      <div className="text-gray-700 text-base mb-6 space-y-4">
        {description.map((text: string, i: number) => (
          <p key={i}>{text}</p>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{whoForTitle}</h2>
        <ul className="list-none space-y-1">
          {whoFor.map((item: string, i: number) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="text-green-600 mr-2">✔</span> {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{processTitle}</h2>
        <h3 className="mb-2 text-gray-700 font-semibold">{processSubtitle}</h3>
        <ol className="list-none space-y-3">
          {processSteps.map((step: { title: string; text: string }, i: number) => (
            <li key={i}>
              <div className="flex flex-row items-center gap-2 mb-2">
                <span className="inline w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center mr-2">
                  0{i + 1}
                </span>
                <span className="font-semibold text-gray-800">{step.title}</span>
              </div>
              <span className="block text-gray-700 ml-12">{step.text}</span>
            </li>
          ))}
        </ol>
      </div>
      <div className="flex justify-center mt-10">
        <Link href={`/${locale}/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}