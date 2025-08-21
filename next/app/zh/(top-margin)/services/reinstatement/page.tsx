import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import reinstatementImg from "@/public/services/earnest-office-renovation-services-reinstatement.webp";
import { Locale } from "@/config";
import { SafeImage } from "@/components/safe-image";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/services/constants";
export const metadata = seoJson.services["reinstatement"];

function reinstatementLocalised() {
  return {
    title: "还原装修服务",
    subtitle: "快速、省心、全程托管 — 让您专注于开启新篇章",
    description: [
      "我们致力于为客户提供高效、无忧的办公空间还原服务。无论您是房东准备重新招租，或是企业完成租期搬迁，我们都能确保过程顺畅、按时交付。"
    ],
    whoForTitle: "服务对象",
    whoFor: [
      "正在为办公空间重新招租的房东",
      "即将归还场地的租户企业",
      "正在搬迁至新办公空间的公司"
    ],
    whatWeOfferTitle: "我们的服务优势",
    whatWeOffer: "全流程管理，一站式交付。我们已成功为众多房东、楼宇管理方及租户执行还原工程。从现场勘查到最终交接，我们的专业团队为您把控每一个细节。",
    processTitle: "服务流程",
    processSubtitle: "还原装修三步走",
    processSteps: [
      {
        title: "现场评估",
        text: "我们将首先进行详细的现场勘查，并查阅楼宇管理方对还原工程的具体要求。根据项目范围，您将收到一份清晰明细的报价单。"
      },
      {
        title: "恢复原貌",
        text: "我们的团队将高效执行拆除与恢复工作，确保符合租赁合约条款与行业规范，包括所需的政府审批流程。"
      },
      {
        title: "最终检查",
        text: "在交接前，我们会进行全面的质量检查，确保一切还原标准达标，空间状态达到交付要求。"
      }
    ],
    CTA: "欢迎联系我们，获取免费咨询服务"
  };
}

export default function ReinstatementPage({ params }: { params: { locale: Locale } }) {
  const locale = "zh";
  const {
    title,
    subtitle,
    description,
    whoForTitle,
    whoFor,
    whatWeOfferTitle,
    whatWeOffer,
    processTitle,
    processSubtitle,
    processSteps,
    CTA,
  } = reinstatementLocalised();
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale, {
          name: title,
          href: `/${locale}/services/reinstatement`,
        })}
        className="mb-4"
      />

      {/* Title and Image */}
      <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            {title}
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            {subtitle}
          </h2>
        </div>
        <div className="flex-shrink-0 mx-auto">
          <SafeImage
            src={reinstatementImg}
            alt="Earnest office renovation services including pre-lease, design & build, consultancy and reinstatement."
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-700 text-base mb-6 space-y-4">
        {description.map((text: string, i: number) => (
          <p key={i}>{text}</p>
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

      {/* What we offer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{whatWeOfferTitle}</h2>
        <p className="mb-2 text-gray-700">
          {whatWeOffer}
        </p>
      </div>

      {/* Our Reinstatement Process */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">{processTitle}</h2>
        {processSubtitle && (
          <h3 className="mb-2 text-gray-700 font-semibold">{processSubtitle}</h3>
        )}
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
        <Link href={`/${locale}/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}