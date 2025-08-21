import Link from "next/link";
import { Container } from "@/components/container";
import designBuildImg from "@/public/services/earnest-office-renovation-services-design-and-build.webp";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import { Locale } from "@/config";
import { SafeImage } from "@/components/safe-image";

import seoJson from "@/seo.json";
import { breadcrumbLocalized } from "@/app/_components/locale/(top-margin)/services/constants";
export const metadata = seoJson.services["design-and-build"];

function designAndBuildLocalised() {
  return {
    title: "Design and Build",
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

export default function DesignAndBuildPage() {
  const locale = "en";
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
  } = designAndBuildLocalised();
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={breadcrumbLocalized(locale, {
          name: title,
          href: `/services/design-and-build`,
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
            src={designBuildImg}
            alt="Earnest office renovation services including pre-lease, design & build, consultancy and reinstatement."
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
  <Link href={`/contact`}>
          <button className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-lg shadow transition">
            {CTA}
          </button>
        </Link>
      </div>
    </Container>
  );
}
