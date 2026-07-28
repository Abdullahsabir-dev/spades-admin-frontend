'use client'

import { AlertCircle, Shield, Lock, Eye } from 'lucide-react'
import { AdminLayout } from '@/components/admin-layout'
import { Button } from '@/components/ui/button'

export default function SecurityPage() {
  return (
    <AdminLayout
      title="Security"
      subtitle="Monitor and manage platform security settings."
    >
      <div className="space-y-6 max-w-3xl">
        {/* Security Status */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-2">
                Security Status
              </h2>
              <p className="text-sm text-emerald-400 mb-4">All systems secure</p>
              <p className="text-sm text-muted-foreground">
                Your admin portal is protected with industry-standard security
                measures.
              </p>
            </div>
          </div>
        </div>

        {/* Active Sessions */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Active Sessions</h2>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">
                  Chrome - Windows
                </p>
                <p className="text-xs text-muted-foreground">
                  New York, USA • IP: 192.168.1.100
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Last active: Just now
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
                Current
              </span>
            </div>

            <div className="flex items-start justify-between p-4 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-sm font-medium text-white">Safari - Mac</p>
                <p className="text-xs text-muted-foreground">
                  San Francisco, USA • IP: 192.168.1.101
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  Last active: 2 days ago
                </p>
              </div>
              <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">
                Two-Factor Authentication
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                Add an extra layer of security to your account
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/50">
              Enabled
            </span>
          </div>
          <Button variant="outline" className="border-border">
            Manage 2FA Settings
          </Button>
        </div>

        {/* Password Policy */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">Password Policy</h2>
          <div className="space-y-4">
            {[
              {
                label: 'Minimum Length',
                value: '12 characters',
              },
              {
                label: 'Complexity',
                value: 'Uppercase, lowercase, numbers, symbols required',
              },
              {
                label: 'Password Expiry',
                value: 'Every 90 days',
              },
              {
                label: 'Previous Passwords',
                value: 'Cannot reuse last 5 passwords',
              },
            ].map((policy) => (
              <div key={policy.label} className="flex items-center justify-between p-4 bg-secondary/50 rounded">
                <p className="text-sm text-foreground">{policy.label}</p>
                <p className="text-sm font-medium text-primary">{policy.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* IP Whitelist */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="text-lg font-bold text-white">IP Whitelist</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Restrict admin access to specific IP addresses
              </p>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-500/20 text-gray-400 border border-gray-500/50">
              Disabled
            </span>
          </div>
          <Button variant="outline" className="border-border">
            Enable IP Whitelist
          </Button>
        </div>

        {/* Security Audit Log */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-bold text-white mb-6">
            Security Audit Log
          </h2>
          <div className="space-y-3">
            {[
              {
                event: 'Admin login successful',
                time: '2 minutes ago',
                ip: '192.168.1.100',
              },
              {
                event: 'Settings changed',
                time: '1 hour ago',
                ip: '192.168.1.100',
              },
              {
                event: 'Multiple failed login attempts',
                time: '3 hours ago',
                ip: '10.0.0.50',
              },
              {
                event: 'New admin user added',
                time: '1 day ago',
                ip: '192.168.1.100',
              },
            ].map((log, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-secondary/50 rounded text-sm"
              >
                <p className="text-foreground">{log.event}</p>
                <div className="text-right">
                  <p className="text-muted-foreground">{log.time}</p>
                  <p className="text-muted-foreground text-xs font-mono">
                    {log.ip}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-lg font-bold text-white mb-2">Danger Zone</h2>
              <p className="text-sm text-muted-foreground mb-4">
                These actions cannot be undone
              </p>
              <Button
                variant="outline"
                className="border-red-500/50 text-red-400 hover:bg-red-500/20"
              >
                Reset All Permissions
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
