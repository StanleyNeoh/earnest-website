import { cn } from "@/lib/utils";
import Link from "next/link";

export function Breadcrumb({
  crumbs,
  className,
}: {
  crumbs?: {
    name: string;
    href: string;
  }[];
  className?: string;
}) {
  return (
    <nav className={cn("text-xl mb-6 text-gray-500", className)} aria-label="Breadcrumb">
      <ol className="list-reset flex">
        {
          crumbs?.map((crumb, index) => {
            return (
              <li key={index}>
                <Link href={crumb.href} className="hover:underline text-gray-600">
                  {crumb.name}
                </Link>
                {
                  index < crumbs.length - 1 ? (
                    <span className="mx-2">/</span>
                  ) : null
                }
              </li>
            );
          })
        }
      </ol>
    </nav>
  );
}