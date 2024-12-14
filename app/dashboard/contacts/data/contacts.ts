export type ContactStatus = 'active' | 'inactive' | 'pending'

export interface Contact {
  id: string
  name: string
  email: string
  primaryCompany?: string
  phoneNumber?: string
  contactOwner?: string
  lastActivity?: string
  avatarInitials?: string
  avatarColor?: string
  title?: string
  department?: string
  country?: string
  leadSource?: string
  leadStatus?: string
  lastContacted?: string
  nextFollowUp?: string
  tags?: string[]
  revenue?: string
  deals?: number
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'Abigail J Smith',
    email: 'abigailsmith.mobbin@gmail.com',
    primaryCompany: 'Mobbin',
    phoneNumber: '+1 (628) 267-9041',
    contactOwner: 'Jane Doe',
    lastActivity: 'Today',
    avatarInitials: 'AS',
    avatarColor: 'bg-blue-200',
    title: 'Product Manager',
    department: 'Product',
    country: 'United States',
    leadSource: 'Website',
    leadStatus: 'Qualified',
    lastContacted: '2 days ago',
    nextFollowUp: 'Tomorrow',
    tags: ['VIP', 'Product Demo'],
    revenue: '$50,000',
    deals: 2,
    socialLinks: {
      linkedin: 'linkedin.com/in/abigail-smith',
      twitter: 'twitter.com/asmith'
    }
  },
  {
    id: '2',
    name: 'Kerry Summers',
    email: 'ksummers@morningstar.com',
    primaryCompany: 'Morningstar, Inc',
    phoneNumber: '482-7768',
    contactOwner: 'Unassigned',
    avatarColor: 'bg-red-200',
    title: 'Sales Director',
    department: 'Sales',
    country: 'Canada',
    leadSource: 'Referral',
    leadStatus: 'New',
    lastContacted: '5 days ago',
    nextFollowUp: 'Next week',
    tags: ['Sales Opportunity'],
    revenue: '$25,000',
    deals: 1
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@techcorp.com',
    primaryCompany: 'TechCorp',
    phoneNumber: '+1 (415) 555-0123',
    contactOwner: 'Alex Johnson',
    avatarInitials: 'MC',
    avatarColor: 'bg-green-200',
    title: 'CTO',
    department: 'Engineering',
    country: 'Singapore',
    leadSource: 'Conference',
    leadStatus: 'Contacted',
    lastContacted: '1 week ago',
    nextFollowUp: '3 days',
    tags: ['Technical Decision Maker', 'Enterprise'],
    revenue: '$100,000',
    deals: 3,
    socialLinks: {
      linkedin: 'linkedin.com/in/mchen'
    }
  },
  {
    id: '4',
    name: 'Sean Garcia',
    email: 'sean.garcia@komscore.fr',
    primaryCompany: 'Komscore',
    phoneNumber: '714-767-1517',
    contactOwner: 'Maria Rodriguez',
    avatarInitials: 'SG',
    avatarColor: 'bg-purple-200',
    title: 'Marketing Manager',
    department: 'Marketing',
    country: 'France',
    leadSource: 'Marketing Campaign',
    leadStatus: 'Qualified',
    lastContacted: '3 days ago',
    nextFollowUp: '1 week',
    tags: ['Marketing', 'EMEA'],
    revenue: '$75,000',
    deals: 2
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma.w@datatech.co.uk',
    primaryCompany: 'DataTech Solutions',
    phoneNumber: '+44 20 7123 4567',
    contactOwner: 'Tom Brown',
    avatarInitials: 'EW',
    avatarColor: 'bg-yellow-200',
    title: 'Data Scientist',
    department: 'Analytics',
    country: 'United Kingdom',
    leadSource: 'LinkedIn',
    leadStatus: 'In Discussion',
    lastContacted: 'Yesterday',
    nextFollowUp: '2 days',
    tags: ['AI/ML', 'Enterprise'],
    revenue: '$150,000',
    deals: 4,
    socialLinks: {
      linkedin: 'linkedin.com/in/ewilson',
      twitter: 'twitter.com/emmaw'
    }
  }
]

export function getContactById(id: string): Contact | undefined {
  return contacts.find(contact => contact.id === id)
}

export function getContactsByStatus(status: ContactStatus): Contact[] {
  return contacts.filter(contact => contact.status === status)
}

export function getContactsByTag(tag: string): Contact[] {
  return contacts.filter(contact => contact.tags?.includes(tag))
}
