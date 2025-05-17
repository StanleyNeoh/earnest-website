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

const processSteps = [
  {
    title: "Space",
    text: "We start by identifying your team’s spatial needs — including workstations, meeting rooms, and tech infrastructure.",
  },
  {
    title: "Survey",
    text: "An Earnest designer conducts a detailed site survey to capture accurate measurements and request fit-out guidelines from building management. We’ll also map out your project timeline.",
  },
  {
    title: "Design",
    text: "Led by experienced architects, we co-create a workspace that reflects your company’s culture and aspirations. Expect smart layouts, refined aesthetics, and a thoughtful user experience.",
  },
  {
    title: "Price",
    text: "We deliver a clear, itemised cost breakdown — no vague numbers or hidden fees. Need an urgent estimate? We've got you covered.",
  },
  {
    title: "Submission",
    text: "If your design requires structural changes (e.g., doors or partitions), we’ll handle submissions to SCDF and BCA. Our in-house architect Esther ensures everything is compliant and approved.",
  },
  {
    title: "Build",
    text: "Once drawings are approved, we kick off construction. Most projects take 1–3 months depending on size and complexity.",
  },
  {
    title: "Move",
    text: "We can manage your move and reinstate your previous office space. After the move, you’ll receive as-built drawings and a full maintenance walkthrough of your new office.",
  },
];

const whoFor = [
  "Companies with expiring leases and relocation plans",
  "Small to large-scale office renovation projects",
  "Fast-tracked timelines and budget-sensitive projects",
  "Teams looking for a one-stop design + build solution",
  "Clients who want confidence in budget certainty",
];

const whyChoose = [
  "Innovation meets practicality — Beautiful, functional designs tailored to your brand",
  "Cost transparency — Every detail itemised, with urgent estimates available",
  "Regulatory expertise — Full compliance with SCDF, BCA and other authorities",
  "Peace of mind — Reinstatement and moving services available",
];

export default function DesignAndBuildPage() {
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Design and Build", href: "/services/design-and-build" },
        ]}
        className="mb-4"
      />

      {/* Title and Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Service - Design and Build
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            Office transformations that exceed expectations.
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
        <p>
          {"Whether you're creating a brand-new office, renovating an existing space, or transforming a commercial property — our end-to-end design and build solution makes the entire journey smooth, efficient, and aligned with your vision."}
        </p>
      </div>

      {/* Who it's for */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{"Who it's for"}</h2>
        <ul className="list-none space-y-1">
          {whoFor.map((item, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="text-green-600 mr-2">✔</span> {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Why choose */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Why choose Design &amp; Build with Us?</h2>
        <p className="mb-2 text-gray-700">Seamless execution from start to finish.<br />Our integrated team of designers, architects, and project managers handles everything — from initial concepts to construction. You’ll benefit from a single point of contact, faster timelines, and fewer surprises.</p>
        <ul className="list-disc pl-6 space-y-1">
          {whyChoose.map((item, i) => (
            <li key={i} className="text-blue-700">{item}</li>
          ))}
        </ul>
      </div>

      {/* Our Process */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Process</h2>
        <h3 className="mb-2 text-gray-700 font-semibold">Design &amp; Build in 7 Clear Steps</h3>
        <ol className="list-none space-y-3">
          {processSteps.map((step, i) => (
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
            Contact us for a free consultation
          </button>
        </Link>
      </div>
    </Container>
  );
}
