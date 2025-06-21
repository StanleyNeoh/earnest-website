"use client";
import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { Image as ImageType } from "@/types/types";

import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";
import { SafeImage } from "./safe-image";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

export const ImageCarousel = ({
  images,
  auto = "none",
  showArrows = true,
  numPerPage = 1,
  carouselClassName,
  contentClassName,
  imageClassName,
  isStrapiImage = false,
}: {
  images: ImageType[];
  auto?: "play" | "scroll" | "none";
  showArrows?: boolean;
  numPerPage?: number;
  carouselClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
  isStrapiImage?: boolean;
}) => {
  const plugin = auto === "play"
    ? [Autoplay({ delay: 3000, stopOnInteraction: false })]
    : auto === "scroll"
      ? [Autoscroll({ speed: 2, stopOnInteraction: false })]
      : [];
  const [index, setIndex] = React.useState(-1);
  const photos = useMemo(() => (images.map(({ url, width, height, alternativeText }) => ({
    src: isStrapiImage ? strapiImage(url) : url,
    alt: alternativeText || "featured project image",
    width: width,
    height: height,
  }))), [images, isStrapiImage]);

  const basis = numPerPage > 1 ? `basis-1/${numPerPage}` : "";
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={plugin}
      className={carouselClassName}
    >
      <CarouselContent>
        {
          photos.map((photo, index) => (
            <CarouselItem
              key={index}
              className={cn(`flex items-center justify-center`, basis, contentClassName)}
              onClick={() => setIndex(index)}
            >
              <SafeImage
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                className={cn("object-cover w-full h-full", imageClassName)}
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
