import React from "react";

export const Footer = async ({ locale }: { locale: string }) => {
  return (
    <div className="relative mt-8">
      <div className="border-t border-neutral-900 px-8 pt-8 pb-32 relative bg-primary">
        <div className="max-w-7xl mx-auto text-sm text-neutral-500">
            <div className="mt-2">
              Designed and Developed by Stanley
            </div>
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
              <a
                className="text-charcoal underline"
                href="https://tailwindcss.com"
              >
                Tailwind CSS
              </a>
              ,{" "}
              <a
                className="text-charcoal underline"
                href="https://framer.com/motion"
              >
                Motion Animation Lib
              </a>
              , and{" "}
              <a
                className="text-charcoal underline"
                href="https://ui.aceternity.com"
              >
                Aceternity UI
              </a>
          </div>
        </div>
      </div>
    </div>
  );
};
