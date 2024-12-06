"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DataTable } from "@/components/ui/data-table"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus } from "lucide-react"
import { columns } from "./components/columns"
import { agents } from "./data/agents"
import type { Agent } from "./data/agents"

export default function AIAgentsPage() {
  const [data, setData] = useState<Agent[]>(agents)

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="button-xl bg-gradient-to-r from-[#0271EE] to-[#5E5E5E] bg-clip-text text-transparent">
          AI Agents
        </h1>
        <Button 
          className="button-m bg-[#0271EE] hover:bg-[#0271EE]/90 text-white shadow-lg hover:shadow-[#0271EE]/25 transition-all duration-300"
        >
          <Plus className="mr-2 h-5 w-5" />
          Create Agent
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 fade-in">
        <Card className="glass-card p-6 glass-card-hover gradient-border">
          <h3 className="caption-m text-[#5E5E5E] mb-2">
            Total Agents
          </h3>
          <div className="flex items-end justify-between">
            <span className="button-xl bg-gradient-to-r from-[#0271EE] to-[#5E5E5E] bg-clip-text text-transparent">
              {data.length}
            </span>
            <span className="caption-s text-[#5E5E5E]">Last 30 days</span>
          </div>
        </Card>
        
        <Card className="glass-card p-6 glass-card-hover gradient-border">
          <h3 className="caption-m text-[#5E5E5E] mb-2">
            Active Agents
          </h3>
          <div className="flex items-end justify-between">
            <span className="button-xl bg-gradient-to-r from-[#0271EE] to-[#5E5E5E] bg-clip-text text-transparent">
              {data.filter(agent => agent.status === 'active').length}
            </span>
            <span className="caption-s text-emerald-500">↑ 12%</span>
          </div>
        </Card>
        
        <Card className="glass-card p-6 glass-card-hover gradient-border">
          <h3 className="caption-m text-[#5E5E5E] mb-2">
            Total Interactions
          </h3>
          <div className="flex items-end justify-between">
            <span className="button-xl bg-gradient-to-r from-[#0271EE] to-[#5E5E5E] bg-clip-text text-transparent">
              1,234
            </span>
            <span className="caption-s text-[#5E5E5E]">This month</span>
          </div>
        </Card>
      </div>

      <Card className="glass-card p-6 fade-in">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList className="bg-[#E7F2FF] p-1">
            <TabsTrigger value="all" className="button-m data-[state=active]:bg-white">
              All Agents
            </TabsTrigger>
            <TabsTrigger value="active" className="button-m data-[state=active]:bg-white">
              Active
            </TabsTrigger>
            <TabsTrigger value="inactive" className="button-m data-[state=active]:bg-white">
              Inactive
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <DataTable 
              columns={columns} 
              data={data}
              meta={{ updateData: setData }}
            />
          </TabsContent>
          <TabsContent value="active" className="mt-4">
            <DataTable 
              columns={columns} 
              data={data.filter(agent => agent.status === 'active')}
              meta={{ updateData: setData }}
            />
          </TabsContent>
          <TabsContent value="inactive" className="mt-4">
            <DataTable 
              columns={columns} 
              data={data.filter(agent => agent.status === 'inactive')}
              meta={{ updateData: setData }}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}