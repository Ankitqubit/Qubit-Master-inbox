import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Bot, MessageSquare, Users, Plus } from "lucide-react"

export default function Home() {
  return (
    <div className="flex-1 space-y-6 px-6 py-6">
      {/* Header section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500">Monitor and manage your AI agents effectively</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Create Agent
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50">
              <Bot className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Agents</p>
              <h3 className="text-2xl font-semibold text-gray-900">12</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-50">
              <Users className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <h3 className="text-2xl font-semibold text-gray-900">48</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-50">
              <MessageSquare className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Conversations</p>
              <h3 className="text-2xl font-semibold text-gray-900">1,234</h3>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional content can be added here */}
    </div>
  )
}
