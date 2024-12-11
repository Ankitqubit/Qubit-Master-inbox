import Link from 'next/link'
import { Button } from "@/components/ui/button"
 
export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-gray-500 mb-4">Could not find the requested resource</p>
      <Button asChild className="bg-[#0271EE] hover:bg-[#0262CC] text-white">
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  )
}
