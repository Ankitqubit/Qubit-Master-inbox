"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { 
  Search, 
  Bell, 
  ChevronDown, 
  SlidersHorizontal, 
  Rocket,
  Puzzle,
  HelpCircle,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function TopNav() {
  return (
    <div className="h-14 border-b bg-white">
      <div className="flex h-full items-center">
        {/* Left section - Logo and Client selector */}
        <div className="flex items-center">
          {/* Logo */}
          <div className="flex h-14 w-[60px] items-center justify-center border-r">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-white font-semibold">
              Q
            </div>
          </div>

          {/* Client Dropdown */}
          <div className="px-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="h-8 gap-2 text-gray-600 hover:text-gray-900"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 text-xs font-medium">
                    C1
                  </div>
                  Client 1
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel>Switch Client</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Client 1</DropdownMenuItem>
                <DropdownMenuItem>Client 2</DropdownMenuItem>
                <DropdownMenuItem>Client 3</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Center section - Search */}
        <div className="flex flex-1 items-center justify-center px-6">
          <div className="relative w-full max-w-md">
            <div className="relative flex items-center">
              <Search className="absolute left-3 h-4 w-4 text-gray-400" />
              <Input 
                type="search"
                placeholder="Search..."
                className="w-full bg-gray-50 pl-10 pr-10 focus-visible:ring-blue-500"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 h-8 w-8 text-gray-400 hover:text-gray-600"
              >
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-3 px-4">
          <Button 
            variant="ghost" 
            className="h-8 gap-2 text-gray-600 hover:text-gray-900 text-sm font-medium"
          >
            <Rocket className="h-4 w-4" />
            Setup Guide
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
          >
            <Puzzle className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
          >
            <Bell className="h-4 w-4" />
          </Button>

          <Button 
            variant="ghost" 
            size="icon"
            className="h-8 w-8 text-gray-600 hover:text-gray-900"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon"
                className="h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gray-100 text-gray-600">AS</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Sign out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}
