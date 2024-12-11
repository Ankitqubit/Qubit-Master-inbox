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
    <div className="flex-1 space-y-6 px-6 py-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Knowledge Base</h1>
          <p className="text-sm text-gray-500">Manage your knowledge base documents and templates</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Knowledge Base
        </Button>
      </div>

      {/* Knowledge Base Cards */}
      <div className="grid gap-4">
        {knowledgeBases.map((kb) => (
          <Card 
            key={kb.id}
            className="bg-white p-6"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Database className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">{kb.name}</h2>
                    <p className="text-sm text-gray-500">{kb.description}</p>
                  </div>
                </div>
              </div>
              <Link href={`/ai-agents/knowledge-base/${kb.id}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}