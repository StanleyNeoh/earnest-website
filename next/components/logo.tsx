import React from "react";

import { Link } from "next-view-transitions";
import { BlurImage } from "./blur-image";

import { strapiImage } from "@/lib/strapi/strapiImage";
import { Image } from "@/types/types";

export const Logo = ({
  image,
  locale,
}: { 
  image?: Image, 
  locale?: string 
}) => {
  if (image) {
    return (
      <Link
        href={`/${locale || 'en'}`}
        className="flex space-x-2 items-center mr-4 relative z-20"
      >
        <BlurImage
          src={strapiImage(image?.url)}
          alt={image.alternativeText}
          width={150}
          height={150}
          className="rounded-xl"
        />
      </Link>
    );
  }

  return;
};
