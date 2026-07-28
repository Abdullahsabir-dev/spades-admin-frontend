'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Upload, X, Plus, Trash2 } from 'lucide-react'

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

interface ProductVariant {
  id: string
  size: string
  color: string
}

interface CreateMerchandiseFormData {
  productName: string
  price: number
  productImage?: File | null
  description: string
  status: string
  variants: ProductVariant[]
}

interface CreateMerchandiseModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit?: (data: CreateMerchandiseFormData) => void | Promise<void>
}

export function CreateProductsModal({
  open,
  onOpenChange,
  onSubmit,
}: CreateMerchandiseModalProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [variants, setVariants] = useState<ProductVariant[]>([])
  const [showVariantForm, setShowVariantForm] = useState(false)
  const [variantSize, setVariantSize] = useState('')
  const [variantColor, setVariantColor] = useState('')

  const form = useForm<CreateMerchandiseFormData>({
    defaultValues: {
      productName: '',
      price: 0,
      productImage: null,
      description: '',
      status: 'active',
      variants: [],
    },
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      form.setValue('productImage', file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    form.setValue('productImage', null)
    setImagePreview(null)
  }

  const addVariant = () => {
    if (variantSize.trim() || variantColor.trim()) {
      const newVariant: ProductVariant = {
        id: Date.now().toString(),
        size: variantSize,
        color: variantColor,
      }
      const updatedVariants = [...variants, newVariant]
      setVariants(updatedVariants)
      form.setValue('variants', updatedVariants)
      setVariantSize('')
      setVariantColor('')
      setShowVariantForm(false)
    }
  }

  const removeVariant = (id: string) => {
    const updatedVariants = variants.filter((v) => v.id !== id)
    setVariants(updatedVariants)
    form.setValue('variants', updatedVariants)
  }

  const handleSubmit = (data: CreateMerchandiseFormData) => {
    setIsLoading(true)
    try {
      const result = onSubmit?.({
        ...data,
        variants,
      })

      if (result instanceof Promise) {
        result
          .then(() => {
            form.reset()
            setImagePreview(null)
            setVariants([])
            setShowVariantForm(false)
            setVariantSize('')
            setVariantColor('')
            onOpenChange(false)
          })
          .catch((error) => {
            console.error('Error creating merchandise:', error)
          })
          .finally(() => {
            setIsLoading(false)
          })
      } else {
        form.reset()
        setImagePreview(null)
        setVariants([])
        setShowVariantForm(false)
        setVariantSize('')
        setVariantColor('')
        onOpenChange(false)
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error creating merchandise:', error)
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Add New Product
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Add merchandise for users to purchase.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            {/* Product Name */}
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Product Name 
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Team Jersey"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-white">
                    Price ($) 
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="29.99"
                      step="0.01"
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground focus:border-primary"
                      {...field}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value === '' ? 0 : parseFloat(e.target.value)
                        )
                      }
                      value={field.value || ''}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Product Image Upload */}
            <FormItem>
              <FormLabel className="text-sm font-medium text-white">
                Product Image (Optional)
              </FormLabel>
              <div className="space-y-3">
                {imagePreview ? (
                  <div className="relative w-32 h-32 bg-secondary/50 border border-border rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
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
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </FormItem>

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
                      placeholder="Describe the product..."
                      className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground resize-none focus:border-primary"
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
                      <SelectTrigger className="bg-secondary/50 border-border text-white focus:border-primary">
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

            {/* Variants Section */}
            <div className="space-y-4 p-4 bg-secondary/20 border border-border rounded-lg">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-white">
                  Variants (Size & Color)
                </label>
                {!showVariantForm && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowVariantForm(true)}
                    className="border-primary text-primary hover:bg-primary/10"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Variant
                  </Button>
                )}
              </div>

              {/* Variant Form */}
              {showVariantForm && (
                <div className="space-y-3 p-3 bg-secondary/50 rounded border border-border">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Size
                      </label>
                      <Input
                        placeholder="e.g., Small, Medium, Large"
                        value={variantSize}
                        onChange={(e) => setVariantSize(e.target.value)}
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-muted-foreground">
                        Color
                      </label>
                      <Input
                        placeholder="e.g., Red, Blue, Black"
                        value={variantColor}
                        onChange={(e) => setVariantColor(e.target.value)}
                        className="bg-secondary/50 border-border text-white placeholder:text-muted-foreground mt-1"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      size="sm"
                      onClick={addVariant}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setShowVariantForm(false)
                        setVariantSize('')
                        setVariantColor('')
                      }}
                      className="border-border text-white hover:bg-secondary"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}

              {/* Variants List */}
              {variants.length > 0 ? (
                <div className="space-y-2">
                  {variants.map((variant) => (
                    <div
                      key={variant.id}
                      className="flex items-center justify-between p-2 bg-secondary/50 rounded border border-border"
                    >
                      <div className="text-sm text-white">
                        <span className="font-medium">
                          {variant.size && variant.color
                            ? `${variant.size} - ${variant.color}`
                            : variant.size || variant.color}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVariant(variant.id)}
                        className="p-1 hover:bg-red-500/20 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  {showVariantForm
                    ? ''
                    : "No variants added. Click 'Add Variant' to include size/color options."}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-border">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  onOpenChange(false)
                  form.reset()
                  setImagePreview(null)
                  setVariants([])
                  setShowVariantForm(false)
                  setVariantSize('')
                  setVariantColor('')
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
                {isLoading ? 'Adding...' : 'Add Product'}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}