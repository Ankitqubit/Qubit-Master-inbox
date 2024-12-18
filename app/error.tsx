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
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className="flex h-[calc(100vh-3.5rem)] flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-4">Something went wrong!</h2>
      <Button
        onClick={reset}
        className="bg-[#0271EE] hover:bg-[#0262CC] text-white"
      >
        Try again
      </Button>
    </div>
  )
}
