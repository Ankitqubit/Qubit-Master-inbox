'use client'

import { ContactsTable } from './components/contacts-table'
import { PageHeader } from '@/components/page-header'

export default function ContactsPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <PageHeader 
        title="Contact Management" 
        description="View and manage all your contacts in one place."
      />
      <ContactsTable />
    </div>
  )
}
