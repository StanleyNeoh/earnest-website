import { unstable_noStore as noStore } from 'next/cache';

export function strapiImage(url: string | undefined): string {
  if (!url) return "";

  noStore();
  if (url.startsWith("/")) {

    if (!process.env.NEXT_PUBLIC_API_URL && document?.location.host.endsWith(".strapidemo.com")) {
      return `https://${document.location.host.replace("client-", "api-")}${url}`
    }

    return process.env.NEXT_PUBLIC_API_URL + url
  }
  return url
}