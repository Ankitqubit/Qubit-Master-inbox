"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Plus, Trash2, Save } from "lucide-react"

interface Situation {
  id: string
  input: string
  instruction: string
  saved: boolean
}

interface Step {
  id: string
  title: string
  description: string
  basePrompt: string
  situations: Situation[]
}

const BEHAVIOR_STEPS: Step[] = [
  {
    id: "responses",
    title: "Number of Responses",
    description: "Configure how many responses the agent should provide",
    basePrompt: "",
    situations: []
  },
  {
    id: "first",
    title: "First Response",
    description: "Set up the initial response behavior",
    basePrompt: "",
    situations: []
  },
  {
    id: "followup",
    title: "Follow-up Responses",
    description: "Configure follow-up response patterns",
    basePrompt: "",
    situations: []
  },
  {
    id: "sequence",
    title: "Confirming Sequence",
    description: "Set up the confirmation flow",
    basePrompt: "",
    situations: []
  }
]

export function AgentBehavior() {
  const [steps, setSteps] = useState<Step[]>(BEHAVIOR_STEPS)
  const [selectedStep, setSelectedStep] = useState<string>(steps[0].id)

  const currentStep = steps.find(step => step.id === selectedStep)

  const handleBasePromptChange = (newPrompt: string) => {
    setSteps(steps.map(step => 
      step.id === selectedStep 
        ? { ...step, basePrompt: newPrompt }
        : step
    ))
  }

  const handleAddSituation = () => {
    const newSituation: Situation = {
      id: `situation-${Date.now()}`,
      input: "",
      instruction: "",
      saved: false
    }

    setSteps(steps.map(step =>
      step.id === selectedStep
        ? { ...step, situations: [...step.situations, newSituation] }
        : step
    ))
  }

  const handleUpdateSituation = (situationId: string, field: keyof Situation, value: string) => {
    setSteps(steps.map(step =>
      step.id === selectedStep
        ? {
            ...step,
            situations: step.situations.map(situation =>
              situation.id === situationId
                ? { ...situation, [field]: value }
                : situation
            )
          }
        : step
    ))
  }

  const handleSaveSituation = (situationId: string) => {
    setSteps(steps.map(step =>
      step.id === selectedStep
        ? {
            ...step,
            situations: step.situations.map(situation =>
              situation.id === situationId
                ? { ...situation, saved: true }
                : situation
            )
          }
        : step
    ))
  }

  const handleDeleteSituation = (situationId: string) => {
    setSteps(steps.map(step =>
      step.id === selectedStep
        ? {
            ...step,
            situations: step.situations.filter(situation => situation.id !== situationId)
          }
        : step
    ))
  }

  const savedSituations = currentStep?.situations.filter(s => s.saved) || []

  return (
    <Card className="glass-card">
      <div className="flex h-[600px]">
        {/* Left sidebar with steps */}
        <div className="w-64 border-r bg-muted/30">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Behavior Steps</h3>
          </div>
          <ScrollArea className="h-[calc(100%-4rem)]">
            <div className="p-2 space-y-1">
              {steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setSelectedStep(step.id)}
                  className={`w-full text-left p-2 rounded-md flex items-center space-x-3 transition-colors ${
                    selectedStep === step.id
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-muted"
                  }`}
                >
                  <span className={`flex-none w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                    selectedStep === step.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted-foreground/20 text-muted-foreground"
                  }`}>
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{step.title}</div>
                    <div className="text-xs text-muted-foreground">
                      {step.description}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Right configuration panel */}
        {currentStep && (
          <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full">
              <div className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label>Base Prompt</Label>
                  <Textarea
                    value={currentStep.basePrompt}
                    onChange={(e) => handleBasePromptChange(e.target.value)}
                    placeholder="Enter the base prompt for this behavior step..."
                    className="min-h-[100px]"
                  />
                </div>

                {savedSituations.length > 0 && (
                  <div className="space-y-2">
                    <Label>Saved Situations</Label>
                    <div className="bg-muted/30 rounded-lg p-4 space-y-2">
                      {savedSituations.map((situation, index) => (
                        <div key={situation.id} className="flex items-center justify-between text-sm">
                          <div className="flex-1">
                            <span className="font-medium">Situation {index + 1}:</span>
                            <p className="text-muted-foreground mt-1">{situation.input}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => handleDeleteSituation(situation.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>Response Situations</Label>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={handleAddSituation}
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Situation
                    </Button>
                  </div>

                  <div className="space-y-4">
                    {currentStep.situations.filter(s => !s.saved).map((situation) => (
                      <Card key={situation.id} className="p-4 space-y-4">
                        <div className="flex items-start justify-between">
                          <div className="space-y-4 flex-1">
                            <div className="space-y-2">
                              <Label>If this happens (Input)</Label>
                              <Textarea
                                value={situation.input}
                                onChange={(e) => handleUpdateSituation(
                                  situation.id,
                                  'input',
                                  e.target.value
                                )}
                                placeholder="Describe the situation..."
                                rows={2}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>Then do this (Instruction)</Label>
                              <Textarea
                                value={situation.instruction}
                                onChange={(e) => handleUpdateSituation(
                                  situation.id,
                                  'instruction',
                                  e.target.value
                                )}
                                placeholder="Provide the instruction..."
                                rows={2}
                              />
                            </div>
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                onClick={() => handleDeleteSituation(situation.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="secondary"
                                onClick={() => handleSaveSituation(situation.id)}
                              >
                                <Save className="h-4 w-4 mr-2" />
                                Save Changes
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </Card>
  )
}