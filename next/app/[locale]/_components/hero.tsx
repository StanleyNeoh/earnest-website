import React from "react";

import { Heading } from "../../../components/elements/heading";
import { Subheading } from "../../../components/elements/subheading";
import { Container } from "../../../components/container";
import heroImage from "../../../public/hero.png";

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
          backgroundImage: `url(${heroImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-radial from-white to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent"></div>
        <Container className="relative flex flex-col items-center justify-center h-full">
          <Heading
            as="h1"
            className="text-3xl lg:text-5xl font-bold max-w-7xl mx-auto text-center text-gray-800 relative z-10 shadow-xl"
          >
            Designing and building beautiful, functional workspaces for over {companyAge} years
          </Heading>
          <Subheading
            className="text-center text-xl lg:text-3xl text-gray-800 max-w-5xl mt-4 relative z-10 shadow-xl"
          >
            with transparent costings and on-time delivery
          </Subheading>
        </Container>
      </div>
  );
};
