"use client";
import React, { useMemo } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";
import { Image } from "@/types/types";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const ImageGallery = ({
  images,
  maxNumber,
  isStrapiImage = false,
}: {
  images?: Image[];
  maxNumber?: number;
  isStrapiImage?: boolean;
}) => {
  if (maxNumber !== undefined) {
    images = images?.slice(0, maxNumber);
  }
  const [index, setIndex] = React.useState(-1);
  const photos = useMemo(() => (images?.map(({ url, width, height, alternativeText }) => ({
    src: isStrapiImage ? strapiImage(url) : url,
    alt: alternativeText || "featured project image",
    width: width,
    height: height,
  })) || []), [images, isStrapiImage]);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        onClick={({ index }) => {
          setIndex(index);
        }}
      />
      <Lightbox
        slides={photos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
      />
    </>
  )
}
