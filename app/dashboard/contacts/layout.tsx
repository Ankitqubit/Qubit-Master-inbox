export default function ContactsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1 flex flex-col min-h-0 bg-gray-50">
      {children}
    </div>
  )
}
