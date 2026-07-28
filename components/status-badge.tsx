import { Ban, CircleAlert, CircleCheck, Clock, type LucideIcon } from 'lucide-react'

type Status = 'active' | 'inactive' | 'suspended' | 'pending'

interface StatusBadgeProps {
  status: Status
  text?: string
}

const statusConfig: Record<Status, { icon: LucideIcon; className: string }> = {
  active: {
    icon: CircleCheck,
    className: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50',
  },
  inactive: {
    icon: Clock,
    className: 'bg-gray-500/20 text-gray-400 border border-gray-500/50',
  },
  suspended: {
    icon: Ban,
    className: 'bg-red-500/20 text-red-400 border border-red-500/50',
  },
  pending: {
    icon: CircleAlert,
    className: 'bg-orange-500/20 text-orange-400 border border-orange-500/50',
  },
}

export function StatusBadge({ status, text }: StatusBadgeProps) {
  const { icon: Icon, className } = statusConfig[status]

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {text || status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  )
}

interface RoleBadgeProps {
  role: string
}

export function RoleBadge({ role }: RoleBadgeProps) {
  const styles = {
    VIP: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
    Premium: 'bg-purple-500/20 text-purple-400 border border-purple-500/50',
    Player: 'bg-gray-500/20 text-gray-300 border border-gray-500/50',
    admin: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50',
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${
        styles[role as keyof typeof styles] ||
        'bg-gray-500/20 text-gray-400 border border-gray-500/50'
      }`}
    >
      {role}
    </span>
  )
}
