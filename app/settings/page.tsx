'use client'

import { useState } from 'react'
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

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    company: 'Spades Gaming',
    adminEmail: 'admin@spades.com',
    timezone: 'America/New_York',
    notifications: {
      newUsers: true,
      securityAlerts: true,
      largeTransactions: true,
      dailySummary: false,
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: true,
      ipWhitelisting: false,
    },
  })

  const toggleNotification = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key],
      },
    })
  }

  const toggleSecurity = (key: keyof typeof settings.security) => {
    setSettings({
      ...settings,
      security: {
        ...settings.security,
        [key]: !settings.security[key],
      },
    })
  }

  return (
    <AdminLayout
      title="Settings"
      subtitle="Configure your admin portal preferences."
    >
      <div className="space-y-8 max-w-2xl">
        {/* General Settings */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">General Settings</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Company Name
              </label>
              <Input
                value={settings.company}
                onChange={(e) =>
                  setSettings({ ...settings, company: e.target.value })
                }
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Admin Email
              </label>
              <Input
                type="email"
                value={settings.adminEmail}
                onChange={(e) =>
                  setSettings({ ...settings, adminEmail: e.target.value })
                }
                className="bg-secondary border-border text-foreground"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Timezone
              </label>
              <Select defaultValue={settings.timezone}>
                <SelectTrigger className="bg-secondary border-border text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  <SelectItem value="America/New_York">
                    America/New_York
                  </SelectItem>
                  <SelectItem value="America/Chicago">
                    America/Chicago
                  </SelectItem>
                  <SelectItem value="America/Denver">
                    America/Denver
                  </SelectItem>
                  <SelectItem value="America/Los_Angeles">
                    America/Los_Angeles
                  </SelectItem>
                  <SelectItem value="UTC">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Notifications</h2>
          <div className="space-y-4">
            {[
              {
                key: 'newUsers',
                label: 'New User Registrations',
                desc: 'Get notified when new users sign up',
              },
              {
                key: 'securityAlerts',
                label: 'Security Alerts',
                desc: 'Receive alerts for suspicious activity',
              },
              {
                key: 'largeTransactions',
                label: 'Large Transactions',
                desc: 'Alert for transactions over 1000 tokens',
              },
              {
                key: 'dailySummary',
                label: 'Daily Summary',
                desc: 'Receive a daily email with platform stats',
              },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-secondary/50 rounded">
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button
                  onClick={() =>
                    toggleNotification(
                      key as keyof typeof settings.notifications
                    )
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.notifications[
                      key as keyof typeof settings.notifications
                    ]
                      ? 'bg-primary'
                      : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.notifications[
                        key as keyof typeof settings.notifications
                      ]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Security</h2>
          <div className="space-y-4">
            {[
              {
                key: 'twoFactorAuth',
                label: 'Two-Factor Authentication',
                desc: 'Add an extra layer of security',
              },
              {
                key: 'sessionTimeout',
                label: 'Session Timeout',
                desc: 'Auto-logout after 30 minutes of inactivity',
              },
              {
                key: 'ipWhitelisting',
                label: 'IP Whitelisting',
                desc: 'Only allow access from specific IPs',
              },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-secondary/50 rounded">
                <div>
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button
                  onClick={() =>
                    toggleSecurity(key as keyof typeof settings.security)
                  }
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.security[key as keyof typeof settings.security]
                      ? 'bg-primary'
                      : 'bg-gray-700'
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.security[key as keyof typeof settings.security]
                        ? 'translate-x-6'
                        : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Save Changes
        </Button>
      </div>
    </AdminLayout>
  )
}
