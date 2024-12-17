"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MoreHorizontal, Plus, Calendar, Check, Search, ChevronDown, FileText } from "lucide-react"
import { Contact } from "../types"

interface ContactProfileProps {
  contact: Contact
}

export default function ContactProfile({ contact }: ContactProfileProps) {
  return (
    <div className="flex h-full w-full gap-4 p-4">
      {/* Left Panel - Contact Info */}
      <ScrollArea className="h-full w-[300px] rounded-lg border bg-white p-4">
        <div className="flex flex-col gap-4">
          <Button variant="ghost" className="w-fit" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Leads
          </Button>
          
          <div className="flex flex-col items-center gap-2 pt-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={contact.avatarInitials ? undefined : '/avatars/default.png'} alt={contact.name} />
              <AvatarFallback style={{ backgroundColor: contact.avatarColor }}>{contact.avatarInitials || contact.name[0]}</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-semibold">{contact.name}</h2>
            <p className="text-sm text-muted-foreground">{contact.title || 'No title'}</p>
          </div>

          <div className="flex justify-center gap-2 pt-2">
            <Button size="sm" variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Call
            </Button>
            <Button size="sm" variant="outline">
              <Mail className="mr-2 h-4 w-4" />
              Email
            </Button>
            <Button size="sm" variant="outline">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4 pt-4">
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Email</Label>
              <p className="text-sm">{contact.email}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Phone</Label>
              <p className="text-sm">{contact.phoneNumber}</p>
            </div>
            <div>
              <Label className="text-xs font-medium text-muted-foreground">Company</Label>
              <p className="text-sm">{contact.company?.name || contact.primaryCompany || 'No company'}</p>
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Middle Panel - Content */}
      <div className="flex-1 space-y-4">
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Search activities, notes, emails..." 
            className="max-w-sm"
          />
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="activity">Activity</SelectItem>
              <SelectItem value="notes">Notes</SelectItem>
              <SelectItem value="emails">Emails</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="activity">
          <TabsList>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="emails">Emails</TabsTrigger>
            <TabsTrigger value="calls">Calls</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="meetings">Meetings</TabsTrigger>
          </TabsList>
          <ScrollArea className="h-[calc(100vh-220px)]">
            <TabsContent value="activity" className="space-y-4">
              {contact.activities?.map((activity) => (
                <Card key={activity.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{activity.createdBy[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Right Panel - Additional Info */}
      <ScrollArea className="h-full w-[300px] rounded-lg border bg-white p-4">
        <div className="space-y-6">
          <div>
            <h3 className="mb-4 text-sm font-medium">Company Information</h3>
            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Industry</Label>
                    <p className="text-sm">{contact.company?.industry || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Website</Label>
                    <p className="text-sm">{contact.company?.domain || 'Not specified'}</p>
                  </div>
                  <div>
                    <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                    <p className="text-sm">{contact.company?.location || contact.country || 'Not specified'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-medium">Deals</h3>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Active Deals</span>
                  <Badge>{contact.deals || 0}</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
