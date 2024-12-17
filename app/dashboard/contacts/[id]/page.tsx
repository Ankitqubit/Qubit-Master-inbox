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
} from "lucide-react"
import { contacts, getContactById } from "../data/contacts"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export const dynamic = 'force-dynamic'

export default function ContactPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  
  // Ensure we have the contact data
  const contact = getContactById(params.id)
  
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

        <Tabs defaultValue="activity" className="px-6">
          <TabsList className="gap-4">
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-[1fr,300px] gap-6 p-6">
        <Tabs defaultValue="activity" className="flex-1">
          <TabsContent value="activity">
            <div className="space-y-6">
              {/* Activity Search */}
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search activity, notes, email and more" className="pl-8" />
                </div>
                <Button variant="outline">
                  Filter activity (21/25)
                </Button>
                <Button variant="outline">
                  All users
                </Button>
              </div>

              {/* Upcoming Activity */}
              <div className="space-y-4">
                <h3 className="font-semibold">Upcoming Activity</h3>
                <div className="rounded-lg border bg-card p-4">
                  <div className="flex items-start gap-4">
                    <div className="mt-1">
                      <Calendar className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium">Next follow up: {contact.nextFollowUp}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            Last contacted: {contact.lastContacted}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Activity History */}
              <div className="space-y-4">
                <h3 className="font-semibold">Activity History</h3>
                <div className="text-sm text-gray-500">No activity history to show.</div>
              </div>
            </div>
          </TabsContent>

          {["notes", "emails", "calls", "tasks", "meetings"].map((tab) => (
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

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Company Section */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Company</h3>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-blue-100 text-blue-600">
                    {contact.primaryCompany?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{contact.primaryCompany}</h4>
                  {contact.email && (
                    <a href={`mailto:${contact.email}`} className="text-sm text-gray-500 hover:underline">
                      {contact.email}
                    </a>
                  )}
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {contact.phoneNumber && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{contact.phoneNumber}</span>
                  </div>
                )}
                {contact.email && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-4 w-4" />
                    <span>{contact.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Deals Section */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Deals</h3>
                <span className="text-sm text-gray-500">{contact.deals || 0}</span>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {contact.deals ? (
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Revenue</span>
                    <span className="text-blue-600">{contact.revenue}</span>
                  </div>
                  <h4 className="font-medium mt-1">{contact.primaryCompany}</h4>
                </div>
              ) : (
                <div className="text-sm text-gray-500">No deals yet</div>
              )}
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Create new deal
              </Button>
            </div>
          </div>

          {/* About Section */}
          <div className="rounded-lg border bg-card">
            <div className="p-4 border-b">
              <h3 className="font-semibold">About</h3>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="text-sm font-medium">Department</label>
                <div className="mt-1 text-sm text-gray-600">{contact.department || '--'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Country</label>
                <div className="mt-1 text-sm text-gray-600">{contact.country || '--'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Lead Source</label>
                <div className="mt-1 text-sm text-gray-600">{contact.leadSource || '--'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Lead Status</label>
                <div className="mt-1 text-sm text-gray-600">{contact.leadStatus || '--'}</div>
              </div>
              <div>
                <label className="text-sm font-medium">Tags</label>
                <div className="mt-1 text-sm text-gray-600">
                  {contact.tags?.join(', ') || '--'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
