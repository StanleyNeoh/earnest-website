import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";
import reinstatementImg from "@/public/about-us/acl-2017/4.jpg";

const whoFor = [
  "Landlords preparing a space for lease",
  "Businesses returning premises after tenancy",
  "Companies relocating to a new workspace",
];

const processSteps = [
  {
    title: "Site Evaluation",
    text: "We start with a detailed site inspection and review your building management’s reinstatement requirements. You'll receive a comprehensive, itemised quotation based on the scope of work.",
  },
  {
    title: "Restoring to Original Condition",
    text: "Our team efficiently handles all deconstruction and removal work — ensuring compliance with lease terms and industry standards, including necessary government clearances.",
  },
  {
    title: "Final Checks",
    text: "Before handover, we conduct a full quality inspection to ensure all reinstatement standards are met and your space is ready for closure.",
  },
];

export default function ReinstatementPage() {
  return (
    <Container className="mx-auto py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Reinstatement", href: "/services/reinstatement" },
        ]}
        className="mb-4"
      />

      {/* Title and Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Reinstatement
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            Fast, worry-free, and fully managed — so you can focus on your next chapter.
          </h2>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={reinstatementImg}
            alt="Reinstatement Service"
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* Description */}
      <div className="text-gray-700 text-base mb-6 space-y-4">
        <p>
          {"We make your office reinstatement process smooth and stress-free. Whether you're a landlord preparing a space for lease, or a business relocating or completing your tenancy, Earnest ensures a seamless transition."}
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

      {/* What we offer */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">What we offer</h2>
        <p className="mb-2 text-gray-700">
          Everything handled — from start to finish.<br />
          Successfully completed reinstatement projects for landlords, building management and tenants.
          From site evaluation to final handover, every detail is managed by our experienced team.
        </p>
      </div>

      {/* Our Reinstatement Process */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Our Reinstatement Process</h2>
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