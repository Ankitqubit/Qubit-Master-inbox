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
    <div className="h-full p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
          {agent.name}
        </h1>
        <Button 
          className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          <PlayCircle className="mr-2 h-5 w-5" />
          Test Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Agent Details Card */}
        <Card className="glass-card p-6 md:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-semibold">Agent Details</h2>
              <div className="text-sm font-medium text-primary mt-1">
                {getAgentTypeLabel(agent.type)}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <StatusBadge 
                status={agent.status} 
                onStatusChange={(newStatus) => {
                  console.log("Status changed to:", newStatus)
                }} 
              />
              {!isEditing && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsEditing(true)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
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
        </Card>

        {/* Agent Score Card */}
        <Card className="glass-card p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Agent Score</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-4xl font-bold bg-gradient-to-r from-chart-2 to-chart-3 bg-clip-text text-transparent">
                  85
                </span>
                <p className="text-sm text-muted-foreground">Current Score</p>
              </div>
              <div className="h-16 w-16 rounded-full border-4 border-chart-2 flex items-center justify-center">
                <span className="text-lg font-semibold text-chart-2">A+</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Response Time</span>
                <span className="font-medium">95%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-medium">88%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">User Satisfaction</span>
                <span className="font-medium">92%</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Agent Behavior */}
      <Card className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Agent Behavior</h2>
        <AgentBehavior />
      </Card>

      {/* Agent's Knowledge Base */}
      <Card className="glass-card p-6">
        <h2 className="text-lg font-semibold mb-4">Agent's Knowledge Base</h2>
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
      </Card>

      {/* Agent History */}
      <AgentHistory />
    </div>
  )
}