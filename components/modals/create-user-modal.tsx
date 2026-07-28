'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

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

interface CreateUserFormData {
  fullName: string
  email: string
  mobileNumber: string
  role: string
  player: string
  initialBalance: number
  addressLine1: string
  addressLine2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

interface CreateUserModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateUserFormData) => void | Promise<void>
}

export function CreateUserModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateUserModalProps) {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<CreateUserFormData>({
    defaultValues: {
      fullName: '',
      email: '',
      mobileNumber: '',
      role: 'active',
      player: 'active',
      initialBalance: 0,
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
  })

  const handleSubmit = (data: CreateUserFormData) => {
    setIsLoading(true)
    try {
      // Call onSubmit if provided
      const result = onSubmit?.(data)
      
      // Handle both sync and async callbacks
      if (result instanceof Promise) {
        result
          .then(() => {
            form.reset()
            onOpenChange(false)
          })
          .catch((error) => {
            console.error('Error creating user:', error)
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
      console.error('Error creating user:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create New User
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new user to the Spades platform.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              {/* Full Name */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Address */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="john@example.com"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Number */}
              <FormField
                control={form.control}
                name="mobileNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Mobile Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+1 (555) 555-1234"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
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
                        <SelectTrigger className="bg-secondary/50 border-border text-white">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="active">Player</SelectItem>
                        <SelectItem value="suspended">Premium</SelectItem>
                        <SelectItem value="banned">VIP</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

          

              {/* Initial Balance */}
              <FormField
                control={form.control}
                name="initialBalance"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Initial Balance (tokens)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="0"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === '' ? 0 : Number(e.target.value)
                          )
                        }
                        value={field.value || 0}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            {/* Shipping Address Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-white border-b border-border pb-2">
                Shipping Address
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {/* Address Line 1 */}
                <FormField
                  control={form.control}
                  name="addressLine1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        Address Line 1
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="123 Main St"
                          className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address Line 2 */}
                <FormField
                  control={form.control}
                  name="addressLine2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        Address Line 2 (optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Apt, suite, etc."
                          className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* City */}
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">
                          City
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="City"
                            className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* State */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">
                          State / Region
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="State"
                            className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Postal Code */}
                  <FormField
                    control={form.control}
                    name="postalCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">
                          Postal Code
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="ZIP"
                            className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Country */}
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-white">
                          Country
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="United States"
                            className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-border text-white hover:bg-secondary"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                {isLoading ? 'Creating...' : 'Create User'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}