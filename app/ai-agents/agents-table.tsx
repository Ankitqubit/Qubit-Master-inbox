"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, ChevronLeft, ChevronRight } from "lucide-react"
import type { AgentStatus } from "./page"
import { cn } from "@/lib/utils"
import { useAgentsStore } from "./store/agents-store"
import { useState } from "react"

interface AgentsTableProps {
  activeTab: AgentStatus
}

export function AgentsTable({ activeTab }: AgentsTableProps) {
  const agents = useAgentsStore((state) => state.agents)
  const filteredAgents = activeTab === "all" 
    ? agents 
    : agents.filter(agent => agent.status === activeTab)

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  
  const totalPages = Math.ceil(filteredAgents.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentAgents = filteredAgents.slice(startIndex, endIndex)

  return (
    <div className="w-full rounded-lg bg-white">
      {/* Table header */}
      <div className="grid grid-cols-[250px,1fr,140px,50px] gap-6 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] px-6 py-3 text-sm font-medium text-gray-600 rounded-t-lg border-b border-gray-200">
        <div>Name</div>
        <div>Description</div>
        <div>Status</div>
        <div></div>
      </div>

      {/* Table content */}
      <div className="divide-y divide-gray-200 text-sm">
        {currentAgents.map((agent) => (
          <div 
            key={agent.id}
            className="grid grid-cols-[250px,1fr,140px,50px] gap-6 px-6 py-3 items-center hover:bg-gray-50/50"
          >
            <div>
              <Link 
                href={`/ai-agents/${agent.id}`}
                className="text-blue-500 font-medium hover:underline inline-flex items-center gap-1"
              >
                {agent.name}
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4M9.5 2.5V8" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </Link>
            </div>
            <div className="text-gray-600">{agent.description}</div>
            <div>
              <span className={cn(
                "inline-flex items-center rounded-full px-2.5 py-1 text-sm font-medium",
                agent.status === "active" 
                  ? "bg-green-50 text-green-700" 
                  : "bg-gray-100 text-gray-700"
              )}>
                <span className={cn(
                  "mr-1.5 h-1.5 w-1.5 rounded-full",
                  agent.status === "active" ? "bg-green-600" : "bg-gray-500"
                )} />
                {agent.status === "active" ? "Active" : "Inactive"}
              </span>
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-8 w-8 text-gray-500 hover:text-gray-900"
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between border-t px-4 py-3">
          <div className="text-sm text-gray-500">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredAgents.length)} of {filteredAgents.length} results
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(page => Math.max(1, page - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "secondary" : "outline"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setCurrentPage(page => Math.min(totalPages, page + 1))}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
