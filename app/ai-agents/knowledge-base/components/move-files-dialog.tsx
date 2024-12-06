"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { knowledgeBases } from "../data"

interface MoveFilesDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onMove: (newKnowledgeBaseId: string) => void
  currentKnowledgeBaseId: string
}

export function MoveFilesDialog({
  open,
  onOpenChange,
  onMove,
  currentKnowledgeBaseId
}: MoveFilesDialogProps) {
  const availableKnowledgeBases = knowledgeBases.filter(
    kb => kb.id !== currentKnowledgeBaseId
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move Files</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label>Select Knowledge Base</Label>
            <Select onValueChange={onMove}>
              <SelectTrigger>
                <SelectValue placeholder="Choose destination" />
              </SelectTrigger>
              <SelectContent>
                {availableKnowledgeBases.map((kb) => (
                  <SelectItem key={kb.id} value={kb.id}>
                    {kb.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}