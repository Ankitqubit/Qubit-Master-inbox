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
import { ArrowLeft, Mail, Phone, MoreHorizontal, Plus, Calendar, Check, Search, ChevronDown, FileText, Sparkles, ChevronUp, Copy, Linkedin, Twitter, Facebook, Instagram, CheckCircle2, ArrowRight, User, MessageSquare, KeyRound, Clock, ArrowRightCircle, Target } from "lucide-react"
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
                <div className="space-y-8">
                  <div className="flex items-center gap-3 border-b pb-4">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <h3 className="text-xl font-semibold text-foreground">AI Summary</h3>
                  </div>

                  <div className="grid gap-8">
                    {/* Overview Section */}
                    <div className="rounded-lg border border-border/50 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <User className="h-4 w-4 text-indigo-400" />
                        <h4 className="text-base font-semibold text-foreground">Overview</h4>
                      </div>
                      <div className="pr-8">
                        <p className="text-sm leading-relaxed text-secondary">
                          John Smith is a seasoned technology executive with over 15 years of experience in AI and machine learning. 
                          Currently serving as the CEO of TechVision AI, he has led the company through significant growth phases 
                          and two successful funding rounds. Prior experience includes leadership roles at major tech companies 
                          and a successful exit from his previous startup.
                        </p>
                      </div>
                    </div>

                    {/* Conversation Summary Section */}
                    <div className="rounded-lg border border-border/50 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <h4 className="text-base font-semibold text-foreground">Conversation Summary</h4>
                      </div>
                      <div className="space-y-6">
                        <p className="text-sm leading-relaxed text-secondary">
                          Recent discussions have centered around TechVision AI's expansion plans and technical infrastructure. 
                          Key focus areas include scaling the enterprise solution, exploring APAC market opportunities, and preparing 
                          for Series B funding. The team has made significant progress with a successful POC completion and is 
                          actively working on strengthening their competitive position.
                        </p>
                        <div>
                          <h5 className="text-sm font-medium text-foreground mb-3">Key Discussion Points</h5>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-muted/30 rounded-md">
                              <p className="text-sm text-secondary">Product roadmap focusing on enterprise features</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-md">
                              <p className="text-sm text-secondary">Technical architecture and scalability plans</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-md">
                              <p className="text-sm text-secondary">Market expansion strategy for APAC region</p>
                            </div>
                            <div className="p-3 bg-muted/30 rounded-md">
                              <p className="text-sm text-secondary">Competitive positioning strategy</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Recommended Next Steps Section */}
                    <div className="rounded-lg border border-border/50 p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <ArrowRight className="h-4 w-4 text-emerald-400" />
                        <h4 className="text-base font-semibold text-foreground">Recommended Next Steps</h4>
                      </div>
                      <div className="grid gap-3">
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                          <ArrowRightCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <p className="text-sm text-secondary">Schedule technical deep-dive session for infrastructure review</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                          <ArrowRightCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <p className="text-sm text-secondary">Follow up on enterprise client references</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                          <ArrowRightCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <p className="text-sm text-secondary">Review updated financial projections</p>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-md">
                          <ArrowRightCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                          <p className="text-sm text-secondary">Coordinate meeting with potential strategic partners</p>
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
                <Card>
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
