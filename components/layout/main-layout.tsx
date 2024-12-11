"use client"

import { useState } from "react"
import { TopNav } from "./top-nav"
import { SideNav } from "./side-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top navigation */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <TopNav />
      </div>

      {/* Main content area with side navigation */}
      <div className="flex pt-14">
        {/* Side navigation */}
        <div className="fixed left-0 h-[calc(100vh-3.5rem)]">
          <SideNav isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
        </div>

        {/* Main content */}
        <main 
          className={`flex-1 transition-all duration-300 ml-[300px] p-6`}
        >
          {children}
        </main>
      </div>
    </div>
  )
}