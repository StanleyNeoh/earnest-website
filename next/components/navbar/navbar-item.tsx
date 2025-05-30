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
  const shref = href.split("/").slice(2).join("/");
  const spathname = pathname.split("/").slice(2).join("/");
  const isActive = active || shref === spathname || shref !== "" && spathname.includes(shref);

  return (
    <Link
      href={href}
      className={cn(
        "text-center justify-center text-xl px-3 py-1 rounded-md  hover:bg-neutral-800 hover:text-white/80 text-charcoal hover:shadow-[0px_1px_0px_0px_var(--neutral-600)_inset] transition duration-200",
        isActive && "bg-transparent font-bold",
        className
      )}
    >
      {children}
    </Link>

  );
}
