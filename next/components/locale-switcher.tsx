"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher({
  currentLocale,
  className,
}:{ 
  currentLocale: string,
  className?: string,
}) {
  const pathname = usePathname(); // Current path
  const segments = pathname.split("/"); // Split path into segments

  // Generate localized path for each locale
  const generateLocalizedPath = (locale: string): string => {
    if (!pathname) return `/${locale}`; // Default to root path for the locale

    if (segments.length <= 2) {
      return `/${locale}`;
    }
    segments[1] = locale; // Replace slug if available
    return segments.join("/");
  };

  return (
    <Link
      href={generateLocalizedPath(currentLocale === "en" ? "cn" : "en")}
      className={cn(
        "w-[5rem] text-center text-2xl px-4 py-3 rounded-md  hover:bg-neutral-800 hover:text-white/80 text-charcoal hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200 z-12",
        className
      )}
    >
      {currentLocale === "en" ? "华语" : "EN"}
    </Link>
  );
}
