export default function TopMarginLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <div className="mt-[80px]">
      {children}
    </div>
  )
}