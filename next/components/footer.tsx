import { Locale } from "@/config";
import React from "react";

const footerLocalized = (locale: Locale) => {
  if (locale === "zh") {
    return {
      menu: [
        { name: "主页", href: `/${locale}/` },
        { name: "服务", href: `/${locale}/services` },
        { name: "项目", href: `/${locale}/projects` },
        { name: "客户感言", href: `/${locale}/testimonials` },
        { name: "联系", href: `/${locale}/contact` },
      ]
    };
  } else {
    return {
      menu: [
        { name: "Home", href: `/${locale}/` },
        { name: "Services", href: `/${locale}/services` },
        { name: "Projects", href: `/${locale}/projects` },
        { name: "Testimonials", href: `/${locale}/testimonials` },
        { name: "Contact", href: `/${locale}/contact` },
      ]
    };
  }
}

export const Footer = async ({ locale }: { locale: Locale }) => {
  const { menu } = footerLocalized(locale);
  return (
    <div className="relative mt-8">
      <div className="border-t border-neutral-900 px-8 pt-8 pb-16 relative bg-primary">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between gap-8 text-sm text-neutral-500">
          {/* Left: About, Credits and stack */}
          <div className="flex flex-col gap-4 md:items-start gap-4 text-neutral-600">
            <div className="mt-2">Designed and Developed by Stanley Webdev</div>
            <div>
              <div className="flex items-center">
                <span>&copy; 2025 Earnest Designer &amp; Project Pte Ltd</span>
              </div>
              <div className="flex items-center">
                <span>All rights reserved</span>
              </div>
            </div>
          </div>
          {/* Right: Menu and Contact */}
          <div className="flex flex-col md:items-end gap-4 min-w-[220px]">
            <nav className="flex flex-row flex-wrap gap-4 items-start md:items-end">
              {menu.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-charcoal hover:underline transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-1 mt-2 text-neutral-600 text-xs md:items-end">
              <span>Earnest Designer & Project</span>
              <span>2 Kallang Ave #08-06/07 CT Hub Singapore 339407</span>
              <span>+65 6445 1683</span>
              <span>
                Email:{" "}
                <a
                  href="mailto:sales@earnest.sg"
                  className="underline text-blue-700"
                >
                  sales@earnest.sg
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
