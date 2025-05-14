"use client";
import { cn } from "@/lib/utils";
import { Link } from "next-view-transitions";
import { useState } from "react";
import { IoIosMenu } from "react-icons/io";
import { IoIosClose } from "react-icons/io";
import { Button } from "@/components/elements/button";
import { LocaleSwitcher } from "../locale-switcher";
import Image from "next/image";
import { Logo } from "../simple/logo";

export const MobileNavbar = ({
  navbarItems,
  logoUrl,
  locale,
}: {
  navbarItems: {
    URL: string;
    text: string;
  }[];
  locale: string
  logoUrl: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {
        !open && (
          <div
            className={cn(
              "p-4 flex justify-between bg-neutral-100 items-center w-full",
            )}
          >
            <Logo 
              logoUrl={logoUrl}
              width={100}
              height={100}
              locale={locale}
              className="ml-4"
            />
            <IoIosMenu
              className="text-charcoal h-12 w-12"
              onClick={() => setOpen(!open)}
            />
          </div>
        )
      }

      {
        open && (
          <div className="fixed inset-0 bg-neutral-100/70 z-50 flex flex-col items-start justify-start space-y-10 pt-5  text-xl text-zinc-600  transition duration-200 hover:text-zinc-800">
            <div className="flex items-center justify-between w-full px-5">
              <Logo
                logoUrl={logoUrl}
                width={150}
                height={150}
                className="ml-4"
              />
              <div className="flex items-center space-x-2">
                <LocaleSwitcher currentLocale={locale} />
                <IoIosClose
                  className="h-12 w-12 text-charcoal"
                  onClick={() => setOpen(!open)}
                />
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 px-8">
              {navbarItems.map((item) => (
                <Link
                  href={item.URL}
                  key={item.text}
                  onClick={() => setOpen(false)}
                  className="relative"
                >
                  <span className="block text-[26px] text-charcoal">
                    {item.text}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )
      }
    </>
  );
};
