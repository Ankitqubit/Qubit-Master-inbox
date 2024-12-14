'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { 
  ChevronLeft, 
  ChevronRight, 
  MoreHorizontal, 
  Search,
  Filter,
  Save,
  Download,
  Pencil,
  Link as LinkIcon,
} from 'lucide-react'
import { contacts } from '../data/contacts'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ContactProfileDialog } from './contact-profile-dialog'

export function ContactsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(25)
  const [currentView, setCurrentView] = useState('all')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phoneNumber?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleSelectAll = () => {
    if (selectedContacts.length === filteredContacts.length) {
      setSelectedContacts([])
    } else {
      setSelectedContacts(filteredContacts.map(contact => contact.id))
    }
  }

  const handleSelectContact = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(contactId => contactId !== id))
    } else {
      setSelectedContacts([...selectedContacts, id])
    }
  }

  return (
    <div className="space-y-4">
      {/* Fixed width container */}
      <div className="w-full max-w-[calc(100vw-120px)]"> {/* 60px nav + 60px padding */}
        <div className="flex items-center justify-between mb-6">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="all" onClick={() => setCurrentView('all')}>All Contacts</TabsTrigger>
                <TabsTrigger value="my" onClick={() => setCurrentView('my')}>My Contacts</TabsTrigger>
                <TabsTrigger value="unassigned" onClick={() => setCurrentView('unassigned')}>Unassigned</TabsTrigger>
                <TabsTrigger value="recently" onClick={() => setCurrentView('recently')}>Recently Created</TabsTrigger>
                <TabsTrigger value="viewed" onClick={() => setCurrentView('viewed')}>Recently Viewed</TabsTrigger>
              </TabsList>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  Data Quality
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      Actions
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Delete Selected</DropdownMenuItem>
                    <DropdownMenuItem>Export Selected</DropdownMenuItem>
                    <DropdownMenuItem>Assign Owner</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm">
                  Import
                </Button>
                <Button size="sm">
                  Create contact
                </Button>
              </div>
            </div>
          </Tabs>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Pencil className="h-4 w-4" />
          </Button>
        </div>

        {/* Scrollable table container */}
        <div className="rounded-lg bg-white border border-gray-200">
          <div className="overflow-x-auto">
            <div className="min-w-max">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-gray-200">
                    <TableHead className="w-12 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] sticky left-0 border-r border-gray-200">
                      <Checkbox
                        checked={selectedContacts.length === filteredContacts.length}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="min-w-[200px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] sticky left-12 border-r border-gray-200">Name</TableHead>
                    <TableHead className="min-w-[200px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Email</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Primary Company</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Title</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Department</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Country</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Phone</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Contact Owner</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Lead Source</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Lead Status</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Last Contacted</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Next Follow Up</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Tags</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Revenue</TableHead>
                    <TableHead className="min-w-[100px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Deals</TableHead>
                    <TableHead className="min-w-[150px] bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">Social Links</TableHead>
                    <TableHead className="w-12 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6] sticky right-0 border-l border-gray-200">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className="border-b border-gray-200 hover:bg-gray-50/50">
                      <TableCell className="bg-white sticky left-0 border-r border-gray-200">
                        <Checkbox
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={() => handleSelectContact(contact.id)}
                        />
                      </TableCell>
                      <TableCell className="bg-white sticky left-12 border-r border-gray-200">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className={contact.avatarColor}>
                              {contact.avatarInitials || contact.name.substring(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <Link
                            href={`/dashboard/contacts/${contact.id}`}
                            className="text-blue-500 font-medium hover:underline"
                          >
                            {contact.name}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{contact.email}</TableCell>
                      <TableCell className="text-gray-600">{contact.primaryCompany}</TableCell>
                      <TableCell className="text-gray-600">{contact.title}</TableCell>
                      <TableCell className="text-gray-600">{contact.department}</TableCell>
                      <TableCell className="text-gray-600">{contact.country}</TableCell>
                      <TableCell className="text-gray-600">{contact.phoneNumber}</TableCell>
                      <TableCell className="text-gray-600">{contact.contactOwner}</TableCell>
                      <TableCell className="text-gray-600">{contact.leadSource}</TableCell>
                      <TableCell>
                        {contact.leadStatus && (
                          <Badge variant="outline" className="bg-gray-50 text-gray-700">
                            {contact.leadStatus}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-600">{contact.lastContacted}</TableCell>
                      <TableCell className="text-gray-600">{contact.nextFollowUp}</TableCell>
                      <TableCell>
                        <div className="flex gap-1 flex-wrap">
                          {contact.tags?.map((tag) => (
                            <Badge key={tag} variant="outline" className="bg-gray-50 text-gray-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-600">{contact.revenue}</TableCell>
                      <TableCell className="text-gray-600">{contact.deals}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {contact.socialLinks?.linkedin && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          )}
                          {contact.socialLinks?.twitter && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                              <LinkIcon className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="bg-white sticky right-0 border-l border-gray-200">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        <ContactProfileDialog
          contact={selectedContact}
          open={selectedContact !== null}
          onOpenChange={(open) => !open && setSelectedContact(null)}
        />

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage * itemsPerPage >= filteredContacts.length}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {currentPage} of{' '}
              {Math.ceil(filteredContacts.length / itemsPerPage)}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Rows per page</span>
            <select
              className="h-8 w-16 rounded-md border border-input bg-background px-2"
              value={itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}
