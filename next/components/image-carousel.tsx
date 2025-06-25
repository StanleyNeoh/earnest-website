"use client";
import React, { useMemo } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import Autoscroll from "embla-carousel-auto-scroll";
import Autoplay from "embla-carousel-autoplay";
import { ImageSize, Image as ImageType } from "@/types/types";

import dynamic from "next/dynamic";
import "yet-another-react-lightbox/styles.css";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { strapiImageFormatSize } from "@/lib/strapi/strapiImage";
import { cn } from "@/lib/utils";
import { StrapiImage } from "./safe-image";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), { ssr: false });

export const StrapiImageCarousel = ({
  images,
  auto = "none",
  showArrows = true,
  numPerPage = 1,
  strapiImgSize = "full",
  carouselClassName,
  contentClassName,
  imageClassName,
}: {
  images: ImageType[];
  auto?: "play" | "scroll" | "none";
  showArrows?: boolean;
  numPerPage?: number;
  strapiImgSize?: ImageSize;
  carouselClassName?: string;
  contentClassName?: string;
  imageClassName?: string;
}) => {
  const plugin = auto === "play"
    ? [Autoplay({ delay: 3000, stopOnInteraction: false })]
    : auto === "scroll"
      ? [Autoscroll({ speed: 2, stopOnInteraction: false })]
      : [];
  const [index, setIndex] = React.useState(-1);

  const fullPhotos = useMemo(() => (
    images.map((img) => {
      const {
        url = "",
        width = 0,
        height = 0,
        alternativeText,
      } = strapiImageFormatSize(img, strapiImgSize);
      return {
        src: url,
        alt: alternativeText || "featured project image",
        width,
        height,
      };
    }) || []
  ), [images]);

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
          images.map((img, index) => (
            <CarouselItem
              key={index}
              className={cn(`flex items-center justify-center`, basis, contentClassName)}
              onClick={() => setIndex(index)}
            >
              <StrapiImage
                strapiImg={img}
                strapiSize={strapiImgSize}
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
        slides={fullPhotos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </Carousel>
  );
}
