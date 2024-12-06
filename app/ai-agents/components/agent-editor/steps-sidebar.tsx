"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { EditorStep } from "."

interface StepsSidebarProps {
  steps: EditorStep[]
  currentStep: string
  onStepSelect: (step: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function StepsSidebar({
  steps,
  currentStep,
  onStepSelect,
  isCollapsed,
  onToggleCollapse,
}: StepsSidebarProps) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 flex items-center justify-between border-b">
        {!isCollapsed && <h2 className="text-sm font-semibold">Edit Steps</h2>}
        <Button
          variant="ghost"
          size="sm"
          className={cn("px-2", isCollapsed && "w-full")}
          onClick={onToggleCollapse}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-2">
          {steps.map((step) => (
            <Button
              key={step.id}
              variant={currentStep === step.id ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start mb-1",
                isCollapsed && "px-2 justify-center"
              )}
              onClick={() => onStepSelect(step.id)}
            >
              <div className="flex items-center">
                <div
                  className={cn(
                    "h-2 w-2 rounded-full mr-2",
                    currentStep === step.id
                      ? "bg-primary"
                      : "bg-muted-foreground"
                  )}
                />
                {!isCollapsed && (
                  <div className="text-left">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                )}
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}