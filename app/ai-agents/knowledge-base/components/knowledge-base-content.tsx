"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { KnowledgeBaseHeader } from "./knowledge-base-header"
import { FileManagementTable } from "./file-management-table"
import { useToast } from "@/components/ui/use-toast"
import type { KnowledgeBase, KnowledgeFile } from "../data"

interface KnowledgeBaseContentProps {
  knowledgeBase: KnowledgeBase
}

export function KnowledgeBaseContent({ knowledgeBase }: KnowledgeBaseContentProps) {
  const [files, setFiles] = useState<KnowledgeFile[]>([])
  const { toast } = useToast()

  const handleAddFile = (file: Omit<KnowledgeFile, "id">) => {
    const newFile: KnowledgeFile = {
      ...file,
      id: `file-${Date.now()}`
    }
    setFiles(prev => [...prev, newFile])
    toast({
      title: "Success",
      description: "File has been added successfully",
      duration: 3000
    })
  }

  return (
    <div className="h-full p-8 space-y-8">
      <KnowledgeBaseHeader 
        knowledgeBase={knowledgeBase} 
        onAddFile={handleAddFile}
      />
      <Card className="glass-card">
        <FileManagementTable 
          knowledgeBaseId={knowledgeBase.id} 
          files={files}
          setFiles={setFiles}
        />
      </Card>
    </div>
  )
}