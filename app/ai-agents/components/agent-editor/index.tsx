"use client"

import { useState } from "react"
import { Agent } from "../../data/agents"
import { StepsSidebar } from "./steps-sidebar"
import { EditorContent } from "./editor-content"
import { cn } from "@/lib/utils"

export type EditorStep = {
  id: string
  title: string
  description: string
}

const EDITOR_STEPS: EditorStep[] = [
  {
    id: "basics",
    title: "Basic Information",
    description: "Name, description, and basic settings"
  },
  {
    id: "knowledge",
    title: "Knowledge Base",
    description: "Connect and configure knowledge sources"
  },
  {
    id: "behavior",
    title: "Behavior",
    description: "Configure how the agent interacts"
  },
  {
    id: "integration",
    title: "Integration",
    description: "API keys and external services"
  },
  {
    id: "advanced",
    title: "Advanced Settings",
    description: "Additional configuration options"
  }
]

interface AgentEditorProps {
  agent: Agent
}

export function AgentEditor({ agent }: AgentEditorProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [currentStep, setCurrentStep] = useState<string>("basics")

  return (
    <div className="h-full flex">
      <div
        className={cn(
          "border-r bg-muted/30 transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-[280px]"
        )}
      >
        <StepsSidebar
          steps={EDITOR_STEPS}
          currentStep={currentStep}
          onStepSelect={setCurrentStep}
          isCollapsed={isCollapsed}
          onToggleCollapse={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      <div className="flex-1">
        <EditorContent
          agent={agent}
          currentStep={currentStep}
          steps={EDITOR_STEPS}
        />
      </div>
    </div>
  )
}