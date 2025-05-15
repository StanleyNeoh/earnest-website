import React from "react";

import { Link } from "next-view-transitions";

import Image from "next/image";
import { strapiImage } from "@/lib/strapi/strapiImage";

export const Logo = ({
  logoUrl,
  width = 150,
  height = 150,
  redirectUrl,
  locale,
  className,
  isStrapiImage = false,
}: {
  logoUrl: string;
  width?: number;
  height?: number;
  redirectUrl?: string;
  locale?: string;
  className?: string;
  isStrapiImage?: boolean;
}) => {
  if (isStrapiImage) logoUrl = strapiImage(logoUrl);
  if (redirectUrl) {
    return (
      <Link
        href={locale ? `/${locale}${redirectUrl}` : redirectUrl}
        className={"flex space-x-2 items-center mr-4 relative z-20"}
      >
        <Image
          src={logoUrl}
          alt="Logo Image"
          width={width}
          height={height}
          className={className}
        />
      </Link>
    );
  }
  else {
    return (
      <div className="flex space-x-2 items-center mr-4 relative z-20">
        <Image
          src={logoUrl}
          alt="Logo Image"
          width={width}
          height={height}
          className={className}
        />
      </div>
    );
  }
};
