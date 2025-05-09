"use client";

import React from "react";
import { BlurImage } from "@/components/blur-image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";
import Autoplay from "embla-carousel-autoplay";

export const ImageCarousel = ({ images }: { images: Image[] }) => {
  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[Autoplay({ delay: 3000, stopOnInteraction: false })]}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index} className="flex items-center justify-center">
            <BlurImage
              src={strapiImage(image.url)}
              alt={image.alternativeText || "carousel image"}
              width={400}
              height={400}
              className="w-full md:rounded-3xl object-cover"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};