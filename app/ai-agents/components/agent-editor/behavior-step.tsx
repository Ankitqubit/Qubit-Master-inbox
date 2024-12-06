"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ChevronDown, ChevronRight, GripVertical, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface BehaviorStepData {
  id: string
  name: string
  type: string
  config: Record<string, any>
}

interface BehaviorStepProps {
  step: BehaviorStepData
  isSelected: boolean
  onSelect: () => void
  onDelete: () => void
  onChange: (data: Partial<BehaviorStepData>) => void
}

export function BehaviorStep({
  step,
  isSelected,
  onSelect,
  onDelete,
  onChange,
}: BehaviorStepProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className={cn(
        "transition-colors duration-200",
        isSelected ? "border-primary" : "hover:border-primary/50",
        "group"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "p-4 cursor-pointer",
          isSelected && "border-b"
        )}
        onClick={onSelect}
      >
        <div className="flex items-center gap-2">
          <GripVertical className="h-4 w-4 text-muted-foreground/50" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              {isSelected ? (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              )}
              <span className="font-medium">{step.name || "Unnamed Step"}</span>
            </div>
            {!isSelected && (
              <p className="text-sm text-muted-foreground mt-1">
                {step.type || "No type selected"}
              </p>
            )}
          </div>
          {(isHovered || isSelected) && (
            <Button
              variant="ghost"
              size="icon"
              className="text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                onDelete()
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {isSelected && (
        <div className="p-4 space-y-4 bg-muted/30">
          <div className="space-y-2">
            <Label>Step Name</Label>
            <Input
              value={step.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="Enter step name"
            />
          </div>
          <div className="space-y-2">
            <Label>Behavior Type</Label>
            <Select
              value={step.type}
              onValueChange={(value) => onChange({ type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select behavior type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="process">Process Input</SelectItem>
                <SelectItem value="respond">Generate Response</SelectItem>
                <SelectItem value="analyze">Analyze Data</SelectItem>
                <SelectItem value="search">Search Knowledge Base</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}
    </Card>
  )
}