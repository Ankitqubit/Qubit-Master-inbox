"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AgentsTable } from "./agents-table"
import { Bot, MessageSquare, Users, Plus } from "lucide-react"
import { useState } from "react"
import { CreateAgentDialog } from "./components/create-agent-dialog"

export type AgentStatus = "all" | "active" | "inactive"

export default function AgentsPage() {
  const [activeTab, setActiveTab] = useState<AgentStatus>("all")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)

  return (
    <div className="flex-1 space-y-6 px-6 py-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">AI Agents</h1>
          <p className="text-sm text-gray-500">Create and manage your AI agents</p>
        </div>
        <Button
          onClick={() => setCreateDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Create New Agent
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-5 w-5 items-center justify-center">
                <Bot className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500">Total Agents</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold text-gray-900">12</h3>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+15.8%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-5 w-5 items-center justify-center">
                <Users className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold text-gray-900">1,234</h3>
              <div className="text-xs font-medium text-red-600 bg-red-50 px-2 py-0.5 rounded-full">-34.0%</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border bg-white shadow-none">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-5 w-5 items-center justify-center">
                <MessageSquare className="h-5 w-5 text-gray-500" />
              </div>
              <p className="text-sm font-medium text-gray-500">Total Conversations</p>
            </div>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-semibold text-gray-900">8,547</h3>
              <div className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">+24.2%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Table Section */}
      <div className="space-y-4">
        {/* Tabs */}
        <div className="flex space-x-1 rounded-lg bg-gray-100 p-0.5 w-fit">
          <Button 
            variant={activeTab === "all" ? "secondary" : "ghost"}
            className={activeTab === "all" ? "bg-white text-sm font-medium px-3 py-1 focus-visible:ring-0" : "text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1"}
            onClick={() => setActiveTab("all")}
          >
            All Agents
          </Button>
          <Button 
            variant={activeTab === "active" ? "secondary" : "ghost"}
            className={activeTab === "active" ? "bg-white text-sm font-medium px-3 py-1 focus-visible:ring-0" : "text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1"}
            onClick={() => setActiveTab("active")}
          >
            Active
          </Button>
          <Button 
            variant={activeTab === "inactive" ? "secondary" : "ghost"}
            className={activeTab === "inactive" ? "bg-white text-sm font-medium px-3 py-1 focus-visible:ring-0" : "text-gray-600 hover:text-gray-900 text-sm font-medium px-3 py-1"}
            onClick={() => setActiveTab("inactive")}
          >
            Inactive
          </Button>
        </div>

        {/* Table Section */}
        <div className="rounded-lg border bg-white overflow-hidden">
          <AgentsTable activeTab={activeTab} />
        </div>
      </div>

      <CreateAgentDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
    </div>
  )
}