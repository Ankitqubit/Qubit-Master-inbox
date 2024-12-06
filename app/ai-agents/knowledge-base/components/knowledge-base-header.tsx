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
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
            {knowledgeBase.name}
          </h1>
          <p className="text-muted-foreground">
            Manage knowledge base files and connected agents
          </p>
        </div>
        <Button 
          className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
          onClick={() => setAddFileOpen(true)}
        >
          <Plus className="mr-2 h-5 w-5" />
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