import { NavbarItem } from "./navbar-item";
import { LocaleSwitcher } from "../locale-switcher";
import { Logo } from "../simple/logo";

export const DesktopNavbar = ({
  navbarItems,
  locale,
  logoUrl,
}: {
  navbarItems: {
    URL: string;
    text: string;
  }[];
  locale: string;
  logoUrl: string;
}) => {
  return (
    <div className="fixed top-0 inset-x-0 w-full z-10 bg-white">
      <div className="max-w-7xl flex flex-row items-center justify-between mx-auto">
        <div className="w-full py-4 flex flex-row gap-4 items-center">
          <Logo 
            logoUrl={logoUrl}
            width={150}
            height={150}
            locale={locale}
            className="ml-8"
          />
          <div className="flex items-center gap-1.5">
            {navbarItems.map((item) => (
              <NavbarItem href={item.URL} key={item.text}>
                {item.text}
              </NavbarItem>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <LocaleSwitcher currentLocale={locale} />
        </div>
      </div>
    </div>
  );
};
