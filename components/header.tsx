'use client'

import { Search, Bell, ChevronDown, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu'
import { useState } from 'react'

interface HeaderProps {
  title: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="  border-border sticky top-0 z-40">
      <div className="flex flex-wrap items-center justify-between p-5.5 gap-4">
        <div className='md:ml-0 ml-10'>
          <h1 className="text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-base text-muted-foreground">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-4 ml-auto">
          <div className="relative w-64 hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-10 bg-card border-border text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="relative text-foreground hover:bg-card"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger
              render={
                <Button
                  variant="ghost"
                  className="flex h-auto cursor-pointer items-center gap-3 px-3 py-1.5 hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent aria-expanded:bg-accent aria-expanded:text-accent-foreground"
                />
              }
            >
              <div className="w-8 h-8 rounded-full border border-primary/50 bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                AD
              </div>
              <span className="text-sm font-medium">Admin</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </DropdownMenuTrigger>
            
            <DropdownMenuContent
              align="end"
              className="w-56 bg-card border border-border shadow-lg rounded-lg p-1.5 mt-2"
            >
              <DropdownMenuGroup>
                <DropdownMenuLabel className="px-2 py-2 text-base font-bold text-foreground">
                  My Account
                </DropdownMenuLabel>

                <DropdownMenuItem className="gap-3 px-2 py-2.5 cursor-pointer text-foreground">
                  <User className="w-4 h-4 text-muted-foreground" />
                  Profile
                </DropdownMenuItem>

                <DropdownMenuItem className="gap-3 px-2 py-2.5 cursor-pointer text-foreground">
                  Settings
                </DropdownMenuItem>
              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1.5 bg-border" />

              <DropdownMenuItem
                // variant="destructive"
                className="gap-3 px-2 py-2.5 cursor-pointer"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  )
}