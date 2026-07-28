'use client'

import { Plus, Copy, Trash2, SlidersHorizontal } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { RoleBadge } from '@/components/status-badge'
import { mockAdminUsers } from '@/lib/mock-data'
import { useState } from 'react'
import { AddAdminUsersModal } from '@/components/modals/add-admin-users-modal'
import { ManagerPermissionsModal } from '@/components/modals/manage-permissions-modal'

export default function AdminUsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false)
      const [isPermissionModalOpen, setPermissionModalOpen] = useState(false)

  return (
    <>
    <AdminLayout
      title="Admin Users"
      subtitle="Manage administrator accounts and their permissions."
    >
      <div className="flex justify-end mb-6">
      <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 cursor-pointer text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
         Add Admin Users
        </Button>
      </div>

      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  User ID
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Role
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Permissions
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Assigned
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {mockAdminUsers.map((admin) => (
                <tr
                  key={admin.id}
                  className="border-b border-border hover:bg-secondary/30 transition-colors last:border-b-0"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <code className="text-sm text-foreground font-mono">
                        {admin.userId}
                      </code>
                      <button className="p-1 hover:bg-secondary rounded">
                        <Copy className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={admin.role} />
                  </td>
                  <td className="px-6 py-4">
                    {admin.permissions.length === 0 ? (
                      <span className="text-sm text-muted-foreground">
                        No permissions
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {admin.permissions.map((permission, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-1 rounded text-xs bg-secondary text-foreground border border-border"
                          >
                            {permission}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {admin.assigned}
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-4">
                    <button
                      onClick={() => setPermissionModalOpen(true)}
                      className="text-gray-400 cursor-pointer hover:text-white"
                    >
                      <SlidersHorizontal className="h-5 w-5" />
                    </button>

                    <button
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>


       <AddAdminUsersModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}

      />

       <ManagerPermissionsModal
        open={isPermissionModalOpen}
        onOpenChange={setIsModalOpen}

      />

        </>

  )
}
