"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { format } from "date-fns"

interface ActivityItem {
  id: string
  action: string
  timestamp: Date
  details: string
  type: "email" | "search" | "status" | "config"
}

// More comprehensive activity history
const recentActivity: ActivityItem[] = [
  {
    id: "1",
    action: "Email Response Generated",
    timestamp: new Date(2024, 2, 20, 14, 30),
    details: "Generated response to customer inquiry about product pricing",
    type: "email"
  },
  {
    id: "2",
    action: "Knowledge Base Search",
    timestamp: new Date(2024, 2, 20, 12, 15),
    details: "Searched documentation for technical specifications",
    type: "search"
  },
  {
    id: "3",
    action: "Status Change",
    timestamp: new Date(2024, 2, 20, 10, 45),
    details: "Agent status changed from inactive to active",
    type: "status"
  }
]

const fullHistory: ActivityItem[] = [
  ...recentActivity,
  {
    id: "4",
    action: "Configuration Update",
    timestamp: new Date(2024, 2, 19, 16, 20),
    details: "Updated response templates and behavior settings",
    type: "config"
  },
  {
    id: "5",
    action: "Email Response Generated",
    timestamp: new Date(2024, 2, 19, 11, 30),
    details: "Generated follow-up response to customer feedback",
    type: "email"
  },
  {
    id: "6",
    action: "Knowledge Base Search",
    timestamp: new Date(2024, 2, 18, 15, 45),
    details: "Searched product documentation for pricing information",
    type: "search"
  },
  {
    id: "7",
    action: "Configuration Update",
    timestamp: new Date(2024, 2, 18, 10, 20),
    details: "Modified behavior steps and response patterns",
    type: "config"
  },
  {
    id: "8",
    action: "Email Response Generated",
    timestamp: new Date(2024, 2, 17, 16, 30),
    details: "Generated initial response to customer inquiry",
    type: "email"
  }
]

function ActivityList({ items }: { items: ActivityItem[] }) {
  const formatActivityDate = (date: Date) => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    if (date.toDateString() === today.toDateString()) {
      return `Today at ${format(date, 'h:mm a')}`
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Yesterday at ${format(date, 'h:mm a')}`
    } else {
      return format(date, 'MMM d, yyyy h:mm a')
    }
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex gap-4 items-start group hover:bg-muted/30 p-2 rounded-lg transition-colors">
          <div className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
          <div className="flex-1 space-y-1">
            <div className="flex justify-between items-start">
              <span className="font-medium text-primary/90">{item.action}</span>
              <span className="text-sm text-muted-foreground">
                {formatActivityDate(item.timestamp)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{item.details}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function AgentHistory() {
  return (
    <Card className="glass-card p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-primary hover:text-primary/80 hover:bg-primary/10 transition-colors"
            >
              View Full History
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh]">
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold mb-4">Activity History</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-[calc(80vh-8rem)] pr-4 rounded-lg">
              <ActivityList items={fullHistory} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      </div>
      <ActivityList items={recentActivity.slice(0, 2)} />
    </Card>
  )
}