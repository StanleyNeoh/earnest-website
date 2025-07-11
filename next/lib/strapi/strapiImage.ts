import { Image } from "@/types/types";

export function strapiImage(url: string | undefined): string {
  if (!url) return "";
  if (url.startsWith("/")) {
    return process.env.NEXT_PUBLIC_API_URL + url
  }
  return url
}

export function strapiImageFormatSize(
  strapiImg?: Image, 
  strapiSize: "full" | "small" | "medium" | "large" | "thumbnail" = "full",
): Image {
  const {
    url,
    name,
    width,
    height,
  } = (
    strapiSize === "full"
    ? strapiImg
    : strapiSize === "small"
    ? strapiImg?.formats?.small
    : strapiSize === "medium"
    ? strapiImg?.formats?.medium
    : strapiSize === "large"
    ? strapiImg?.formats?.large
    : strapiImg?.formats?.thumbnail
  ) || strapiImg || {};

  return {
    url: strapiImage(url),
    name: name,
    alternativeText: strapiImg?.alternativeText || name,
    width: width,
    height: height,
  }
}