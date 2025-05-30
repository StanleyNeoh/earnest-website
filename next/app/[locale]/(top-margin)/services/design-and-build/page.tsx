import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Subheading } from "@/components/elements/subheading";
import { Container } from "@/components/container";
import designBuildImg from "@/public/about-us/acl-2017/1.jpg";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Service - Design and Build | Earnest",
  description: "End-to-end office design and build solutions for companies seeking seamless, innovative, and cost-transparent workspace transformations.",
};
/*
服务 - 设计与建造
办公空间改造，超越期待
无论您是打造全新办公室、翻新现有空间，还是改造商业物业，我们的一站式设计与建造解决方案，都将为您带来顺畅、高效且契合愿景的全过程服务体验。

---
服务对象
✔ 租约即将到期、计划迁址的企业
 ✔ 各类规模的办公室翻新项目
 ✔ 时间紧迫或对预算优先的项目
 ✔ 需要设计+施工一体化服务的团队
 ✔ 追求预算可控与高确定性的客户

---
我们的优势
全流程无缝执行，一站到底
 我们由经验丰富的设计师与项目经理组成的整合团队，将全程负责从概念设计到施工落地的每一个环节，确保项目高效推进，工期更短，质量更有保障。
- 创新与实用兼顾 — 兼具美感与功能的设计，契合您的品牌形象
- 成本透明 — 提供详细分项报价，紧急估算亦可快速响应
- 法规合规 — 完全符合SCDF、BCA等本地主管机构要求
- 省心托付 — 提供搬迁及原址还原工程支持

---
项目流程
七步完成设计与建造
01 空间规划
 明确团队的使用需求，包括工位、会议室、技术基础设施等。
02 现场勘查
 我们的设计师将到场实地测量，并向楼宇管理方索取装修指引，同时制定项目时间线。
03 设计方案
 我们的设计团队将共同打造体现贵公司文化与愿景的办公空间，兼具智能布局、视觉美感与人性化体验。
04 成本报价
 提供清晰、详细的分项预算，无模糊数字，无隐藏费用。如有紧急需求，也可快速提供估算。
05 方案报批
 若涉及结构变动（如加门或隔墙），我们将代为向SCDF、BCA等相关机构递交审批，并由专业工程师全程把关。
06 项目施工
 方案获批后正式启动施工。一般项目周期为1至3个月，视规模与复杂程度而定。
07 入驻与还原
 我们可协助贵公司搬迁，并负责原办公室的还原工程

CTA: 欢迎联系我们，免费获取项目咨询
*/

