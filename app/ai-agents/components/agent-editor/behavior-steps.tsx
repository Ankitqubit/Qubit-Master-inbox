"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export interface BehaviorStep {
  id: string
  name: string
  type: string
  config: Record<string, any>
}

interface BehaviorStepsProps {
  steps: BehaviorStep[]
  onChange: (steps: BehaviorStep[]) => void
}

export function BehaviorSteps({ steps, onChange }: BehaviorStepsProps) {
  const [selectedStepId, setSelectedStepId] = useState<string | null>(
    steps[0]?.id || null
  )

  const handleAddStep = () => {
    const newStep: BehaviorStep = {
      id: `step-${Date.now()}`,
      name: "",
      type: "",
      config: {},
    }
    onChange([...steps, newStep])
    setSelectedStepId(newStep.id)
  }

  const handleStepChange = (stepId: string, data: Partial<BehaviorStep>) => {
    const newSteps = steps.map((step) =>
      step.id === stepId ? { ...step, ...data } : step
    )
    onChange(newSteps)
  }

  const selectedStep = steps.find((step) => step.id === selectedStepId)

  return (
    <div className="flex h-[calc(100vh-15rem)] border rounded-lg overflow-hidden">
      {/* Left Sidebar with Steps */}
      <div className="w-64 border-r bg-muted/30">
        <div className="p-4 border-b bg-background">
          <Button variant="outline" size="sm" className="w-full" onClick={handleAddStep}>
            <Plus className="h-4 w-4 mr-2" />
            Add Step
          </Button>
        </div>
        <ScrollArea className="h-[calc(100%-4rem)]">
          <div className="p-2 space-y-1">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setSelectedStepId(step.id)}
                className={cn(
                  "w-full text-left p-2 rounded-md flex items-center space-x-3 transition-colors",
                  selectedStepId === step.id
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                )}
              >
                <span className={cn(
                  "flex-none w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium",
                  selectedStepId === step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/20 text-muted-foreground"
                )}>
                  {index + 1}
                </span>
                <span className="flex-1 truncate text-sm">
                  {step.name || `Step ${index + 1}`}
                </span>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Right Configuration Panel */}
      <div className="flex-1 bg-background">
        {selectedStep ? (
          <div className="p-6 space-y-6">
            <div className="space-y-2">
              <Label>Step Name</Label>
              <Input
                value={selectedStep.name}
                onChange={(e) => handleStepChange(selectedStep.id, { name: e.target.value })}
                placeholder={`Step ${steps.findIndex(s => s.id === selectedStep.id) + 1}`}
              />
            </div>
            <div className="space-y-2">
              <Label>Behavior Type</Label>
              <Select
                value={selectedStep.type}
                onValueChange={(value) => handleStepChange(selectedStep.id, { type: value })}
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
        ) : (
          <div className="h-full flex items-center justify-center text-muted-foreground">
            Select a step to configure
          </div>
        )}
      </div>
    </div>
  )
}