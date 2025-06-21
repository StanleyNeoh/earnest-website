import React from "react";

import { Container } from "../../../components/container";
import heroImage from "../../../public/hero.jpg";
import whiteEarnestLogo from "../../../public/earnest-white-logo.svg";
import { Locale } from "@/config";
import { SafeImage } from "@/components/safe-image";

export const Hero = ({
  locale,
}: {
  locale: Locale;
}) => {
  const heroText = locale === "zh" 
    ? ["获取灵感, ", <br key="br" />, "协作工作空间"] 
    : ["Get Inspiring, ", <br key="br" />, "Collaborative Workspaces"];
  return (
    <div
      className="relative py-32 w-screen h-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${heroImage.src})`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-gray-700/80 to-black/90" />
      <Container className="relative flex flex-col-reverse lg:flex-row items-center lg:items-start justify-center lg:justify-between gap-16 h-full">
        <h1
          className="text-4xl lg:text-7xl lg:mt-32 text-center lg:text-start text-white relative z-10"
          style={{ fontFamily: "'Open Sans', sans-serif" }}
        >
          {React.Children.toArray(heroText)}
        </h1>
        <SafeImage
          src={whiteEarnestLogo.src}
          width={whiteEarnestLogo.width}
          height={whiteEarnestLogo.height}
          alt="Earnest Logo"
          className="h-24 w-auto object-contain z-10"
        />
      </Container>
    </div>
  );
};
