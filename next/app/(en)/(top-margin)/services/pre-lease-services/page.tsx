import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import preLeaseImg from "@/public/services/earnest-office-renovation-services-pre-lease.webp";
import { Locale } from "@/config";
import { SafeImage } from "@/components/safe-image";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/services/constants";
export const metadata = seoJson.services["pre-lease-services"];

const preLeaseLocalised = (locale: Locale) => {
  return {
    title: "Pre-Lease Services",
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
};

export default function PreLeaseServicesPage() {
  const locale = "en";
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
        crumbs={breadcrumbLocalized(locale, {
          name: title,
          href: `/services/pre-lease-services`,
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
            src={preLeaseImg}
            alt="Earnest office renovation services including pre-lease, design & build, consultancy and reinstatement."
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
  <Link href={`/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}