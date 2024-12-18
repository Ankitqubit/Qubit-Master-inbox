"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const items = [
  {
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    title: "Contacts",
    href: "/dashboard/contacts",
  },
  {
    title: "AI Agents",
    href: "/ai-agents",
  },
  {
    title: "Settings",
    href: "/settings",
  },
]

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex items-center space-x-6", className)}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            pathname === item.href
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
