import seoJson from '@/seo.json';
export const metadata = seoJson.main.services;

export default function ServicesPageLayout({
    children
}: {
    children: React.ReactNode
}) {
    return children
}