"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText } from "lucide-react"
import type { KnowledgeFile } from "../data"

interface ViewFileDialogProps {
  file: KnowledgeFile
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ViewFileDialog({
  file,
  open,
  onOpenChange
}: ViewFileDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {file.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full mt-4">
          <div className="p-4">
            {/* Here you would typically render the file content */}
            <div className="text-muted-foreground text-sm">
              File preview would be displayed here based on the file type ({file.fileType})
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}