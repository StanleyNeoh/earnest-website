import React from "react";

import { Link } from "next-view-transitions";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Image as ImageType } from "@/types/types";

export const Logo = ({
  logoUrl,
  width = 150,
  height = 150,
  locale,
  className,
}: {
  logoUrl: string;
  width?: number;
  height?: number;
  locale?: string;
  className?: string;
}) => {
  return (
    <Link
      href={`/${locale || 'en'}`}
      className="flex space-x-2 items-center mr-4 relative z-20"
    >
      <Image
        src={logoUrl}
        alt="Logo Image"
        width={width}
        height={height}
        className={cn("rounded-xl", className)}
      />
    </Link>
  )
};
