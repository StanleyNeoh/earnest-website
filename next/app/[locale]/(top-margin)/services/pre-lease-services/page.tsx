import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import preLeaseImg from "@/public/about-us/acl-2017/3.jpg";
import { Locale } from "@/config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Service - Pre-lease Services | Earnest",
  description: "End-to-end office design and build solutions for companies seeking seamless, innovative, and cost-transparent workspace transformations.",
};

const preLeaseLocalised = (locale: Locale) => {
  if (locale === "zh") {
    return {
      title: "服务项目 - 租赁咨询",
      subtitle: "租赁咨询：区域总部（RHQ）及甲级写字楼选址建议",
      description: [
        "正在筹备在新加坡设立区域总部（RHQ）？",
        "我们协助跨国企业寻找并锁定最适合其战略需求的甲级办公空间。",
        "我们的租赁咨询以客户为中心，注重实用与效率——从您的视角出发，结合行业洞察，提供切实可行的解决方案。",
        "借助我们与一流写字楼租赁代理的合作网络，我们亦可协助管理各项行政流程，确保从规划到入驻的每一步都顺利高效。无论是选址还是空间规划，我们都将全程为您保驾护航。",
      ],
      howItWorksTitle: "服务流程",
      howItWorksSubtitle: "租赁咨询流程",
      howItWorksSteps: [
        {
          title: "了解您的需求",
          text: "我们从深入了解您的业务目标、运营需求和空间偏好开始。与我们推荐的写字楼租赁代理合作，开展全面的初步咨询，厘清空间需求与长远发展愿景，为寻找理想办公地点奠定基础。",
        },
        {
          title: "选址与空间评估",
          text: "明确需求后，租赁代理会根据您的预算、员工通勤便利性、周边配套设施以及未来扩展性，筛选合适的办公空间。我们也将提供测试平面图，协助您评估空间布局与可行性，助力决策。",
        },
        {
          title: "推荐方案与租约谈判",
          text: "选定心仪地点后，租赁代理将代表您谈判租约条款，力争获取最优条件。租约签订后，我们仍将继续参与，提供设计咨询或完整的设计与施工服务，全方位实现理想办公空间。",
        },
      ],
      CTA: "欢迎联系我们，获取免费咨询",
    };
  } else {
    return {
      title: "Services - Pre-Lease Services",
      subtitle: "Pre-Lease Services: RHQ & Grade-A Office Space Advisory",
      description: [
        "Setting up a Regional Headquarters (RHQ) in Singapore?",
        "We support multinational corporations in identifying and securing ideal Grade-A office spaces tailored to their strategic needs.",
        "Our pre-lease advisory approach is straightforward and client-centric—we view challenges from your perspective and apply our industry expertise to deliver thoughtful, effective solutions.",
        "Through our network of top-tier leasing agents, we also help manage the administrative process, ensuring a smooth journey from planning to move-in. Whether you’re navigating site selection or space planning, we’re here to guide you every step of the way.",
      ],
      howItWorksTitle: "How It Works",
      howItWorksSubtitle: "Pre-Lease Advisory Process",
      howItWorksSteps: [
        {
          title: "Identify Your Needs",
          text: "We begin with a deep dive into your business goals, operational requirements, and design preferences. Together with our recommended Leasing Agent, we conduct a comprehensive consultation to understand your space needs and long-term vision. This forms the foundation for finding your ideal office.",
        },
        {
          title: "Location Scouting & Space Evaluation",
          text: "With clear requirements in mind, our Leasing Agent shortlists suitable office spaces based on your budget, workforce accessibility, surrounding amenities, and future scalability. We also support your decision-making process by evaluating potential sites with test-fit floor plans to visualize how the space can work for you.",
        },
        {
          title: "Recommendations & Lease Negotiation",
          text: "Once you’ve selected your preferred location, the Leasing Agent manages lease negotiations on your behalf to secure favorable terms. After the lease is finalized, we stay involved—offering design consultancy or complete design-and-build services to bring your new office to life.",
        },
      ],
      CTA: "Contact us for a free consultation",
    };
  }
};

export default function PreLeaseServicesPage({
  params,
}: {
  params: { locale: Locale }
}) {
  const { locale } = params;
  const { 
    title, 
    subtitle, 
    description, 
    howItWorksTitle, 
    howItWorksSubtitle, 
    howItWorksSteps,
    CTA,
  } = preLeaseLocalised(locale);
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: title, href: "/services/pre-lease-services" },
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
            src={preLeaseImg}
            alt="Pre-Lease Services"
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
      {/* Description */}
      <div className="text-gray-700 text-base mb-6 space-y-4">
        {description.map((text, index) => (
          <p key={index}>
            {text}
          </p>
        ))}
      </div>
      {/* How It Works */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {howItWorksTitle}
        </h2>
        <h3 className="mb-2 text-gray-700 font-semibold">
          {howItWorksSubtitle}
        </h3>
        <ol className="list-none space-y-3">
          {howItWorksSteps.map((step, i) => (
            <li key={i}>
              <div className="flex flex-row items-center gap-2 mb-2">
                <span className="inline w-8 h-8 bg-blue-700 text-white rounded-full flex items-center justify-center mr-2">
                  0{i + 1}
                </span>
                <span className="font-semibold text-gray-800">
                  {step.title}
                </span>
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