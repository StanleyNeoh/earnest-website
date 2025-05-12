import React from "react";
import { strapiImage } from "@/lib/strapi/strapiImage";
import { RowsPhotoAlbum } from "react-photo-album";
import SSR from "react-photo-album/ssr"
import "react-photo-album/rows.css";
import { Image } from "@/types/types";
import { LimitMode } from "@tsparticles/engine";
import { max } from "date-fns";

export const ImageGallery = ({
  images,
  maxNumber,
}: {
  images: Image[] 
  maxNumber?: number;
}) => {
  if (maxNumber !== undefined) {
    images = images.slice(0, maxNumber);
  }
  return (
    <SSR breakpoints={[240, 380, 600, 900]}>
      <RowsPhotoAlbum
        photos={images.map(({ url, width, height, alternativeText }) => ({
          src: strapiImage(url),
          alt: alternativeText || "featured project image",
          width: width,
          height: height,
        }))}
        sizes={{
          size: "1168px",
          sizes: [{ viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)" }],
        }} />
    </SSR>
  )
}
