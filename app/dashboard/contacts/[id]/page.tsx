"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  ChevronLeft,
  Mail,
  Phone,
  Calendar,
  Search,
  Plus,
  MessageSquare,
  Video,
  MoreHorizontal,
  Building2,
  ExternalLink,
} from "lucide-react"
import { contacts } from "../data/contacts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function ContactPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  // Ensure we have the contact data
  const contact = contacts.find((c) => c.id === params.id)
  
  if (!contact) {
    return (
      <div className="flex-1 p-6">
        <Button 
          variant="ghost" 
          onClick={() => router.back()}
          className="mb-4"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Contacts
        </Button>
        <h1 className="text-2xl font-semibold text-red-600">Contact not found</h1>
        <p className="text-gray-600 mt-2">The contact you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="flex items-center px-6 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            className="mr-4"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback className={contact.avatarColor}>
                  {contact.avatarInitials || contact.name.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  {contact.name}
                </h1>
                <p className="text-sm text-gray-500">
                  {contact.title} at {contact.primaryCompany}
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MessageSquare className="h-4 w-4 mr-2" />
              Message
            </Button>
            <Button variant="outline" size="sm">
              <Video className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Email
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit Contact</DropdownMenuItem>
                <DropdownMenuItem>Delete Contact</DropdownMenuItem>
                <DropdownMenuItem>Export Contact</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <Tabs defaultValue="overview" className="px-6">
          <TabsList className="gap-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="ai-summary">AI Summary</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1fr,300px] gap-6 p-6">
        <Tabs defaultValue="overview" className="flex-1">
          <TabsContent value="overview">
            <div className="space-y-6">
              {/* Activity Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search activities..." className="pl-8" />
                </div>
                <Button variant="outline">
                  Filter activity (21/30)
                </Button>
                <Button variant="outline">
                  All users
                </Button>
              </div>

              {/* Timeline */}
              <div className="space-y-4">
                <h3 className="font-semibold">Upcoming</h3>
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 mt-2 rounded-full bg-blue-500" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">Follow up with {contact.name}</h4>
                        <span className="text-sm text-gray-500">Due: Tomorrow</span>
                      </div>
                      <p className="text-sm text-gray-500">Assigned to {contact.contactOwner}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Activity History</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Log Activity
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                No activity history to show.
              </div>
            </div>
          </TabsContent>

          <TabsContent value="ai-summary">
            <div className="space-y-6">
              <div className="rounded-lg border bg-card p-6">
                <h3 className="text-lg font-semibold mb-4">AI Summary</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Contact Overview</h4>
                    <p className="text-gray-600">
                      {contact.name} is a {contact.title} at {contact.primaryCompany}. They have been a 
                      {contact.leadStatus?.toLowerCase()} lead since their first interaction. Based on their 
                      engagement history, they show high potential for business opportunities.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Key Insights</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Last contacted {contact.lastContacted}</li>
                      <li>Has {contact.deals} active deals worth {contact.revenue}</li>
                      <li>Primarily interested in product demonstrations and technical discussions</li>
                      <li>Prefers communication via {contact.phoneNumber ? 'phone' : 'email'}</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Recommended Actions</h4>
                    <ul className="list-disc list-inside space-y-2 text-gray-600">
                      <li>Schedule follow-up meeting to discuss ongoing deals</li>
                      <li>Share latest product updates and documentation</li>
                      <li>Engage with technical team for detailed requirements</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          {["emails", "calls", "tasks", "meetings", "notes"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold capitalize">{tab}</h3>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add {tab.slice(0, -1)}
                  </Button>
                </div>
                <div className="text-sm text-gray-500">
                  No {tab} to show.
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Company Section */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Companies (1)</h3>
                <Button variant="ghost" size="sm">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Primary</span>
                <span className="text-xs text-gray-500">Mobbin</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Building2 className="h-4 w-4" />
                <a href={contact.primaryCompany} className="hover:underline">
                  {contact.primaryCompany}
                </a>
                <ExternalLink className="h-3 w-3" />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{contact.phoneNumber || '--'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h3 className="font-semibold">About this contact</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Email</label>
                <div className="mt-1 text-sm text-gray-600">{contact.email}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Phone number</label>
                <div className="mt-1 text-sm text-gray-600">{contact.phoneNumber || '--'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Contact owner</label>
                <div className="mt-1 text-sm text-gray-600">{contact.contactOwner}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Lifecycle stage</label>
                <div className="mt-1 text-sm text-gray-600">Opportunity</div>
              </div>
              <div>
                <label className="text-sm font-medium">Lead status</label>
                <div className="mt-1 text-sm text-gray-600">{contact.leadStatus}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Last contacted</label>
                <div className="mt-1 text-sm text-gray-600">{contact.lastContacted || '--'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
