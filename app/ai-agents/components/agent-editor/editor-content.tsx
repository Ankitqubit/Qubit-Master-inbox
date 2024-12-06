"use client"

import { Agent } from "../../data/agents"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BehaviorSteps } from "./behavior-steps"
import type { EditorStep } from "."
import { useState } from "react"
import type { BehaviorStep } from "./behavior-steps"

interface EditorContentProps {
  agent: Agent
  currentStep: string
  steps: EditorStep[]
}

const DEFAULT_BEHAVIOR_STEPS: BehaviorStep[] = [
  {
    id: "step-1",
    name: "Process User Input",
    type: "process",
    config: {},
  },
  {
    id: "step-2",
    name: "Search Knowledge Base",
    type: "search",
    config: {},
  },
  {
    id: "step-3",
    name: "Generate Response",
    type: "respond",
    config: {},
  },
]

export function EditorContent({ agent, currentStep, steps }: EditorContentProps) {
  const currentStepData = steps.find((step) => step.id === currentStep)
  const [behaviorSteps, setBehaviorSteps] = useState<BehaviorStep[]>(DEFAULT_BEHAVIOR_STEPS)

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold tracking-tight">
          {currentStepData?.title}
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          {currentStepData?.description}
        </p>
      </div>

      {currentStep === "basics" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Agent Name</Label>
              <Input
                id="name"
                value={agent.name}
                onChange={() => {}}
                placeholder="Enter agent name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={agent.description}
                onChange={() => {}}
                placeholder="Enter agent description"
                rows={3}
              />
            </div>
          </div>
        </Card>
      )}
      {currentStep === "knowledge" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="knowledgeBase">Knowledge Base</Label>
              <Select defaultValue={agent.knowledgeBase}>
                <SelectTrigger>
                  <SelectValue placeholder="Select knowledge base" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Support Documentation">Support Documentation</SelectItem>
                  <SelectItem value="Product Catalog">Product Catalog</SelectItem>
                  <SelectItem value="Technical Guides">Technical Guides</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>
      )}
      {currentStep === "behavior" && (
        <BehaviorSteps steps={behaviorSteps} onChange={setBehaviorSteps} />
      )}
      {currentStep === "integration" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>API Key</Label>
              <Input type="password" placeholder="Enter API key" />
            </div>
            <div className="space-y-2">
              <Label>Endpoint URL</Label>
              <Input placeholder="https://api.example.com/v1" />
            </div>
          </div>
        </Card>
      )}
      {currentStep === "advanced" && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Response Temperature</Label>
              <Input type="number" min="0" max="1" step="0.1" defaultValue="0.7" />
            </div>
            <div className="space-y-2">
              <Label>Max Tokens</Label>
              <Input type="number" min="1" defaultValue="2048" />
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}