'use client'

import { ContactsTable } from './contacts/components/contacts-table'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function DashboardPage() {
  return (
    <div className="flex-1 pl-[60px]"> 
      <div className="mb-6">
        <Button variant="ghost" size="sm" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Button>
      </div>
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Contact Management</h1>
        <p className="text-muted-foreground mt-1">
          Manage and organize your contacts efficiently. Search, filter, and take actions on your contacts.
        </p>
      </div>

      <ContactsTable />
    </div>
  )
}
