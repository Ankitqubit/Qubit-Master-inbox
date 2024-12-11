"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export type Agent = {
  id: string
  name: string
  description: string
  status: "active" | "inactive"
  lastActive?: string
  knowledgeBase?: number
  interactions?: number
}

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: "Names",
    cell: ({ row }) => {
      const agent = row.original
      
      return (
        <Link 
          href={`/ai-agents/${agent.id}`}
          className="flex items-center gap-1 text-[#0271EE] hover:underline font-medium"
        >
          {agent.name}
          <ExternalLink className="h-3 w-3" />
        </Link>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Descriptions",
    cell: ({ row }) => {
      return (
        <div className="text-gray-500">
          {row.getValue("description")}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center">
          {status === "active" ? (
            <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-600 mr-1.5" />
              Active
            </Badge>
          ) : (
            <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-100">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mr-1.5" />
              Inactive
            </Badge>
          )}
        </div>
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  }
]