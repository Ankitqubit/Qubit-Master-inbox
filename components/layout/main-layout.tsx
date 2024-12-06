"use client"

import { useState } from "react"
import { SideNav } from "./side-nav"
import { cn } from "@/lib/utils"

export function MainLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <div 
        className={cn(
          "hidden md:flex flex-col fixed inset-y-0 z-50 border-r bg-background transition-all duration-300",
          isCollapsed ? "w-[60px]" : "w-72"
        )}
      >
        <SideNav isCollapsed={isCollapsed} onToggleCollapse={() => setIsCollapsed(!isCollapsed)} />
      </div>
      <div className={cn(
        "flex-1 transition-all duration-300",
        isCollapsed ? "md:pl-[60px]" : "md:pl-72"
      )}>
        <main className="h-full">{children}</main>
      </div>
    </div>
  )
}