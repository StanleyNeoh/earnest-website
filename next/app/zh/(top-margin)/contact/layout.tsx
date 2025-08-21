import seoJson from '@/seo.json';
export const metadata = seoJson.main.contact;

export default function ContactPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}