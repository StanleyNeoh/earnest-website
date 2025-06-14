import { LocaleSwitcher } from "../locale-switcher";
import Image from "next/image";

import earnestBlackLogo from "@/public/earnest-black-logo.svg";
import Link from "next/link";
import { NavbarItem } from "./navbar-item";

export const DesktopNavbar = ({
  navbarItems,
  locale,
}: {
  navbarItems: {
    URL: string;
    text: string;
  }[];
  locale: string;
}) => {
  return (
    <div className="fixed top-0 inset-x-0 w-full z-10 bg-white">
      <div className="max-w-7xl flex flex-row items-center justify-between mx-auto">
        <div className="w-full py-4 flex flex-row gap-8 items-center">
          <Link 
            href={`/${locale}/`}
            className="duration-200 hover:scale-105"
          >
            <Image
              src={earnestBlackLogo.src}
              alt="Logo"
              width={120}
              height={30}
            />
          </Link>
          {navbarItems.map((item) => (
            <NavbarItem href={item.URL} key={item.text}>
              {item.text}
            </NavbarItem>
          ))}
        </div>
        <div className="flex items-center">
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </div>
  );
};
