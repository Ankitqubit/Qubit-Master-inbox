export type ContactStatus = 'active' | 'inactive' | 'pending'

export interface Contact {
  id: string
  name: string
  email: string
  phoneNumber?: string
  title?: string
  department?: string
  country?: string
  primaryCompany?: string
  company?: {
    id: string
    name: string
    domain: string
    logo: string
  }
  avatarInitials?: string
  avatarColor?: string
  revenue?: string
  deals?: number
  leadSource?: string
  tasks?: {
    id: string
    title: string
    description: string
    dueDate: string
    priority: string
    assignedTo: string
    status: string
    createdBy: string
    createdAt: string
    details?: string
  }[]
  activities?: {
    id: string
    type: string
    title: string
    description: string
    date: string
    createdBy: string
  }[]
  lastActivity?: string
  owner?: string
  source?: string
  dealsData?: {
    id: string
    name: string
    amount: number
    closingDate: string
    status: string
    stage: string
  }[]
}

export const contacts: Contact[] = [
  {
    id: "1",
    name: "Jhon Smith",
    email: "emailkuyahut@gmail.com",
    phoneNumber: "(405) 555-0128",
    title: "Content Writer",
    department: "Marketing",
    country: "United States",
    company: {
      id: "1",
      name: "Google inc.",
      domain: "google.com",
      logo: "/google.svg"
    },
    lastActivity: "2 Jan 2020 at 09:00 AM",
    owner: "Esther Howard",
    revenue: "$ 5,000",
    source: "Online store",
    tasks: [
      {
        id: "1",
        title: "Task created Esther Howard",
        description: "Prepare quote for Jerome Bell",
        dueDate: "Today, 12:00 PM",
        priority: "High",
        assignedTo: "Esther Howard",
        status: "pending",
        createdBy: "Esther Howard",
        createdAt: "2021-12-12",
        details: "She's interested in our new product line and wants our very best price. Please include a detailed breakdown of costs."
      }
    ],
    activities: [
      {
        id: "1",
        type: "task",
        title: "Task created by Esther Howard",
        description: "Prepare quote for Jerome Bell",
        date: "12 December 2021",
        createdBy: "Esther Howard"
      }
    ],
    dealsData: [
      {
        id: "1",
        name: "Web development",
        amount: 120000,
        closingDate: "18 Jan 2021",
        status: "Contract sent",
        stage: "proposal"
      },
      {
        id: "2",
        name: "Web development",
        amount: 120000,
        closingDate: "18 Jan 2021",
        status: "Contract sent",
        stage: "proposal"
      }
    ]
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
