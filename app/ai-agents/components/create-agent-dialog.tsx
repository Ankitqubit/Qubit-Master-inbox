"use client"

import * as React from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Brain, GitBranch } from "lucide-react"
import { useAgentsStore } from "../store/agents-store"

interface CreateAgentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

type Step = "type-select" | "configure"

export function CreateAgentDialog({ open, onOpenChange }: CreateAgentDialogProps) {
  const [step, setStep] = React.useState<Step>("type-select")
  const [selectedType, setSelectedType] = React.useState<"template" | "scratch">("template")
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null)
  const [selectedAgentType, setSelectedAgentType] = React.useState<string | null>(null)
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    knowledgeBase: "",
    basePrompt: ""
  })

  const addAgent = useAgentsStore((state) => state.addAgent)

  const handleTemplateSelect = (template: string) => {
    setSelectedTemplate(template)
    setStep("configure")
  }

  const handleAgentTypeSelect = (type: string) => {
    setSelectedAgentType(type)
    setStep("configure")
  }

  const handleCreateAgent = () => {
    const agentType = selectedType === "template" ? selectedTemplate : selectedAgentType
    
    addAgent({
      name: formData.name,
      description: formData.description,
      status: "active",
      type: agentType as "categorizer" | "sequencer",
      knowledgeBase: formData.knowledgeBase,
      basePrompt: formData.basePrompt
    })

    // Reset form and close dialog
    setFormData({
      name: "",
      description: "",
      knowledgeBase: "",
      basePrompt: ""
    })
    setStep("type-select")
    setSelectedTemplate(null)
    setSelectedAgentType(null)
    onOpenChange(false)
  }

  const renderConfigurationForm = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Agent Name</label>
          <Input
            placeholder="Enter agent name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Description</label>
          <Textarea
            placeholder="Describe what this agent does"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Knowledge Base Access</label>
          <Select
            value={formData.knowledgeBase}
            onValueChange={(value) => setFormData(prev => ({ ...prev, knowledgeBase: value }))}
          >
            <SelectTrigger className="bg-white">
              <SelectValue placeholder="Select knowledge base" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="kb1">Knowledge Base 1</SelectItem>
              <SelectItem value="kb2">Knowledge Base 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-900">Base Prompt</label>
          <Textarea
            placeholder="Configure the base behavior for your agent..."
            value={formData.basePrompt}
            onChange={(e) => setFormData(prev => ({ ...prev, basePrompt: e.target.value }))}
            className="h-32"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            setStep("type-select")
            setSelectedTemplate(null)
            setSelectedAgentType(null)
          }}
        >
          Back
        </Button>
        <Button 
          onClick={handleCreateAgent}
          disabled={!formData.name || !formData.description}
        >
          Create Agent
        </Button>
      </div>
    </div>
  )

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 gap-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-xl">Create New Agent</DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-2">
          {step === "type-select" ? (
            <div className="space-y-6">
              {/* Template/Scratch Toggle */}
              <div className="flex rounded-lg bg-slate-100 p-1">
                <button
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedType === "template"
                      ? "bg-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  onClick={() => setSelectedType("template")}
                >
                  Use Template
                </button>
                <button
                  className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    selectedType === "scratch"
                      ? "bg-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                  onClick={() => setSelectedType("scratch")}
                >
                  Create from Scratch
                </button>
              </div>

              {selectedType === "template" ? (
                /* Template Options */
                <div className="space-y-3">
                  <button
                    onClick={() => handleTemplateSelect("categorizer")}
                    className="w-full p-4 rounded-lg border group transition-all hover:border-blue-100 hover:bg-blue-50/50 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100">
                        <Brain className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="text-[14px] font-medium text-gray-900">Categorizer Agent</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Automatically categorize and organize content based on predefined rules
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleTemplateSelect("sequencer")}
                    className="w-full p-4 rounded-lg border group transition-all hover:border-blue-100 hover:bg-blue-50/50 text-left"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-100">
                        <GitBranch className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="flex flex-col items-start">
                        <h3 className="text-[14px] font-medium text-gray-900">Sequencer Agent</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          Handle step-by-step processes and sequential workflows
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              ) : (
                /* Create from Scratch Options */
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-900">Select agent type</label>
                    <Select
                      value={selectedAgentType || ""}
                      onValueChange={handleAgentTypeSelect}
                    >
                      <SelectTrigger className="bg-white">
                        <SelectValue placeholder="Choose agent type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="categorizer">
                          <div className="py-1">
                            <div className="font-medium">Categorizer</div>
                            <div className="text-sm text-gray-500">Create an agent that categorizes content</div>
                          </div>
                        </SelectItem>
                        <SelectItem value="sequencer">
                          <div className="py-1">
                            <div className="font-medium">Sequencer</div>
                            <div className="text-sm text-gray-500">Create an agent that handles sequential processes</div>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>
          ) : (
            renderConfigurationForm()
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
