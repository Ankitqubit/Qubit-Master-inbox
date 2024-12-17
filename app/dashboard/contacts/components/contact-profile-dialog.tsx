"use client"

import { useState } from "react"
import { type Contact } from "../data/contacts"
import {
  Dialog,
  DialogContent,
  DialogHeader,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import {
  Calendar,
  Mail,
  Phone,
  Building2,
  MapPin,
  Briefcase,
  Users,
  LinkIcon,
  DollarSign,
  Clock,
  Tag,
  MessageSquare,
  FileText,
  Activity,
} from "lucide-react"

interface ContactProfileDialogProps {
  contact: Contact | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactProfileDialog({
  contact,
  open,
  onOpenChange,
}: ContactProfileDialogProps) {
  const [activeTab, setActiveTab] = useState("overview")

  if (!contact) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] p-0">
        <div className="h-full flex flex-col">
          {/* Header */}
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className={contact.avatarColor}>
                    {contact.avatarInitials || contact.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold text-gray-900">{contact.name}</h2>
                  <p className="text-sm text-gray-500">{contact.title} at {contact.primaryCompany}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-gray-50">
                      {contact.leadStatus}
                    </Badge>
                    {contact.tags?.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-gray-50">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message
                </Button>
                <Button size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </DialogHeader>

          {/* Content */}
          <div className="flex-1 overflow-auto">
            <Tabs defaultValue="overview" className="h-full">
              <div className="border-b px-6">
                <TabsList className="gap-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="files">Files</TabsTrigger>
                </TabsList>
              </div>

              <div className="p-6">
                <TabsContent value="overview" className="m-0">
                  <div className="grid grid-cols-3 gap-6">
                    {/* Contact Information */}
                    <Card className="col-span-2 border-gray-200">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.phoneNumber}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Building2 className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.primaryCompany}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <MapPin className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.country}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Briefcase className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.department}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Users className="h-4 w-4 text-gray-500" />
                              <span className="text-gray-600">{contact.contactOwner}</span>
                            </div>
                          </div>
                          <div className="pt-4 border-t">
                            <h4 className="text-sm font-medium mb-2">Social Links</h4>
                            <div className="flex items-center gap-4">
                              {contact.socialLinks?.linkedin && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                              )}
                              {contact.socialLinks?.twitter && (
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <LinkIcon className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Key Details */}
                    <Card className="border-gray-200">
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Key Details</h3>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <DollarSign className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Revenue</span>
                            </div>
                            <span className="text-sm font-medium">{contact.revenue}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Activity className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Deals</span>
                            </div>
                            <span className="text-sm font-medium">{contact.deals}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Clock className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Last Contacted</span>
                            </div>
                            <span className="text-sm font-medium">{contact.lastContacted}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Next Follow Up</span>
                            </div>
                            <span className="text-sm font-medium">{contact.nextFollowUp}</span>
                          </div>
                          <div className="pt-4 border-t">
                            <div className="flex items-center gap-2 mb-2">
                              <Tag className="h-4 w-4 text-gray-500" />
                              <span className="text-sm">Lead Source</span>
                            </div>
                            <Badge variant="outline" className="bg-gray-50">
                              {contact.leadSource}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="activity" className="m-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Recent Activity</h3>
                      <Button variant="outline" size="sm">
                        <Activity className="h-4 w-4 mr-2" />
                        Log Activity
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      No recent activity to show.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="notes" className="m-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Notes</h3>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Add Note
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      No notes to show.
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="files" className="m-0">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Files</h3>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        Upload File
                      </Button>
                    </div>
                    <div className="text-sm text-gray-500">
                      No files to show.
                    </div>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
