import React from "react";

const MENU = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Testimonials", href: "/testimonials" },
  { name: "Contact", href: "/contact" },
];

export const Footer = async ({ locale }: { locale: string }) => {
  return (
    <div className="relative mt-8">
      <div className="border-t border-neutral-900 px-8 pt-8 pb-16 relative bg-primary">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row justify-between gap-8 text-sm text-neutral-500">
          {/* Left: About, Credits and stack */}
          <div>
            <div className="mt-2">Designed and Developed by Stanley Webdev</div>
            <div className="mt-2">
              built with{" "}
              <a className="text-charcoal underline" href="https://strapi.io">
                Strapi
              </a>
              ,{" "}
              <a className="text-charcoal underline" href="https://nextjs.org">
                Next.js
              </a>
              ,{" "}
              <a className="text-charcoal underline" href="https://tailwindcss.com">
                Tailwind CSS
              </a>
              ,{" "}
              <a className="text-charcoal underline" href="https://framer.com/motion">
                Motion Animation Lib
              </a>
              , and{" "}
              <a className="text-charcoal underline" href="https://ui.aceternity.com">
                Aceternity UI
              </a>
            </div>
          </div>
          {/* Right: Menu and Contact */}
          <div className="flex flex-col md:items-end gap-4 min-w-[220px]">
            <nav className="flex flex-row flex-wrap gap-4 items-start md:items-end">
              {MENU.map((item) => (
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
              <span>{process.env.NEXT_PUBLIC_EARNEST_NAME}</span>
              <span>{process.env.NEXT_PUBLIC_EARNEST_ADDRESS}</span>
              <span>Tel: {process.env.NEXT_PUBLIC_EARNEST_PHONE}</span>
              <span>
                Email:{" "}
                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EARNEST_EMAIL}`}
                  className="underline text-blue-700"
                >
                  {process.env.NEXT_PUBLIC_EARNEST_EMAIL}
                </a>
              </span>
              <span>
                LinkedIn:{" "}
                <a
                  href={process.env.NEXT_PUBLIC_EARNEST_LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-blue-700"
                >
                  {process.env.NEXT_PUBLIC_EARNEST_LINKEDIN}
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
