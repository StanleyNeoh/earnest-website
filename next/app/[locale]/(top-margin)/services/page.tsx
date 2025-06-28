import Link from "next/link";

import designAndBuildImg from '@/public/services/earnest-office-renovation-services-design-and-build.webp';
import designConsultancyImg from '@/public/services/earnest-office-renovation-services-consultancy.webp';
import preLeaseImg from '@/public/services/earnest-office-renovation-services-pre-lease.webp';
import reinstatementImg from '@/public/services/earnest-office-renovation-services-reinstatement.webp';

import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { breadcrumbLocalized } from "./constants";
import { Locale } from "@/config";
import { SafeImage } from "@/components/safe-image";

const servicesLocalised = (locale: string) => {
  if (locale === 'zh') {
    return {
      title: "我们的服务",
      learnMore: "了解更多",
      sections: [
        {
          href: `/${locale}/services/pre-lease-services`,
          image: preLeaseImg,
          title: "租赁咨询",
          subtitle: "租赁咨询服务：区域总部及甲级写字楼选址顾问服务",
        },
        {
          href: `/${locale}/services/design-and-build`,
          image: designAndBuildImg,
          title: "设计与建造",
          subtitle: "精工细作，打造卓越的办公空间",
        },
        {
          href: `/${locale}/services/design-consultancy`,
          image: designConsultancyImg,
          title: "设计顾问",
          subtitle: "赋能企业做出自信且富有灵感的设计决策。",
        },
        {
          href: `/${locale}/services/reinstatement`,
          image: reinstatementImg,
          title: "还原工程",
          subtitle: "高效、省心、全程托管，让您专注迎接下一个篇章。",
        },
      ]
    }
  } else {
    return {
      title: "Our Services",
      learnMore: "Learn more",
      sections: [
        {
          href: `/${locale}/services/pre-lease-services`,
          image: preLeaseImg,
          title: "Pre-Lease",
          subtitle: "Pre-Lease Services: RHQ & Grade-A Office Space Advisory",
        },
        {
          href: `/${locale}/services/design-and-build`,
          image: designAndBuildImg,
          title: "Design and Build",
          subtitle: "Office transformations that exceed expectations.",
        },
        {
          href: `/${locale}/services/design-consultancy`,
          image: designConsultancyImg,
          title: "Design Consultancy",
          subtitle: "Empowering you to make confident, inspired design decisions.",
        },
        {
          href: `/${locale}/services/reinstatement`,
          image: reinstatementImg,
          title: "Reinstatement",
          subtitle: "Fast, worry-free, and fully managed — so you can focus on your next chapter.",
        },
      ]
    }
  }
}

export default async function ServicesPage({ params }: { params: { locale: Locale } }) {
  const { locale } = params;
  const { title, learnMore, sections } = servicesLocalised(locale);
  return (
    <Container className="py-4 px-8">
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale)}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">{title}</h1>
      <div className="space-y-16">
        {sections.map((section, idx) => (
          <div
            key={section.href}
            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-shrink-0 w-full md:w-1/2">
              <Link href={section.href}>
                <SafeImage
                  priority={true}
                  src={section.image}
                  alt="Earnest office renovation services including pre-lease, design & build, consultancy and reinstatement."
                  width={500}
                  height={320}
                  className="rounded-lg shadow-md object-cover w-full h-64 md:h-80 cursor-pointer transition-transform hover:scale-105"
                />
              </Link>
            </div>
            <div className="flex-1 w-full md:w-1/2">
              <Link href={section.href} className="group">
                <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2 group-hover:text-blue-700 transition-colors">{section.title}</h2>
                <p className="text-lg text-gray-600 mb-4">{section.subtitle}</p>
                <span className="inline-block mt-2 text-blue-700 font-semibold group-hover:underline">{learnMore} &rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}