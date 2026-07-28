'use client'

import { Download, Plus, Filter, MoreVertical, UserPlus, Trash2, UserX, Edit, Eye } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { StatusBadge, RoleBadge } from '@/components/status-badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockUsers } from '@/lib/mock-data'
import { winRateColor } from '@/lib/utils'
import { CreateUserModal } from '@/components/modals/create-user-modal'
import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function UsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
  
    const handleCreateUser = (data: any) => {
      console.log('New user data:', data)
      alert('User created successfully!')
    }
  return (
    <>
    <AdminLayout
      title="User Management"
      subtitle="Create, monitor, and manage all user accounts."
    >
      {/* Search and Filter Bar */}
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search users..."
            className="flex-1 bg-card border-border"
          />
         
          <Button variant="outline" className="border-border">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
             <Button 
                className="bg-primary cursor-pointer hover:bg-primary/90 text-primary-foreground flex items-center gap-2"
                onClick={() => setIsModalOpen(true)}
              >
                <UserPlus className="w-4 h-4" />
                Create User
              </Button>
        </div>

        <div className="flex items-center gap-3">
        <Select defaultValue="All Status">
       <SelectTrigger className="w-40 bg-card border-border">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <SelectValue placeholder="All Status" />
        </div>
      </SelectTrigger>
      <SelectContent className="bg-card border-border">
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="active">Active</SelectItem>
        <SelectItem value="inactive">Inactive</SelectItem>
        <SelectItem value="suspended">Suspended</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
      </SelectContent>
    </Select>

          <Select defaultValue="All Roles">
            <SelectTrigger className="w-40 bg-card border-border">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="vip">VIP</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="player">Player</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Stats Info */}
      <div className="text-sm text-muted-foreground mb-4">
        Showing {mockUsers.length} of {mockUsers.length} users
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  User
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Balance
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Games
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Win Rate
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Last Active
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {mockUsers.map((user) => (
                <tr key={user.id} className="border-b border-border hover:bg-secondary/30 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-sm font-bold text-white">
                        {user.initials}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={user.status as any} />
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={user.role} />
                  </td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">
                    {user.balance.toLocaleString()} tokens
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">{user.games}</td>
                  <td
                    className={`px-6 py-4 text-sm font-medium ${winRateColor(user.winRate)}`}
                  >
                    {user.winRate}%
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {user.lastActive}
                  </td>
               <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger >
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 cursor-pointer hover:bg-secondary/80 transition-colors rounded-md"
                          >
                            <MoreVertical className="w-4 h-4 text-muted-foreground" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                          align="end" 
                          className="w-48 bg-card border-border shadow-lg rounded-lg p-1"
                        >
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-secondary/80 rounded-md px-3 py-2 text-sm text-foreground flex items-center gap-3"
                          >
                            <Eye className="w-4 h-4 text-muted-foreground" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-secondary/80 rounded-md px-3 py-2 text-sm text-foreground flex items-center gap-3"
                          >
                            <Edit className="w-4 h-4 text-muted-foreground" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-border" />
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-secondary/80 rounded-md px-3 py-2 text-sm text-amber-500 flex items-center gap-3"
                          >
                            <UserX className="w-4 h-4 text-amber-500" />
                            Suspend
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-destructive/10 rounded-md px-3 py-2 text-sm text-red-500 flex items-center gap-3"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>

       <CreateUserModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateUser}
          />
          </>
  )
}
