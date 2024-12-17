import { getContactById } from "../data/contacts"
import ContactProfile from "./contact-profile"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Force dynamic rendering for this page
export const dynamic = 'force-dynamic'

export default async function ContactPage({
  params
}: {
  params: { id: string }
}) {
  const contact = await getContactById(params.id)

  if (!contact) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center space-x-2">
          <Link
            href="/dashboard/contacts"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to contacts
          </Link>
        </div>
        <div className="flex items-center justify-center h-[50vh]">
          <p className="text-muted-foreground">Contact not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1">
      <ContactProfile contact={contact} />
    </div>
  )
}
