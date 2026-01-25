import { Locale } from "@/config";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";

const navbarLocalized = (locale: Locale) => {
  if (locale === "zh") {
    return {
      menu: [
        // { text: "主页", URL: `/${prefix}/` },
        { text: "服务", URL: `/${locale}/services` },
        { text: "项目", URL: `/${locale}/projects` },
        { text: "客户感言", URL: `/${locale}/testimonials` },
        { text: "联系", URL: `/${locale}/contact` },
      ]
    };
  } else {
    return {
      menu: [
        // { text: "Home", URL: `/${prefix}/` },
        { text: "Services", URL: `/services` },
        { text: "Projects", URL: `/projects` },
        { text: "Testimonials", URL: `/testimonials` },
        { text: "Contact", URL: `/contact` },
        { text: "Ads", URL: `/ads`, hidden: true },
      ]
    };
  }
}

export function Navbar({ locale }: { locale: Locale }) {
  const { menu } = navbarLocalized(locale);
  return (
    <nav className="max-w-7xl fixed mx-auto inset-x-0 z-50 w-full">
      <div className="hidden lg:block w-full">
        <DesktopNavbar locale={locale} navbarItems={menu} />
      </div>
      <div className="flex h-full w-full items-center lg:hidden">
        <MobileNavbar locale={locale} navbarItems={menu} />
      </div>
    </nav>
  );
}