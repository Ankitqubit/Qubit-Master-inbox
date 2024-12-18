"use client"

import { TopNav } from "./top-nav"
import { SideNav } from "./side-nav"

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
          <SideNav />
        </div>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  )
}