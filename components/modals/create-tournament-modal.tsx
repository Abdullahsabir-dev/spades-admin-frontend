'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload } from 'lucide-react'

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

interface CreateTournamentFormData {
  tournamentName: string
  tournamentImage?: File | null
  entryFee: number
  prizePool: number
  maxPlayers: string
  startDate: string
  startTime: string
  initialStatus: string
}

interface CreateTournamentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateTournamentFormData) => void | Promise<void>
}

export function CreateTournamentModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateTournamentModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)

  const form = useForm<CreateTournamentFormData>({
    defaultValues: {
      tournamentName: '',
      tournamentImage: null,
      entryFee: 0,
      prizePool: 0,
      maxPlayers: '64',
      startDate: '',
      startTime: '',
      initialStatus: 'Scheduled',
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (data: CreateTournamentFormData) => {
    setIsLoading(true)
    try {
      const submissionData = {
        ...data,
        tournamentImage: imageFile,
      }

      const result = onSubmit?.(submissionData)

      if (result instanceof Promise) {
        result
          .then(() => {
            form.reset()
            setImagePreview(null)
            setImageFile(null)
            onOpenChange(false)
          })
          .catch((error) => {
            console.error('Error creating tournament:', error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        form.reset()
        setImagePreview(null)
        setImageFile(null)
        onOpenChange(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating tournament:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Create New Tournament
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Set up a new tournament for players to join.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Tournament Name */}
            <FormField
              control={form.control}
              name="tournamentName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Tournament Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Saturday Night Showdown"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tournament Image */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">
                Tournament Image (Optional)
              </FormLabel>
              <FormControl>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors cursor-pointer bg-secondary/20">
                  <input
                    type="file"
                    accept="image/jpeg,image/png"
                    onChange={handleImageChange}
                    className="hidden"
                    id="tournament-image"
                  />
                  <label
                    htmlFor="tournament-image"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    {imagePreview ? (
                      <div className="flex flex-col items-center gap-2">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="h-16 w-16 rounded object-cover"
                        />
                        <p className="text-sm text-foreground">
                          {imageFile?.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-8 h-8 text-muted-foreground" />
                        <p className="text-sm text-foreground font-medium">
                          Upload
                        </p>
                        <p className="text-xs text-muted-foreground">
                          JPG or PNG Recommended: 800x400px
                        </p>
                      </>
                    )}
                  </label>
                </div>
              </FormControl>
            </FormItem>

            {/* Entry Fee and Prize Pool */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="entryFee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Entry Fee (tokens)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="25"
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

              <FormField
                control={form.control}
                name="prizePool"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Prize Pool ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1000"
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
            </div>

            {/* Max Players */}
            <FormField
              control={form.control}
              name="maxPlayers"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Max Players
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-secondary/50 border-border text-white">
                        <SelectValue placeholder="Select max players" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="8">8 Players</SelectItem>
                      <SelectItem value="16">16 Players</SelectItem>
                      <SelectItem value="32">32 Players</SelectItem>
                      <SelectItem value="64">64 Players</SelectItem>
                      <SelectItem value="128">128 Players</SelectItem>
                      <SelectItem value="256">256 Players</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Start Date and Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Start Date
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-white">
                      Start Time
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="time"
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Initial Status */}
            <FormField
              control={form.control}
              name="initialStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Initial Status
                  </FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-secondary/50 border-border text-white">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Registering">Registering</SelectItem>
                      <SelectItem value="In Progress">In Progress</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
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
                  form.reset()
                  setImagePreview(null)
                  setImageFile(null)
                  onOpenChange(false)
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
                {isLoading ? 'Creating...' : 'Create Tournament'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}