'use client'

import { ContactsTable } from './components/contacts-table'

export default function ContactsPage() {
  return (
    <div className="flex-1">
      <div className="mb-8 px-6 pt-6">
        <h1 className="text-2xl font-semibold tracking-tight">Contact Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize your contacts efficiently. Search, filter, and take actions on your contacts.
        </p>
      </div>
      <ContactsTable />
    </div>
  )
}
