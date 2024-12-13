"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { AgentHistory } from "./agent-history"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Edit, PlayCircle, Database } from "lucide-react"
import { AgentBehavior } from "./agent-behavior"
import type { Agent } from "../data/agents"
import { getAgentTypeLabel } from "../data/agents"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AgentDetailsProps {
  agent: Agent
}

export function AgentDetails({ agent }: AgentDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedAgent, setEditedAgent] = useState(agent)

  const handleSave = () => {
    setIsEditing(false)
  }

  return (
    <div className="flex-1 space-y-6 px-6 py-6 bg-transparent">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {agent.name}
        </h1>
        <Button 
          className="bg-primary hover:bg-primary/90 transition-colors"
        >
          <PlayCircle className="mr-2 h-5 w-5" />
          Test Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Agent Details Card */}
        <Card className="border border-gray-200 bg-background md:col-span-2 overflow-hidden">
          <div className="border-b border-gray-200 bg-[#F9FAFB]">
            <div className="px-6 py-3 flex justify-between items-center">
              <h2 className="text-lg font-semibold">Agent Details</h2>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 text-green-600">
                  <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                  <span className="text-sm font-medium">Active</span>
                </div>
                {!isEditing && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setIsEditing(true)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input 
                    value={editedAgent.name}
                    onChange={(e) => setEditedAgent({
                      ...editedAgent,
                      name: e.target.value
                    })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Textarea 
                    value={editedAgent.description}
                    onChange={(e) => setEditedAgent({
                      ...editedAgent,
                      description: e.target.value
                    })}
                    rows={3}
                  />
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="secondary"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground leading-relaxed">
                {agent.description}
              </p>
            )}
          </div>
        </Card>

        {/* Agent Priority Score */}
        <Card className="border border-gray-200 bg-background overflow-hidden">
          <div className="border-b border-gray-200 bg-[#F9FAFB]">
            <div className="px-6 py-3">
              <h2 className="text-lg font-semibold">Agent Priority Score</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {/* Priority Score */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-semibold text-gray-900">P1</div>
                  <div className="text-sm text-muted-foreground mt-1">High Priority</div>
                </div>
                <div className="h-14 w-14 rounded-full border-[3px] border-blue-500 flex items-center justify-center">
                  <span className="text-lg font-semibold text-blue-500">95</span>
                </div>
              </div>

              {/* Simple Metrics */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Response SLA</span>
                  <span className="text-sm font-medium text-gray-900">{"< 30s"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Accuracy Target</span>
                  <span className="text-sm font-medium text-gray-900">98%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Daily Queries</span>
                  <span className="text-sm font-medium text-gray-900">2.5k</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Behavior Section */}
      <Card className="border border-gray-200 bg-background overflow-hidden">
        <div className="border-b border-gray-200 bg-[#F9FAFB]">
          <div className="px-6 py-3">
            <h2 className="text-lg font-semibold">Agent Behavior</h2>
          </div>
        </div>
        <div className="p-6">
          <AgentBehavior agent={agent} />
        </div>
      </Card>

      {/* Agent's Knowledge Base */}
      <Card className="border border-gray-200 bg-background overflow-hidden">
        <div className="border-b border-gray-200 bg-[#F9FAFB]">
          <div className="px-6 py-3">
            <h2 className="text-lg font-semibold">Agent's Knowledge Base</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <h3 className="font-medium">{agent.knowledgeBase}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Current knowledge source for this agent
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Database className="h-4 w-4 mr-2" />
                Configure
              </Button>
            </div>
            <p className="text-sm text-muted-foreground">
              The knowledge base determines what information the agent can access and use 
              when generating responses. Configure this to ensure accurate and relevant answers.
            </p>
          </div>
        </div>
      </Card>

      {/* Recent Activity */}
      <Card className="border border-gray-200 bg-background overflow-hidden">
        <div className="border-b border-gray-200 bg-[#F9FAFB]">
          <div className="px-6 py-3 flex justify-between items-center">
            <h2 className="text-lg font-semibold">Recent Activity</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost" className="text-sm font-medium">
                  View Full History
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[80vh]">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold mb-4">Activity History</DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-[calc(80vh-8rem)] pr-4 rounded-lg">
                  <AgentHistory />
                </ScrollArea>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="p-6">
          <AgentHistory />
        </div>
      </Card>
    </div>
  )
}