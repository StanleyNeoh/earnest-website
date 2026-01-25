import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Earnest | Office Renovation Services',
  description: 'Office transformations that exceed expectations',
};

export default function LandingPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Open+Sans:ital,wdth,wght@0,75..100,300..800;1,75..100,300..800&display=swap" rel="stylesheet" /> 
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"/>
      <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />
      <link href="/ads/css/bootstrap.min.css" rel="stylesheet" />
      <link href="/ads/css/style.css" rel="stylesheet" />

      {children}
    </>
  )
}
