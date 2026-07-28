'use client'

import { AdminLayout } from '@/components/admin-layout'
import { mockActivityLog } from '@/lib/mock-data'

export default function ActivityPage() {
  return (
    <AdminLayout
      title="Activity Log"
      subtitle="Monitor all platform activity in real-time."
    >
      <div className="space-y-4">
        {mockActivityLog.map((activity) => (
          <div
            key={activity.id}
            className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
          >
            <div className="flex gap-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
                  {activity.type === 'user_registered' && '👤'}
                  {activity.type === 'deposit' && '💰'}
                  {activity.type === 'tournament_win' && '🏆'}
                  {activity.type === 'failed_login' && '⚠️'}
                  {activity.type === 'admin_login' && '🔐'}
                  {activity.type === 'match_completed' && '⚡'}
                  {activity.type === 'withdrawal' && '📤'}
                  {activity.type === 'profile_update' && '⚙️'}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-white mb-1">
                      {activity.title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {activity.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {activity.timestamp}
                    </p>
                    {activity.priority === 'high' && (
                      <div className="mt-2 inline-block">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/50">
                          High Priority
                        </span>
                      </div>
                    )}
                    {activity.status === 'pending-review' && (
                      <div className="mt-2 inline-block">
                        <span className="px-2 py-1 rounded text-xs font-medium bg-orange-500/20 text-orange-400 border border-orange-500/50">
                          Pending Review
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
