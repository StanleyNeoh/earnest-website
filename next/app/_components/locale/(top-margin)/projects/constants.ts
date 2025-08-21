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
      { name: "主页", href: `/${locale}` },
      { name: "项目", href: `/${locale}/projects` },
      last && { name: last.name, href: last.href },
    ].filter(Boolean) as { name: string; href: string }[];
  } else {
    return [
      { name: "Home", href: `/` },
      { name: "Projects", href: `/projects` },
      last && { name: last.name, href: last.href },
    ].filter(Boolean) as { name: string; href: string }[];
  }
}