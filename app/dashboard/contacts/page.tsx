'use client'

import { ContactsTable } from './components/contacts-table'

export default function ContactsPage() {
  return (
    <div className="flex-1 p-4 md:p-8 pt-6">
      <ContactsTable />
    </div>
  )
}
