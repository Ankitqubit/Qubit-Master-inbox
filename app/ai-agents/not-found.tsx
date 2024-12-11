import Link from 'next/link'
import { Button } from "@/components/ui/button"
 
export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-2">AI Agents Not Found</h2>
      <p className="text-gray-500 mb-4">Could not find the requested AI Agent</p>
      <Button asChild className="bg-[#0271EE] hover:bg-[#0262CC] text-white">
        <Link href="/ai-agents">Return to AI Agents</Link>
      </Button>
    </div>
  )
}
