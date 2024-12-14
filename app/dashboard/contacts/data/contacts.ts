export type ContactStatus = 'active' | 'inactive' | 'pending'

export interface Contact {
  id: string
  name: string
  email: string
  company?: string
  title?: string
  phone?: string
  status: ContactStatus
  tags?: string[]
  lastInteraction?: string
  createdAt: string
}

export const contacts: Contact[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    company: 'Tech Corp',
    title: 'CEO',
    phone: '+1 234 567 890',
    status: 'active',
    tags: ['client', 'vip'],
    lastInteraction: '2024-12-12',
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    company: 'Design Studio',
    title: 'Designer',
    status: 'active',
    tags: ['prospect'],
    lastInteraction: '2024-12-10',
    createdAt: '2024-02-15'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    company: 'Marketing Inc',
    status: 'inactive',
    createdAt: '2024-03-01'
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
