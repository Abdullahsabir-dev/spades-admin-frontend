'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Eye, EyeOff, Shield, Users, Trophy, Key, Activity, Settings } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'

interface AdminUserFormData {
  email: string
  password: string
  role: string
  permissions: {
    manageUsers: boolean
    manageTournaments: boolean
    manageRoles: boolean
    viewActivity: boolean
    manageSecurity: boolean
    manageSettings: boolean
  }
}

interface AddAdminUsersProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: AdminUserFormData) => void | Promise<void>
}

const permissionItems = [
  { id: 'manageUsers', label: 'Manage Users', description: 'Create, edit, and delete users' },
  { id: 'manageTournaments', label: 'Manage Tournaments', description: 'Create and manage tournaments' },
  { id: 'manageRoles', label: 'Manage Roles', description: 'Assign roles to users' },
  { id: 'viewActivity', label: 'View Activity', description: 'View activity logs' },
  { id: 'manageSecurity', label: 'Manage Security', description: 'Access security settings' },
  { id: 'manageSettings', label: 'Manage Settings', description: 'Modify system settings' },
]

const permissionIcons = {
  manageUsers: Users,
  manageTournaments: Trophy,
  manageRoles: Key,
  viewActivity: Activity,
  manageSecurity: Shield,
  manageSettings: Settings,
}

export function AddAdminUsersModal({
  open,
  onOpenChange,
  onSubmit,
}: AddAdminUsersProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AdminUserFormData>({
    defaultValues: {
      email: '',
      password: '',
      role: 'admin',
      permissions: {
        manageUsers: false,
        manageTournaments: false,
        manageRoles: false,
        viewActivity: false,
        manageSecurity: false,
        manageSettings: false,
      },
    },
  })

  const handleSubmit = (data: AdminUserFormData) => {
    setIsLoading(true)
    try {
      const result = onSubmit?.(data)

      if (result instanceof Promise) {
        result
          .then(() => {
            form.reset()
            onOpenChange(false)
          })
          .catch((error) => {
            console.error('Error creating admin user:', error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        form.reset()
        onOpenChange(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating admin user:', error)
      setIsLoading(false)
    }
  }

  const selectedCount = Object.values(form.watch('permissions')).filter(Boolean).length
  const totalCount = permissionItems.length

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Add Admin User
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Create a new administrator account with specific permissions.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              rules={{ 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="admin@example.com"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              rules={{ 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                }
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Password
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="********"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground focus:border-primary pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Role
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-secondary/50 border-border text-white focus:border-primary">
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="super-admin">Super Admin</SelectItem>
                      <SelectItem value="moderator">Moderator</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Permissions Section - Improved UI */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <FormLabel className="text-sm font-semibold text-white flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    Permissions
                  </FormLabel>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Grant specific permissions to this administrator
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const allTrue = permissionItems.every(
                      (p) => form.getValues(`permissions.${p.id as keyof AdminUserFormData['permissions']}`)
                    )
                    permissionItems.forEach((permission) => {
                      form.setValue(
                        `permissions.${permission.id as keyof AdminUserFormData['permissions']}`,
                        !allTrue
                      )
                    })
                  }}
                  className="border-border text-muted-foreground hover:text-white hover:bg-secondary/50 text-xs"
                >
                  {selectedCount === totalCount ? 'Deselect All' : 'Select All'}
                </Button>
              </div>

              <div className="grid grid-cols-1  gap-3">
                {permissionItems.map((permission) => {
                  const Icon = permissionIcons[permission.id as keyof typeof permissionIcons]
                  return (
                    <FormField
                      key={permission.id}
                      control={form.control}
                      name={`permissions.${permission.id as keyof AdminUserFormData['permissions']}`}
                      render={({ field }) => (
                        <FormItem 
                          className={`
                            flex items-start space-x-3 space-y-0 p-3 
                            border rounded-lg transition-all duration-200 cursor-pointer
                            ${field.value 
                              ? 'bg-primary/10 border-primary/50 ring-1 ring-primary/20' 
                              : 'bg-secondary/20 border-border hover:bg-secondary/40'
                            }
                          `}
                          onClick={() => field.onChange(!field.value)}
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="mt-0.5 border-2 border-muted-foreground/50 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-colors rounded"
                            />
                          </FormControl>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              {Icon && (
                                <Icon className={`
                                  w-4 h-4 transition-colors
                                  ${field.value ? 'text-primary' : 'text-muted-foreground'}
                                `} />
                              )}
                              <FormLabel className="text-sm font-medium text-white cursor-pointer">
                                {permission.label}
                              </FormLabel>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                              {permission.description}
                            </p>
                          </div>
                          {field.value && (
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mt-1" />
                          )}
                        </FormItem>
                      )}
                    />
                  )
                })}
              </div>

              {/* Permission Summary */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Permission coverage</span>
                  <span className="text-white font-medium">
                    {selectedCount}/{totalCount}
                  </span>
                </div>
                <div className="w-full h-1.5 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{
                      width: `${(selectedCount / totalCount) * 100}%`
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
                }}
                className="border-border text-white hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? 'Creating...' : 'Create Admin'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}