export function designAndBuildLocalised(locale: string) {
  if (locale === "zh") {
    return {
      title: "服务 - 设计与建造",
      subtitle: "办公空间改造，超越期待",
      description: [
        "无论您是打造全新办公室、翻新现有空间，还是改造商业物业，我们的一站式设计与建造解决方案，都将为您带来顺畅、高效且契合愿景的全过程服务体验。"
      ],
      whoForTitle: "服务对象",
      whoFor: [
        "租约即将到期、计划迁址的企业",
        "各类规模的办公室翻新项目",
        "时间紧迫或对预算优先的项目",
        "需要设计+施工一体化服务的团队",
        "追求预算可控与高确定性的客户"
      ],
      whyChooseTitle: "我们的优势",
      whyChoose: [
        "全流程无缝执行，一站到底——由经验丰富的设计师与项目经理组成的整合团队，全程负责每一个环节，确保项目高效推进，工期更短，质量更有保障。",
        "创新与实用兼顾——兼具美感与功能的设计，契合您的品牌形象",
        "成本透明——提供详细分项报价，紧急估算亦可快速响应",
        "法规合规——完全符合SCDF、BCA等本地主管机构要求",
        "省心托付——提供搬迁及原址还原工程支持"
      ],
      processTitle: "项目流程",
      processSubtitle: "七步完成设计与建造",
      processSteps: [
        { title: "空间规划", text: "明确团队的使用需求，包括工位、会议室、技术基础设施等。" },
        { title: "现场勘查", text: "我们的设计师将到场实地测量，并向楼宇管理方索取装修指引，同时制定项目时间线。" },
        { title: "设计方案", text: "我们的设计团队将共同打造体现贵公司文化与愿景的办公空间，兼具智能布局、视觉美感与人性化体验。" },
        { title: "成本报价", text: "提供清晰、详细的分项预算，无模糊数字，无隐藏费用。如有紧急需求，也可快速提供估算。" },
        { title: "方案报批", text: "若涉及结构变动（如加门或隔墙），我们将代为向SCDF、BCA等相关机构递交审批，并由专业工程师全程把关。" },
        { title: "项目施工", text: "方案获批后正式启动施工。一般项目周期为1至3个月，视规模与复杂程度而定。" },
        { title: "入驻与还原", text: "我们可协助贵公司搬迁，并负责原办公室的还原工程。" }
      ],
      CTA: "欢迎联系我们，免费获取项目咨询"
    };
  } else {
    return {
      title: "Service - Design and Build",
      subtitle: "Office transformations that exceed expectations.",
      description: [
        "Whether you're creating a brand-new office, renovating an existing space, or transforming a commercial property — our end-to-end design and build solution makes the entire journey smooth, efficient, and aligned with your vision."
      ],
      whoForTitle: "Who it's for",
      whoFor: [
        "Companies with expiring leases and relocation plans",
        "Small to large-scale office renovation projects",
        "Fast-tracked timelines and budget-sensitive projects",
        "Teams looking for a one-stop design + build solution",
        "Clients who want confidence in budget certainty"
      ],
      whyChooseTitle: "Why choose Design & Build with Us?",
      whyChoose: [
        "Innovation meets practicality — Aesthetic, functional designs tailored to your brand",
        "Cost transparency — Every detail itemised, with urgent estimates available",
        "Regulatory expertise — Full compliance with SCDF, BCA and other authorities",
        "Peace of mind — Reinstatement and moving services available"
      ],
      processTitle: "Our Process",
      processSubtitle: "Design & Build in 7 Clear Steps",
      processSteps: [
        { title: "Space", text: "We start by identifying your team’s spatial needs — including workstations, meeting rooms, and tech infrastructure." },
        { title: "Survey", text: "An Earnest designer conducts a detailed site survey to capture accurate measurements and request fit-out guidelines from building management. We’ll also map out your project timeline." },
        { title: "Design", text: "Our experienced team will co-create a workspace that reflects your company’s culture and aspirations. Expect smart layouts, refined aesthetics, and a thoughtful user experience." },
        { title: "Price", text: "We deliver a clear, itemised cost breakdown — no vague numbers or hidden fees. Need an urgent estimate? We've got you covered." },
        { title: "Submission", text: "If your design requires structural changes (e.g., doors or partitions), we’ll handle submissions to SCDF and BCA. Our professional engineer ensures everything is compliant and approved." },
        { title: "Build", text: "Once drawings are approved, we kick off construction. Most projects take 1–3 months depending on size and complexity." },
        { title: "Move", text: "We can manage your move and reinstate your previous office space. After the move, you’ll receive as-built drawings and a full maintenance walkthrough of your new office." }
      ],
      CTA: "Contact us for a free consultation"
    };
  }
}

export default function DesignAndBuildPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const {
    title,
    subtitle,
    description,
    whoForTitle,
    whoFor,
    whyChooseTitle,
    whyChoose,
    processTitle,
    processSubtitle,
    processSteps,
    CTA,
  } = designAndBuildLocalised(locale);
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: title, href: "/services/design-and-build" },
        ]}
        className="mb-4"
      />

      {/* Title and Image */}
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
            src={designBuildImg}
            alt="Design and Build Service"
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-700 text-base mb-6 space-y-4">
        {description.map((text: string, index: number) => (
          <p key={index}>{text}</p>
        ))}
      </div>

      {/* Who it's for */}
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

      {/* Why choose */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{whyChooseTitle}</h2>
        <ul className="list-disc pl-6 space-y-1">
          {whyChoose.map((item: string, i: number) => (
            <li key={i} className="text-blue-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* Our Process */}
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

      {/* CTA */}
      <div className="flex justify-center mt-10">
        <Link href="/contact">
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}
