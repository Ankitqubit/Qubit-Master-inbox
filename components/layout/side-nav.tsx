"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import {
  LayoutDashboard,
  Bot,
  Settings,
  ChevronDown,
  Users,
  BookOpen,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"

export function SideNav() {
  const pathname = usePathname()
  const isAiAgentsPath = pathname.startsWith('/ai-agents')
  const [isAiAgentsOpen, setIsAiAgentsOpen] = useState(true)

  const mainNavItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      href: "/dashboard",
      tooltip: "Dashboard"
    },
    {
      title: "AI Agents",
      icon: <Bot className="h-5 w-5" />,
      href: "/ai-agents",
      tooltip: "AI Agents"
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      href: "/settings",
      tooltip: "Settings"
    }
  ]

  return (
    <div className="flex h-full">
      {/* Primary Navigation - Side Strip */}
      <div className="flex w-[60px] flex-col items-center border-r bg-white py-4">
        <TooltipProvider>
          {mainNavItems.map((item, index) => (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  href={item.href}
                  className={cn(
                    "mb-4 flex h-10 w-10 items-center justify-center rounded-lg hover:bg-gray-100",
                    pathname === item.href && "bg-gray-100",
                    isAiAgentsPath && item.href === "/ai-agents" && "bg-gray-100"
                  )}
                >
                  {item.icon}
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="flex items-center gap-4">
                {item.tooltip}
              </TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </div>

      {/* Secondary Navigation - AI Agents Submenu */}
      {isAiAgentsPath && (
        <div className="w-[240px] border-r bg-white py-4">
          <div className="px-3">
            {/* AI Agents Header */}
            <button
              onClick={() => setIsAiAgentsOpen(!isAiAgentsOpen)}
              className={cn(
                "flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium hover:bg-gray-100",
                "bg-gray-100"
              )}
            >
              <div className="flex items-center gap-3">
                <Bot className="h-5 w-5" />
                <span>AI Agents</span>
              </div>
              <ChevronDown 
                className={cn(
                  "h-4 w-4 transition-transform duration-200",
                  isAiAgentsOpen ? "" : "-rotate-90"
                )}
              />
            </button>

            {/* AI Agents Submenu */}
            {isAiAgentsOpen && (
              <div className="mt-1 space-y-1">
                <Link
                  href="/ai-agents"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100",
                    pathname === "/ai-agents" && "bg-blue-50 text-blue-600"
                  )}
                >
                  <Users className="h-4 w-4" />
                  View AI Agents
                </Link>

                <Link
                  href="/ai-agents/knowledge"
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-6 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100",
                    pathname === "/ai-agents/knowledge" && "bg-gray-100"
                  )}
                >
                  <BookOpen className="h-4 w-4" />
                  Knowledge Base
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}