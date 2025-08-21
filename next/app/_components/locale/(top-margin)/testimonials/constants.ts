import { Locale } from "@/config";

export const breadcrumbLocalized = (
  locale: Locale,
  last?: { 
    name: string,
    href: string,
  },
) => {
  if (locale === "zh") {
    return [
      { name: "主页", href: `/${locale}/` },
      { name: "客户感言", href: `/${locale}/testimonials` },
      last && { name: last.name, href: last.href },
    ].filter(Boolean) as { name: string; href: string }[];
  } else {
    return [
      { name: "Home", href: `/` },
      { name: "Testimonials", href: `/testimonials` },
      last && { name: last.name, href: last.href },
    ].filter(Boolean) as { name: string; href: string }[];
  }
}