"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Upload } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { KnowledgeFile } from "../data"
import { agents, fileTypes } from "../data"

interface AddFileDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAdd: (file: Omit<KnowledgeFile, "id">) => void
  knowledgeBaseId: string
}

export function AddFileDialog({
  open,
  onOpenChange,
  onAdd,
  knowledgeBaseId
}: AddFileDialogProps) {
  const [newFile, setNewFile] = useState({
    name: "",
    description: "",
    connectedAgents: [] as string[],
    fileType: "" as KnowledgeFile["fileType"],
    file: null as File | null
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewFile(prev => ({ ...prev, file }))
    }
  }

  const handleSubmit = () => {
    onAdd({
      name: newFile.name,
      description: newFile.description,
      connectedAgents: newFile.connectedAgents,
      fileType: newFile.fileType,
      knowledgeBaseId
    })
    onOpenChange(false)
  }

  const handleAgentSelect = (agentName: string) => {
    setNewFile(prev => ({
      ...prev,
      connectedAgents: prev.connectedAgents.includes(agentName)
        ? prev.connectedAgents.filter(name => name !== agentName)
        : [...prev.connectedAgents, agentName]
    }))
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Add New File</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">File Name</Label>
            <Input
              id="name"
              value={newFile.name}
              onChange={(e) => setNewFile(prev => ({
                ...prev,
                name: e.target.value
              }))}
              placeholder="Enter file name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newFile.description}
              onChange={(e) => setNewFile(prev => ({
                ...prev,
                description: e.target.value
              }))}
              placeholder="Enter file description"
            />
          </div>
          <div className="space-y-2">
            <Label>Connected Agents</Label>
            <Select
              value={newFile.connectedAgents.join(",")}
              onValueChange={handleAgentSelect}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select agents" />
              </SelectTrigger>
              <SelectContent>
                {agents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.name}>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={newFile.connectedAgents.includes(agent.name)}
                        readOnly
                      />
                      {agent.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>File Type</Label>
            <Select
              value={newFile.fileType}
              onValueChange={(value: KnowledgeFile["fileType"]) => 
                setNewFile(prev => ({ ...prev, fileType: value }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select file type" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Upload File</Label>
            <div className="border-2 border-dashed rounded-lg p-4 hover:bg-muted/50 transition-colors">
              <Input
                type="file"
                accept=".pdf,.csv,.ppt,.pptx"
                onChange={handleFileChange}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="outline" className="w-full" asChild>
                  <div>
                    <Upload className="mr-2 h-4 w-4" />
                    {newFile.file ? newFile.file.name : "Choose File"}
                  </div>
                </Button>
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Add File</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}