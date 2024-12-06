"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, Trash2, Edit, ArrowUpDown, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/ui/status-badge"
import Link from "next/link"
import type { Agent } from "../data/agents"

export const columns: ColumnDef<Agent>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="p-0 hover:bg-transparent"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      return (
        <Link 
          href={`/ai-agents/${row.original.id}`}
          className="group inline-flex items-center"
        >
          <span className="font-medium bg-gradient-to-r from-primary via-chart-2 to-chart-3 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            {row.getValue("name")}
          </span>
          <div className="h-0.5 w-0 bg-gradient-to-r from-primary via-chart-2 to-chart-3 group-hover:w-full transition-all duration-300" />
        </Link>
      )
    }
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      return (
        <div className="text-muted-foreground max-w-[500px] truncate">
          {row.getValue("description")}
        </div>
      )
    }
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row, table }) => {
      const status = row.getValue("status") as "active" | "inactive"
      
      const handleStatusChange = (newStatus: "active" | "inactive") => {
        const data = [...table.options.data]
        const index = data.findIndex(item => item.id === row.original.id)
        if (index !== -1) {
          data[index] = { ...data[index], status: newStatus }
          table.options.meta?.updateData(data)
        }
      }

      return (
        <StatusBadge status={status} onStatusChange={handleStatusChange} />
      )
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const agent = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Copy className="mr-2 h-4 w-4" />
              Clone
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]