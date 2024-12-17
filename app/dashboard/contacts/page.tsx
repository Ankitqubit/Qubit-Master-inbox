'use client'

import { ContactsTable } from './components/contacts-table'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function ContactsPage() {
  return (
    <div className="flex-1">
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-4"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-semibold tracking-tight">Contact Management</h1>
            <p className="text-sm text-muted-foreground">
              Manage and organize your contacts efficiently. Search, filter, and take actions on your contacts.
            </p>
          </div>
        </div>
      </div>
      <ContactsTable />
    </div>
  )
}
