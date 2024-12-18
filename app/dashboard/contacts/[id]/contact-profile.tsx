"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Mail, Phone, MoreHorizontal, Plus, Calendar, Check, Search, ChevronDown, FileText, Sparkles, ChevronUp, Copy, Linkedin, Twitter, Facebook, Instagram, CheckCircle2, ArrowRight } from "lucide-react"
import { Contact } from "../types"
import Link from 'next/link'
import { useState } from 'react'
import { toast } from "sonner"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface ContactProfileProps {
  contact: Contact
}

export default function ContactProfile({ contact }: ContactProfileProps) {
  const [isCardCollapsed, setIsCardCollapsed] = useState(false)
  const [isHistoryCardCollapsed, setIsHistoryCardCollapsed] = useState(false)

  const copyToClipboard = async (text: string, type: 'email' | 'phone') => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${type === 'email' ? 'Email' : 'Phone number'} copied to clipboard`)
    } catch (err) {
      toast.error('Failed to copy to clipboard')
    }
  }

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
              <Avatar className="h-20 w-20 bg-gradient-to-br from-blue-50 to-indigo-50 ring-2 ring-blue-100/50">
                <AvatarImage src={contact.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-700">
                  {contact.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <h2 className="mt-4 text-xl font-semibold">{contact.name}</h2>
              <p className="text-sm text-muted-foreground">{contact.title}</p>
              <p className="text-sm text-muted-foreground">{contact.company?.name}</p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 pr-12"
                  onClick={() => copyToClipboard(contact.email, 'email')}
                >
                  <Mail className="h-4 w-4" />
                  {contact.email}
                  <Copy className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" />
                </Button>
              </div>
              <div className="relative">
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2 pr-12"
                  onClick={() => copyToClipboard(contact.phone || '+1 (555) 123-4567', 'phone')}
                >
                  <Phone className="h-4 w-4" />
                  {contact.phone || '+1 (555) 123-4567'}
                  <Copy className="h-4 w-4 absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-foreground transition-colors"
                asChild
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-4 w-4 mb-1" />
                  <span className="text-xs">LinkedIn</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-foreground transition-colors"
                asChild
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4 mb-1" />
                  <span className="text-xs">Twitter</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-foreground transition-colors"
                asChild
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4 mb-1" />
                  <span className="text-xs">Facebook</span>
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="flex flex-col items-center h-auto py-2 text-muted-foreground hover:text-foreground transition-colors"
                asChild
              >
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4 mb-1" />
                  <span className="text-xs">Instagram</span>
                </Link>
              </Button>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Badge variant="outline" className="rounded-full flex items-center text-muted-foreground border-muted-foreground/30">
                <div className="h-1.5 w-1.5 rounded-full bg-green-500/50 mr-2" />
                Last activity : {contact.lastActivity || '2 Jan 2020 at 09:00 AM'}
              </Badge>
            </div>

            <Tabs defaultValue="about" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="related">Related Contact</TabsTrigger>
              </TabsList>
              <TabsContent value="about" className="mt-4">
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
                    <Label className="text-xs text-muted-foreground">Contact owner</Label>
                    <p className="text-sm">{contact.contactOwner || 'Esther Howard'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Job Title</Label>
                    <p className="text-sm">{contact.title || 'Content Writer'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Company</Label>
                    <p className="text-sm">{contact.company?.name || 'Acme Inc'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Industry</Label>
                    <p className="text-sm">{contact.industry || 'Technology'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Address</Label>
                    <p className="text-sm">{contact.address?.street || '123 Business Ave'}</p>
                    <p className="text-sm">{contact.address?.city || 'San Francisco'}, {contact.address?.state || 'CA'} {contact.address?.zip || '94105'}</p>
                    <p className="text-sm">{contact.address?.country || 'United States'}</p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Website</Label>
                    <p className="text-sm">{contact.website || 'www.example.com'}</p>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="related">
                <div className="space-y-4 pt-4">
                  {/* Related contacts will be added here */}
                  <p className="text-sm text-muted-foreground">No related contacts found.</p>
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
                    <h3 className="text-lg font-semibold">AI Summary</h3>
                  </div>
                  <div className="space-y-6">
                    {/* Tasks Section */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Pending Tasks</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm">Schedule technical deep-dive session</p>
                            <p className="text-xs text-muted-foreground">Due Dec 20, 2023</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 mt-0.5 text-muted-foreground" />
                          <div>
                            <p className="text-sm">Review financial projections</p>
                            <p className="text-xs text-muted-foreground">Due Dec 22, 2023</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Key Contacts Section */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Key Contacts</h4>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/avatars/contact1.png" />
                            <AvatarFallback>SC</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">Sarah Chen</p>
                            <p className="text-xs text-muted-foreground">CEO & Co-founder</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src="/avatars/contact2.png" />
                            <AvatarFallback>MR</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm">Michael Rodriguez</p>
                            <p className="text-xs text-muted-foreground">CTO</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recent Conversations */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Recent Conversations</h4>
                      <div className="space-y-2">
                        <div className="rounded-lg border p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Dec 15, 2023</p>
                            </div>
                            <Badge variant="outline">Product Demo</Badge>
                          </div>
                          <p className="text-sm">Demonstrated new AI features. Team showed strong interest in computer vision capabilities.</p>
                        </div>
                        <div className="rounded-lg border p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <p className="text-xs text-muted-foreground">Dec 10, 2023</p>
                            </div>
                            <Badge variant="outline">Technical Review</Badge>
                          </div>
                          <p className="text-sm">Deep dive into architecture. Discussed scaling plans and infrastructure requirements.</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Key Metrics</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg border p-3 space-y-1">
                          <p className="text-xs text-muted-foreground">ARR Growth</p>
                          <p className="text-lg font-semibold">300%</p>
                          <p className="text-xs text-green-600">↑ 50% from last quarter</p>
                        </div>
                        <div className="rounded-lg border p-3 space-y-1">
                          <p className="text-xs text-muted-foreground">Customer Base</p>
                          <p className="text-lg font-semibold">150+</p>
                          <p className="text-xs text-green-600">↑ 30 new this quarter</p>
                        </div>
                      </div>
                    </div>

                    {/* Next Steps */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium">Recommended Next Steps</h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500" />
                          <p className="text-sm">Schedule follow-up meeting with technical team</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500" />
                          <p className="text-sm">Prepare detailed valuation analysis</p>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 mt-0.5 text-blue-500" />
                          <p className="text-sm">Review customer references</p>
                        </div>
                      </div>
                    </div>
                  </div>
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
                                <div className="pl-8 mt-4">
                                  <h3 className="text-base font-semibold mb-3">Discuss new product line pricing</h3>
                                  <p className="text-sm text-muted-foreground">
                                    Review the pricing strategy for our upcoming product launch and align on market positioning.
                                  </p>
                                </div>

                                <div className="pl-8 mt-4">
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
                                <div className="pl-8 mt-4">
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
                  View all
                  <ChevronUp className="ml-1 h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Plus className="h-4 w-4" />
                  Create new deal
                </Button>
                <Card className="hover:bg-accent/50 transition-colors">
                  <Collapsible>
                    <CollapsibleTrigger className="w-full">
                      <CardHeader className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-semibold">TechVision AI</h4>
                            <Badge variant="outline" className="text-blue-500 border-blue-200">
                              Series B
                            </Badge>
                          </div>
                          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform data-[state=open]:rotate-180" />
                        </div>
                      </CardHeader>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="p-6 pt-0">
                        <div className="space-y-4">
                          {/* Header Section */}
                          <div className="space-y-3">
                            {/* Date row */}
                            <div className="text-xs text-muted-foreground whitespace-nowrap">
                              Last updated: Dec 18, 2023 • 2:30 PM
                            </div>
                            
                            {/* Status Badge */}
                            <Badge 
                              variant="secondary" 
                              className="bg-amber-50 text-amber-600 hover:bg-amber-50"
                            >
                              Due Diligence
                            </Badge>

                            <div className="mt-2"></div>
                            
                            {/* Company and Funding row */}
                            <div className="space-y-1.5 pt-1">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-muted-foreground">TechVision AI</span>
                                <span className="text-sm text-muted-foreground">$25M-30M</span>
                              </div>
                              <Badge variant="outline" className="text-blue-500 border-blue-200">
                                Series B
                              </Badge>
                            </div>
                          </div>

                          <div className="mt-4"></div>

                          {/* Preview Section */}
                          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                            <h5 className="text-sm font-medium">Conversation Summary</h5>
                            <div className="space-y-2 text-sm text-muted-foreground">
                              <p>
                                <span className="font-medium">Key Points:</span>
                                <ul className="list-disc pl-4 mt-1">
                                  <li>Strong founding team with previous successful exits</li>
                                  <li>3x YoY revenue growth with $12M ARR</li>
                                  <li>82% Gross Margin, 11-month CAC Payback</li>
                                  <li>Technical assessment scheduled for next week</li>
                                </ul>
                              </p>
                              <p>
                                <span className="font-medium">Next Steps:</span>
                                <ul className="list-disc pl-4 mt-1">
                                  <li>Technical deep-dive session</li>
                                  <li>Follow-up on growth metrics validation</li>
                                  <li>Valuation discussion with the team</li>
                                </ul>
                              </p>
                            </div>
                          </div>

                          {/* Conversation Details */}
                          <div className="space-y-4">
                            {/* Lead Partner's Input */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/avatars/partner.png" />
                                  <AvatarFallback className="text-xs">JP</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <span className="font-medium">John Partner</span>
                                  <span className="text-muted-foreground"> • Lead Partner</span>
                                </div>
                                <span className="text-xs text-muted-foreground ml-auto">2:30 PM</span>
                              </div>
                              <div className="text-sm text-muted-foreground pl-8">
                                Strong founding team with previous exits. Technology differentiation is compelling. 
                                Growth metrics are impressive - 3x YoY revenue growth. Recommend moving forward with technical assessment.
                              </div>
                            </div>

                            {/* Senior Analyst's Input */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/avatars/analyst.png" />
                                  <AvatarFallback className="text-xs">SA</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <span className="font-medium">Sarah Analyst</span>
                                  <span className="text-muted-foreground"> • Senior Analyst</span>
                                </div>
                                <span className="text-xs text-muted-foreground ml-auto">11:45 AM</span>
                              </div>
                              <div className="text-sm text-muted-foreground pl-8">
                                Financial analysis complete. Key metrics:
                                <ul className="list-disc pl-4 mt-1 space-y-0.5">
                                  <li>ARR: $12M (↑ 200% YoY)</li>
                                  <li>Gross Margin: 82%</li>
                                  <li>CAC Payback: 11 months</li>
                                </ul>
                                Valuation range looks reasonable given the growth trajectory and market position.
                              </div>
                            </div>

                            {/* Technical Lead's Input */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/avatars/tech.png" />
                                  <AvatarFallback className="text-xs">MT</AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <span className="font-medium">Mike Tech</span>
                                  <span className="text-muted-foreground"> • Technical Lead</span>
                                </div>
                                <span className="text-xs text-muted-foreground ml-auto">10:15 AM</span>
                              </div>
                              <div className="text-sm text-muted-foreground pl-8">
                                Initial technical review positive. Core AI technology is proprietary and scalable. 
                                Tech stack is modern and well-architected. Scheduled deep-dive session for next week.
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Collapsible>
                </Card>
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
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
