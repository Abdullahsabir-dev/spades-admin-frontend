'use client'

import { useState } from 'react'
import { Plus, MoreVertical, Edit, Trash2 } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { mockRewards, mockMerchandise } from '@/lib/mock-data'
import { CreateRewardModal } from '@/components/modals/create-reward-modal'
import { CreateProductsModal } from '@/components/modals/create-products-modal'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
export default function RewardsPage() {
  const [isCreateRewardOpen, setIsCreateRewardOpen] = useState(false)
  const [isCreateMerchandiseOpen, setIsCreateMerchandiseOpen] = useState(false)

  const handleCreateReward = async (data: any) => {
    console.log('Creating reward:', data)
 
  }

  const handleCreateMerchandise = async (data: any) => {
    console.log('Creating merchandise:', data)
   
  }

  return (
    <>
      <AdminLayout
        title="Rewards Center"
        subtitle="Create and manage rewards and merchandise available to users."
      >
        {/* All Rewards Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Rewards (2)</h2>
            <Button 
              onClick={() => setIsCreateRewardOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create Reward
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-colors"
              >
                <div className="aspect-square bg-card flex items-center justify-center text-6xl mb-4 border-b border-border">
                  {reward.image}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-white mb-1">{reward.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {reward.company}
                  </p>

                  <div className="flex items-center justify-between mb-4 py-3 border-y border-border">
                    <div>
                      <p className="text-xs text-muted-foreground">Category</p>
                      <p className="text-sm font-medium text-foreground">
                        {reward.category}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Value</p>
                      <p className="text-sm font-medium text-primary">
                        {reward.value}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                      {reward.status}
                    </span>
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
                            <Edit className="w-4 h-4 text-muted-foreground" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-border" />
                       
                          <DropdownMenuItem 
                            className="cursor-pointer hover:bg-destructive/10 rounded-md px-3 py-2 text-sm text-red-500 flex items-center gap-3"
                          >
                            <Trash2 className="w-4 h-4 text-red-500" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Merchandise Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Merchandise (1)</h2>
            <Button 
              onClick={() => setIsCreateMerchandiseOpen(true)}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </div>

          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-card">
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      Variants
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {mockMerchandise.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border hover:bg-secondary/30 transition-colors last:border-b-0"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{product.image}</div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {product.description}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-primary">
                        {product.price}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">
                        {product.variants}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                          {product.status}
                        </span>
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
                            <Edit className="w-4 h-4 text-muted-foreground" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="my-1 bg-border" />
                       
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
        </div>
      </AdminLayout>

      <CreateRewardModal
        open={isCreateRewardOpen}
        onOpenChange={setIsCreateRewardOpen}
        onSubmit={handleCreateReward}
      />

      <CreateProductsModal
        open={isCreateMerchandiseOpen}
        onOpenChange={setIsCreateMerchandiseOpen}
        onSubmit={handleCreateMerchandise}
      />
    </>
  )
}