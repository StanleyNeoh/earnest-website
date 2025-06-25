"use client";

import { strapiImageFormatSize } from "@/lib/strapi/strapiImage";
import { Image as ImageType } from "@/types/types";
import Image from "next/image";
import React from "react";

export function SafeImage(props: React.ComponentProps<typeof Image>) {
  const [errored, setErrored] = React.useState(false);
  return (
    <Image
      {...props}
      unoptimized={errored}
      onError={() => setErrored(true)}
    />
  );
}

export function StrapiImage({
  strapiImg,
  strapiSize = "full",
  width: _width,
  height: _height,
  ...props
}: {
  strapiImg?: ImageType;
  strapiSize?: "full" | "small" | "medium" | "large" | "thumbnail";
} & Omit<React.ComponentProps<typeof Image>, "src" | "alt">
) {

  const {
    url = "",
    name = "",
    width = _width,
    height = _height,
  } = strapiImageFormatSize(strapiImg, strapiSize);

  if (!url) return null;
  return (
    <SafeImage
      src={url}
      alt={strapiImg?.alternativeText || name || ""}
      width={width}
      height={height}
      {...props}
    />
  );
}