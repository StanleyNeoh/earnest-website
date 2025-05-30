import { NavbarItem } from "./navbar-item";
import { LocaleSwitcher } from "../locale-switcher";

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
