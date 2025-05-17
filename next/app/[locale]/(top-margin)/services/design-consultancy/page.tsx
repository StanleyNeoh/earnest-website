import Link from "next/link";
import Image from "next/image";
import designConsultancyImg from "@/public/about-us/acl-2017/2.jpg";
import { Heading } from "@/components/elements/heading";
import { Subheading } from "@/components/elements/subheading";
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

const whoFor = [
  "MNCs establishing a Regional HQ in Singapore",
  "Projects with phased or complex design requirements",
  "Large-scale or bespoke high-end fit-outs",
  "Companies seeking clear separation between design and construction phases",
  "Global firms requiring consistent brand representation across regions",
];

const processSteps = [
  {
    title: "SPACE – Understanding Your Requirements",
    text: "We begin by identifying team-specific needs—such as workstations, meeting areas, or server rooms. Use our Space Calculator for detailed planning. Need help securing an office space? We can connect you with our trusted leasing agents.",
  },
  {
    title: "SURVEY – Site Assessment",
    text: "An Earnest designer conducts an on-site survey, capturing detailed measurements. We also assist in acquiring As-Built Drawings and building fit-out guidelines. You’ll receive a clear project timeline at this stage.",
  },
  {
    title: "DESIGN – Crafting Your Global Image",
    text: "Drawing from our experience designing for international brands, we create office concepts that balance functionality, aesthetics, and your brand’s unique DNA.",
  },
  {
    title: "TENDER – Defining the Scope",
    text: "Our detailed tender drawings and documentation outline all design specifications—minimizing variation orders and ensuring smoother execution post-award.",
  },
  {
    title: "AWARD – Unbiased Tender Evaluation",
    text: "As your independent consultant, we provide fair assessments and a comprehensive evaluation report—supporting your decision-making process with objectivity.",
  },
  {
    title: "MANAGE – Project Oversight",
    text: "Throughout the build, we collaborate with your appointed contractor to ensure smooth delivery, strict timelines, and professional execution.",
  },
  {
    title: "MOVE – Welcome to Your New Office",
    text: "With construction and QA complete, it's time to move in. Your new workspace is ready to support your team's next chapter.",
  },
];

const comparisonRows = [
  ["Criteria", "Design Consultancy", "Design & Build"],
  ["Project Type", "Phased or complex projects requiring detailed planning", "Fast-track projects where time is a key factor"],
  ["Project Scale", "Best suited for large-scale or bespoke projects (above 30,000 sq. ft.)", "Ideal for small to medium-sized projects (under 30,000 sq. ft.)"],
  ["Design Customisation", "Offers highly tailored and intricate design solutions", "Offers practical designs focused on efficiency and speed"],
  ["Project Structure", "Separates design and construction phases, enabling independent expertise", "Combines both under a single point of responsibility (one-stop solution)"],
  ["Procurement Flexibility", "Greater flexibility in selecting construction partners", "Less flexibility—design and build handled by the same provider"],
  ["Budget Management", "May have variable costs depending on tender results", "Greater budget certainty and cost transparency upfront"],
  ["Collaboration Model", "Ideal for clients preferring traditional project delivery and detailed oversight", "Suited for clients who want streamlined communication and faster execution"],
  ["Value Engineering", "More emphasis on bespoke quality and design intent", "Strong focus on cost efficiency and practicality through ongoing collaboration"],
];

export default function DesignConsultancyPage() {
  return (
    <Container className="py-16 px-4 md:px-8">
      {/* Breadcrumb */}
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: "Design Consultancy", href: "/services/design-consultancy" },
        ]}
        className="mb-4"
      />
      {/* Title and Image */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Services - Design Consultancy
          </h1>
          <h2 className="text-lg text-gray-600 mb-4">
            Empowering you to make confident, inspired design decisions.
          </h2>
        </div>
        <div className="flex-shrink-0">
          <Image
            src={designConsultancyImg}
            alt="Design Consultancy Service"
            width={220}
            height={220}
            className="rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
      <div className="text-gray-700 text-base mb-6 space-y-4">
        <p>
          At Earnest, our design consultancy service is rooted in close collaboration. We work hand-in-hand with you to define your objectives, understand your aspirations, and create a space that reflects your company’s vision with authenticity and finesse.
        </p>
        <p>
          From initial ideation to final material selection, we guide you through every step—ensuring clarity, creativity, and consistency throughout your project.
        </p>
      </div>
      {/* Who is this service for? */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Who is this service for?</h2>
        <ul className="list-none space-y-1">
          {whoFor.map((item, i) => (
            <li key={i} className="flex items-center text-gray-700">
              <span className="text-green-600 mr-2">✔</span> {item}
            </li>
          ))}
        </ul>
      </div>
      {/* How It Works */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">How It Works</h2>
        <h3 className="mb-2 text-gray-700 font-semibold">Design Consultancy Process</h3>
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
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Choosing Between Design Consultancy and Design &amp; Build</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg bg-white text-sm">
            <thead>
              <tr>
                {comparisonRows[0].map((cell, i) => (
                  <th key={i} className="px-4 py-2 border-b font-semibold text-gray-700 bg-gray-100">{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.slice(1).map((row, rIdx) => (
                <tr key={rIdx} className="even:bg-gray-50">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-4 py-2 border-b text-gray-700 align-top">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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