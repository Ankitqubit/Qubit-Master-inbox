"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { KnowledgeFile } from "../data"
import { getAvailableAgents } from "../data"

interface ManageAccessDialogProps {
  file: KnowledgeFile
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateAccess: (agentIds: string[]) => void
}

export function ManageAccessDialog({
  file,
  open,
  onOpenChange,
  onUpdateAccess
}: ManageAccessDialogProps) {
  const [connectedAgents, setConnectedAgents] = useState(file.connectedAgents)
  const [searchQuery, setSearchQuery] = useState("")
  const availableAgents = getAvailableAgents(connectedAgents)

  const handleRemoveAgent = (agentToRemove: string) => {
    const updatedAgents = connectedAgents.filter(agent => agent !== agentToRemove)
    setConnectedAgents(updatedAgents)
    onUpdateAccess(updatedAgents)
  }

  const handleAddAgent = (agentName: string) => {
    const updatedAgents = [...connectedAgents, agentName]
    setConnectedAgents(updatedAgents)
    onUpdateAccess(updatedAgents)
  }

  const filteredAgents = connectedAgents.filter(agent => 
    agent.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Manage File Access</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center space-x-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
          </div>
          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {filteredAgents.map((agent) => (
                <div
                  key={agent}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <span className="text-sm">{agent}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveAgent(agent)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
          {availableAgents.length > 0 && (
            <Select onValueChange={handleAddAgent}>
              <SelectTrigger>
                <SelectValue placeholder="Add agent access" />
              </SelectTrigger>
              <SelectContent>
                {availableAgents.map((agent) => (
                  <SelectItem key={agent.id} value={agent.name}>
                    {agent.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}