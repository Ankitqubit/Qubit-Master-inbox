"use client"

import { Power } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { useState } from "react"

interface StatusBadgeProps {
  status: "active" | "inactive"
  onStatusChange: (newStatus: "active" | "inactive") => void
}

export function StatusBadge({ status, onStatusChange }: StatusBadgeProps) {
  const [showDialog, setShowDialog] = useState(false)

  const handleStatusClick = () => {
    setShowDialog(true)
  }

  const handleConfirm = () => {
    onStatusChange(status === "active" ? "inactive" : "active")
    setShowDialog(false)
  }

  return (
    <>
      <Badge 
        variant={status === 'active' ? 'default' : 'secondary'}
        className={`capitalize cursor-pointer ${
          status === 'active' 
            ? 'bg-emerald-500/15 text-emerald-500 hover:bg-emerald-500/25' 
            : 'bg-muted hover:bg-muted/80'
        }`}
        onClick={handleStatusClick}
      >
        <Power className="mr-1 h-3 w-3" />
        {status}
      </Badge>

      <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {status === "active" ? "Deactivate" : "Activate"} Agent
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to {status === "active" ? "deactivate" : "activate"} this agent?
              {status === "active" 
                ? " This will stop the agent from processing any new requests."
                : " This will allow the agent to process new requests."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm}>
              {status === "active" ? "Deactivate" : "Activate"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}