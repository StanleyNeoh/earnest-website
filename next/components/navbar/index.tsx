import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
import blackEarnestLogo from "@/public/earnest-black-logo.svg";


export function Navbar({ locale }: { locale: string }) {
  const navbarItems = [
    {
      URL: `/${locale}/services`,
      text: "Services",
    },
    {
      URL: `/${locale}/projects`,
      text: "Projects",
    },
    {
      URL: `/${locale}/testimonials`,
      text: "Testimonials",
    },
    {
      URL: `/${locale}/contact`,
      text: "Contact",
    },
  ];
  return (
    <nav className="max-w-7xl fixed mx-auto inset-x-0 z-50 w-full">
      <div className="hidden lg:block w-full">
        <DesktopNavbar locale={locale} navbarItems={navbarItems} logoUrl={blackEarnestLogo.src} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden ">
        <MobileNavbar locale={locale} navbarItems={navbarItems} logoUrl={blackEarnestLogo.src} />
      </div>
    </nav>
  );
}