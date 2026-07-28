'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutGrid,
  Users,
  Activity,
  Trophy,
  Banknote,
  Gift,
  Shield,
  Settings,
  LogOut,
  Users2,
  X,
  Menu,
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutGrid },
  { href: '/users', label: 'Players', icon: Users },
  { href: '/tournaments', label: 'Tournaments', icon: Trophy },
  { href: '/rewards', label: 'Rewards Center', icon: Gift },
  { href: '/payouts', label: 'Payouts', icon: Banknote },
  { href: '/admin-users', label: 'Admin Users', icon: Users2 },
  { href: '/activity', label: 'Activity', icon: Activity },
  { href: '/security', label: 'Security', icon: Shield },
  { href: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card border border-border"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 border-r border-border
          bg-[#0f0816] flex flex-col transition-transform duration-300
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
           <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 relative">
              <Image
                src="/sidebar-logo.webp"
                alt="BJ Spades Logo"
                fill
                className="object-cover"
                sizes="40px"
                priority 
              />
            </div>

            <div>
              <div className="font-heading font-bold text-white text-lg">
                BJ Spades
              </div>
              <div className="text-xs text-muted-foreground">
                Admin Portal
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      flex items-center gap-3 px-4 py-[10px] rounded-lg 
                      text-sm font-medium transition-colors relative
                      ${isActive
                        ? 'bg-sidebar-accent text-yellow-400'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }
                    `}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    
                    {isActive && (
                      <div className="absolute right-3 flex items-center justify-center">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping" />
                        <div className="w-2 h-2 bg-yellow-400 rounded-full absolute" />
                      </div>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="p-4 border-t border-[#2D1F3D] space-y-2">
          <div className="px-4 py-2 text-xs text-gray-500">
            admin@bjspades.com
          </div>
          <button 
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>
    </>
  )
}