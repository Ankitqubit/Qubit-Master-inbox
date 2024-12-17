"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MoreHorizontal, Plus, Calendar, Check, Search, ChevronDown, FileText, Sparkles, ChevronUp } from "lucide-react"
import { Contact } from "../types"
import Link from 'next/link'
import { Separator } from "@/components/ui/separator"
import { useState } from 'react'

interface ContactProfileProps {
  contact: Contact
}

export default function ContactProfile({ contact }: ContactProfileProps) {
  const [isCardCollapsed, setIsCardCollapsed] = useState(false)
  const [isHistoryCardCollapsed, setIsHistoryCardCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Fixed */}
      <div className="fixed left-[60px] top-[3.5rem] w-[300px] h-[calc(100vh-3.5rem)] border-r bg-background">
        <ScrollArea className="h-full">
          <div className="px-6 py-6 space-y-6">
            <div className="flex items-center justify-between">
              <Link href="/dashboard/contacts">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
              </Link>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex flex-col items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback>{contact.name?.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">{contact.name}</h2>
              <p className="text-sm text-muted-foreground">{contact.title}</p>
              <p className="text-sm text-muted-foreground">{contact.company?.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <Button variant="outline" className="justify-start gap-2">
                <Mail className="h-4 w-4" />
                {contact.email}
              </Button>
              <Button variant="outline" className="justify-start gap-2">
                <Phone className="h-4 w-4" />
                {contact.phone}
              </Button>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-4 gap-2">
              <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2">
                <Plus className="h-4 w-4 mb-1" />
                <span className="text-xs">Log</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2">
                <Mail className="h-4 w-4 mb-1" />
                <span className="text-xs">Email</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2">
                <Phone className="h-4 w-4 mb-1" />
                <span className="text-xs">Call</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center h-auto py-2">
                <MoreHorizontal className="h-4 w-4 mb-1" />
                <span className="text-xs">More</span>
              </Button>
            </div>

            {/* Convert button */}
            <Button className="w-full bg-[#F27A5E] hover:bg-[#f26a4a] text-white">
              Convert to contact
            </Button>

            {/* Last activity */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Badge variant="outline" className="rounded-full flex items-center">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500 mr-2" />
                Last activity : {contact.lastActivity || '2 Jan 2020 at 09:00 AM'}
              </Badge>
            </div>

            {/* Info tabs */}
            <Tabs defaultValue="leads" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="leads">Leads info</TabsTrigger>
                <TabsTrigger value="address">Address info</TabsTrigger>
              </TabsList>
              <TabsContent value="leads" className="mt-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Email</Label>
                    <p className="text-sm">{contact.email}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Phone</Label>
                    <p className="text-sm">{contact.phoneNumber}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Lead owner</Label>
                    <p className="text-sm">{contact.contactOwner || 'Esther Howard'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Job Title</Label>
                    <p className="text-sm">{contact.title || 'Content Writer'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Annual revenue</Label>
                    <p className="text-sm">{contact.revenue || '$ 5,000'}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Lead source</Label>
                    <p className="text-sm">{contact.leadSource || 'Online store'}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="address">
                <div className="space-y-4 pt-4">
                  {/* Address fields will be added here */}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </ScrollArea>
      </div>

      {/* Middle Section - Scrollable */}
      <div className="flex-1 ml-[360px] mr-[320px] min-h-[calc(100vh-3.5rem)] px-8 py-6">
        {/* Main Navigation Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b">
            <TabsList className="bg-transparent">
              <TabsTrigger 
                value="overview" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
              >
                AI Overview
              </TabsTrigger>
              <TabsTrigger 
                value="activities" 
                className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
              >
                Activities
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Overview (AI Summary) Tab Content */}
          <TabsContent value="overview" className="p-6">
            <Card className="bg-white">
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-500" />
                    <h3 className="text-lg font-medium">AI Generated Summary</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The AI summary will provide insights and analysis of all contact interactions, activities, and data.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activities Tab Content */}
          <TabsContent value="activities" className="p-6">
            {/* Search Activities */}
            <div className="flex justify-between items-center mb-6">
              <div className="relative w-[300px]">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search activities"
                  className="pl-10 bg-white"
                />
              </div>
              <Button variant="outline" className="text-muted-foreground">
                Collapse all
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>

            {/* Activity Sub-Tabs */}
            <Tabs defaultValue="activity" className="w-full">
              <div className="border-b">
                <TabsList className="bg-transparent">
                  <TabsTrigger 
                    value="activity" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Activity
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Notes
                  </TabsTrigger>
                  <TabsTrigger 
                    value="emails" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Emails
                  </TabsTrigger>
                  <TabsTrigger 
                    value="calls" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Calls
                  </TabsTrigger>
                  <TabsTrigger 
                    value="tasks" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger 
                    value="meetings" 
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-6 py-3"
                  >
                    Meetings
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="activity">
                {/* Filters */}
                <div className="flex gap-3 mb-6 mt-6">
                  <div className="text-sm text-muted-foreground">Filter by:</div>
                  <Select>
                    <SelectTrigger className="w-[180px] bg-transparent border-0 p-0 h-auto shadow-none">
                      <SelectValue placeholder="Filter activity (21/30)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All activities</SelectItem>
                      <SelectItem value="recent">Recent activities</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select>
                    <SelectTrigger className="w-[140px] bg-transparent border-0 p-0 h-auto shadow-none">
                      <SelectValue placeholder="All users" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All users</SelectItem>
                      <SelectItem value="me">Assigned to me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Activity Cards */}
                <div className="space-y-4">
                  <div className="text-sm text-muted-foreground">Today</div>
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Header with Collapsible Button */}
                        <div className="flex items-start gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-1 hover:bg-transparent data-[state=open]:rotate-180 transition-transform"
                            onClick={() => setIsCardCollapsed(!isCardCollapsed)}
                          >
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="h-4 w-4 text-blue-500" />
                                <span>Meeting with Jerome Bell</span>
                              </div>
                              <div className="flex items-center">
                                <Badge variant="secondary" className="bg-blue-50 text-blue-500 hover:bg-blue-50">
                                  In 1 hour
                                </Badge>
                                <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>

                            {!isCardCollapsed && (
                              <>
                                <Separator className="-mx-4 my-4" />

                                <div className="pl-8">
                                  <h3 className="text-base font-semibold mb-3">Discuss new product line pricing</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Review the pricing strategy for our upcoming product launch and align on market positioning.
                                  </p>
                                </div>

                                <Separator className="-mx-4 my-4" />

                                {/* Footer */}
                                <div className="pl-8">
                                  <div className="flex gap-6">
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">Reminder</Label>
                                      <Select>
                                        <SelectTrigger className="w-[140px] bg-transparent">
                                          <SelectValue placeholder="No reminder" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="none">No reminder</SelectItem>
                                          <SelectItem value="15m">15 minutes before</SelectItem>
                                          <SelectItem value="1h">1 hour before</SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">Task Priority</Label>
                                      <Select>
                                        <SelectTrigger className="w-[140px] bg-transparent">
                                          <SelectValue>
                                            <div className="flex items-center gap-2">
                                              <div className="h-2 w-2 rounded-full bg-red-500" />
                                              High
                                            </div>
                                          </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="high">
                                            <div className="flex items-center gap-2">
                                              <div className="h-2 w-2 rounded-full bg-red-500" />
                                              High
                                            </div>
                                          </SelectItem>
                                          <SelectItem value="medium">
                                            <div className="flex items-center gap-2">
                                              <div className="h-2 w-2 rounded-full bg-yellow-500" />
                                              Medium
                                            </div>
                                          </SelectItem>
                                          <SelectItem value="low">
                                            <div className="flex items-center gap-2">
                                              <div className="h-2 w-2 rounded-full bg-green-500" />
                                              Low
                                            </div>
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="space-y-1">
                                      <Label className="text-xs text-muted-foreground">Assigned to</Label>
                                      <Select>
                                        <SelectTrigger className="w-[140px] bg-transparent">
                                          <SelectValue>
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-4 w-4">
                                                <AvatarImage src="/avatars/esther.png" />
                                                <AvatarFallback>EH</AvatarFallback>
                                              </Avatar>
                                              Esther Howard
                                            </div>
                                          </SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                          <SelectItem value="esther">
                                            <div className="flex items-center gap-2">
                                              <Avatar className="h-4 w-4">
                                                <AvatarImage src="/avatars/esther.png" />
                                                <AvatarFallback>EH</AvatarFallback>
                                              </Avatar>
                                              Esther Howard
                                            </div>
                                          </SelectItem>
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activity History */}
                <div className="space-y-4 mt-8">
                  <div className="text-sm text-muted-foreground">12 December 2021</div>
                  <Card className="bg-white">
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        {/* Header with Collapsible Button */}
                        <div className="flex items-start gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-6 w-6 p-1 hover:bg-transparent data-[state=open]:rotate-180 transition-transform"
                            onClick={() => setIsHistoryCardCollapsed(!isHistoryCardCollapsed)}
                          >
                            <ChevronDown className="h-4 w-4 text-muted-foreground" />
                          </Button>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <FileText className="h-4 w-4 text-blue-500" />
                                <span>Task created by Esther Howard</span>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>

                            {!isHistoryCardCollapsed && (
                              <>
                                <Separator className="-mx-4 my-4" />
                                <div className="pl-8">
                                  <h3 className="text-base font-semibold mb-3">Prepare quote for Jerome Bell</h3>
                                  <p className="text-sm text-muted-foreground">
                                    She's interested in our new product line and wants our very best price. Please include a detailed breakdown of costs.
                                  </p>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </TabsContent>
        </Tabs>
      </div>

      {/* Right Panel - Fixed */}
      <div className="fixed right-0 top-[3.5rem] w-[320px] h-[calc(100vh-3.5rem)] border-l bg-background">
        <ScrollArea className="h-full">
          <div className="px-6 py-6 space-y-6">
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
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Deals</h3>
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                  Close
                  <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create new deal
                </Button>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="text-sm text-muted-foreground">Closing date: 18 Jan 2021</div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-500 hover:bg-blue-50">Contract sent</Badge>
                    <h4 className="font-medium">Web development</h4>
                    <div className="text-lg font-semibold">$120,000</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 space-y-2">
                    <div className="text-sm text-muted-foreground">Closing date: 18 Jan 2021</div>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-500 hover:bg-blue-50">Contract sent</Badge>
                    <h4 className="font-medium">Web development</h4>
                    <div className="text-lg font-semibold">$120,000</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">Tickets</h3>
                  <Badge variant="secondary" className="rounded-full">2</Badge>
                </div>
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                  View
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Attachment</h3>
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                  View
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium">Playbook</h3>
                <Button variant="ghost" size="sm" className="text-sm text-muted-foreground">
                  View
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
