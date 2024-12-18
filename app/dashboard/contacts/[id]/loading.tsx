export default function ContactLoading() {
  return (
    <div className="flex-1 p-6">
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-4"></div>
        <div className="h-4 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-64 bg-gray-200 rounded"></div>
      </div>
    </div>
  )
}
