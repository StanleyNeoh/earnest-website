import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import aboutUs1 from '@/public/about-us/acl-2017/1.jpg';
import aboutUs2 from '@/public/about-us/acl-2017/2.jpg';
import aboutUs3 from '@/public/about-us/acl-2017/3.jpg';
import aboutUs4 from '@/public/about-us/acl-2017/4.jpg';
import { Container } from "@/components/container";
import { Breadcrumb } from "@/app/_components/shared/Breadcrumb";

export const metadata: Metadata = {
  title: "Our Services",
  description: "Discover the range of services offered by Earnest, including workspace design, build, and project management for businesses of all sizes.",
  openGraph: {
    title: "Our Services | Earnest",
    description: "Discover the range of services offered by Earnest, including workspace design, build, and project management for businesses of all sizes.",
    url: "/services",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Services | Earnest",
    description: "Discover the range of services offered by Earnest, including workspace design, build, and project management for businesses of all sizes.",
  },
};

const serviceSections = [
  {
    href: "/services/pre-lease-services",
    image: aboutUs3,
    title: "Pre-Lease",
    subtitle: "Pre-Lease Services: RHQ & Grade-A Office Space Advisory",
  },
  {
    href: "/services/design-and-build",
    image: aboutUs1,
    title: "Design and Build",
    subtitle: "Office transformations that exceed expectations.",
  },
  {
    href: "/services/design-consultancy",
    image: aboutUs2,
    title: "Design Consultancy",
    subtitle: "Empowering you to make confident, inspired design decisions.",
  },
  {
    href: "/services/reinstatement",
    image: aboutUs4,
    title: "Reinstatement",
    subtitle: "Fast, worry-free, and fully managed — so you can focus on your next chapter.",
  },
];

export default async function ServicesPage({ params }: { params: { locale: string } }) {
  const { locale } = params;
  return (
    <Container className="py-4 px-8">
      <Breadcrumb
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
        className="mb-4"
      />
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-10 text-center">Our Services</h1>
      <div className="space-y-16">
        {serviceSections.map((section, idx) => (
          <div
            key={section.href}
            className={`flex flex-col md:flex-row items-center gap-8 ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
          >
            <div className="flex-shrink-0 w-full md:w-1/2">
              <Link href={section.href}>
                <Image
                  src={section.image}
                  alt={section.title}
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
                <span className="inline-block mt-2 text-blue-700 font-semibold group-hover:underline">Learn more &rarr;</span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}