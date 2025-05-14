"use client";
import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { Image as StrapiImage } from "@/types/types";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import Image from "next/image";

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
  const [index, setIndex] = React.useState(-1);
  const photos = useMemo(() => (images.map(({ url, width, height, alternativeText }) => ({
    src: url,
    alt: alternativeText || "featured project image",
    width: width,
    height: height,
  }))), [images]);
  console.log("photos", photos);

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
        {
          photos.map((photo, index) => (
            <CarouselItem
              key={index}
              className={`flex items-center justify-center ${basis}`}
              onClick={() => setIndex(index)}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className="object-cover w-full h-full"
              />
            </CarouselItem>
          ))
        }
      </CarouselContent>
      {
        showArrows && (
          <>
            <CarouselPrevious />
            <CarouselNext />
          </>
        )
      }
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </Carousel>
  );
}
