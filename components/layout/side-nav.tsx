"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Bot,
  ChevronDown,
  ChevronRight,
  Database,
  Layout,
  ChevronLeft
} from "lucide-react"

interface SideNavProps {
  isCollapsed: boolean
  onToggleCollapse: () => void
}

export function SideNav({ isCollapsed, onToggleCollapse }: SideNavProps) {
  const pathname = usePathname()
  const [isAIOpen, setIsAIOpen] = useState(true)

  return (
    <div className="pb-12 min-h-screen">
      <div className="flex items-center justify-between p-4 border-b">
        {!isCollapsed && <span className="font-semibold">Dashboard</span>}
        <Button
          variant="ghost"
          size="sm"
          className="px-2"
          onClick={onToggleCollapse}
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </Button>
      </div>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Button
              variant="ghost"
              className={cn(
                "w-full",
                isCollapsed ? "justify-center" : "justify-start"
              )}
              onClick={() => !isCollapsed && setIsAIOpen(!isAIOpen)}
            >
              <Bot className={cn("h-5 w-5", !isCollapsed && "mr-2")} />
              {!isCollapsed && (
                <>
                  AI Agents
                  {isAIOpen ? (
                    <ChevronDown className="h-4 w-4 ml-auto" />
                  ) : (
                    <ChevronRight className="h-4 w-4 ml-auto" />
                  )}
                </>
              )}
            </Button>
            {!isCollapsed && isAIOpen && (
              <div className="pl-6 space-y-1">
                <Link href="/ai-agents">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === "/ai-agents" && "bg-muted"
                    )}
                  >
                    <Layout className="h-5 w-5 mr-2" />
                    View AI Agents
                  </Button>
                </Link>
                <Link href="/ai-agents/knowledge-base">
                  <Button
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === "/ai-agents/knowledge-base" && "bg-muted"
                    )}
                  >
                    <Database className="h-5 w-5 mr-2" />
                    Knowledge Base
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}