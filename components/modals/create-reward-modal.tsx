'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, X } from 'lucide-react'

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
import { Textarea } from '@/components/ui/textarea'

interface CreateRewardFormData {
  rewardName: string
  company: string
  rewardIcon?: File | null
  category: string
  value: string
  description: string
  termsConditions: string
  status: string
}

interface CreateRewardModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateRewardFormData) => void | Promise<void>
}

export function CreateRewardModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateRewardModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [iconPreview, setIconPreview] = useState<string | null>(null)

  const form = useForm<CreateRewardFormData>({
    defaultValues: {
      rewardName: '',
      company: '',
      rewardIcon: null,
      category: 'general',
      value: '',
      description: '',
      termsConditions: '',
      status: 'active',
    },
  })

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('rewardIcon', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setIconPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeIcon = () => {
    form.setValue('rewardIcon', null)
    setIconPreview(null)
  }

  const handleSubmit = (data: CreateRewardFormData) => {
    setIsLoading(true)
    try {
      const result = onSubmit?.(data)

      if (result instanceof Promise) {
        result
          .then(() => {
            form.reset()
            setIconPreview(null)
            onOpenChange(false)
          })
          .catch((error) => {
            console.error('Error creating reward:', error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        form.reset()
        setIconPreview(null)
        onOpenChange(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating reward:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create New Reward
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add a new reward for users to redeem.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Reward Name */}
            <FormField
              control={form.control}
              name="rewardName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Reward Name 
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Free Coffee"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Company */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Company 
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Starbucks"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Reward Icon Upload */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">
                Reward Icon (Optional)
              </FormLabel>
              <div className="space-y-3">
                {iconPreview ? (
                  <div className="relative w-24 h-24 bg-secondary/50 border border-border rounded-lg overflow-hidden">
                    <img
                      src={iconPreview}
                      alt="Icon preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeIcon}
                      className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full"
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ) : (
                  <label className="flex items-center justify-center w-full px-4 py-8 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors bg-secondary/20">
                    <div className="text-center">
                      <Upload className="w-6 h-6 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        JPG or PNG, max 5MB
                      </p>
                    </div>
                    <input
                      type="file"
                      accept="image/jpeg,image/png"
                      onChange={handleIconChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </FormItem>

            {/* Category and Value - Side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Category */}
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Category
                    </FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-secondary/50 border-border text-white">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="general">General</SelectItem>
                        <SelectItem value="food">Food & Beverage</SelectItem>
                        <SelectItem value="entertainment">Entertainment</SelectItem>
                        <SelectItem value="shopping">Shopping</SelectItem>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="travel">Travel</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Value */}
              <FormField
                control={form.control}
                name="value"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Value
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="$10 Gift Card"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the reward..."
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Terms & Conditions */}
            <FormField
              control={form.control}
              name="termsConditions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Terms & Conditions
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter terms and conditions..."
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Status
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-secondary/50 border-border text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="coming-soon">Coming Soon</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
                  setIconPreview(null)
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
                {isLoading ? 'Creating...' : 'Create Reward'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}