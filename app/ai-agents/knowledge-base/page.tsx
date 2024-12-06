"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Database, Plus, Eye } from "lucide-react"
import Link from "next/link"
import type { KnowledgeBase } from "./data"

const knowledgeBases: KnowledgeBase[] = [
  {
    id: "kb-1",
    name: "Customer Documentation",
    description: "Complete documentation about product features, FAQs, and troubleshooting guides"
  },
  {
    id: "kb-2",
    name: "Sample Documents",
    description: "Templates and example documents for various use cases"
  },
  {
    id: "kb-3",
    name: "Response Templates",
    description: "Pre-written responses for common scenarios and situations"
  }
]

export default function KnowledgeBasePage() {
  return (
    <div className="h-full p-8 space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
          Knowledge Base
        </h1>
        <Button 
          className="bg-primary hover:bg-primary/90 shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add Knowledge Base
        </Button>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        {knowledgeBases.map((kb) => (
          <Card 
            key={kb.id}
            className="glass-card p-6 hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">{kb.name}</h2>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {kb.description}
                  </p>
                </div>
              </div>
              <Link href={`/ai-agents/knowledge-base/${kb.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <Eye className="h-4 w-4" />
                  View
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}