"use client";
import React from "react";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { Image as StrapiImage } from "@/types/types";
import { BlurImage } from "./blur-image";

export const ImageCarousel = ({
  images,
  auto = "none",
  showArrows = true,
  numPerPage = 1,
  className = "",
}: {
  images: StrapiImage[];
  auto?: "play" | "scroll" | "none";
  showArrows?: boolean;
  numPerPage?: number;
  className?: string;
}) => {
  const plugin = auto === "play"
    ? [Autoplay({ delay: 3000, stopOnInteraction: false })]
    : auto === "scroll"
      ? [Autoscroll({ speed: 2, stopOnInteraction: false })]
      : [];
  const basis = numPerPage > 1 ? `basis-1/${numPerPage}` : "";
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={plugin}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={index}
            className={`flex items-center justify-center ${basis}`}
          >
            <BlurImage
              src={strapiImage(image.url)}
              alt={image.alternativeText}
              width={400}
              height={400}
              draggable={false} 
              className={className}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      {
        showArrows && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )
      }
    </Carousel>
  );
}
