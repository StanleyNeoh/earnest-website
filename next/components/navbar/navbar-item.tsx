"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

type Props = {
  href: string;
  children: ReactNode;
  active?: boolean;
  className?: string;
};

export function NavbarItem({
  children,
  href,
  active,
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        "text-center justify-center text-2xl px-4 py-3 rounded-md  hover:bg-neutral-800 hover:text-white/80 text-charcoal hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200",
        (active || pathname?.includes(href)) && "bg-transparent font-bold",
        className
      )}
    >
      {children}
    </Link>

  );
}
