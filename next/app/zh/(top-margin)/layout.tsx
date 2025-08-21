export default function TopMarginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="mt-[88px] md:mt-[105px]">
      {children}
    </div>
  )
}