'use client'
 
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-full flex-col items-center justify-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Error Loading AI Agents</h2>
      <Button
        onClick={reset}
        className="bg-[#0271EE] hover:bg-[#0262CC] text-white"
      >
        Try again
      </Button>
    </div>
  )
}
