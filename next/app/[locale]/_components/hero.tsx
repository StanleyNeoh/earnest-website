import React from "react";

import { Heading } from "../../../components/elements/heading";
import { Subheading } from "../../../components/elements/subheading";
import { Container } from "../../../components/container";
import backgroundImage from "@/public/office-space.png";

export const Hero = ({
  companyStartDate,
}: {
  companyStartDate: string;
}) => {
  const companyAge = new Date().getFullYear() - new Date(companyStartDate).getFullYear();
  return (
      <div
        className="relative py-32 w-screen h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
        <Container className="relative flex flex-col items-center justify-center h-full">
          <Heading
            as="h1"
            className="text-3xl md:text-5xl lg:text-7xl font-bold max-w-7xl mx-auto text-center text-gray-800 relative z-10"
          >
            Designing and building beautiful, functional workspaces for over {companyAge} years
          </Heading>
          <Subheading
            className="text-center text-lg md:text-2xl lg:text-4xl text-gray-800 max-w-5xl mt-4 relative z-10"
          >
            with transparent costings and on-time delivery
          </Subheading>
        </Container>
      </div>
  );
};
