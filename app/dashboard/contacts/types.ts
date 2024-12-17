export interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  priority: 'Low' | 'Medium' | 'High'
  assignedTo: string
  reminder?: string
  status: 'pending' | 'completed'
  createdBy: string
  createdAt: string
}

export interface Deal {
  id: string
  title: string
  amount: number
  closingDate: string
  status: string
  stage: string
}

export interface ContactActivity {
  id: string
  type: 'task' | 'email' | 'call' | 'meeting' | 'note'
  title: string
  description?: string
  date: string
  createdBy: string
  relatedTo?: string
}

export interface Company {
  id: string
  name: string
  domain: string
  logo?: string
  industry?: string
  size?: string
  revenue?: string
  location?: string
}

export interface Contact {
  id: string
  name: string
  email: string
  primaryCompany?: string
  company?: Company
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
  activities?: ContactActivity[]
  tasks?: Task[]
  socialLinks?: {
    linkedin?: string
    twitter?: string
  }
}
