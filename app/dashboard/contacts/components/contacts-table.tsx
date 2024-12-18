'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChevronRight,
  ChevronLeft,
  Search,
  Filter,
  Save,
  Download,
  Pencil,
  MoreHorizontal,
  Edit,
  Mail,
  CalendarPlus,
  UserPlus,
  Trash,
  Eye,
  MessageSquare,
  FileText,
} from 'lucide-react'
import Link from "next/link"
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useState, Fragment } from 'react'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ContactsTable() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedContacts, setSelectedContacts] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)

  const contacts = [
    {
      id: '1',
      initials: 'AS',
      initialsColor: 'bg-blue-100 text-blue-700',
      name: 'Abigail J Smith',
      email: 'abigailsmith.mobbin@gmail.com',
      company: 'Mobbin',
      title: 'Product Manager',
      department: 'Product',
      country: 'United States',
      phone: '+1 (628) 267-9041',
      owner: 'Jane Doe',
      leadStatus: 'Hot',
      leadSource: 'Direct',
      lastActivity: 'Yesterday',
      nextFollowup: 'Today',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/abigailjsmith',
      twitterHandle: '@abigailjsmith',
      industry: 'Software',
      annualRevenue: '$100M',
      employeeCount: '1000',
      website: 'https://mobbin.com',
      tags: ['New', 'Prospect'],
    },
    {
      id: '2',
      initials: 'KS',
      initialsColor: 'bg-pink-100 text-pink-700',
      name: 'Kerry Summers',
      email: 'ksummers@morningstar.com',
      company: 'Morningstar, Inc',
      title: 'Sales Director',
      department: 'Sales',
      country: 'Canada',
      phone: '482-7768',
      owner: 'Unassigned',
      leadStatus: 'Warm',
      leadSource: 'Referral',
      lastActivity: 'Last Week',
      nextFollowup: 'Not Scheduled',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/kerrysummers',
      twitterHandle: '@kerrysummers',
      industry: 'Finance',
      annualRevenue: '$500M',
      employeeCount: '5000',
      website: 'https://morningstar.com',
      tags: ['Existing', 'Customer'],
    },
    {
      id: '3',
      initials: 'MC',
      initialsColor: 'bg-green-100 text-green-700',
      name: 'Michael Chen',
      email: 'mchen@techcorp.com',
      company: 'TechCorp',
      title: 'CTO',
      department: 'Engineering',
      country: 'Singapore',
      phone: '+1 (415) 555-0123',
      owner: 'Alex Johnson',
      leadStatus: 'Cold',
      leadSource: 'Social Media',
      lastActivity: 'Never',
      nextFollowup: 'Not Scheduled',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/michaelchen',
      twitterHandle: '@michaelchen',
      industry: 'Technology',
      annualRevenue: '$1B',
      employeeCount: '10000',
      website: 'https://techcorp.com',
      tags: ['New', 'Lead'],
    },
    {
      id: '4',
      initials: 'SG',
      initialsColor: 'bg-purple-100 text-purple-700',
      name: 'Sean Garcia',
      email: 'sean.garcia@komscore.fr',
      company: 'Komscore',
      title: 'Marketing Manager',
      department: 'Marketing',
      country: 'France',
      phone: '714-767-1517',
      owner: 'Maria Rodriguez',
      leadStatus: 'New',
      leadSource: 'Direct',
      lastActivity: 'Yesterday',
      nextFollowup: 'Today',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/seangarcia',
      twitterHandle: '@seangarcia',
      industry: 'Software',
      annualRevenue: '$50M',
      employeeCount: '500',
      website: 'https://komscore.fr',
      tags: ['New', 'Prospect'],
    },
    {
      id: '5',
      initials: 'EW',
      initialsColor: 'bg-yellow-100 text-yellow-700',
      name: 'Emma Wilson',
      email: 'emma.w@datatech.co.uk',
      company: 'DataTech Solutions',
      title: 'Data Scientist',
      department: 'Analytics',
      country: 'United Kingdom',
      phone: '+44 20 7123 4567',
      owner: 'Tom Brown',
      leadStatus: 'Warm',
      leadSource: 'Referral',
      lastActivity: 'Last Week',
      nextFollowup: 'Not Scheduled',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/emmawilson',
      twitterHandle: '@emmawilson',
      industry: 'Technology',
      annualRevenue: '$200M',
      employeeCount: '2000',
      website: 'https://datatech.co.uk',
      tags: ['Existing', 'Customer'],
    },
    {
      id: '6',
      initials: 'DL',
      initialsColor: 'bg-purple-100 text-purple-700',
      name: 'David Lee',
      email: 'david.lee@techstart.io',
      company: 'TechStart',
      title: 'Frontend Developer',
      department: 'Engineering',
      country: 'Canada',
      phone: '+1 (416) 555-0123',
      owner: 'Alex Johnson',
      leadStatus: 'New',
      leadSource: 'Direct',
      lastActivity: 'Yesterday',
      nextFollowup: 'Today',
      createdDate: '2024-01-01',
      modifiedDate: '2024-01-01',
      linkedinUrl: 'https://www.linkedin.com/in/davidlee',
      twitterHandle: '@davidlee',
      industry: 'Technology',
      annualRevenue: '$100M',
      employeeCount: '1000',
      website: 'https://techstart.io',
      tags: ['New', 'Lead'],
    },
    {
      id: '7',
      initials: 'RK',
      initialsColor: 'bg-indigo-100 text-indigo-700',
      name: 'Rachel Kumar',
      email: 'rachel.k@innovate.in',
      company: 'Innovate Tech',
      title: 'Innovation Lead',
      department: 'R&D',
      country: 'India',
      phone: '+91 98765 43210',
      owner: 'Sarah Wilson',
      leadStatus: 'Hot',
      leadSource: 'Conference',
      lastActivity: 'Today',
      nextFollowup: 'Tomorrow',
      createdDate: '2024-01-02',
      modifiedDate: '2024-01-02',
      linkedinUrl: 'https://www.linkedin.com/in/rachelkumar',
      twitterHandle: '@rachelkumar',
      industry: 'Technology',
      annualRevenue: '$75M',
      employeeCount: '750',
      website: 'https://innovate.in',
      tags: ['VIP', 'Partner'],
    },
    {
      id: '8',
      initials: 'JB',
      initialsColor: 'bg-red-100 text-red-700',
      name: 'James Brown',
      email: 'j.brown@fintech.co',
      company: 'FinTech Solutions',
      title: 'Financial Analyst',
      department: 'Finance',
      country: 'Australia',
      phone: '+61 2 8765 4321',
      owner: 'Mike Thompson',
      leadStatus: 'Warm',
      leadSource: 'Website',
      lastActivity: '2 days ago',
      nextFollowup: 'Next Week',
      createdDate: '2024-01-03',
      modifiedDate: '2024-01-03',
      linkedinUrl: 'https://www.linkedin.com/in/jamesbrown',
      twitterHandle: '@jbrown',
      industry: 'Finance',
      annualRevenue: '$150M',
      employeeCount: '1200',
      website: 'https://fintech.co',
      tags: ['Prospect', 'Finance'],
    },
    {
      id: '9',
      initials: 'ML',
      initialsColor: 'bg-emerald-100 text-emerald-700',
      name: 'Maria Lopez',
      email: 'maria.lopez@healthtech.es',
      company: 'HealthTech',
      title: 'Healthcare Solutions Director',
      department: 'Healthcare',
      country: 'Spain',
      phone: '+34 612 345 678',
      owner: 'David Chen',
      leadStatus: 'Cold',
      leadSource: 'LinkedIn',
      lastActivity: '1 week ago',
      nextFollowup: 'Next Month',
      createdDate: '2024-01-04',
      modifiedDate: '2024-01-04',
      linkedinUrl: 'https://www.linkedin.com/in/marialopez',
      twitterHandle: '@mlopez',
      industry: 'Healthcare',
      annualRevenue: '$300M',
      employeeCount: '3000',
      website: 'https://healthtech.es',
      tags: ['Healthcare', 'Enterprise'],
    },
    {
      id: '10',
      initials: 'AK',
      initialsColor: 'bg-orange-100 text-orange-700',
      name: 'Anna Kim',
      email: 'anna.kim@edutech.kr',
      company: 'EduTech Korea',
      title: 'Education Technology Lead',
      department: 'Education',
      country: 'South Korea',
      phone: '+82 10 9876 5432',
      owner: 'Lisa Park',
      leadStatus: 'Hot',
      leadSource: 'Partner Referral',
      lastActivity: 'Today',
      nextFollowup: 'Tomorrow',
      createdDate: '2024-01-05',
      modifiedDate: '2024-01-05',
      linkedinUrl: 'https://www.linkedin.com/in/annakim',
      twitterHandle: '@annakim',
      industry: 'Education',
      annualRevenue: '$80M',
      employeeCount: '800',
      website: 'https://edutech.kr',
      tags: ['Education', 'Partner'],
    },
  ]

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentContacts = filteredContacts.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedContacts(currentContacts.map((contact) => contact.id))
    } else {
      setSelectedContacts([])
    }
  }

  const handleSelectContact = (id: string) => {
    setSelectedContacts((prev) => {
      if (prev.includes(id)) {
        return prev.filter((contactId) => contactId !== id)
      }
      return [...prev, id]
    })
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="all" className="w-full">
        <div className="flex items-center justify-between mb-4">
          <TabsList className="bg-[#f3f4f6] p-1 rounded-lg">
            <TabsTrigger
              value="all"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              All Contacts
            </TabsTrigger>
            <TabsTrigger
              value="my"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              My Contacts
            </TabsTrigger>
            <TabsTrigger
              value="unassigned"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              Unassigned
            </TabsTrigger>
            <TabsTrigger
              value="recently"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              Recently Created
            </TabsTrigger>
            <TabsTrigger
              value="viewed"
              className="rounded-md px-4 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
            >
              Recently Viewed
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Data Quality
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[200px]">
                <DropdownMenuItem>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Contact
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Mail className="mr-2 h-4 w-4" />
                  Send Email
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CalendarPlus className="mr-2 h-4 w-4" />
                  Schedule Meeting
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Send Message
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <FileText className="mr-2 h-4 w-4" />
                  Add Note
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add to Campaign
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="mr-2 h-4 w-4" />
                  Export Contact
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete Contact
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="outline" size="sm">
              Import
            </Button>
            <Button size="sm" className="bg-blue-600 text-white hover:bg-blue-700">
              Create contact
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search contacts..."
              className="pl-9"
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

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[40px]">
                  <Checkbox
                    checked={selectedContacts.length === currentContacts.length}
                    onCheckedChange={handleSelectAll}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Primary Company</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Contact Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentContacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-muted/50">
                  <TableCell className="w-[40px]">
                    <Checkbox
                      checked={selectedContacts.includes(contact.id)}
                      onCheckedChange={() => handleSelectContact(contact.id)}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${contact.initialsColor}`}>
                        {contact.initials}
                      </div>
                      <Link 
                        href={`/dashboard/contacts/${contact.id}`}
                        className="font-medium text-blue-600 hover:underline cursor-pointer"
                      >
                        {contact.name}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>{contact.company}</TableCell>
                  <TableCell>{contact.title}</TableCell>
                  <TableCell>{contact.department}</TableCell>
                  <TableCell>{contact.country}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredContacts.length)} of {filteredContacts.length} entries
            </p>
            <Select
              value={itemsPerPage.toString()}
              onValueChange={(value) => {
                setItemsPerPage(parseInt(value))
                setCurrentPage(1)
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="5">5</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">per page</span>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(page => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (page >= currentPage - 1 && page <= currentPage + 1) return true;
                if (page === 2 && currentPage <= 4) return true;
                if (page === totalPages - 1 && currentPage >= totalPages - 3) return true;
                return false;
              })
              .map((page, index, array) => {
                if (index > 0 && array[index - 1] !== page - 1) {
                  return (
                    <Fragment key={`ellipsis-${page}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        disabled
                      >
                        ...
                      </Button>
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    </Fragment>
                  );
                }
                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </Button>
                );
              })}

            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Tabs>
    </div>
  )
}
