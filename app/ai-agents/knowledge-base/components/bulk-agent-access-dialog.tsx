"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { agents } from "../data"

interface BulkAgentAccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdateAccess: (agentIds: string[]) => void
}

export function BulkAgentAccessDialog({
  open,
  onOpenChange,
  onUpdateAccess
}: BulkAgentAccessDialogProps) {
  const [selectedAgents, setSelectedAgents] = useState<string[]>([])

  const handleAgentSelect = (agentName: string) => {
    setSelectedAgents(prev =>
      prev.includes(agentName)
        ? prev.filter(name => name !== agentName)
        : [...prev, agentName]
    )
  }

  const handleSave = () => {
    onUpdateAccess(selectedAgents)
    setSelectedAgents([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Agents to Selected Files</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Select
            value={selectedAgents.join(",")}
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
                      checked={selectedAgents.includes(agent.name)}
                      readOnly
                    />
                    {agent.name}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <ScrollArea className="h-[200px] pr-4">
            <div className="space-y-2">
              {selectedAgents.map((agent) => (
                <div
                  key={agent}
                  className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                >
                  <span className="text-sm">{agent}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleAgentSelect(agent)}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}