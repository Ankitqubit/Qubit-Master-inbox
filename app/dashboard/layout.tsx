"use client"

import MainLayout from "@/components/layout/main-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1">
      {children}
    </div>
  )
}
