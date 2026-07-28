'use client'

import { useState } from 'react'
import { Plus, Filter, Play, MoreVertical, XCircle, Users, Edit, Eye, Trash } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { mockTournaments } from '@/lib/mock-data'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { CreateTournamentModal } from '@/components/modals/create-tournament-modal'

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

export default function TournamentsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCreateTournament = async (data: CreateTournamentFormData) => {
    try {
      console.log('Creating tournament with data:', data)
      console.log('Tournament created successfully!')
    } catch (error) {
      console.error('Failed to create tournament:', error)
      throw error
    }
  }

  return (
    <AdminLayout
      title="Tournaments"
      subtitle="Monitor and manage all platform tournaments."
    >
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">
                Active Tournaments
              </p>
              <p className="font-heading text-3xl font-bold text-white">0</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              <Play className="w-5 h-5 text-primary" />
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            1 open for registration
          </p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Prize Pools</p>
              <p className="font-heading text-3xl font-bold text-primary">$1,000</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              💲
            </div>
          </div>
          <p className="text-xs text-emerald-400">Across all tournaments</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Registered Players</p>
              <p className="font-heading text-3xl font-bold text-white">0</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              👥
            </div>
          </div>
          <p className="text-xs text-emerald-400">+89 this week</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Total Tournaments</p>
              <p className="font-heading text-3xl font-bold text-white">1</p>
            </div>
            <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
              🏆
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            3 scheduled this week
          </p>
        </div>
      </div>

      {/* Search and Actions */}
      <div className="flex items-center gap-3 mb-6">
        <Input
          placeholder="Search tournaments..."
          className="flex-1 bg-card border-border"
        />
        <Select defaultValue="All Status">
          <SelectTrigger className="w-40 bg-card border-border cursor-pointer">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <SelectValue placeholder="All Status" />
            </div>
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="registering">Scheduled</SelectItem>
            <SelectItem value="active">Registering</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>

        <Select defaultValue="All Creators">
          <SelectTrigger className="w-40 bg-card border-border cursor-pointer">
            <SelectValue placeholder="All Creators" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            <SelectItem value="all">All Creators</SelectItem>
            <SelectItem value="admin">Admin Created</SelectItem>
            <SelectItem value="user">User Created</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="w-4 h-4 mr-2" />
          Create Tournament
        </Button>
      </div>

      {/* Tournaments List */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-card">
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Tournament
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Created By
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Entry Fee
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Prize Pool
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Players
                </th>
                <th className="px-6 py-4 text-left text-sm font-medium text-muted-foreground">
                  Start Date
                </th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody>
              {mockTournaments.map((tournament) => (
                <tr
                  key={tournament.id}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{tournament.image}</div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {tournament.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Created {tournament.createdAt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {tournament.createdBy}
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                      {tournament.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {tournament.entryFee} tokens
                  </td>
                  <td className="px-6 py-4 text-sm text-primary font-medium">
                    ${tournament.prizePool.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {tournament.players}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    📅 {tournament.startDate}
                  </td>
                  <td className="px-6 py-4">
                    <DropdownMenu>
                      <DropdownMenuTrigger>
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
                          Edit Tournament
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="my-1 bg-border" />
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-secondary/80 rounded-md px-3 py-2 text-sm text-foreground flex items-center gap-3"
                        >
                          <Users className="w-4 h-4 text-muted-foreground" />
                          Manage Players
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-destructive/10 rounded-md px-3 py-2 text-sm text-red-500 flex items-center gap-3"
                        >
                          <XCircle className="w-4 h-4 text-red-500" />
                          Cancel Tournament
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="cursor-pointer hover:bg-destructive/10 rounded-md px-3 py-2 text-sm text-red-500 flex items-center gap-3"
                        >
                          <Trash className="w-4 h-4 text-red-500" />
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
        <div className="px-6 py-4 border-t border-border text-sm text-muted-foreground">
          Showing 1 of 1 tournaments
        </div>
      </div>

      {/* Past Tournament Results */}
      <div className="mt-8 bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-bold text-white mb-6">
          Past Tournament Results
        </h2>
        <p className="text-sm text-muted-foreground text-center py-8">
          Final standings from completed tournaments.
        </p>
        <p className="text-sm text-muted-foreground text-center">
          No completed tournaments yet.
        </p>
      </div>

      <CreateTournamentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        onSubmit={handleCreateTournament}
      />
    </AdminLayout>
  )
}