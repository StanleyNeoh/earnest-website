import React from "react";
import Link from "next/link";

const EMAIL = process.env.NEXT_PUBLIC_EARNEST_EMAIL || "hello@earnest.com.sg";
const PHONE = process.env.NEXT_PUBLIC_EARNEST_PHONE || "+65 1234 5678";

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center">
        <Link href="/contact" className="group">
          <div className="flex items-center gap-4 px-6 py-3 bg-white/90 shadow-xl rounded-full border border-gray-200 hover:shadow-2xl transition-all duration-200 cursor-pointer backdrop-blur-md">
            <span className="flex items-center gap-2 text-blue-700 font-medium text-base">
                {process.env.NEXT_PUBLIC_EARNEST_EMAIL}
            </span>
            <span className="w-px h-6 bg-gray-300 mx-2" />
            <span className="flex items-center gap-2 text-blue-700 font-medium text-base">
                {process.env.NEXT_PUBLIC_EARNEST_PHONE}
            </span>
          </div>
        </Link>
      </div>
      {children}
    </>
  );
}
