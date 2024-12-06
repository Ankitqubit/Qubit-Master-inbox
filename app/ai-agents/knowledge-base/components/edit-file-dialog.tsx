"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import type { KnowledgeFile } from "../data"

interface EditFileDialogProps {
  file: KnowledgeFile
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (updatedFile: Partial<KnowledgeFile>) => void
}

export function EditFileDialog({ 
  file, 
  open, 
  onOpenChange,
  onSave 
}: EditFileDialogProps) {
  const [editedFile, setEditedFile] = useState({
    name: file.name,
    description: file.description
  })

  const handleSave = () => {
    onSave(editedFile)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">File Name</Label>
            <Input
              id="name"
              value={editedFile.name}
              onChange={(e) => setEditedFile(prev => ({
                ...prev,
                name: e.target.value
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editedFile.description}
              onChange={(e) => setEditedFile(prev => ({
                ...prev,
                description: e.target.value
              }))}
            />
          </div>
          <div className="space-y-2">
            <Label>Attachment</Label>
            <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <Button variant="outline" className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload New PDF
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}