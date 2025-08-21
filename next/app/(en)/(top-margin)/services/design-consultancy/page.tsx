import Link from "next/link";
import designConsultancyImg from "@/public/services/earnest-office-renovation-services-consultancy.webp";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { SafeImage } from "@/components/safe-image";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/services/constants";
export const metadata = seoJson.services["design-consultancy"];

function designConsultancyLocalised() {
  return {
    title: "Design Consultancy",
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

export default function DesignConsultancyPage() {
  const locale = "en";
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
  } = designConsultancyLocalised();
  return (
    <Container className="py-16 px-4 md:px-8">
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale, {
          name: title,
          href: `/services/design-consultancy`,
        })}
        className="mb-4"
      />
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
            src={designConsultancyImg}
            alt="Earnest office renovation services including pre-lease, design & build, consultancy and reinstatement."
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
  <Link href={`/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}