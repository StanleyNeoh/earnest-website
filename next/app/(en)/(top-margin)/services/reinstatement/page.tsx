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
    title: "Reinstatement",
    subtitle: "Fast, worry-free, and fully managed — so you can focus on your next chapter.",
    description: [
      "We make your office reinstatement process smooth and stress-free. Whether you're a landlord preparing a space for lease, or a business relocating or completing your tenancy, Earnest ensures a seamless transition."
    ],
    whoForTitle: "Who it's for",
    whoFor: [
      "Landlords preparing a space for lease",
      "Businesses returning premises after tenancy",
      "Companies relocating to a new workspace"
    ],
    whatWeOfferTitle: "What we offer",
    whatWeOffer: "Everything handled — from start to finish. Successfully completed reinstatement projects for landlords, building management and tenants. From site evaluation to final handover, every detail is managed by our experienced team.",
    processTitle: "Our Reinstatement Process",
    processSubtitle: "",
    processSteps: [
      {
        title: "Site Evaluation",
        text: "We start with a detailed site inspection and review your building management’s reinstatement requirements. You'll receive a comprehensive, itemised quotation based on the scope of work."
      },
      {
        title: "Restoring to Original Condition",
        text: "Our team efficiently handles all deconstruction and removal work — ensuring compliance with lease terms and industry standards, including necessary government clearances."
      },
      {
        title: "Final Checks",
        text: "Before handover, we conduct a full quality inspection to ensure all reinstatement standards are met and your space is ready for closure."
      }
    ],
    CTA: "Contact us for a free consultation"
  };
}

export default function ReinstatementPage() {
  const locale = "en";
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
          href: `/services/reinstatement`,
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
  <Link href={`/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}