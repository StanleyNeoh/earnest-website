export default function TopMarginLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <div className="mt-[88px] md:mt-[105px]">
      {children}
    </div>
  )
}