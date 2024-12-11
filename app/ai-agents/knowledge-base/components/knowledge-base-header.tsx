"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AddFileDialog } from "./add-file-dialog"
import type { KnowledgeBase, KnowledgeFile } from "../data"

interface KnowledgeBaseHeaderProps {
  knowledgeBase: KnowledgeBase
  onAddFile: (file: Omit<KnowledgeFile, "id">) => void
}

export function KnowledgeBaseHeader({ 
  knowledgeBase,
  onAddFile
}: KnowledgeBaseHeaderProps) {
  const [addFileOpen, setAddFileOpen] = useState(false)

  const handleAddFile = (file: Omit<KnowledgeFile, "id">) => {
    onAddFile(file)
    setAddFileOpen(false)
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">{knowledgeBase.name}</h1>
          <p className="text-sm text-gray-500">Manage knowledge base files and connected agents</p>
        </div>
        <Button 
          className="gap-2"
          onClick={() => setAddFileOpen(true)}
        >
          <Plus className="h-4 w-4" />
          Add File
        </Button>
      </div>

      <AddFileDialog
        open={addFileOpen}
        onOpenChange={setAddFileOpen}
        onAdd={handleAddFile}
        knowledgeBaseId={knowledgeBase.id}
      />
    </>
  )
}