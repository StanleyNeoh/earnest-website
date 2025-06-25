"use client";
import React, { useMemo } from "react";
import Image from "next/image";
import { Image as ImageType } from "@/types/types";
import { strapiImageFormatSize } from "@/lib/strapi/strapiImage";

import {
  RowsPhotoAlbum,
  RenderImageContext,
  RenderImageProps,
} from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
  useLightboxState,
} from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

function isNextJsImage(slide: any) {
  return (
    isImageSlide(slide) &&
    typeof slide.width === "number" &&
    typeof slide.height === "number"
  );
}

function NextJsImage({ slide, offset, rect }: any) {
  const {
    on: { click },
    carousel: { imageFit },
  } = useLightboxProps();

  const { currentIndex } = useLightboxState();

  const cover = isImageSlide(slide) && isImageFitCover(slide, imageFit);

  if (!isNextJsImage(slide)) return undefined;

  const width = !cover
    ? Math.round(
        Math.min(rect.width, (rect.height / slide.height) * slide.width),
      )
    : rect.width;

  const height = !cover
    ? Math.round(
        Math.min(rect.height, (rect.width / slide.width) * slide.height),
      )
    : rect.height;

  return (
    <div style={{ position: "relative", width, height }}>
      <Image
        fill
        alt=""
        src={slide}
        loading="eager"
        draggable={false}
        placeholder={slide.blurDataURL ? "blur" : undefined}
        style={{
          objectFit: cover ? "cover" : "contain",
          cursor: click ? "pointer" : undefined,
        }}
        sizes={`${Math.ceil((width / window.innerWidth) * 100)}vw`}
        onClick={
          offset === 0 ? () => click?.({ index: currentIndex }) : undefined
        }
      />
    </div>
  );
}

function renderNextImage(
  { alt = "", title, sizes }: RenderImageProps,
  { photo, width, height }: RenderImageContext,
) {
  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        aspectRatio: `${width} / ${height}`,
      }}
    >
      <Image
        fill
        src={photo}
        alt={alt}
        title={title}
        sizes={sizes}
        placeholder={"blurDataURL" in photo ? "blur" : undefined}
      />
    </div>
  );
}

export const StrapiImageGallery = ({
  images,
  maxNumber,
  size = "full",
}: {
  images?: ImageType[];
  maxNumber?: number;
  size?: "small" | "medium" | "large" | "thumbnail" | "full";
}) => {
  if (maxNumber !== undefined) {
    images = images?.slice(0, maxNumber);
  }
  const [index, setIndex] = React.useState(-1);
  const photos = useMemo(() => (images?.map((img) => {
    const {
      url = "",
      width = 0,
      height = 0,
      alternativeText,
    } = strapiImageFormatSize(img, size);

    return {
      src: url,
      alt: alternativeText || "featured project image",
      width,
      height,
    };
  }) || []), [images]);

  const fullPhotos = useMemo(() => (
    images?.map((img) => {
      const {
        url = "",
        width = 0,
        height = 0,
        alternativeText,
      } = strapiImageFormatSize(img, "full");

      return {
        src: url,
        alt: alternativeText || "featured project image",
        width,
        height,
      };
    }) || []
  ), [images]);

  return (
    <>
      <RowsPhotoAlbum
        photos={photos}
        render={{
          image: renderNextImage,
        }}
        onClick={({ index }) => {
          setIndex(index);
        }}
      />
      <Lightbox
        slides={fullPhotos}
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Fullscreen, Slideshow, Thumbnails, Zoom]}
        render={{ slide: NextJsImage }}
      />
    </>
  )
}
