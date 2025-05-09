"use client";
import React from "react";
import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";

export const ImageCarousel = ({logos}: {logos: any[]}) => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[Autoscroll({ speed: 2, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {logos.map((logo) => (
          <CarouselItem
            key={logo.title}
            className="flex items-center justify-center basis-1/5"
          >
            <Image
              src={strapiImage(logo.image.url)}
              alt={logo.image.alternativeText}
              width="400"
              height="400"
              className="md:h-20 md:w-60 h-10 w-40 object-contain filter"
              draggable={false} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
